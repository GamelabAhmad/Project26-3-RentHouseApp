const db = require('../Database/database');
const { DataTypes } = require('sequelize');
const { Rumah } = require('./rumahModel');
const { User } = require('./userModel');

const Transaksi = db.define(
  'tbl_transaksi',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_rumah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_uang_dibayarkan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted'),
      defaultValue: 'pending',
      allowNull: false,
    },
    dibayarkan_oleh: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Transaksi.belongsTo(Rumah, { as: 'rumah', foreignKey: 'id_rumah' });
Transaksi.belongsTo(User, { as: 'pembayar', foreignKey: 'id_user' });

module.exports = Transaksi;
