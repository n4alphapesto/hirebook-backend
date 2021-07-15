const express = require("express");
const onBoardJobSeekerController = require("../controllers/OnBoardJobSeekerController");
const onBoardRecruiterController = require("../controllers/OnBoardRecruiterConroller");

const router = express.Router();

router.post("/jobSeeker", onBoardJobSeekerController.JobSeeker);
router.post("/recruiter", onBoardRecruiterController.Recruiter);

module.exports = router;
