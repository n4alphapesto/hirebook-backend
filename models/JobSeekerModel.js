const mongoose = require("mongoose");
const { constants } = require("../helpers/constants");
const SkillSchema = require("./SkillModel");
const Schema = mongoose.Schema;
const DataTypes = Schema.Types;

const JobSeekerSchema = new Schema(
  {
    experienceType: {
      type: String,
      enum: Object.values(constants.experienceType),
      default: constants.experienceType.FRESHER,
      required: true,
    },
    experience: {
      type: DataTypes.Number,
      required: true,
    },
    currentRole: {
      type: DataTypes.String,
      required: true,
    },
    skills: [SkillSchema],
    currentLocation: {
      type: DataTypes.String,
      required: true,
    },
    openToWork: [DataTypes.String],
    currentCTC: {
      type: DataTypes.Number,
      required: true,
    },
    noticePeriod: {
      type: DataTypes.Number,
      required: true,
    },
    resume: {
      type: DataTypes.ObjectId,
      required: true,
    },
    savedJobs: {
      type: [DataTypes.ObjectId],
      default: [],
    },
    appliedJobs: {
      type: [DataTypes.ObjectId],
      default: [],
    },
    about: {
      type: DataTypes.String,
      required: true,
    },
    notInterestedJobs: {
      type: [DataTypes.ObjectId],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobSeeker", JobSeekerSchema);
