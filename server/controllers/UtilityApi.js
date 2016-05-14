module.exports = {
  insertUtilityApi: function(data) {
    return Users.updateAsync({userId: data.userId}, {$set: {utilityApi: data} })
    .then(function(user) {
      console.log('utilityapi added', user);
    })
  }
}