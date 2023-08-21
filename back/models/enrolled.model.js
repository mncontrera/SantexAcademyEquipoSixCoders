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
      // define association here

      // models.User.hasMany(Enrolled, {
      //   foreignkey: 'userId',
      // });
      // models.Enrolled.hasMany(User, {
      //   foreignKey: 'userId',
      // });
      models.Cours.hasMany(Enrolled, {
        foreignKey: 'courseId',
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
