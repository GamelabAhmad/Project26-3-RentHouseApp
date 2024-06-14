const { User } = require('../Models/userModel');
const { Rumah } = require('../Models/rumahModel');
const Transaksi = require('../Models/transaksiModel');

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    if (users.length === 0) {
      return res.status(404).json({ message: 'User Belum Ada' });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllRumah = async (req, res) => {
  try {
    const rumah = await Rumah.findAll();
    if (rumah.length === 0) {
      return res.status(404).json({ message: 'Rumah Belum Ada' });
    }
    res.status(200).json(rumah);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll();
    if (transaksi.length === 0) {
      return res.status(404).json({ message: 'Transaksi belum ada' });
    }
    res.status(200).json(transaksi);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUser, getAllRumah, getAllTransaksi };
