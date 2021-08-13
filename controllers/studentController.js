const db = require("../models");
const Users = db.studentUsers;
let retVals={};
const checkCredentials = async (req, res, thisUser) => {
  const data = await Users.findOne({
    where: {
      email: req.body.emailid,
      pass: req.body.password,
      usn: req.body.usn,
    },
  }).then(data=>{
    retVals=data.get({plain: true});
  });
  // console.log(data);
  if (retVals) {
    thisUser.studentLogged = true;
    res.redirect("/student-dash");
  } else {
    res.redirect("/student-login");
  }
  console.log(retVals.user_id);
  return retVals.user_id;
};

module.exports = {
  checkCredentials,
};
