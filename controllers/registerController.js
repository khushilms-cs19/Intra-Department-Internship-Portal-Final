const db = require("../models");

const GetUserID = async (type) => {
  if(type ==='student'){
    const users = await db.studentUsers.findAll({})
    console.log(users)
    if(users.length === 0){
      return 1;
    }
    const userID = users[users.length-1].dataValues.user_id
    console.log(userID)
    return userID + 1;
  }else if(type === 'alumni'){
    const users = await db.alumniUsers.findAll({})
    if(users.length === 0){
      return 1;
    }
    const userID = users[users.length-1].dataValues.user_id
    console.log(userID)
    return userID + 1;
  }else if(type === 'admin'){
    const users = await db.adminUsers.findAll({})
    if(users.length === 0){
      return 1;
    }
    const userID = users[users.length-1].dataValues.user_id
    console.log(userID)
    return userID + 1;
  }
}


const register = async (req, res) => {
  const { type } = req.body

  console.log(req.body)
  console.log(req.file, req.files)

  if(type === 'student'){
    const user = await db.studentUsers.create({
      user_id: await GetUserID('student'),
      email: req.body.email,
      pass: req.body.password,
      usn: req.body.usn
    })
    console.log(user)
    return res.json({redirect: '/student-login', status: 'success'})
  }else if(type === 'alumni'){
    const user = await db.alumniUsers.create({
      user_id: await GetUserID('alumni'),
      email: req.body.email,
      pass: req.body.password,
    })
    console.log(user)
    return res.json({redirect: '/alumni-login', status: 'success'})
  }else if(type === 'admin'){
    const user = await db.adminUsers.create({
      user_id: await GetUserID('admin'),
      email: req.body.email,
      pass: req.body.password,
    })
    console.log(user)
    return res.json({redirect: '/admin-login', status: 'success'})
  }else{
    return res.status(422).json({ error: 'type of user not selected', status: 'failure' })
  }
}

module.exports = { register }