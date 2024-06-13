const Rating = require('../Models/ratingModel');
const { Rumah, detailRumah } = require('../Models/rumahModel');
const Transaksi = require('../Models/transaksiModel');
const jwt = require('jsonwebtoken');

const createRating = async (req, res) => {
  try {
    const { id_rumah, rating, review } = req.body;
    const id_user = req.user.id;

    const cekRumah = await Rumah.findOne({ where: { id: id_rumah } });
    if (!cekRumah) {
      return res.status(404).json({ message: 'Rumah not found' });
    }

    const transaction = await Transaksi.findOne({
      where: {
        id_user: id_user,
        id_rumah: id_rumah,
        status: 'accepted',
      },
    });

    if (!transaction) {
      return res.status(403).json({ message: 'Anda belum bisa melakukan rating' });
    }

    const newRating = await Rating.create({
      id_user: id_user,
      id_rumah: id_rumah,
      rating: rating,
      review: review,
    });

    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRatingByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const rating = await Rating.findAll({
      where: { id_user: id },
      include: [{ model: Rumah, attributes: ['id', 'nama_rumah'], as: 'rating_rumah', include: [{ model: detailRumah, as: 'detail', attributes: ['id', 'harga_sewa', 'gambar'] }] }],
    });
    res.status(200).json(rating);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateRating = async (req, res) => {
  const { id } = req.params;
  const { rating, review } = req.body;
  const id_user = req.user.id;
  try {
    const ratingUser = await Rating.findOne({
      where: { id: id, id_user: id_user },
      include: [{ model: Rumah, attributes: ['id', 'nama_rumah'], as: 'rating_rumah' }],
    });

    if (!ratingUser) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    ratingUser.rating = rating || ratingUser.rating;
    ratingUser.review = review || ratingUser.review;
    await ratingUser.save();

    res.status(200).json(ratingUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRating,
  getRatingByUserId,
  updateRating,
};
