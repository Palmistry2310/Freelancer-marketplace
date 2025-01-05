const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const isExist = await User.findOne({ email: email });

  if (isExist) {
    res.send("user already exist");
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/");
  }
};

exports.loginUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    res.send("signup first ");
  } else {
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      res.redirect("/");
    } else {
      res.send("invalid credentials");
    }
  }
};
