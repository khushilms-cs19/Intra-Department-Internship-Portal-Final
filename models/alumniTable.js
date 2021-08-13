const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "alumni",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      pass: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  Users.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt()
    console.log(user.pass);
    user.pass = await bcrypt.hash(user.pass, salt);
  })

  Users.prototype.validPassword = async (password) => {
    console.log("given password: ", password)
    console.log("user password: ", this.pass)
    return await bcrypt.compare(password, this.pass);
  }  


  return Users;
};
