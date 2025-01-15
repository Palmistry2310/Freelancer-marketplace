const Job= require("../models/Job")

exports.getAllJobs= async(req,res)=>{

        const jobs= await Job.find()
        res.render("job/jobList",{jobs})
    

}

exports.createJob=async(req,res)=>{
    // console.log(req.body)
    try{
    const { title, desc, skillsRequired, deadline, budget } = req.body;
    const skillArray=skillsRequired.split(",").map(skill=>skill.trim())
    const newJob= new Job({ title, desc, skillsRequired:skillArray, deadline, budget })
    await newJob.save()
    res.status(200).json({message:"Job Posted"})
    }catch{
        res.status(500).json({message:"server error, try later!"})
    }

}