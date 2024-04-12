const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, TOKEN_EXP_HOURS } = require('../utils/config');
const { genError, handleValidation } = require('../utils/helper');

exports.signup = async (req, res, next) => {
   try {
      const { userName, email, password } = req.body;
      const errors = validationResult(req);

      // error handling
      if (!errors.isEmpty()) {
         handleValidation(errors);
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
         genError(409, 'Email already exists!');
      }

      const hashedPwd = await bcrypt.hash(password, 12);
      const user = new User({ name: userName, email, password: hashedPwd });
      const createdUser = await user.save();
      res.status(201).json({
         status: 1,
         message: 'Signup successful!',
         data: {
            userId: createdUser._id,
         },
      });
   } catch (error) {
      next(error);
   }
};

exports.login = async (req, res, next) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
         genError(401, 'Email is incorrect!');
      }

      const isPwdCorrect = await bcrypt.compare(password, user.password);

      if (!isPwdCorrect) {
         genError(401, 'Password is incorrect!');
      }

      const token = jwt.sign(
         {
            email: user.email,
            userId: user._id.toString(),
            name: user.name,
         },
         JWT_SECRET,
         { expiresIn: `${TOKEN_EXP_HOURS}h` }
      );

      const expirationTime = Date.now() + (TOKEN_EXP_HOURS * 60 * 60 * 1000);

      res.status(200).json({
         data: { token, userId: user._id.toString(), expirationTime, name: user.name },
         status: 1,
         message: 'Login successfull!',
      });
   } catch (error) {
      next(error);
   }
};
