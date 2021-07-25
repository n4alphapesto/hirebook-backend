var express = require("express");
const UserController = require("../controllers/UserController");
const JobSeekerController = require("../controllers/JobSeekerController");
const RecruiterConroller = require("../controllers/RecruiterConroller");

var router = express.Router();

router.get("/getUser", UserController.getUser);
router.post("/jobseeker/saveProfile", JobSeekerController.saveJobSeekerProfile);
router.post("/recruiter/saveProfile", RecruiterConroller.saveRecruiterProfile);

module.exports = router;
