const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LessonsAttendant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Lessons.hasMany(LessonsAttendant, { foreignKey: 'lessonId' });

      models.User.hasMany(LessonsAttendant, { foreignKey: 'userId' });
    }
  }
  LessonsAttendant.init({
    lessonId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    attended: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'LessonsAttendant',
  });
  return LessonsAttendant;
};
