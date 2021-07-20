var express = require("express");
const JobController = require("../controllers/JobController");

var router = express.Router();

router.get("/", JobController.JobList);
router.post("/", JobController.addJob);
router.get("/jobById", JobController.JobById);
router.post("/scheduleInterview", JobController.scheduleInterview);
router.post("/sendOfferLetter", JobController.sendOfferLetter);
router.post("/sendRegretLetter", JobController.sendRegretLetter);

module.exports = router;
