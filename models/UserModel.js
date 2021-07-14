var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	isConfirmed: { type: Boolean, required: true, default: 0 },
	confirmOTP: { type: String, required: false },
	otpTries: { type: Number, required: false, default: 0 },
	status: { type: Boolean, required: true, default: 1 },
	userType: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);