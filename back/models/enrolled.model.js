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
      models.Courses.belongsToMany(models.User, { through: 'Enrolled', foreignKey: 'courseId' });

      Enrolled.belongsTo(models.User, { foreignKey: 'userId' });
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
