const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	date: {type: Date, required: true},
	cost: {type: Number, required: true},
	status: {type: String, required: true},
	owner: {type: String, required: true},
	email: {type: String, required: true},
	skills: {type: String, required: true},
	applicants: {type: Array, required: true}
}, {timestamps: true});

module.exports = mongoose.model("Job", JobSchema);
