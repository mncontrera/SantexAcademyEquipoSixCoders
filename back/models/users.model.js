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
      // User.belongsTo(models.Roles);
      // User.hasMany(models.Enrolled, {
      //   foreignKey: 'userId',
      // });

      models.Roles.hasMany(User, {
        foreignKey: 'rolId',
      });

      // models.Courses.belongsTo(User, {
      //   foreignKey: 'userId',
      // });
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
