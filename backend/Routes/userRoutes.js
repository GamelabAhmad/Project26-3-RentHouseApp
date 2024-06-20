const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const verify = require("../middleware/verify");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/:id", verify.verifyToken, userController.getUserById);
router.put("/edit/:id", verify.verifyToken, userController.updateUser);
router.get("/all", verify.verifyToken, userController.getAllUsers);

//login Google
router.get("/auth/google", userController.loginWithGoogle);
router.get("/auth/google/callback", userController.googleCallback);

module.exports = router;
