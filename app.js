// importing dependencies

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const methodOverride = require("method-override");
const authRoutes = require('./routes/authRoutes')
const multer = require("multer");
const initializePassport = require('./passport-config');
initializePassport(passport);


// adding middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


// middlewares for session auth and passport login
app.use(session({
  secret: 'proj4thsem',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// using authroutes from another file
app.use(authRoutes)
app.use(methodOverride("_method"));
//

//

//

//requiring all the controllers(controll operations on the table) from the models
require("./models");
const studentCheck = require("./controllers/studentController");
const alumniCheck = require("./controllers/alumniController");
const adminCheck = require("./controllers/adminController");
const updatesList = require("./controllers/updateslistController");
const offersData= require("./controllers/offersController");
const appliedBy=require("./controllers/student_applied_controller");
const offerTable = require("./models/offerTable");
const dataForAdminDash=require("./controllers/adminDashData");
// const appliedByTable= require(".")
//

//

//The variables to be sent to the updates.ejs
/*
const updatesArr = [
  "The Placement Training for the 2nd Year Students have started.",
  "Google hired 2 students from CSE branch after 10 rounds of interview.",
  "During Atlassian recruitment in campus, a student secured a package of 40LPA.",
  "Amazon coming to B.M.S.C.E SOON!!",
];
*/




//

//This checks if the user has logged into any of the dashboards
// const thisUser = {};
// thisUser.studentLogged = false;
// thisUser.adminLogged = false;
// thisUser.alumniLogged = false;

//

app.get('/', (req,res) => {
  res.redirect('/home')
})


//For the opening page
app.get("/home", function (request, response) {
  /*
  response.sendFile(__dirname + "/HTML/openingpage.html");
  */
  //to get the updates list from the updateTable
  updatesList.bringUpdates(request, response);
  //to store the list of updates into object to send it to ejs file
  //response.render("updates", variablesList);
});

//

//
app.get("/register", function (request, response) {
  response.sendFile(__dirname + "/HTML/register.html");
});

//

//for the login select page
app.get("/login-select", function (request, response) {
  response.sendFile(__dirname + "/HTML/loginSelect.html");
});

//

//for the admin login
app.get("/admin-login",function (request, response) {
  response.sendFile(__dirname + "/HTML/adminlogin.html");
});

// app.post("/admin-login", function (request, response) {
//   adminCheck.checkCredentials(request, response, thisUser);
// });

//

//for the alumni login
app.get("/alumni-login", function (request, response) {
  response.sendFile(__dirname + "/HTML/alumnilogin.html");
});

// app.post("/alumni-login", function (request, response) {
//   alumniCheck.checkCredentials(request, response, thisUser);
// });

//

//for the student login
app.get("/student-login", function (request, response) {
  response.render("studentLogin");
  // response.sendFile(__dirname + "/HTML/studentlogin.html")
});

// app.post("/student-login", function (request, response) {
//   studentCheck.checkCredentials(request, response, thisUser);
// });

//User must be authenticated to enter dashboard otherwise he must be pushed to login

const { authAdmins, authStudent, authAlumni} = require('./controllers/helpers/checkAuth')
const { getStipends } = require('./controllers/helpers/getDistinctStipends')
const { getFieldOfWork } = require('./controllers/helpers/getFieldsOfWork')
const upload = require('./controllers/helpers/storage')

// routes that frontend will access to get data for charts in admin dash

app.get('/stipenddata', async (req,res) => {
  const data = await getStipends();
  res.json(data);
})

app.get('/fielddata', async (req,res) => {
  const data = await getFieldOfWork();
  res.json(data);
})


//for the admin dash board
app.get("/admin-dash", authAdmins,async function (request, response) {
  // response.sendFile(__dirname + "/HTML/admindash.html");
  const variablesToAdminDash={}
  variablesToAdminDash.userEmail=request.user.email;
  response.render("adminDash",variablesToAdminDash);
});

//

// for the alumni dash board
app.get("/alumni-dash", authAlumni,function (request, response) {
  // response.render('alumniDash')
  offersData.getOffersByAlumni(request, response, request.user.user_id)
});

app.post("/alumni-dash", upload.single('pic'),function(request,response){
  offersData.addOffers(request, response, request.user.user_id);
});
//

//for the student dash board
app.get("/student-dash", authStudent,function (request, response) {
  offersData.getOffers(request, response, request.user.user_id)
});
app.post("/student-dash",async function(request,response){
  console.log(request.body);
  if(request.body.submit.includes("cancel")){
    const offerID=request.body.submit.slice(7);
    await appliedBy.removeApplication(request,response,offerID,request.user.user_id); 
    //await offersData.getOffers(request,response,request.user.user_id);
    response.redirect(request.get('referer'));
  }
  else if(request.body.submit=="logout"){
    response.sendFile(__dirname+"/HTML/studentlogin.html");
  }else{
    console.log(request.body.submit);
    await appliedBy.applyForOffer(request,response,request.user.user_id,request.body.submit);
    // await offersData.getOffers(request,response,request.user.user_id);
    response.redirect(request.get('referer'));
  }
});
//



//for the about page
app.get("/about", function (request, response) {
  response.sendFile(__dirname + "/HTML/about-page.html");
});

//to log out the person logged in
app.delete('/logout',(req,res)=>{
  req.logOut()
  res.redirect("/login-select");
})



//to add the update from the admin login 
app.post("/post-update",function(request,response){
  updatesList.addUpdate(request,response);
  const variablesToAdminDash={}
  variablesToAdminDash.userEmail=request.user.email;
  response.render("adminDash",variablesToAdminDash);
})




//for the server to listen at the port 3000
app.listen(3000, function () {
  console.log("The server is running at the port 3000");
});
