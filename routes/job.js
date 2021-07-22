var express = require("express");
const JobController = require("../controllers/JobController");

var router = express.Router();

router.post("/joblist", JobController.JobList);
router.post("/addjob", JobController.addJob);
router.get("/jobById/:jobId", JobController.JobById);
router.post("/scheduleInterview", JobController.scheduleInterview);
router.post("/sendOfferLetter", JobController.sendOfferLetter);
router.post("/sendRegretLetter", JobController.sendRegretLetter);
router.post("/applyForJob", JobController.applyForJob);
router.get("/jobApplicants", JobController.getJobApplicants);

module.exports = router;
