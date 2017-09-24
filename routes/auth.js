const router = require('express').Router()
const passport = require('passport');

//  Signup ====================================================================
router.get('/signup', function(req, res) {
	res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
	failureRedirect : '/auth/signup',
	failureFlash : false // allow flash messages
}), function(req, res, next)  {
	res.redirect('/')
});

// Login ====================================================================
router.get('/login', function(req, res, next)  {
	if (req.user) {
		res.redirect('/')
	} else {
		res.render('login')
	}
})

router.post('/login', passport.authenticate('local-login', {
	failureRedirect : '/auth/login',
	failureFlash : false // allow flash messages
}), function(req, res, next)  {
	res.redirect('/')
});


// LOGOUT ==============================
router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});




module.exports = router;