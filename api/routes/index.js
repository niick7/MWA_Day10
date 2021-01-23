const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobs-controller");

router.route("/jobs").get(jobsController.getJobs)
                     .post(jobsController.createJob);
router.route("/jobs/:jobId").get(jobsController.getJob)
                            .put(jobsController.updateJob)
                            .delete(jobsController.deleteJob);

module.exports = router;