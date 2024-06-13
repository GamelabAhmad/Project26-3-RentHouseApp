const { User } = require('../Models/userModel');
const { Rumah } = require('../Models/rumahModel');
const { Transaksi } = require('../Models/transaksiModel');

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRumah = async (req, res) => {
  try {
    const rumah = await Rumah.findAll();
    res.status(200).json(rumah);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll();
    res.status(200).json(transaksi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUser, getAllRumah, getAllTransaksi };
