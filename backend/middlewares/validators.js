const { body } = require('express-validator');

exports.signupValidator = [
   body('userName').trim().notEmpty().withMessage('Name is required!'),
   body('email').isEmail().withMessage('Please enter valid email').normalizeEmail(),
   body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
   body('cnfPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
         throw new Error('Both passwords must match!');
      } else return true;
   }),
];
