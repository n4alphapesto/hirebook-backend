var express = require("express");
const StaticController = require("../controllers/staticController");

var router = express.Router();

router.get("/cities", StaticController.Cities);
router.get("/jobRoles", StaticController.jobRoles);

module.exports = router;
