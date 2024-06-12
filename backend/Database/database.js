const { Sequelize } = require("sequelize");

const db = new Sequelize("rent_house", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+07:00",
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field, next) {
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    },
  },
});

module.exports = db;
