const LocalStrategy = require('passport-local').Strategy;
// Models
const User = require('../models/user');



// =========================================================================
// module.exports enables app.js to use require('./config/passport')(passport)
module.exports = function(passport) {
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',    // 'email' refers to the req.body.email submitted with login.ejs form where the <input name="email" ...>
        passwordField : 'password', // 'password' refers to the req.body.password submitted with login.ejs form where the <input name="password" ...>
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, function(req, email, password, done) {
        
        // we lookup a user with a matching 'email'
        User.findOne({email: email}).then(function(user) {
            // Note: the callback function 'done' is used here like 'return' to resume progam execution.
            // it's first parameter is the error, if no error, we pass null.
            // the second parameter is the user object, if error, we pass false.
            // if no user found
            if (!user) {
                // this means fail the login
                return done(null, false);
            }
        
            // check password validity
            if (!user.validPassword(password)) {
                // this means fail login
                return done(null, false);
            }

            // otherwise, pass user object with no errors
            return done(null, user)    
        }).catch(function(err) {done(err, false)});
    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, function(req, email, password, done) {

        // if the user is already logged in:
        if (req.user) {
            // just pass back his data
            return done(null, req.user);
        }

        // we check if no other user has already taken this email
        User.findOne({email : email}).then(function(user) {

            // check if a user found with this email
            if (user) {
                // fail the signup
                return done(null, false);
            }

            // otherwise store user info in the Database
            new User({
                email: email,
                // hash/encrypt password before storing it in the database
                password: User.generateHash(password),
                nickname: req.body.nickname,
                age: req.body.age,
                role: req.body.role
            }).save(function(err, savedUser) {
                if (err) {
                    return done(err, false)
                }
                // Success. Pass back savedUser
                return done(null, savedUser);
            })
        }).catch(function(err) {done(err, false)});
    }));

    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};

