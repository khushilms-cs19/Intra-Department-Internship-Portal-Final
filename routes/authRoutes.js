const express = require('express')
const passport = require('passport')
const router = express.Router()

const { register } = require('../controllers/registerController')
const upload = require('../controllers/helpers/storage')

const studentValidator = require('../controllers/validators/studentValidator')
const alumniValidator = require('../controllers/validators/alumniValidator')
const adminValidator = require('../controllers/validators/adminValidator')

function logBody(req, res, next){
  console.log(" body => ", req.body)
  next()
}

// route for a user to register
router.post('/register', upload.single('profilepic'), register);

//


//route where the user credentials are sent to for authentication of a student 
// router.post('/student-login', logBody, studentValidator.validateCreds, (req,res,next) => {
//   passport.authenticate('local', {
//     failureRedirect: '/student-login',
//     failureFlash: true, 
//   })(req, res, function(returnCode){
//     console.log("login-success")
//     res.json({ redirect: '/student-dash', status: 'success' })
//   })
// })

router.post('/student-login', logBody, studentValidator.validateCreds, (req,res,next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('err', err)
    console.log('user', user)
    if(err) { return next(err) }
    if(!user){
      console.log(info)
      req.flash('error', info.message)
      // return res.redirect('/student-login')
      return res.json({ errors: [{ msg: info.message }] })
    }
    req.logIn(user, (err) => {
      if(err) {return next(err) }
      console.log('login-success') 
      return res.json({ redirect: '/student-dash', status: 'success' })
    })

  })(req,res,next)
})


//

//

router.post('/alumni-login', logBody, alumniValidator.validateCreds, (req,res,next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('err', err)
    console.log('user', user)
    if(err) { return next(err) }
    if(!user){
      console.log(info)
      req.flash('error', info.message)
      // return res.redirect('/student-login')
      return res.json({ errors: [{ msg: info.message }] })
    }
    req.logIn(user, (err) => {
      if(err) {return next(err) }
      console.log('login-success') 
      return res.json({ redirect: '/alumni-dash', status: 'success' })
    })

  })(req,res,next)
})

router.post('/admin-login', logBody, adminValidator.validateCreds, (req,res,next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('err', err)
    console.log('user', user)
    if(err) { return next(err) }
    if(!user){
      console.log(info)
      req.flash('error', info.message)
      // return res.redirect('/student-login')
      return res.json({ errors: [{ msg: info.message }] })
    }
    req.logIn(user, (err) => {
      if(err) {return next(err) }
      console.log('login-success') 
      return res.json({ redirect: '/admin-dash', status: 'success' })
    })

  })(req,res,next)
})




module.exports = router