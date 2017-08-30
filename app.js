const express = require('express')
const app = express()
const path = require('path')

const port = 8080

app.get('/', function(req, res) {
    // res.send("<h1>Hello World</h1>")
    let pathname = path.join(__dirname, '/pages/index.html')
    res.sendFile(pathname)
})

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, '/pages/about.html'))
})

// sending data with GET
// params
// query
app.get('/products/:id', function(req, res) {
    let id = req.params.id
    let key = req.query.key
    let age = req.query.age
    res.send(`Your ID is ${id}, and your key is ${key}, and your age is ${age}`)
})

app.listen(port, function() {
    console.log(`Listening on port ${port}`)
})