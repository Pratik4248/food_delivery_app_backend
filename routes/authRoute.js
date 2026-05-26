const express = require('express');

const router = express.Router();

const authController = require('../controller/authController');


// SIGNUP
// router.post( '/signup', authController.signup);


// LOGIN
router.post('/login',authController.login);

//Otp
router.post( '/send-otp',authController.sendOtp);

router.post('/verify-otp',authController.verifyOtp);


module.exports = router;
