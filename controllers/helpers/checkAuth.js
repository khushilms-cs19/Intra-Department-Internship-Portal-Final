async function authStudent(req, res, next){
  console.log("req.user")
  if(req.isAuthenticated() && req.user.type === 'student'){
    return next() 
  }

  res.redirect('/student-login')
}

function authAlumni(req, res, next){
  if(req.isAuthenticated() && req.user.type === 'alumni'){
    return next()
  }

  res.redirect('/alumni-login')
}

function authAdmins(req, res, next){
  if(req.isAuthenticated() && req.user.type === 'admin'){
    return next()
  }

  res.redirect('/admin-login')
}

module.exports = {
  authAdmins,
  authAlumni,
  authStudent
}