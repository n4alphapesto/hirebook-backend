const mongoose = require("mongoose");
const { constants } = require("../helpers/constants");

const Schema = mongoose.Schema;
const DataTypes = Schema.Types;

const applicantSchema = new Schema({
    candidate: {
        type: DataTypes.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: [constants.applicationStatus],
        default: constants.applicationStatus.APPLIED,
        required: true
    }
})

const JobSchema = new Schema({
    job: {
        type: DataTypes.ObjectId,
        required: true
    },
    applicants: [applicantSchema]
}, { timestamps: true });

module.exports = mongoose.model("JobApplicants", JobSchema);
