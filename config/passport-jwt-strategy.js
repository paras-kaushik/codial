const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


let opts = {// used for extraction from header
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),// tells that we will be finding jwt in the header
    secretOrKey: 'codeial'// it would be decypted using this key
}

// trying to extract user in the JWT- now if user if found it will be put into request
passport.use(new JWTStrategy(opts,async function(jwtPayLoad, done){
    try {
        const user= await User.findById(jwtPayLoad._id);
        if (user){
            return done(null, user);// first argument is error
        }else{
            return done(null, false);// false means user was not found
        }
    } catch (error) {
        console.log('Error in finding user from JWT'); return;
    }
}));

module.exports = passport;
