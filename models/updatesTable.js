module.exports = (sequelize, DataTypes) => {
  const updates = sequelize.define(
    "update",
    {
      update_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING(1000),
    },
    {
      timestamps: true,
    }
  );
  return updates;
};
