var rp = require('request-promise');
var constants = require('../config/constants');
var keys = require('../config/config.js')
var UtilityApi = require('../controllers/UtilityApi')
// var Subscriber = require('../dataSources/SubscriberDataSource');
// var sendgrid = require('./sendgrid');

var RpOptions = function() {
  return {
    headers: {
    'Authorization': 'Token '+ keys.UTILITYAPI_TOKEN,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
    json: true // Automatically parses the JSON string in the response
  }
};

module.exports = {
  getAccounts: function(referral) {
    var options = new RpOptions;
    options.uri = 'https://utilityapi.com/api/accounts';
    options.qs = {
      referrals: referral
    };
    return rp.get(options);
  },
  getAccountServices: function(accounts) {
    var account = accounts[0];
    var options = new RpOptions;
    options.uri = 'https://utilityapi.com/api/services';
    options.qs = {
      accounts: account.uid
    };
    return rp.get(options);
  },
  activateService: function(service) {
    var options = new RpOptions;
    options.uri = 'https://utilityapi.com/api/services/'+service.uid+'/modify';
    options.body = {
      "active_until": "now"
    };
    return rp.post(options);
  },
  getService: function(service) {
    var options = new RpOptions;
    options.uri = 'https://utilityapi.com/api/services/'+service.uid;
    return rp.get(options);
  },
  pollForCompletedActivation: function(service, user) {
    var context = this;
    var pollCount =  0;
    var options = new RpOptions;
    var utilityApiDataAdded = false;

    var polling = function() {
      
      pollCount++;
      if(pollCount >= 1000) {
        return;
      }
      return context.getService(service)
      .then(function(serviceData) {
        if(serviceData.latest.message === "Data refreshed") {
          console.log('data refreshed. serviceData from uapi: ');
          // clearInterval(intervalId);
          if(!utilityApiDataAdded) {
            utilityApiDataAdded = true;
            
            // process service data
            var address = context.parseUtilityApiAddress(serviceData.utility_service_address);
            var utility = context.mapUtility(serviceData.utility);
            var subscriberData = {
              userId: user.userId,
              utility: utility,
              address: address,
              utilityApiService: serviceData
            } ;
            
    
            console.log('geting bills');
            return context.getServiceBills(service)
            .then(function(utilityApiBills) {
              console.log('got utility api bills', utilityApiBills.length);
              return subscriberData.utilityApiBills = JSON.stringify(utilityApiBills);
            })
            .then(function() {
              console.log('geting intervals');
              return context.getServiceIntervals(service)
              .then(function(utilityApiIntervals) {
                console.log('got intervals', utilityApiIntervals.length);
                return subscriberData.utilityApiIntervals = JSON.stringify(utilityApiIntervals);
              })
            })
            // then add subscriber
            .then(function() {
              subscriberData.subscriberSource = {hasUtilityApiEnergy: true};
              // return Subscriber.addSubscriber(subscriberData);
              // console.log('usersss',Users);
              return UtilityApi.insertUtilityApi(subscriberData)
            })
            // .then(function() {
            //   sendgrid.sendBillDataConfirmation(user);
            // })
          }
        } else {
          return setTimeout(polling, 5000);
        }
      });
    }
    polling();
  },
  getServiceBills: function(service) {
    var options = new RpOptions;
    options.uri = 'https://utilityapi.com/api/services/'+service.uid+'/bills';
    return rp.get(options);
  },
  getServiceIntervals: function(service) {
    var options = new RpOptions;
    options.uri = 'https://utilityapi.com/api/services/'+service.uid+'/intervals';
    return rp.get(options);
  },
  parseUtilityApiAddress: function(utilityApiAddress) {
    var addressArray = utilityApiAddress.split(', ');
    var address = {
      addressLine1: addressArray[0],
      city: addressArray[1],
      state: addressArray[2],
      zip: parseInt(addressArray[3])
    };
    return address;
  },
  getAnnualKWhFromIntervals: function(intervals) {

    // this only works in the intervals are hourly!!!!
    var hourlyKWhUsage = averageintervals.reduce(function(mem, next) {
      return ( ( parseFloat(mem) + parseFloat(next) ) / intervals.length )
    })
    var annualkWhUsage = hourlyKWhUsage * 8760; //there are 8760 hours per year
    return annualkWhUsage;
  },
  mapUtility: function(utilityApiUtility) {
    var utilityMap = {
      'PG&E': 'Pacific Gas and Electric'
    };
    return utilityMap[utilityApiUtility];
  },
  mapUtilityApiTariffToGenability: function(utilityApiTariff) {
    var tariffMap = {
      "E6 TH Residential Time-of-Use Service": 525,
      'E-1 Standard Residential Electric Service': 522,
      'EL1 Residential or Religious': 809,
      'EL2 Small Non-Residential': 57284,
      'EL9 General Large': 83386
    }
    return tariffMap[utilityApiTariff]
  }
};