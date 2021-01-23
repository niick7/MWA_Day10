const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.getJobs = function(req, res) {
  Job.find().exec(function(err, jobs){
    response = { status: 200, message: jobs };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.createJob = function(req, res) {
  const newJob = {
    title: req.body.title,
    salary: parseFloat(req.body.salary),
    description: req.body.description,
    experience: req.body.experience
  };
  if (req.body && req.body.skills) {
    newJob.skills = req.body.skills.split(",").map(item => item.trim());
  }
  if (req.body && req.body.postDate) {
    newJob.postDate = Date.parse(req.body.postDate);
  }
  Job.create(newJob, function(err, job){
    response = { status: 201, message: job };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.getJob = function(req, res) {
  const jobId = req.params.jobId;
  Job.findById(jobId).exec(function(err, job){
    response = { status: 200, message: job };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!job) {
      response.status = 404;
      response.message = { message: "Job ID is not found." };
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.updateJob = function(req, res) {
  const jobId = req.params.jobId;
  Job.findById(jobId).exec(function(err, job){
    response = { status: 204, message: job };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!job) {
      response.status = 404;
      response.message = { message: "Job ID is not found." };
    }
    if (response.status != 204) {
      res.status(response.status).json(response.message);
      return;
    }

    if (res.body) {
      if (req.body.title)
        job.title = req.body.title;
      if (req.body.salary)
        job.salary = parseFloat(req.body.salary);
      if (req.body.description)
        job.description = req.body.description;
      if (req.body.experience)
        job.experience = req.body.experience;
      if (req.body.skills)
        job.skills = req.body.skills.split(",").map(item => item.trim());
      if (req.body.postDate)
        job.postDate = Date.parse(req.body.postDate);
    }

    job.save(function(updatedErr, updatedJob){
      response.message = updatedJob;
      if (updatedErr) {
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
  });
}

module.exports.deleteJob = function(req, res) {
  const jobId = req.params.jobId;
  Job.findByIdAndDelete(jobId).exec(function(err, job){
    response = { status: 200, message: "Deleted job successfully" };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!job) {
      response.status = 404;
      response.message = { message: "Job ID is not found." };
    }
    res.status(response.status).json(response.message);
  });
};
