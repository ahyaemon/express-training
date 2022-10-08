const express = require("express");
const {addAmountToCart, getAmountFromCart} = require("../cart");

const privateRouter = express.Router()

privateRouter.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('login')
    }
})

privateRouter.get('/', (req, res) => {
    res.render('home', { name: req.user.username })
})

privateRouter.post('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/login')
})

privateRouter.get('/search', (req, res) => {
    res.render('search', { message: '<b>test</b>' })
})

// TODO add_to_cart を作る。で、ハッシュマップか何かに追加して、遷移後のページで結果を表示する
privateRouter.post('/add_to_cart', (req, res) => {
    const username = req.user.username
    addAmountToCart(username)
    res.render('cart', { amount: getAmountFromCart(username) })
})

module.exports = privateRouter
