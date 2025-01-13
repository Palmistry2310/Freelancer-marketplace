const User = require("../models/User");
const bcrypt = require("bcrypt");

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
      res.status(200).json({ message: "logged in " });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  }
};



