const router = require('express').Router()
// Models
const User = require('../models/user')

// Static Pages ================================================================
router.get('/', function(req, res, next) {
    res.render('index')
})

router.get('/member', function(req, res, next) {
    if (req.isAuthenticated() && req.user.isMember()) {
        res.render('member')
    } else {
        res.sendStatus(403) // Forbidden
    }
})

router.get('/author', function(req, res, next) {
    if (req.isAuthenticated() && req.user.isAuthor()) {
        res.render('author')
    } else {
        res.sendStatus(403) // Forbidden
    }
})

module.exports = router;