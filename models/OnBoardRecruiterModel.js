const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const DataTypes = Schema.Types;

const OnBoardRecruiterSchema = new Schema({
	companyName: {
		type: DataTypes.String,
		required: true
	},
	userRole:{
		type: DataTypes.String,
		required: true
	},
	mobileNo:{
		type: DataTypes.String,
		required: true
	},
	locations: [DataTypes.ObjectId],
	website:{
		type: DataTypes.String,
		required: true
	},
	foundationYear: {
		type:DataTypes.Number,
		required: true
	},
	noOfEmployees: {
		type: DataTypes.Number,
		required: true
	},
	about:{
		type: DataTypes.String,
		required: true
	},
	companyPhotos:[DataTypes.ObjectId],
	linkedinProfile:{
	    type:DataTypes.String,
		required: true
	},
	twitterProfile:{
	    type: DataTypes.String,
		required: true
	},
	facebookProfile:{
	    type: DataTypes.String,
		required: true
	}
});

module.exports = mongoose.model("OnBoardRecruiter", OnBoardRecruiterSchema);
