const { Kost, detailKost } = require('../Models/kostModel');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const cloudinary = require('../middleware/cloudinary');

const createKost = async (req, res) => {
  const id_user = jwt.decode(req.cookies.token).id;
  const nama = jwt.decode(req.cookies.token).fullname;
  const { nama_kost, alamat, kota, kecamatan, deskripsi, fasilitas, peraturan, tipe_kost, harga_sewa, jumlah_kamar } = req.body;

  try {
    if (!nama_kost || !alamat || !kota || !kecamatan || !deskripsi || !fasilitas || !peraturan || !tipe_kost || !harga_sewa || !jumlah_kamar) {
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

    const transaction = await Kost.sequelize.transaction();
    try {
      const kost = await Kost.create(
        {
          id_user: id_user,
          nama_kost: nama_kost,
          alamat: alamat,
          kota: kota,
          deskripsi: deskripsi,
          kecamatan: kecamatan,
          created_by: nama,
        },
        { transaction }
      );

      // Jika kost tidak berhasil dibuat, batalkan transaksi
      if (!kost) {
        await transaction.rollback();
        return res.status(500).json({ message: 'Kost tidak berhasil dibuat' });
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

      await detailKost.create(
        {
          id_kost: kost.id,
          tipe_kost: tipe_kost,
          harga_sewa: harga_sewa,
          jumlah_kamar: jumlah_kamar,
          fasilitas: fasilitas,
          peraturan: peraturan,
          gambar: imageUrls,
          public_id: publicIds,
        },
        { transaction }
      );

      await transaction.commit();

      res.status(201).json(kost);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getKosts = async (req, res) => {
  try {
    const kosts = await Kost.findAll({
      include: {
        model: detailKost,
        attributes: ['tipe_kost', 'harga_sewa', 'jumlah_kamar', 'fasilitas', 'peraturan', 'gambar'],
        as: 'detail',
      },
    });
    if (kosts.length === 0) {
      return res.status(404).json({ message: 'kost tidak ditemukan' });
    }
    res.status(200).json(kosts);
  } catch (error) {
    res.status(500).json({ message: 'Status error' });
  }
};

const getKostsById = async (req, res) => {
  try {
    const { id } = req.params;
    const kosts = await Kost.findOne({
      where: { id: id },
      include: {
        model: detailKost,
        attributes: ['tipe_kost', 'harga_sewa', 'jumlah_kamar', 'fasilitas', 'peraturan', 'gambar'],
        as: 'detail',
      },
    });
    if (!kosts) {
      return res.status(404).json({ message: 'kost tidak ditemukan' });
    }

    res.status(200).json(kosts);
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const searchKosts = async (req, res) => {
  try {
    const { q } = req.query;
    const kosts = await Kost.findAll({
      where: {
        [Op.or]: [{ nama_kost: { [Op.like]: `%${q}%` } }, { alamat: { [Op.like]: `%${q}%` } }, { kota: { [Op.like]: `%${q}%` } }, { kecamatan: { [Op.like]: `%${q}%` } }],
      },
      include: {
        model: detailKost,
        attributes: ['tipe_kost', 'harga_sewa', 'jumlah_kamar', 'fasilitas', 'peraturan', 'gambar'],
        as: 'detail',
      },
    });
    if (kosts.length === 0) {
      return res.status(404).json({ message: 'kost tidak ditemukan' });
    }

    res.status(200).json(kosts);
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const getKostsByKota = async (req, res) => {
  try {
    const { q } = req.query;
    const kosts = await Kost.findAll({
      where: {
        kota: {
          [Op.like]: `%${q}%`,
        },
      },
      include: {
        model: detailKost,
        attributes: ['tipe_kost', 'harga_sewa', 'jumlah_kamar', 'fasilitas', 'peraturan', 'gambar'],
        as: 'detail',
      },
    });

    if (kosts.length === 0) {
      return res.status(404).json({ message: 'kost tidak ditemukan' });
    }

    res.status(200).json(kosts);
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const updateKost = async (req, res) => {
  const { id } = req.params;
  const { nama_kost, alamat, kota, kecamatan, deskripsi, tipe_kost, harga_sewa, jumlah_kamar, fasilitas, peraturan } = req.body;

  try {
    const kost = await Kost.findByPk(id, { include: { model: detailKost, as: 'detail' } });

    if (!kost) {
      return res.status(404).json({ message: 'Kost tidak ditemukan' });
    }

    const transaction = await Kost.sequelize.transaction();

    try {
      await kost.update(
        {
          nama_kost,
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

      await kost.detail.update(
        {
          tipe_kost,
          harga_sewa,
          jumlah_kamar,
          fasilitas,
          peraturan,
          gambar: [...kost.detail.gambar, ...imageUrls],
          public_id: [...kost.detail.public_id, ...publicIds],
        },
        { transaction }
      );

      await transaction.commit();
      res.status(200).json({ message: 'Kost berhasil diupdate' });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteKost = async (req, res) => {
  try {
    const { id } = req.params;
    const kost = await Kost.findOne({ where: { id: id } });
    if (!kost) {
      return res.status(404).json({ message: 'kost tidak ditemukan' });
    }

    const detail = await detailKost.findOne({ where: { id_kost: kost.id } });

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

    await kost.destroy();
    res.status(200).json({ msg: 'kost berhasil dihapus' });
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
    const detailKostData = await detailKost.findOne({
      where: { id_kost: id },
      raw: true,
    });

    // Validasi jika kost tidak ditemukan
    if (!detailKostData) {
      return res.status(404).json({ message: 'Kost tidak ditemukan' });
    }

    // Validasi jika gambar tidak ada
    if (!detailKostData.gambar || !detailKostData.public_id) {
      return res.status(400).json({ message: 'Gambar tidak ada' });
    }

    // Validasi jika public_id tidak ada di database
    if (!detailKostData.public_id.includes(public_id)) {
      return res.status(400).json({ message: 'Public ID gambar tidak valid' });
    }

    // Menggunakan cloudinary.uploader.destroy untuk menghapus gambar dari Cloudinary
    await cloudinary.uploader.destroy(public_id);
    // Hapus gambar dari array gambar
    const updatedGambar = detailKostData.gambar.filter((url) => !url.includes(public_id));

    // Hapus public_id dari array public_id
    const updatedPublicIds = detailKostData.public_id.filter((pid) => pid !== public_id);

    // Perbarui data detail kost di database
    await detailKost.update(
      {
        gambar: updatedGambar,
        public_id: updatedPublicIds,
      },
      {
        where: { id_kost: id },
      }
    );

    res.status(200).json({ message: 'Gambar berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createKost, getKosts, getKostsById, searchKosts, updateKost, deleteKost, getKostsByKota, deleteImage };
