const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

function auth(app) {
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
    }));

    app.use(passport.authenticate('session'));

    passport.use(new LocalStrategy(function verify(username, password, cb){
        return cb(null, { id: 1, username })
    }))

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            cb(null, { id: user.id, username: user.username });
        });
    });

    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user);
        });
    });
    app.use(passport.session())
}

module.exports = auth
