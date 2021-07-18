var mongoose = require("mongoose");
const { constants } = require("../helpers/constants");

const Schema = mongoose.Schema;
const DataTypes = Schema.Types;


var UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	isConfirmed: { type: Boolean, required: true, default: 0 },
	confirmOTP: { type: String, required: false },
	otpTries: { type: Number, required: false, default: 0 },
	status: { type: Boolean, required: true, default: 1 },
	userType: { type: String, required: true, enum: Object.values(constants.userTypes) },
	isOnboardingCompleted: { type: Boolean, default: false },
	jobseeker: { type: DataTypes.ObjectId, required: false },
	jobseeker: { type: DataTypes.ObjectId, required: false },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);