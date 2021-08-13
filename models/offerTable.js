module.exports=(sequelize, DataTypes)=>{
    const offersList = sequelize.define(
        "offer",
        {
            offer_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            field: DataTypes.STRING,
            stipend: DataTypes.INTEGER,
            cgpa: {
                type: DataTypes.FLOAT,
                max: 10,
                min: 0,
            },
            location: DataTypes.STRING,
            working_hours: {
                type: DataTypes.INTEGER,
                max: 168,
                min: 0,
            }
        },{
            timestamps: true,
        }
    );
    
    return offersList;
}