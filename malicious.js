const express = require('express')

const app = express()
const port = 3334

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    console.log(`${req.query.user} 参戦！！ パスワード: ${req.query.pass}`)
    res.send('OK')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
