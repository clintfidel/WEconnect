module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Business, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
  };
  return Category;
};
