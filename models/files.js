'use strict';
module.exports = (sequelize, DataTypes) => {
  const files = sequelize.define('files', {
    id_file: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    original_name: DataTypes.STRING,
    file_name: DataTypes.STRING,
    mime_type: DataTypes.STRING,
    destination: DataTypes.STRING,
    path: DataTypes.STRING,
    size: DataTypes.BIGINT,
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
    tableName: 'files'
  });
  files.associate = function(models) {
    // associations can be defined here
  };
  return files;
};