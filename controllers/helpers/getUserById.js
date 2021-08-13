const db = require('../../models')

//const bmsMail = /[a-zA-Z].cs1[6-9]@bmsce.ac.in/

const getUserById = async (user_id) => {
  var user = await db.studentUsers.findOne({ where: { user_id } })
  if(user){
    console.log("finding student")
    return { ...user.dataValues, type: 'student' }
  }else{
    user = await db.alumniUsers.findOne({ where: { user_id } })
  }

  if(user){
    console.log("finding alumni")
    return { ...user.dataValues, type: 'alumni' }
  }else{
    user = await db.adminUsers.findOne({ where: { user_id } })
  }

  if(user){
    console.log("finding admin")
    return { ...user.dataValues, type: 'admin' }
  }else{
    return null
  }
}

module.exports = { getUserById }