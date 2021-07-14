var mongoose = require("mongoose");

var JobSeekerRoleSchema = new mongoose.Schema({
    title: { type: String, required: true }
})

module.exports = mongoose.model("JobSeekerRole", JobSeekerRoleSchema);
