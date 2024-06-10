const { Rumah, detailRumah } = require('../Models/rumahModel');
const jwt = require('jsonwebtoken');
const { Op, Sequelize } = require('sequelize');
const cloudinary = require('../middleware/cloudinary');
const Rating = require('../Models/ratingModel');

const createRumah = async (req, res) => {
  const id_user = jwt.decode(req.cookies.token).id;
  const nama = jwt.decode(req.cookies.token).fullname;
  const { nama_rumah, alamat, kota, kecamatan, deskripsi, fasilitas, peraturan, harga_sewa, jumlah_kamar_tidur, jumlah_kamar_mandi } = req.body;

  try {
    if (!nama_rumah || !alamat || !kota || !kecamatan || !deskripsi || !fasilitas || !peraturan || !harga_sewa || !jumlah_kamar_mandi || !jumlah_kamar_tidur) {
      return res.status(400).json({ message: 'semua kolom harus diisi' });
    }

    const images = req.files; // Menggunakan req.files untuk menangani multiple files
    if (!images || images.length === 0) {
      return res.status(400).json({ message: 'gambar harus ada' });
    }

    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg']; // Tipe file gambar yang diizinkan

    // Memeriksa setiap file yang diunggah
    for (const image of images) {
      // Memeriksa tipe file
      if (!validImageTypes.includes(image.mimetype)) {
        return res.status(400).json({ message: 'gambar harus jpg/png/jpeg' });
      }
    }

    const imageUrls = [];
    const publicIds = [];

    const transaction = await Rumah.sequelize.transaction();
    try {
      const rumah = await Rumah.create(
        {
          id_user: id_user,
          nama_rumah: nama_rumah,
          alamat: alamat,
          kota: kota,
          deskripsi: deskripsi,
          kecamatan: kecamatan,
          created_by: nama,
        },
        { transaction }
      );

      // Jika rumah tidak berhasil dibuat, batalkan transaksi
      if (!rumah) {
        await transaction.rollback();
        return res.status(500).json({ message: 'rumah tidak berhasil dibuat' });
      }

      // Mengunggah gambar
      const uploadPromises = images.map((image) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ transformation: { quality: 'auto' } }, (err, result) => {
              if (err) return reject(err);
              imageUrls.push(result.url);
              publicIds.push(result.public_id);
              resolve();
            })
            .end(image.buffer);
        });
      });

      await Promise.all(uploadPromises);

      await detailRumah.create(
        {
          id_rumah: rumah.id,
          harga_sewa: harga_sewa,
          jumlah_kamar_mandi: jumlah_kamar_mandi,
          jumlah_kamar_tidur: jumlah_kamar_tidur,
          fasilitas: fasilitas,
          peraturan: peraturan,
          gambar: imageUrls,
          public_id: publicIds,
        },
        { transaction }
      );

      await transaction.commit();

      res.status(201).json(rumah);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRumah = async (req, res) => {
  try {
    const rumah = await Rumah.findAll({
      attributes: {
        include: [[Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('rating')), 1), 'average_rating']],
      },
      include: [
        {
          model: detailRumah,
          attributes: ['harga_sewa', 'jumlah_kamar_tidur', 'jumlah_kamar_mandi', 'fasilitas', 'peraturan', 'gambar'],
          as: 'detail',
        },
        {
          model: Rating,
          attributes: [],
          as: 'rating_rumah',
        },
      ],
      group: ['tbl_rumah.id', 'detail.id'],
    });

    if (rumah.length === 0) {
      return res.status(404).json({ message: 'Rumah tidak ditemukan' });
    }

    return res.status(200).json(rumah);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const getRumahById = async (req, res) => {
  try {
    const { id } = req.params;
    const rumah = await Rumah.findOne({
      where: { id: id },
      include: [
        {
          model: detailRumah,
          attributes: ['harga_sewa', 'jumlah_kamar_tidur', 'jumlah_kamar_mandi', 'fasilitas', 'peraturan', 'gambar'],
          as: 'detail',
        },
        {
          model: Rating,
          attributes: ['rating', 'review'],
          as: 'rating_rumah',
        },
      ],
    });
    if (!rumah) {
      return res.status(404).json({ message: 'rumah tidak ditemukan' });
    }

    res.status(200).json(rumah);
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const searchRumah = async (req, res) => {
  try {
    const { q } = req.query;
    const rumah = await Rumah.findAll({
      where: {
        [Op.or]: [{ nama_rumah: { [Op.like]: `%${q}%` } }, { alamat: { [Op.like]: `%${q}%` } }, { kota: { [Op.like]: `%${q}%` } }, { kecamatan: { [Op.like]: `%${q}%` } }],
      },
      attributes: {
        include: [[Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('rating')), 1), 'average_rating']],
      },
      include: [
        {
          model: detailRumah,
          attributes: ['harga_sewa', 'jumlah_kamar_tidur', 'jumlah_kamar_mandi', 'fasilitas', 'peraturan', 'gambar'],
          as: 'detail',
        },
        {
          model: Rating,
          attributes: [],
          as: 'rating_rumah',
        },
      ],
      group: ['tbl_rumah.id', 'detail.id'],
    });
    if (rumah.length === 0) {
      return res.status(404).json({ message: 'rumah tidak ditemukan' });
    }

    res.status(200).json(rumah);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRumahByKota = async (req, res) => {
  try {
    const { q } = req.query;
    const rumah = await Rumah.findAll({
      where: {
        kota: {
          [Op.like]: `%${q}%`,
        },
      },
      attributes: {
        include: [[Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('rating')), 1), 'average_rating']],
      },
      include: [
        {
          model: detailRumah,
          attributes: ['harga_sewa', 'jumlah_kamar_tidur', 'jumlah_kamar_mandi', 'fasilitas', 'peraturan', 'gambar'],
          as: 'detail',
        },
        {
          model: Rating,
          attributes: [],
          as: 'rating_rumah',
        },
      ],
      group: ['tbl_rumah.id', 'detail.id'],
    });

    if (rumah.length === 0) {
      return res.status(404).json({ message: 'rumah tidak ditemukan' });
    }

    res.status(200).json(rumah);
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const updateRumah = async (req, res) => {
  const { id } = req.params;
  const { nama_rumah, alamat, kota, kecamatan, deskripsi, harga_sewa, jumlah_kamar_mandi, jumlah_kamar_tidur, fasilitas, peraturan } = req.body;
  const id_user = jwt.decode(req.cookies.token).id;

  try {
    const rumah = await Rumah.findOne({ where: { id: id, id_user: id_user }, include: { model: detailRumah, as: 'detail' } });

    if (!rumah) {
      return res.status(404).json({ message: 'rumah tidak ditemukan' });
    }

    const transaction = await Rumah.sequelize.transaction();

    try {
      await rumah.update(
        {
          nama_rumah,
          alamat,
          kota,
          kecamatan,
          deskripsi,
        },
        { transaction }
      );

      const images = req.files; // Menggunakan req.files untuk menangani multiple files
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg']; // Tipe file gambar yang diizinkan

      // Memeriksa setiap file yang diunggah
      for (const image of images) {
        // Memeriksa tipe file
        if (!validImageTypes.includes(image.mimetype)) {
          return res.status(400).json({ message: 'gambar harus jpg/png/jpeg' });
        }
      }

      const imageUploadPromises = images.map((image) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              transformation: { quality: 'auto' },
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          uploadStream.end(image.buffer);
        });
      });

      const uploadedImages = await Promise.all(imageUploadPromises);
      const imageUrls = uploadedImages.map((image) => image.secure_url);
      const publicIds = uploadedImages.map((image) => image.public_id);

      await rumah.detail.update(
        {
          harga_sewa,
          jumlah_kamar_mandi,
          jumlah_kamar_tidur,
          fasilitas,
          peraturan,
          gambar: [...rumah.detail.gambar, ...imageUrls],
          public_id: [...rumah.detail.public_id, ...publicIds],
        },
        { transaction }
      );

      await transaction.commit();
      res.status(200).json({ message: 'rumah berhasil diupdate' });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRumah = async (req, res) => {
  try {
    const { id } = req.params;
    const id_user = jwt.decode(req.cookies.token).id;
    const rumah = await Rumah.findOne({ where: { id: id, id_user: id_user } });
    if (!rumah) {
      return res.status(404).json({ message: 'rumah tidak ditemukan' });
    }

    const detail = await detailRumah.findOne({ where: { id_rumah: rumah.id } });

    if (detail) {
      detail.public_id.map(async (public_id) => {
        // Menggunakan cloudinary.uploader.destroy untuk menghapus gambar dari Cloudinary
        await cloudinary.uploader.destroy(public_id, (error, result) => {
          if (error) {
            console.error(error);
          }
        });
      });
      await detail.destroy();
    }

    await rumah.destroy();
    res.status(200).json({ msg: 'rumah berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'server Error' });
  }
};

const deleteImage = async (req, res) => {
  const { id, public_id } = req.params;

  try {
    // Hapus gambar dari Cloudinary
    if (!public_id) {
      return res.status(400).json({ message: 'Public ID tidak ditemukan' });
    }

    // Ambil data detail kost dari database
    const detailRumahData = await detailRumah.findOne({
      where: { id_rumah: id },
      raw: true,
    });

    // Validasi jika kost tidak ditemukan
    if (!detailRumahData) {
      return res.status(404).json({ message: 'Rumah tidak ditemukan' });
    }

    // Validasi jika gambar tidak ada
    if (!detailRumahData.gambar || !detailRumahData.public_id) {
      return res.status(400).json({ message: 'Gambar tidak ada' });
    }

    // Validasi jika public_id tidak ada di database
    if (!detailRumahData.public_id.includes(public_id)) {
      return res.status(400).json({ message: 'Public ID gambar tidak valid' });
    }

    // Menggunakan cloudinary.uploader.destroy untuk menghapus gambar dari Cloudinary
    await cloudinary.uploader.destroy(public_id);
    // Hapus gambar dari array gambar
    const updatedGambar = detailRumahData.gambar.filter((url) => !url.includes(public_id));

    // Hapus public_id dari array public_id
    const updatedPublicIds = detailRumahData.public_id.filter((pid) => pid !== public_id);

    // Perbarui data detail kost di database
    await detailRumah.update(
      {
        gambar: updatedGambar,
        public_id: updatedPublicIds,
      },
      {
        where: { id_rumah: id },
      }
    );

    res.status(200).json({ message: 'Gambar berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRumah, getRumah, getRumahById, searchRumah, updateRumah, deleteRumah, getRumahByKota, deleteImage };
