var bcrypt = require('bcrypt-nodejs');
module.exports = {
  hashPassword: function(password) {
    return bcrypt.hashSync(password);
  },
  validPassword: function(password, callback) {
    var user = this;
    var passwordFromDb = this.get('password');

      // this.get('password', function(err, password) {
      //   console.log('password in valued password', password);
      // })
    return bcrypt.compare(password, passwordFromDb, function(err, isMatch) {
      if(isMatch) {
        user.unset('password');
        user.unset('created_at');
        user.unset('updated_at');
        return callback(err, user);
      } else {
        return callback(err, false);
      }
    });
  },
  authenticate: function(email, password, callback) {
    // console.log('email, password in authenticate', email, password);
    var context = this;
    return User.forge({email: email})
    .fetch()
    .then(function(user) {
      // console.log('user in authenticate', user);
      if(user) {
        // console.log('this', this.get);
        return context.validPassword.call(user, password, callback);
      }
      callback(null, user)
    })
  }
};