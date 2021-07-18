var express = require("express");
const StaticController = require("../controllers/staticController");

var router = express.Router();

router.get("/jobRoles", StaticController.jobRoles);

module.exports = router;
