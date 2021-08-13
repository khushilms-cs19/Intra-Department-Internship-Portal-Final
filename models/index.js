const { Sequelize, DataTypes } = require("sequelize");
//const mysql = require('mysql2')

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'sra12345',
//   database: 'testone'
// })


const sequelize = new Sequelize("testone", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  logging: true
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//To get the Student Table

db.studentUsers = require("../models/studentTable")(sequelize, DataTypes);

//To get the alumni Table
db.alumniUsers = require("../models/alumniTable")(sequelize, DataTypes);

//To get the admin Table
db.adminUsers = require("../models/adminTable")(sequelize, DataTypes);

//To get the updates Table
db.updates = require("../models/updatesTable")(sequelize, DataTypes);

//to get the offer table

db.offers= require("../models/offerTable")(sequelize, DataTypes);  

//To produce connections 

db.offers.belongsTo(db.alumniUsers);

//To get the applied by table
db.appliedBy= sequelize.define("appliedBy",{},{timestamps: false,});

//To produce the connection for the applied by table to the student table and the offers table (many to many connection)
db.offers.belongsToMany(db.studentUsers,{through: db.appliedBy});
db.studentUsers.belongsToMany(db.offers,{through: db.appliedBy});

//To sync the database
db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re sync");
});

module.exports = db;
