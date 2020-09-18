'use strict';
module.exports = (sequelize, DataTypes) => {
  const siswa = sequelize.define('siswa', {
    nisn: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    nis: DataTypes.STRING,
    nama: DataTypes.STRING,
    id_kelas: DataTypes.BIGINT,
    alamat: DataTypes.TEXT,
    no_telp: DataTypes.STRING,
    email: DataTypes.STRING,
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
    tableName: 'siswa'
  });
  siswa.associate = function(models) {
    // associations can be defined here
  };
  return siswa;
};