module.exports = function(passport, FacebookStrategy, config, mongoose){

  // user schema that facebook calls for and stores in our mongolab account
  var chatUser = new mongoose.schema({
    profileID:String,
    fullname:String,
    profilePic:String
  });

  // MODEL: convert the user schema into a user model
  var userModel = mongoose.model('chatUser', chatUser);

  // serialized and deseriz
  passport.serializeUser(function(user, done){
    done(null,user.id);
  })

  passport.deserializedUser(function(id, done){
    userModel.findById(id, function(err, user){
      done(err, user);
    })
  })

  passport.use(new FacebookStrategy({
    clientID: config.fb.appID,
    clientSecretL: config.fb.appSecret,
    callbackURL: config.fb.callbackURL,
    profilfields: ['id', 'displayName', 'photos']
  }, function(accessToken, refreshToken, profile, done){
    // check if the user exists in our monogodb
    // if not, create one and return the porfile
    // if the user exists, simply return the profile.
    userModel.findOne({'profileID': profile.id}, function(err, result){
      if(result){
        done(null, result) //invoke the done method and pass in the result
      } else {
        // create a new user in out mongolab account
        var newChatUser = new userModel({
          profileID:profile.id,
          fullname:profile.displayName,
          profilePic:profile.photos[0].value || ''
        });

        newChatUser.save(function(err){
          done(null, newChatUser);
        })
      }
    })
  }));
}
