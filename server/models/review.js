module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      onDelete: 'CASCADE',
      references: {
        model: 'Business',
        key: 'id',
        as: 'businessId'
      }
    },
    rate: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true
    }
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Review.belongsTo(models.Business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return Review;
};
