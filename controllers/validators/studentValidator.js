const { body, check, validationResult } = require("express-validator");
const db = require('../../models')


const validateCreds = [
  check("email")
    .normalizeEmail()
    .exists()
    .withMessage("*Missing email")
    .not()
    .isEmpty()
    .withMessage("*email is empty")
    .isEmail()
    .withMessage("*invalid email")
    .custom((value, { req }) => {
      const bmsMail = /[a-zA-Z].cs1[6-9]@bmsce.ac.in/;
      return bmsMail.test(value);
    }).withMessage("*this is not a bms mail ID"),
  check('password')
    .exists()
    .withMessage('*password is missing')
    .not()
    .isEmpty()
    .withMessage('*password is empty'),
  check('usn')
    .exists()
    .withMessage('*USN is missing')
    .not()
    .isEmpty()
    .withMessage('*USN is empty')
    .custom(async (value, { req }) => {
      const USN = /1BM1[6-9][0-9][0-9][0-9]/
      if(USN.test(value)){
        const user = await db.studentUsers.findOne({ where: { email: req.body.email } })
        if(!user){
          return false
        }

        if(user.usn === value){
          return true
        }else{
          return false
        }
      }else{
        return false;
      }
    }).withMessage('USN not valid'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateCreds }
