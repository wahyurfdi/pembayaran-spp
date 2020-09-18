'use strict';
module.exports = (sequelize, DataTypes) => {
  const petugas = sequelize.define('petugas', {
    id_petugas: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    nama_petugas: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    roles: DataTypes.ENUM('admin', 'petugas'),
    active: DataTypes.BOOLEAN,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    tableName: 'petugas',
    freezeTableName: true,
  });
  petugas.associate = function(models) {
    // associations can be defined here
  };
  return petugas;
};