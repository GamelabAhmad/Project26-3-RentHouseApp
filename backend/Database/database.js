const { Sequelize } = require('sequelize');

const db = new Sequelize('4WedGbSF4zKSpri5', 'rVdcLCqawtrnkFyB', 'LERKlH5JNVBCI4YH', {
  host: '	educalab.id',
  port: 3307,
  dialect: 'mysql',
  timezone: '+07:00',
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field, next) {
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
  },
});

module.exports = db;
