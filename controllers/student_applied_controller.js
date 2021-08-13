const db=require("../models");
const appliedBy=db.appliedBy;
const applyForOffer=async(req,res,studID,offerID)=>{
    console.log(studID);
    console.log(offerID);
    await appliedBy.create({
        offerOfferId: offerID,
        studentUserId: studID,
    }).catch(function(err){
        console.log("Could not add the application of the student");
        console.log(err);
    });
};


const removeApplication=async(req,res,offerID,studID)=>{
    const data= await appliedBy.findOne({
        where:{
            studentUserId: studID,
            offerOfferId: offerID,
        }
    });
    data.destroy().then(function(){
        console.log("The application of the student was removed");
    }).catch(function(){
        console.log("The data could not be removed.");
    })
}
module.exports={
    applyForOffer,
    removeApplication,
}