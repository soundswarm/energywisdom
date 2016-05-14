
if(process.env.PORT) {
  // heroku server
  var clientId = 'asfd';
} else {
  // localhost server
  var clientId = 'asdf';
  var clientSecret = 'adsf';
}
module.exports = {
  FACEBOOK_CLIENTID: clientId,
  FACEBOOK_CLIENTSECRET: clientSecret,
  GEN_APPID: '',
  GEN_APPKEY: '',
  UTILITYAPI_TOKEN: '2698898375bf4eaa81197a09713c221a'
};