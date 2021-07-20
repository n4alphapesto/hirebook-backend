var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/status", function(req, res) {
	return res.status(200).send('OK');
});

module.exports = router;
