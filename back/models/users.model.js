const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // models.Courses.belongsToMany(User,
      //   { through: 'Enrolled', foreignKey: 'userId', as: 'EnrolledUsers' });

      models.Roles.hasMany(User, { foreignKey: 'rolId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rolId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    telephone: DataTypes.STRING,
    deleted: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
