const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../utils/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", auth, authController.getProfile);

module.exports = router;
