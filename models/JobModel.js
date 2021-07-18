const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const DataTypes = Schema.Types;

const JobSchema = new Schema({
	postedBy: { type: DataTypes.ObjectId, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	skills: { type: String, required: true },
	vacancies: { type: Number, require: true },
	atLocations: [String]
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);
