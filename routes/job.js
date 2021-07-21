var express = require("express");
const JobController = require("../controllers/JobController");

var router = express.Router();

router.get("/", JobController.JobList);
router.post("/", JobController.addJob);
router.get("/jobById", JobController.JobById);
router.post("/applyForJob", JobController.applyForJob);
// router.post("/scheduleInterview", JobController.scheduleInterview);

module.exports = router;
