const db = require('../../models')

const bmsMail = /[a-zA-Z].cs1[6-9]@bmsce.ac.in/

const getUserByEmail = async (email='') => {
  if(email.includes('.cse')){
    const user = await db.adminUsers.findOne({ where: { email } })
    if(user){
      return { ...user.dataValues, type: 'admin' }
    }else{ 
      return null
    }
  }else if(bmsMail.test(email)){
    const user = await db.studentUsers.findOne({ where: { email } })
    if(user){
      return { ...user.dataValues, type: 'student' }
    }else{
      return null
    }
  }else{
    const user = await db.alumniUsers.findOne({ where: { email } })
    if(user){
      return { ...user.dataValues, type: 'alumni'  }
    }else{
      return null
    }
  }
}

module.exports = { getUserByEmail }