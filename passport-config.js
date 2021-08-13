const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const { getUserByEmail } = require('./controllers/helpers/getUserByEmail')
const { getUserById } = require('./controllers/helpers/getUserById')

const isValidPassword = (enteredPassword, userPassword) => {
  return new Promise(resolve => {
    bcrypt.compare(enteredPassword, userPassword, (err, res) => {
      console.log("res", res)
      resolve(res)
    })
  })
}


function initialize(passport){

  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email) // { email ,pass }
    if (!user){
      console.log('invalid email')
      return done(null, null, { message: '*invalid email' })
    }

    try{
      if(await isValidPassword(password, user.pass)){
        return done(null, user)
      }else{
        console.log('pass not match')
        return done(null, null, { message: '*password incorrect' })
      }
    }catch(e){
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => {
    console.log(user)
    return done(null, user)
  })
  passport.deserializeUser(async (user, done) => {
    var decryptedUser = await getUserByEmail(user.email)
    done(null, decryptedUser)
  })

}

module.exports = initialize