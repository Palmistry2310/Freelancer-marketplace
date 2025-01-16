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