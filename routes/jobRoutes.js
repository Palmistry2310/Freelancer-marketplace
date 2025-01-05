const express = require("express")
const router= express.Router()
const jobController=require("../controllers/jobController")

router.get("/",jobController.getAllJobs)

router.get("/create",(req,res)=> res.render("job/createJob"))

router.post("/create",jobController.createJob)

module.exports=router