const db = require(".")

module.exports=async (sequelize, DataTypes)=>{
    const appliedByTable=await sequelize.define(
        "appliedBy",
        {},
        {
            timestamps: false,
        }
    );
    return appliedByTable;
}