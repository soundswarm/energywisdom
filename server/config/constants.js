
if(process.env.PORT) {
  var serverHost = '';
  var utilityApiPortal = 'https://utilityapi.com/portal/varsanity';

} else {
  var serverHost = 'http://localhost:8000';
  var utilityApiPortal = 'https://utilityapi.com/portal/varsanity';
}
module.exports = {
  SERVER_HOST: serverHost,
  DB_HOST: process.env.RDS_HOSTNAME || '127.0.0.1',
  DB_NAME: process.env.RDS_DB_NAME || 'postgres',
  API_URL: serverHost+'/api',
  FACEBOOK_CALLBACK: serverHost+'/api/auth/facebook/callback',
  REDIS_URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  UTILITYAPI_PORTAL: utilityApiPortal

};