const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    const isExist = await User.findOne({ email: email });

    if (isExist) {
      res.status(409).json({ message: "User already exist" });
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        userType: userType,
      });
      await user.save();
      res.status(200).json({ message: "Successfully Registered" });
    }
  } catch {
    res.status(500).json({ message: "error occured try later " });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(404).json({ message: "User not found. Please sign up first." });
  } else {
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      const token = jwt.sign(
        { userId: user._id, username: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.status(200).json({ message: "logged in ", token: token });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  }
};
