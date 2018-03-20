module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: {
        args: true,
        message: 'Business title already exist '
      }
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      defaultValue: 0
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    }
  });
  Business.associate = (models) => {
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Business.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    });
    Business.hasMany(models.Review, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE',
      hooks: true,
    });
    // Business.hasMany(models.Rate, {
    //   foreignKey: 'businessId'
    // });
  };
  return Business;
};
