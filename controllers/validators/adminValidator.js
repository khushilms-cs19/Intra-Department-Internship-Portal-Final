const { body, check, validationResult } = require("express-validator");
const db = require('../../models')


const validateCreds = [
  check("email")
    .normalizeEmail()
    .exists()
    .withMessage("Missing email")
    .not()
    .isEmpty()
    .withMessage("email is empty")
    .isEmail()
    .withMessage("invalid email")
    .custom((value, { req }) => {
      const bmsMail = /[a-zA-Z].cse@bmsce.ac.in/;
      return bmsMail.test(value);
    }).withMessage("this is not a bms faculty mail ID"),
  check('password')
    .exists()
    .withMessage('password is missing')
    .not()
    .isEmpty()
    .withMessage('password is empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateCreds }
