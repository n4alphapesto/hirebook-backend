const mongoose = require("mongoose");
const { constants } = require("../helpers/constants");

const Schema = mongoose.Schema;
const DataTypes = Schema.Types;

const SkillsSchema = new Schema({
	title: {
		type: DataTypes.String,
		required: true
	},
	expertiseLevel: {
		type: DataTypes.String,
		enum: Object.values(constants.experienceType),
		default: constants.experienceType.fresher,
		required: true
	}
}, { _id: false });

const JobSeekerSchema = new Schema({
	experienceType: {
		type: String,
		enum: Object.values(constants.experienceType),
		default: constants.experienceType.fresher,
		required: true
	},
	experience: {
		type: DataTypes.Number,
		required: true
	},
	currentRole: {
		type: DataTypes.String,
		required: true
	},
	skills: [SkillsSchema],
	currentLocation: {
		type: DataTypes.ObjectId, ref: "city",
		required: true
	},
	openToWork: [DataTypes.ObjectId],
	currentCTC: {
		type: DataTypes.Number,
		required: true
	},
	noticePeriod: {
		type: DataTypes.Number,
		required: true
	},
	resume: {
		type: DataTypes.ObjectId,
		required: true
	},
	savedJobs: {
		type: [DataTypes.ObjectId],
		default: []
	},
	appliedJobs: {
		type: [DataTypes.ObjectId],
		default: []
	}
});

module.exports = mongoose.model("JobSeeker", JobSeekerSchema);
