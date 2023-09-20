const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.LessonsAttendant.belongsTo(Lessons, { foreignKey: 'lessonId' });

      models.Courses.hasMany(Lessons, { foreignKey: 'courseId' });
    }
  }
  Lessons.init({
    lessonTitle: DataTypes.STRING,
    description: DataTypes.STRING,
    lessonDateTime: DataTypes.STRING,
    courseId: DataTypes.INTEGER,
    deleted: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Lessons',
  });
  return Lessons;
};
