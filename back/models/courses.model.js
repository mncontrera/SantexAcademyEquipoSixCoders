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
      models.Lessons.belongsTo(Courses, { foreignKey: 'courseId' });

      models.Enrolled.belongsTo(Courses, { foreignKey: 'courseId', as: 'CourseEnrollments' });
    }
  }
  Courses.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    lessons: DataTypes.INTEGER,
    deleted: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Courses',
  });
  return Courses;
};
