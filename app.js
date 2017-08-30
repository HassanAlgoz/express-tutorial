const express = require('express')
const app = express()
const path = require('path')

const port = 8080

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve Static Files from /public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/people/:id', (req, res) => {
    // Database operation to get data...
    let data = {
        id: req.params.id,
        name: "Ahmad Badr",
        age: 19,
        friends: ["Saif", "Hisham", "Yusuf"]
    }
    res.render('person', data)
})

app.listen(port, function() {
    console.log(`listening on port ${port}...`)
})
