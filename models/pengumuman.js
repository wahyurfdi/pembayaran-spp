'use strict';
module.exports = (sequelize, DataTypes) => {
  const pengumuman = sequelize.define('pengumuman', {
    id_pengumuman: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    id_petugas: DataTypes.BIGINT,
    judul: DataTypes.STRING,
    isi: DataTypes.TEXT,
    id_file: DataTypes.BIGINT,
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
    tableName: 'pengumuman'
  });
  pengumuman.associate = function(models) {
    // associations can be defined here
  };
  return pengumuman;
};