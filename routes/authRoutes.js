const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { getTokenFromCookie } = require("../middleware");

router.get("/login", (req, res) => {
  if (req.token) {
    res.redirect("/");
  }
  res.render("auth/login", { token: req.token });
});

router.post("/login", authController.loginUser);

router.get("/signup", (req, res) => {
  if (req.token) {
    res.redirect("/");
  }
  res.render("auth/signup", { token: req.token });
});

router.post("/signup", authController.registerUser);

module.exports = router;
