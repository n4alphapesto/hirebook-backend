const mongoose = require("mongoose");
const { constants } = require("../helpers/constants");
const Schema = mongoose.Schema;
const DataTypes = Schema.Types;
const SkillSchema = require("./SkillModel");

const applicantSchema = new Schema({
  candidate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(constants.applicationStatus),
    required: true,
  },
});

const JobSchema = new Schema(
  {
    postedBy: { type: DataTypes.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [SkillSchema],
    locations: [String],
    vacancies: { type: Number, require: true },
    isDeleted: { type: Boolean, default: false },
    applicants: {
      type: [applicantSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
