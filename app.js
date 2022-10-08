const express = require('express')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const publicRouter = require('./routers/public-router')
const privateRouter = require('./routers/private-router')
const auth = require('./auth')

const app = express()
const port = 3333

app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
auth(app)
app.use(express.static('public'))
app.use('/', publicRouter)
app.use('/', privateRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
