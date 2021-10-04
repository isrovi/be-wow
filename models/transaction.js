'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Users, {
        foreignKey: {
          name: "idUser"
        }
      })
    }
  };
  Transaction.init({
    idUser: DataTypes.INTEGER,
    transferProof: DataTypes.STRING,
    remainingActive: DataTypes.INTEGER,
    userStatus: DataTypes.STRING,
    paymentStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};