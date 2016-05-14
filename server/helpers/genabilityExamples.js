var rp = require('request-promise');
var btoa = require('btoa');
var constants = require('../config/constants');
var keys = require('../config/config.js')
var Subscriber = require('../dataSources/SubscriberDataSource');
// var Program = require('../dataSources/ProgramDataSource');
var UtilityApi = require('../helpers/utilityApi');

var RpOptions = function() {
  return {
    headers: {
    'Authorization': 'Basic: '+btoa(keys.GEN_APPID+':'+keys.GEN_APPKEY),
    'Accept': 'application/json',   
    'Content-Type': 'application/json'
  },
    json: true // Automatically parses the JSON string in the response 
  }
};

module.exports = {
  createAccount: function(account) {  
    var options = new RpOptions;
    options.uri = 'https://api.genability.com/rest/v1/accounts';
    options.body = account;
    return rp.put(options);
  },
  createTariff: function(subscriber, tariff) {
    var options = new RpOptions;
    options.uri = 'https://api.genability.com/rest/v1/accounts/pid/'+subscriber.genabilityId+'/tariffs';
    options.body = tariff;
    return rp.put(options);
  },
  createUsageProfile: function(usageProfile) {
    var options = new RpOptions;
    options.uri = 'https://api.genability.com/rest/v1/profiles'
    options.body = usageProfile;
    return rp.put(options);
  },
  getUsageProfile: function() {
    var options = new RpOptions;
    options.uri = 'https://api.genability.com/rest/v1/profiles'
    // options.qs = {"providerProfileId": "user1Electricity"};
    return rp.get(options);
  },
  createSolarProfile: function(solarProfile) {
    var options = new RpOptions;
    options.uri = 'https://api.genability.com/rest/v1/profiles';
    options.body = solarProfile;
    return rp.put(options);
  },
  savingsAnalysis: function(savingsAnalysis) {
    // console.log('subinGen', subscriber, 'progainsavAna', program);
    var options = new RpOptions;
    options.uri = 'https://api.genability.com/rest/v1/accounts/analysis';
    options.body = savingsAnalysis;
    // console.log(options.uri);
    return rp.post(options)
  },
  utilityApiIntervalsToGenabilityIntervals: function(utilityApiIntervals) {
    
    return utilityApiIntervals.map(function(interval) {
      var genabilityInterval = {
        "fromDateTime" : interval.interval_start,
        "toDateTime" : interval.interval_end,
        "quantityUnit" : "kWh",
        "quantityValue" : interval.interval_kWh
      };
      return genabilityInterval;
    });
  },
  utilityApiBillsToGenabilityIntervals: function(utilityApiBills) {
    return utilityApiBills.map(function(bill) {
      var genabilityInterval = {
        "fromDateTime" : bill.bill_start_date,
        "toDateTime" : bill.bill_end_date,
        "quantityUnit" : "kWh",
        "quantityValue" : bill.bill_total_kWh
      };
      return genabilityInterval;
    })
  },