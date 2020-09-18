'use strict';

module.exports = (sequelize, DataTypes) => {
  const kelas = sequelize.define('kelas', {
    id_kelas: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    kelas: DataTypes.STRING,
    id_jurusan: DataTypes.BIGINT,
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
    tableName: 'kelas'
  });
  kelas.associate = function(models) {
    kelas.belongsTo(models.jurusan, {foreignKey: 'id_jurusan'})
  };
  return kelas;
};