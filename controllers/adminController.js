const db = require("../models");
const Users = db.adminUsers;
const checkCredentials = async (req, res, thisUser) => {
  const data = await Users.findOne({
    where: {
      email: req.body.emailid,
      pass: req.body.password,
    },
  });
  //   console.log(data);
  if (data) {
    thisUser.adminLogged = true;
    res.redirect("/admin-dash");
  } else {
    res.redirect("/admin-login");
  }
};

module.exports = {
  checkCredentials,
};
