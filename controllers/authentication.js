const jwt = require('jwt-simple')
const User = require('../models/User')
const config = require('../config')

function tokenForUser(user){
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function(req, res, next){
  //user has already had theeir email and password auth'd
  //need to give them a token
  res.send({ token: tokenForUser(req.user) })

}

exports.signup = function(req, res, next){
  const email = req.body.email
  const password = req.body.password 

  if(!email || !password){
    return res.status(422).send({ error: 'You must provide email and password' })
  }

  //Determine if user with given email exists
  User.findOne({ email: email }, function(err, existingUser){

    if(err) { return next(err) }

     //If user exists, return error 
    if(existingUser){
      return res.status(422).send({ error: 'Email is in use' })
    }
    //If user does not exist, create and save user record 
    const user = new User({
      email: email,
      password: password
    })

    user.save(function(err){
      if(err){ return next(err) }

      //Respond to request indicating the user was created 
      res.json({ token: tokenForUser(user) })
    })
  })

  
}