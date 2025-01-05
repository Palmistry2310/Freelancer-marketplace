const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", authController.loginUser);

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", authController.registerUser);

module.exports = router;
