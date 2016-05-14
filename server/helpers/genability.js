var config = require('../config/config');
var rp = require('request-promise');
var btoa = require('btoa');
var moment = require('moment');

var RpOptions = function () {
    return {
        headers: {
            'Authorization': 'Basic: ' + btoa(config.GEN_APPID + ':' + config.GEN_APPKEY),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        json: true // Automatically parses the JSON string in the response
    }
};

module.exports = {
    calculateSavings: function (req, res) {
        var zipCode = req['zipCode'];
        //var accountPromise = createAccount(zipCode);
        var usageProfileIdPromise = null;
        var resultPromises = [];
        for (var pv_size = 2; pv_size <= 10; pv_size += 2) {
            for (var battery_size = 2; battery_size <= 10; battery_size += 2) {
                resultPromises.push(function (pv_size, battery_size) {
                    var solarProfileIdPromise = module.exports.createSolarProfile(pv_size)
                        .then(function (solarProfile) {
                            return solarProfile.results[0].profileId;
                        });
                    var batteryProfileIdPromise = module.exports.createBatteryProfile(battery_size)
                        .then(function (batteryProfile) {
                            return batteryProfile.results[0].profileId;
                        })
                        .catch(function (error) {
                            console.log(error)
                        });
                    var result = Promise.all([solarProfileIdPromise, batteryProfileIdPromise])
                        .then(module.exports.runSavingsAnalysis)
                        .then(function (analysis) {
                            return analysis.results[0].summary.lifetimeAvoidedCost;
                        })
                        .then(function (savings) {
                            console.log(savings);
                            return {
                                pv_size: pv_size,
                                battery_size: battery_size,
                                savings: savings
                            };
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    return result;
                }(pv_size, battery_size));
            }
        }
        Promise.all(resultPromises).then(function (results) {
            console.log(results);
            res.status(200).json(results);
        });
    },

    createSolarProfile: function (pv_size) {
        var options = new RpOptions;
        options.uri = 'https://api.genability.com/rest/v1/profiles';
        options.body = {
            "providerAccountId": "Varsanity",
            "serviceTypes": "SOLAR_PV",
            "source": {
                "sourceId": "PVWatts",
                "sourceVersion": "5"
            },
            "properties": {
                "systemSize": {
                    "keyName": "systemSize",
                    "dataValue": pv_size.toString()
                },
                "moduleType": {
                    "keyName": "moduleType",
                    "dataValue": "0"
                },
                "azimuth": {
                    "keyName": "azimuth",
                    "dataValue": "170"
                },
                "losses": {
                    "keyName": "losses",
                    "dataValue": "15"
                },
                "inverterEfficiency": {
                    "keyName": "inverterEfficiency",
                    "dataValue": "96"
                },
                "tilt": {
                    "keyName": "tilt",
                    "dataValue": "17"
                }
            }
        };
        return rp.post(options);
    },

    createBatteryProfile: function(battery_size) {
        var options = new RpOptions;
        options.uri = 'https://api.genability.com/rest/v1/profiles';
        options.body = {
            "providerAccountId": "Varsanity",
            "serviceTypes" : "ELECTRICITY",
            "sourceId" : "ReadingEntry",
            "readingData" : []
        };
        var date = moment('2015-01-01T00:00:00-0700');
        date.utc();
        for (var i = 0; i < 8760; i++) {
            if (date.hours() >= 17 && date.hours() <= 22) {
                options.body.readingData.push({
                    "fromDateTime": date.format('YYYY-MM-DDTHH:mm:ssZZ'),
                    "toDateTime": date.add(1, 'h').format('YYYY-MM-DDTHH:mm:ssZZ'),
                    "quantityUnit": "kWh",
                    "quantityValue": (battery_size / 4).toString()
                })
            } else {
                options.body.readingData.push({
                    "fromDateTime": date.format('YYYY-MM-DDTHH:mm:ssZZ'),
                    "toDateTime": date.add(1, 'h').format('YYYY-MM-DDTHH:mm:ssZZ'),
                    "quantityUnit": "kWh",
                    "quantityValue": "0"
                })
            }
        }
        return rp.post(options);
    },

    runSavingsAnalysis: function (args) {
        var options = new RpOptions;
        options.uri = 'https://api.genability.com/rest/v1/accounts/analysis';
        options.body = {
            "providerAccountId": "Varsanity",
            "fromDateTime": "2015-01-01",
            "propertyInputs": [{
                "scenarios": "before,after",
                "keyName": "rateInflation",
                "dataValue": "3.5"
            }, {
                "scenarios": "before",
                "keyName": "masterTariffId",
                "dataValue": "522"
            }, {
                "scenarios": "after",
                "keyName": "masterTariffId",
                "dataValue": "525"
            }, {
                "scenarios": "after,solar",
                "keyName": "solarDegradation",
                "dataValue": "1.5"
            }, {
                "scenarios": "after,solar",
                "keyName": "profileId",
                "dataValue": args[0],
                "dataFactor": 1
            },{
                "scenarios": "after",
                "keyName": "profileId",
                "dataValue": args[1],
                "dataFactor": 1,
                "operator": "-"
            }, {
                "scenarios": "before,after",
                "keyName": "baselineType",
                "dataValue": "TYPICAL"
            }],
            "rateInputs": [{
                "scenarios": "solar",
                "chargeType": "CONSUMPTION_BASED",
                "rateBands": [{
                    "rateAmount": 0.155
                }]
            }]
        };
        return rp.post(options)
    }
};