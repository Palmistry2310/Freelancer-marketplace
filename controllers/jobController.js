const Job = require("../models/Job");

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find().sort({deadline: -1});
  res.render("job/jobList", { jobs, token: req.token });
};

exports.createJob = async (req, res) => {
  try {
    const { title, desc, skillsRequired, deadline, budget } = req.body;
    const skillArray = skillsRequired.split(",").map((skill) => skill.trim());
    const newJob = new Job({
      title,
      desc,
      skillsRequired: skillArray,
      deadline,
      budget,
      userId:req.user.userId
    });
    await newJob.save();
    res.status(200).json({ message: "Job Posted", token: req.token });
  } catch {
    res
      .status(500)
      .json({ message: "server error, try later!", token: req.token });
  }
};


exports.myJobs=async (req,res)=>{
  

  try{
    const myjobs= await Job.find({userId:req.user.userId})
    res.render("job/myJobs",{myjobs,token:req.token})
  }catch{
    res.status(500).json({message:"unable to fetch!"})
  }
};

exports.updateJob = async (req, res) => {
  try {
    console.log(req.body)
    const { jobId, title, desc,skillsRequired,deadline,budget } = req.body; 
    const skillArray = skillsRequired.split(",").map((skill) => skill.trim());
    
    console.log(jobId)

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const updatedJob=await Job.findByIdAndUpdate(
      jobId,
      { title, desc, budget,skillsRequired: skillArray,deadline},
      { new: true } 
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job updated successfully",
      updatedJob,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const {jobId} = req.body 
    console.log(jobId)

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
