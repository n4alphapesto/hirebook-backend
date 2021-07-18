const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const DataTypes = Schema.Types;
const SkillSchema = require("./SkillModel");

const JobSchema = new Schema(
  {
    postedBy: { type: DataTypes.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [SkillSchema],
    locations: [String],
    vacancies: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
