const db =require("../models");
const offers =db.offers;
let variablesToAdminDash={};
const preProcessOfferData = async (req,res)=>{
    const data= await offers.findAll({});
    fieldsList=[];
    stipendsList=[];
    mincgpaList=[];
    for(let i=0;i<data.length;i++){
        fieldsList.push(data[i].dataValues.field);
        stipendsList.push(data[i].dataValues.stipend);
        mincgpaList.push(data[i].dataValues.cgpa);
    }
    distinctFields=[...new Set(fieldsList)];
    distinctStipends=[...new Set(stipendsList)];
    distinctCgpa=[...new Set(mincgpaList)];
    variablesToAdminDash.FieldOfWork=[]
    variablesToAdminDash.FieldOfWork.push(["Job Type","Field Of Work"]);
    variablesToAdminDash.StipendData=[]
    variablesToAdminDash.StipendData.push(["Stipend(Rs.)","Job"]);
    variablesToAdminDash.CgpaData=[];
    variablesToAdminDash.CgpaData.push(["Min Cpga", "Offers"]);
    let count=0;
    for(let i=0;i<distinctFields.length;i++){
        count=0;
        for(let j=0;j<fieldsList.length;j++){
            if(fieldsList[j]==distinctFields[i]){
                count++;
            }
        }
        variablesToAdminDash.FieldOfWork.push([distinctFields[i],count]);
    }
    for(let i=0;i<distinctStipends.length;i++){
        count=0;
        for(let j=0;j<stipendsList.length;j++){
            if(stipendsList[j]==distinctStipends[i]){
                count++;
            }
        }
        variablesToAdminDash.StipendData.push([distinctStipends[i],count]);
    }
    for(let i=0;i<distinctCgpa.length;i++){
        count=0;
        for(let j=0;j<mincgpaList.length;j++){
            if(mincgpaList[j]==distinctCgpa[i]){
                count++;
            }
        }
        variablesToAdminDash.CgpaData.push([distinctCgpa[i],count]);
    }
    // console.log(variablesToAdminDash.FieldOfWork);
    // console.log(variablesToAdminDash.CgpaData);
    // console.log(variablesToAdminDash.StipendData);
    res.render("adminDash",variablesToAdminDash);
}

module.exports={
    preProcessOfferData,
};