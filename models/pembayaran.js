'use strict';
module.exports = (sequelize, DataTypes) => {
  const pembayaran = sequelize.define('pembayaran', {
    id_pembayaran: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    id_petugas: DataTypes.BIGINT,
    id_spp: DataTypes.BIGINT,
    nisn: DataTypes.STRING,
    tgl_bayar: DataTypes.DATEONLY,
    periode_pembayaran: DataTypes.BIGINT,
    jumlah_pembayaran: DataTypes.BIGINT,
    arsip: DataTypes.BOOLEAN,
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
    tableName: 'pembayaran'
  });

  pembayaran.associate = function(models) {
    pembayaran.hasOne(models.siswaSPP, {foreignKey: 'id_spp'})
    pembayaran.belongsTo(models.petugas, {foreignKey: 'id_petugas', as: 'petugas'})

    pembayaran.afterCreate('hello', async (bayar) => {
      models.siswaSPP.increment({
        sisa_periode: -(bayar.periode_pembayaran)
      }, {
        where: {
          nisn: bayar.nisn,
          id_spp: bayar.id_spp 
        }
      })
    });
  };

  return pembayaran;
};