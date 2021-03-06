const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');
// const bodyParser = require('body-parser');

// router.use(bodyParser.json());

const User = require('../models/user');
// Register
router.post('/register', function(req, res, next){
   let newUser = new User({
      name: req.body.name,
       email: req.body.email,
       username: req.body.username,
       password: req.body.password
   });

   User.addUser(newUser, function(err, user){
     if(err){
       res.json({success: false, msg: "Failed to register user"});
     } else {
           res.json({success: true, msg: "User Registered"});
       }
});


});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username= req.body.username;
    const password= req.body.password;

    User.getUserByUsername(username, (err, user) => {
       if (err) throw err;
       if (!user) {
         return res.json({success: false, msg: 'User not found'});
       }

       User.comparePassword(password, user.password, (err, isMatch) => {
           if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                   expiresIn: 684800
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                       id: user._id,
                       name: user.name,
                       username: user.username,
                       email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong Password'});
            }
       });
    });
});


// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}),(req, res, next) => {
    res.json({
    user: req.user
});
});


module.exports = router;