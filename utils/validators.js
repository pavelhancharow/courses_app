const { body } = require('express-validator');
const User = require('../models/user');

exports.registerValidators = [
  body('name').isLength({ min: 2 }).withMessage('Please, specify a name.').trim(),
  body('email').isEmail()
    .withMessage('Please, enter valid email address.')
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });

        if (user) {
          return Promise.reject('This email address is already being used');
        }
      } catch (e) {
        console.log(e);
      }
    }),
  body('password', 'Password must be at least 6 characters long.').isLength({ min: 6, max: 56 }).isAlphanumeric().trim(),
  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password does not match.');
      }
      return true;
    }).trim()
];

exports.loginValidators = [
  body('email').isEmail()
    .withMessage('Please, enter valid email address.')
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });

        if (!user) {
          return Promise.reject('No such a user exists.');
        }
      } catch (e) {
        console.log(e);
      }
    }),
  body('password', 'Password must be at least 6 characters long.').isLength({ min: 6, max: 56 }).isAlphanumeric().trim()
];

exports.courseValidators = [
  body('title').isLength({ min: 3 }).withMessage('Course name must be at least 3 characters long').trim(),
  body('price').isNumeric().withMessage('Enter correct price').trim(),
  body('img', 'Enter correct image URL').isURL().trim()
];