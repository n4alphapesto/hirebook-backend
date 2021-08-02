var express = require("express");
const JobController = require("../controllers/JobController");

var router = express.Router();

router.get("/", JobController.JobList);
router.post("/", JobController.addJob);
router.get("/jobById/:id", JobController.JobById);
router.post("/scheduleInterview", JobController.scheduleInterview);
router.post("/sendOfferLetter", JobController.sendOfferLetter);
router.post("/sendRegretLetter", JobController.sendRegretLetter);
router.post("/applyForJob", JobController.applyForJob);
router.post("/markJobUnInterested", JobController.markJobUnInterested);
router.get("/jobApplicants", JobController.getJobApplicants);

module.exports = router;
