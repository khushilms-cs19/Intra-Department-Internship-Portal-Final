const db = require("../models");
const updates = db.updates;

//the object to send the variables to the ejs file
const variablesList = {};

const bringUpdates = async (req, res) => {
  const data = await updates.findAll({});
  const updatelist = [];
  for (let i = 0; i < data.length; i++) {
    updatelist.push(data[i].dataValues.content);
  }
  variablesList.updatesList = updatelist;
  //console.log(updatelist);
  res.render("updates", variablesList);
};

const addUpdate = async (req,res)=>{
  const allUpdates= await updates.findAll({});
  let newUpdateId=1;
  if(allUpdates.length==0){
    newUpdateId=1;
  }else{
    newUpdateId=allUpdates[allUpdates.length-1].dataValues.update_id;
    newUpdateId+=1;
    console.log("The new update id is: "+newUpdateId);
  }
  await updates.create({
    update_id: newUpdateId,
    title: req.body.UpdateName,
    content: req.body.UpdateDescription,
  }).catch(function(err){
    if(err){
      console.log("the update could not be added");
    }
  })
}


module.exports = {
  bringUpdates,
  addUpdate
};
