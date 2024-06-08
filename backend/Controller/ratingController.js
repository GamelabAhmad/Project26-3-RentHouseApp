const Rating = require('../Models/ratingModel');
const { Kost, detailKost } = require('../Models/rumahModel');
const User = require('../Models/userModel');
const Transaksi = require('../Models/transaksiModel');
const jwt = require('jsonwebtoken');

const createRating = async (req, res) => {
  try {
    const { id_kost, rating, review } = req.body;
    const id_user = jwt.decode(req.cookies.token).id;

    const transaction = await Transaksi.findOne({
      where: {
        id_user: id_user,
        id_kost: id_kost,
        status: 'accepted',
      },
    });

    if (!transaction) {
      return res.status(403).json({ message: 'Anda belum bisa melakukan rating' });
    }

    const newRating = await Rating.create({
      id_user: id_user,
      id_kost: id_kost,
      rating: rating,
      review: review,
    });

    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRatingByUserId = async (req, res) => {
  const id = jwt.decode(req.cookies.token).id;
  try {
    const rating = await Rating.findAll({
      where: { id_user: id },
      include: [{ model: Kost, attributes: ['id', 'nama_kost'], as: 'rating_kost', include: [{ model: detailKost, as: 'detail', attributes: ['id', 'harga_sewa', 'gambar'] }] }],
    });
    res.status(200).json(rating);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateRating = async (req, res) => {
  const { id } = req.params;
  const { rating, review } = req.body;
  const id_user = jwt.decode(req.cookies.token).id;
  try {
    const ratingUser = await Rating.findOne({
      where: { id: id, id_user: id_user },
      include: [{ model: Kost, attributes: ['id', 'nama_kost'], as: 'rating_kost' }],
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
