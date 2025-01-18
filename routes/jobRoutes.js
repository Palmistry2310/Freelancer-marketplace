const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { getTokenFromCookie, verifyJWT, getUserFromJwt, } = require("../middleware");

router.get("/", jobController.getAllJobs);

router.get("/create", (req, res) => {
  if (req.token === undefined) {
    // res.status(401).json({ message: "Unauthorized", token: req.token });
    res.render("401.ejs", { token: req.token });
  } else {
    res.render("job/createJob", { token: req.token });
  }
});

router.post("/create",verifyJWT, jobController.createJob);


router.delete("/deletemyjob",jobController.deleteJob);


router.get("/myjobs",getUserFromJwt,jobController.myJobs);


router.put("/editmyjob", jobController.updateJob);



module.exports = router;
