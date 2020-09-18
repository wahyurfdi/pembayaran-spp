'use strict';
module.exports = (sequelize, DataTypes) => {
  const siswaSPP = sequelize.define('siswaSPP', {
    id_siswaSPP: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    nisn: DataTypes.STRING,
    id_spp: DataTypes.BIGINT,
    sisa_periode: DataTypes.BIGINT,
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
    tableName: 'siswaSPP'
  });
  siswaSPP.associate = function(models) {
    
  };
  return siswaSPP;
};