const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const Otp = require('../model/otpModel');
const transporter = require('../config/email_config');


// LOGIN
exports.login = async (req, res) => {

  try {
    const { email, password } = req.body;

    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'User not found'
      });
    }


    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid password'
      });
    }


    // CREATE TOKEN
    const token = jwt.sign(

      {
        id: user._id
      },

      'secretkey',

      {
        expiresIn: '28d'
      }
    );


    res.status(200).json({

      message: 'Login Successful',
      token,
      user

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// Send otp 

exports.sendOtp = async(req,res)=>{
  try{
    const {email} = req.body;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        message: 'Email credentials are missing. Add EMAIL_USER and EMAIL_PASS to your .env file.'
      });
    }

    // generate otp
    const otp = otpGenerator.generate(6,{
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    })

    // save otp to db
    await Otp.create({email,otp});

    // send otp to email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`
    });

    res.status(200).json({
      message: 'OTP sent Successfully'
    });
  }

  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// verify otp
exports.verifyOtp = async (req, res) => {

  try {
    const {
      email,
      otp,
      name,
      password,
      phone,
      address
    } = req.body;


    // FIND OTP
    const otpExists = await Otp.findOne({
      email,
      otp
    });

    if (!otpExists) {
      return res.status(400).json({
        message: 'Invalid OTP'
      });
    }

      // DELETE OLD OTPs
    await Otp.deleteMany({ email });


    // CHECK USER EXISTS
    const existingUser =
    await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }


    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);


    // CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address
    });


    res.status(201).json({
      message: 'Email Verified & Signup Successful',
      user
    });

    
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
