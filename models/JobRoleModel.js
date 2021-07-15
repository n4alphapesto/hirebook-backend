const mongoose = require("mongoose");

const JobRoleSchema = new mongoose.Schema({
	title: {type: String, required: true},
	type: {type: String, required: true}
});

module.exports = mongoose.model("JobRole", JobRoleSchema);
