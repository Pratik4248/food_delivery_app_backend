const User = require('../model/userModel');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');


// SIGNUP
exports.signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      phone,
      address
    } = req.body;


    // CHECK USER EXISTS
    const existingUser = await User.findOne({ email });

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

      message: 'Signup Successful',

      user

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};



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
