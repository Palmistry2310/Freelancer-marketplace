const Job= require("../models/Job")

exports.getAllJobs= async(req,res)=>{

        const jobs= await Job.find({},{_id:0,__v:0})
        res.render("job/jobList",{jobs})
    

}

exports.createJob=async(req,res)=>{

    const { title, desc, skillsRequired, deadline, budget } = req.body;
    const skillArray=skillsRequired.split(",").map(skill=>skill.trim())
    const newJob= new Job({ title, desc, skillsRequired:skillArray, deadline, budget })

    await newJob.save()
    res.send("job added")


}