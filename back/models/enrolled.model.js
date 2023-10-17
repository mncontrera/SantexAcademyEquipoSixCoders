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

      Enrolled.belongsTo(models.User, { foreignKey: 'userId', as: 'UserEnrollments' });
    }
  }
  Enrolled.init({
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Enrolled',
  });
  return Enrolled;
};
