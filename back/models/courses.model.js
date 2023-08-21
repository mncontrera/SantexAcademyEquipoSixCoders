const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // nuevo
      models.Enrolled.belongsTo(Courses, {
        foreignKey: 'courseId',
      });
    }
  }
  Courses.init({
    title: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Cours',
  });
  return Courses;
};
