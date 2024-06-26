const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../Models/userModel");
const { google } = require("googleapis");
const oauth2Client = require("../middleware/authGoogle");

const register = async (req, res) => {
  const {
    email,
    password,
    fullname,
    nomor_telp,
    role,
    nama_bank,
    nomor_rekening,
  } = req.body;

  try {
    if (!email || !password || !fullname || !nomor_telp || !role) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    const checkEmail = await User.findOne({ where: { email } });

    if (checkEmail) {
      return res.status(400).json({
        status: "error",
        message: "Email already exist",
      });
    }

    const checkName = await User.findOne({ where: { fullname } });
    if (checkName) {
      return res.status(400).json({
        status: "error",
        message: "Name already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "pemilik") {
      if (!nama_bank || !nomor_rekening) {
        return res.status(400).json({
          status: "error",
          message: "nama bank and nomor rekening are required",
        });
      }

      const user = await User.create({
        email,
        password: hashedPassword,
        fullname,
        nomor_telp,
        role,
        nama_bank,
        nomor_rekening,
      });
      return res.status(201).json({
        status: "success",
        message: "Register success",
        data: {
          id: user.id,
          email,
          fullname,
          nomor_telp,
          role,
          nama_bank,
          nomor_rekening,
        },
      });
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      fullname,
      nomor_telp,
      role,
    });

    return res.status(201).json({
      status: "success",
      message: "Register success",
      data: {
        id: user.id,
        email,
        fullname,
        nomor_telp,
        role,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "password salah atau email tidak terdaftar",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        status: "error",
        message: "password salah atau email tidak terdaftar",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        fullname: user.fullname,
      },
      "secret",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    return res.status(200).json({
      status: "success",
      message: "Login success",
      data: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    attributes: ["id", "email", "fullname", "nomor_telp"],
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "fullname"],
    });

    res.status(200).json([users]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, fullname, nomor_telp, password, nomor_rekening, nama_bank } =
      req.body;
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });
    if (!user) return res.status(404).json({ message: "User not found" });
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword || user.password;
    user.email = email || user.email;
    user.fullname = fullname || user.fullname;
    user.nomor_telp = nomor_telp || user.nomor_telp;
    user.nama_bank = nama_bank || user.nama_bank;
    user.nomor_rekening = nomor_rekening || user.nomor_rekening;
    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginWithGoogle = async (req, res) => {
  const scope = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scope,
    include_granted_scopes: true,
  });

  res.redirect(authorizationUrl);
};

const googleCallback = async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
  const { data } = await oauth2.userinfo.get();

  if (!data) {
    return res.json({
      data: data,
    });
  }

  let user = await User.findOne({ where: { email: data.email } });
  if (!user) {
    user = await User.create({
      fullname: data.name,
      email: data.email,
      role: "penyewa",
    });
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      fullname: user.fullname,
    },
    "secret",
    { expiresIn: "1d" }
  );
  res.cookie("token", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  res.status(200).json({
    data: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    },
    token: token,
  });
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

module.exports = {
  register,
  updateUser,
  login,
  loginWithGoogle,
  googleCallback,
  logout,
  getUserById,
  getAllUsers,
};
