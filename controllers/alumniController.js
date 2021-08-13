const db = require("../models");
const Users = db.alumniUsers;
let retVals={};
const checkCredentials = async (req, res, thisUser) => {
  const data = await Users.findOne({
    where: {
      email: req.body.emailid,
      pass: req.body.password,
    },
  }).then(data=>{
    retVals=data.get({plain: true});
  });
  //console.log(data.dataValues.user_id);
  if (retVals) {
    thisUser.alumniLogged = true;
    res.redirect("/alumni-dash");
  } else {
    res.redirect("/alumni-login");
  }
  // Promise.all(data).then(datagot=>{
  //   retVals=datagot;
  // }).catch(function(){
  //   console.log("The promise was not handled.");
  // })
  // console.log(data.dataValues.user_id)
  // retVals=JSON.parse(JSON.stringify(data));
  console.log("retVals here: ");
  console.log(retVals);
  return retVals.user_id;
};

module.exports = {
  checkCredentials,
};
