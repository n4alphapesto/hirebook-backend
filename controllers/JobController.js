const JobModel = require("../models/JobModel");
const { body, validationResult } = require("express-validator");
const { constants } = require("../helpers/constants");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Job Schema
function jobData(data) {
  this.id = data._id;
  this.title = data.title;
  this.description = data.description;
  this.createdAt = data.createdAt;
  this.skills = data.skills;
  (this.vacancies = data.vacancies), (this.postedBy = data.postedBy);
}

/**
 * All Jobs.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.JobList = [
  auth,
  body("postedBy", "postedBy must be a String").isString(),
  function (req, res) {
    try {
      const filterObj = {
        isDeleted: false,
      };
      const body = req.body;

      if (body.postedBy) {
        filterObj.postedBy = body.postedBy;
      }

      JobModel.find(filterObj)
        .sort("-createdAt")
        .then((Jobs) => {
          if (Jobs.length > 0) {
            let JobData = [];
            Jobs.forEach((job) => {
              let data = new jobData(job);
              JobData.push(data);
            });
            return apiResponse.successResponseWithData(
              res,
              "Operation success",
              JobData
            );
          } else {
            return apiResponse.successResponseWithData(
              res,
              "Operation success",
              []
            );
          }
        });
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Single Job.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.JobById = [
  auth,
  // body("id", "Id must not be empty.").notEmpty(),
  function (req, res) {
    try {
      JobModel.findOne({ _id: req.body.id }, (error, job) => {
        if (error) {
          return apiResponse.ErrorResponse(res, "Operation Failed.", error);
        }

        if (job) {
          return apiResponse.successResponseWithData(
            res,
            "Operation Succeed.",
            job
          );
        } else {
          return apiResponse.successResponse(res, "Job Not Found.");
        }
      });
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Job post to add new job.
 *
 * @param {string}      title
 * @param {string}      description
 * @param {string}      email
 *
 * @returns {Object}
 */
exports.addJob = [
  auth,
  body("title", "Title must not be empty.").notEmpty(),
  body("description", "Description must not be empty.").isLength({ min: 1 }),
  body("postedBy", "Owner must not be empty.").isLength({ min: 1 }),
  body("skills", "Skills must not be less than 3 character.").notEmpty(),
  body("locations", "Locations must not be empty.").notEmpty(),
  body("vacancies", "Vacancies must not be empty.").notEmpty(),
  (req, res) => {
    try {
      const user = req.user;

      if (user.userType !== constants.userTypes.RECRUITER)
        return apiResponse.unauthorizedResponse(res, "Invalid Permission.");

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        var Job = new JobModel({
          title: req.body.title,
          description: req.body.description,
          skills: req.body.skills,
          locations: req.body.locations,
          vacancies: req.body.vacancies,
          postedBy: user.id,
        });

        Job.save((err, job) => {
          if (err) {
            return apiResponse.validationErrorWithData(
              res,
              "Error Creating Job",
              err
            );
          }

          return apiResponse.successResponseWithData(
            res,
            "Job Created Successfully.",
            job
          );
        });
      }
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
