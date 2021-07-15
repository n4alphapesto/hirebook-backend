const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
	title: {type: String, required: true}
});

module.exports = mongoose.model("Skill", SkillSchema);
