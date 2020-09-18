'use strict';
module.exports = (sequelize, DataTypes) => {
  const spp = sequelize.define('spp', {
    id_spp: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    tahun_ajaran: DataTypes.STRING,
    nominal: DataTypes.BIGINT,
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
    tableName: 'spp'
  });
  spp.associate = function(models) {
    // associations can be defined here
  };
  return spp;
};