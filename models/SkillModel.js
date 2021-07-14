var mongoose = require("mongoose");

var SkillSchema = new mongoose.Schema({
    title: { type: String, required: true }
})

module.exports = mongoose.model("Skill", SkillSchema);
