const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enrolled extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Enrolled.belongsToMany(models.User, {
        through: 'Cours',
      });
      Enrolled.belongsToMany(models.Cours, {
        through: 'User',
      });
    }
  }
  Enrolled.init({
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Enrolled',
  });
  return Enrolled;
};
