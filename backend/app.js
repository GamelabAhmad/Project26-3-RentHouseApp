const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./Routes/userRoutes');
const rumahRoutes = require('./Routes/rumahRoutes');
const transaksiRoutes = require('./Routes/transaksiRoutes');
const Rating = require('./Models/ratingModel');
const ratingRoutes = require('./Routes/ratingRoutes');
const Transaksi = require('./Models/transaksiModel');
const { Rumah, detailRumah } = require('./Models/rumahModel');
const { User, Rekening } = require('./Models/userModel');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/rumah', rumahRoutes);
app.use('/api/transaksi', transaksiRoutes);
app.use('/api/rating', ratingRoutes);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
  User.sync();
  Rekening.sync();
  Rumah.sync();
  detailRumah.sync();
  Transaksi.sync();
  Rating.sync();
});

module.exports = app;
