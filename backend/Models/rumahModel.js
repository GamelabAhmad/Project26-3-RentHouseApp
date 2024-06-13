const db = require('../Database/database');
const { DataTypes } = require('sequelize');
const { User } = require('./userModel');

const Rumah = db.define(
  'tbl_rumah',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_rumah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    kota: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kecamatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const detailRumah = db.define(
  'tbl_detail_rumah',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    harga_sewa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_kamar_tidur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_kamar_mandi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fasilitas: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    peraturan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    public_id: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    id_rumah: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.hasMany(Rumah, { as: 'rumah', foreignKey: 'id_user' });
Rumah.belongsTo(User, { foreignKey: 'id_user' });
Rumah.hasOne(detailRumah, { as: 'detail', foreignKey: 'id_rumah' });
detailRumah.belongsTo(Rumah, { foreignKey: 'id_rumah' });

module.exports = { Rumah, detailRumah };
