'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('petugas', [{
      nama_petugas: 'Super Admin',
      username: 'admin',
      password: 'sha1$e34b7e3b$1$7a28c3c8aab6cdf78342b6aa9dbe6d595f0f9717',
      roles: 'admin',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('petugas', null, {});
  }
};
