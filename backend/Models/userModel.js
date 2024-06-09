const { DataTypes } = require('sequelize');
const db = require('../Database/database');

const User = db.define(
  'tbl_user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomor_telp: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('pemilik', 'penyewa', 'admin'),
      defaultValue: 'penyewa',
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

const Rekening = db.define('tbl_rekening', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomor_rekening: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama_bank: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(Rekening, { as: 'rekening', foreignKey: 'id_user' });
Rekening.belongsTo(User, { foreignKey: 'id_user' });

module.exports = { User, Rekening };
