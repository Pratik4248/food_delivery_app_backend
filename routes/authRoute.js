const express = require('express');

const router = express.Router();

const authController = require('../controller/authController');


// SIGNUP
router.post( '/signup', authController.signup);


// LOGIN
router.post('/login',authController.login);


module.exports = router;
