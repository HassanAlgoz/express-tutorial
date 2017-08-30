const express = require('express')
const app = express()
const path = require('path')
// require middlewares
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = 8080

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(function(req, res, next) {
//     console.log(`${req.method} ${req.url} ${res.statusCode}`)
//     next()
// })
// Serve Static Files from /public
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.render('index')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.post('/contact', (req, res) => {
    // let email = req.body.email
    // let subject = req.body.subject
    // let message = req.body.message
    let {email, subject, message} = req.body
    let data = {
        'from': email,
        'subject': subject,
        'message': message
    }
    res.render('contact-success', {data})
})


app.listen(port, function() {
    console.log(`listening on port ${port}...`)
})
