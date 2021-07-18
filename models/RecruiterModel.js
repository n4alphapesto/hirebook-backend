const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const DataTypes = Schema.Types;

const RecruiterSchema = new Schema({
	companyName: {
		type: DataTypes.String,
		required: true
	},
	companyLogo: {
		type: DataTypes.ObjectId,
		required: true
	},
	companyPhotos: [DataTypes.ObjectId],
	userRole: {
		type: DataTypes.String,
		required: true
	},
	mobileNo: {
		type: DataTypes.String,
		required: true
	},
	locations: [DataTypes.String],
	website: {
		type: DataTypes.String,
		required: true
	},
	foundationYear: {
		type: DataTypes.Number,
		required: true
	},
	noOfEmployees: {
		type: DataTypes.Number,
		required: true
	},
	aboutCompany: {
		type: DataTypes.String,
		required: true
	},
	linkedinProfile: {
		type: DataTypes.String,
		required: true
	},
	twitterProfile: {
		type: DataTypes.String,
		required: true
	},
	facebookProfile: {
		type: DataTypes.String,
		required: true
	},
	notInterestedCandidates: {
		type: [DataTypes.ObjectId],
		default: []
	},
});

module.exports = mongoose.model("Recruiter", RecruiterSchema);
