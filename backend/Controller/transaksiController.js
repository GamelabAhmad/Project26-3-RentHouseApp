const Transaksi = require('../Models/transaksiModel');
const { Kost, detailKost } = require('../Models/kostModel');
const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

// Mendapatkan semua transaksi
const getAllTransaksiByPemilikId = async (req, res) => {
  const id_user = jwt.decode(req.cookies.token).id;
  try {
    const transaksi = await Transaksi.findAll({
      include: {
        model: Kost,
        as: 'kost',
        attributes: ['id', 'nama_kost'],
        where: { id_user: id_user },
      },
      order: [['status', 'ASC']],
    });

    if (transaksi.length === 0) {
      return res.status(404).json({ error: 'Transaksi not found' });
    }
    res.json(transaksi);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Mendapatkan transaksi berdasarkan ID user
const getTransaksiByIdUser = async (req, res) => {
  const id = jwt.decode(req.cookies.token).id;
  try {
    const userTransaction = await Transaksi.findAll({
      where: { id_user: id },
      include: [{ model: Kost, as: 'kost', attributes: ['id', 'nama_kost'], include: [{ model: detailKost, as: 'detail', attributes: ['id', 'harga_sewa'] }] }],
      order: [['status', 'ASC']],
    });
    res.status(200).json(userTransaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Membuat transaksi baru
const createTransaksi = async (req, res) => {
  const id_user = jwt.decode(req.cookies.token).id;
  try {
    const user = await User.findOne({ where: { id: id_user } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { id_kost } = req.body;

    const kost = await Kost.findOne({ where: { id: id_kost }, include: [{ model: detailKost, as: 'detail', attributes: ['harga_sewa'] }] });

    if (!id_kost) {
      return res.status(400).json({ message: 'data tidak lengkap' });
    }

    if (!kost) {
      return res.status(404).json({ message: 'Kost not found' });
    }

    const newTransaksi = await Transaksi.create({
      id_user,
      id_kost,
      jumlah_uang_dibayarkan: kost.detail.harga_sewa,
      dibayarkan_oleh: user.fullname,
    });

    res.status(201).json(newTransaksi);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Memperbarui transaksi berdasarkan ID
const updateTransaksi = async (req, res) => {
  const { id } = req.params;
  const id_user = jwt.decode(req.cookies.token).id;

  try {
    const transaksi = await Transaksi.findOne({ where: { id: id }, include: [{ model: Kost, as: 'kost', where: { id_user: id_user } }] });
    if (!transaksi) {
      return res.status(404).json({ message: 'transaksi tidak ditemukan' });
    }

    if (transaksi.status === 'accepted') {
      return res.status(400).json({ message: 'transaksi ini telah di acc' });
    }

    transaksi.status = 'accepted';
    await transaksi.save();
    res.status(200).json({
      message: 'Transaksi Accepted',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTransaksiByPemilikId,
  getTransaksiByIdUser,
  createTransaksi,
  updateTransaksi,
};
