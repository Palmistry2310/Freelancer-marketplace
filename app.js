const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); //load .env variables
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const port = process.env.PORT; //access the variable using process.env
let mongoUrl = "";
if (process.env.NODE_ENV === "production"){
  mongoUrl = process.env.MONGO_ATLAS;
}else{
  mongoUrl = process.env.MONGO_URL;
}

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const { getTokenFromCookie } = require("./middleware");

//db connection
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Mongo db connected"))
  .catch((err) => console.log(`error in connecting db ${err}`));

//server
const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(getTokenFromCookie);

//routes
app.get("/", (req, res) => {
  res.render("home", { token: req.token });
});

app.use("/", authRoutes);
app.use("/jobs", jobRoutes);


app.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.redirect("/login");
});


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
