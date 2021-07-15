const mongoose = require("mongoose");
const {constants} = require("../helpers/constants");

const Schema = mongoose.Schema;
const DataTypes = Schema.Types;

const OnBoardSkillsSchema = new Schema({
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
});

const OnBoardJobSeekerSchema = new Schema({
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
	skills: [OnBoardSkillsSchema],
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
	}
});

module.exports = mongoose.model("onBoardJobSeeker", OnBoardJobSeekerSchema);
