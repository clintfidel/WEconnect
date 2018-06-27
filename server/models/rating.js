module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rate: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  Rating.associate = (models) => {
    Rating.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Rating.belongsTo(models.Business, {
      foreignKey: 'businessId',
    });
  };
  return Rating;
};

