const db= require("../models");



const multer = require("multer");

let Storage = multer.diskStorage({
    destination: "./public/uploads/companies/",
    filename: function(req,file, callback){
      console.log(req.user);
      callback(null, req.user.company+".jpg");
    }
  });
  
let upload = multer({
storage: Storage
}).single("imgUploader");




const offers=db.offers;
//const offersAppliedBy=db.appliedBy;
let variablesToStudDash={};
variablesToStudDash.offersList={};
let variablesToAlumniDash={};
const getOffers= async (req,res,studID)=>{
    const data = await offers.findAll({});
    // let appliedTo={};
    // const studentAppliedTo= await db.appliedBy.findAll({
    //     where: {
    //         studentUserId: studID,
    //     },
    // }).then(studentAppliedTo=>{
    //     appliedTo=studentAppliedTo.get({plain: true});
    // }).catch(function(err){
    //     console.log("There was some error with the DB : "+err)
    // });
    // console.log(appliedTo);
    const studentApplied=await getAppliedBy(studID);
    console.log(studentApplied);
    variablesToStudDash.studentLoggedIn=studID;
    variablesToStudDash.offersList.offerIds=[];
    variablesToStudDash.offersList.names=[];
    variablesToStudDash.offersList.fields=[];
    variablesToStudDash.offersList.stipends=[];
    variablesToStudDash.offersList.mincgpa=[];
    variablesToStudDash.offersList.locations=[];
    variablesToStudDash.offersList.whours=[];
    variablesToStudDash.offersList.appliedOfferIds=[];
    variablesToStudDash.distinctFields=[];
    variablesToStudDash.distinctLocations=[];
    variablesToStudDash.distinctWhours=[];
    variablesToStudDash.distinctStipends=[];
    variablesToStudDash.distinctCgpa=[];
    for(let i=0;i<data.length;i++){
        variablesToStudDash.offersList.offerIds.push(data[i].dataValues.offer_id);
        variablesToStudDash.offersList.names.push(data[i].dataValues.name);
        variablesToStudDash.offersList.fields.push(data[i].dataValues.field);
        variablesToStudDash.offersList.stipends.push(data[i].dataValues.stipend);
        variablesToStudDash.offersList.mincgpa.push(data[i].dataValues.cgpa);
        variablesToStudDash.offersList.locations.push(data[i].dataValues.location);
        variablesToStudDash.offersList.whours.push(data[i].dataValues.working_hours);
    }
    for(let i=0;i<studentApplied.length;i++){
        variablesToStudDash.offersList.appliedOfferIds.push(studentApplied[i].dataValues.offerOfferId);
    }
    console.log(variablesToStudDash.offersList.appliedOfferIds)
    variablesToStudDash.distinctFields=[... new Set(variablesToStudDash.offersList.fields)];
    variablesToStudDash.distinctStipends=[... new Set(variablesToStudDash.offersList.stipends)];
    variablesToStudDash.distinctLocations=[... new Set(variablesToStudDash.offersList.locations)];
    variablesToStudDash.distinctWhours=[... new Set(variablesToStudDash.offersList.whours)];
    variablesToStudDash.distinctCgpa=[... new Set(variablesToStudDash.offersList.mincgpa)];
    variablesToStudDash.userEmail=req.user.email;
    variablesToStudDash.userUsn=req.user.usn;
    await res.render("bottomStudentDash",variablesToStudDash);
}

const getAppliedBy=async function(studID){
    const data=await db.appliedBy.findAll({
        where: {
            studentUserId: studID,
        }
    });
    console.log(data);
    return data;
}


const addOffers=async (req,res,alumniid)=>{
    console.log('File', req.file)
    const alloffers=await offers.findAll({}).catch(function(){
        console.log("could not find any");
    });
    let newOffersId=1;
    if(alloffers.length==0){
        newOffersId=1;
    }else{
        console.log("Else statement executed in the add Offers");
        newOffersId=alloffers[alloffers.length-1].dataValues.offer_id;
        newOffersId+=1;
        console.log("the new id is: "+newOffersId);
    }
    console.log("executed add offer");
    // console.log(newOffersId);
    // console.log(req.body.company);
    // console.log(req.body.field);
    // console.log(req.body.stipend);
    // console.log(req.body.mincgpa);
    // console.log(req.body.location);
    // console.log(req.body.work_hours);
    const alumid=alumniid;
    console.log(alumid);
    req.user.company=req.body.company;
    
    await offers.create({
        offer_id: newOffersId,
        name: req.body.company,
        field: req.body.field,
        stipend: req.body.stipend,
        cgpa: req.body.mincgpa,
        location: req.body.location,
        working_hours: req.body.work_hours,
        alumniUserId:  alumid
    }).catch(function(){
        console.log("could not add tuple");
    });
    upload(req,res, function(err){
        if(err){
          console.log(err);
        }
    });
    res.redirect(req.get('referer'));
    console.log("after the page has reloaded in the alumni dash");
}

const getOffersByAlumni=async (req,res,alumniid)=>{
    console.log('gettingoffers')
    const alloffers=await offers.findAll({
        where: {
            alumniUserId: alumniid,
        }
    }).catch(function(){
        console.log("could not find any");
    });
    variablesToAlumniDash.previousOffers=[];
    variablesToAlumniDash.userEmail=req.user.email;
    for(let i=0;i<alloffers.length;i++){
        variablesToAlumniDash.previousOffers.push(alloffers[i].dataValues.field+" at "+alloffers[i].dataValues.name);
    }
    res.render("alumniDash.ejs",variablesToAlumniDash);

}



module.exports={
    getOffers,
    addOffers,
    getOffersByAlumni,
}