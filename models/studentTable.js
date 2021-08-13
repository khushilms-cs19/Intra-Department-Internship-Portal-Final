const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "student",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      pass: DataTypes.STRING,
      usn: DataTypes.STRING,
    },
    {
      timestamps: false,
      
    },
  );

    Users.beforeCreate(async (user) => {
      const salt = await bcrypt.genSalt()
      user.pass = await bcrypt.hash(user.pass, salt);
    })

    Users.prototype.validPassword = async (password) => {
      return await bcrypt.compare(password, this.pass);
    }

  return Users;
};
