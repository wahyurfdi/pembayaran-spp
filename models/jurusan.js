'use strict';
module.exports = (sequelize, DataTypes) => {
  const jurusan = sequelize.define('jurusan', {
    id_jurusan: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    nama_jurusan: DataTypes.STRING,
    keterangan: DataTypes.TEXT,
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
    tableName: 'jurusan'
  });
  jurusan.associate = function(models) {
    // associations can be defined here
  };
  return jurusan;
};