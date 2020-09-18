'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pembayaran', {
      id_pembayaran: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      id_petugas: {
        type: Sequelize.BIGINT
      },
      id_spp: {
        type: Sequelize.BIGINT
      },
      nisn: {
        type: Sequelize.STRING
      },
      tgl_bayar: {
        type: Sequelize.DATEONLY
      },
      periode_pembayaran: {
        type: Sequelize.BIGINT
      },
      jumlah_pembayaran: {
        type: Sequelize.BIGINT
      },
      arsip: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pembayaran');
  }
};