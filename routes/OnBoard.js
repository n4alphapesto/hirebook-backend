const express = require("express");
const JobSeekerController = require("../controllers/JobSeekerController");
const RecruiterController = require("../controllers/RecruiterConroller");

const router = express.Router();

router.post("/jobSeeker", JobSeekerController.JobSeeker);
router.post("/recruiter", RecruiterController.Recruiter);

module.exports = router;
