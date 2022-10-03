const express = require("express");

const passport = require("passport");

const publicRouter = express.Router()

publicRouter.get('/login', (req, res) => {
    res.render('login')
})

publicRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    session: true,
}))

module.exports = publicRouter
