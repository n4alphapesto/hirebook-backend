const { body, validationResult, sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const { constants } = require("../helpers/constants");
const auth = require("../middlewares/jwt");
const UserModel = require("../models/UserModel");
const JobSeekerModel = require("../models/JobSeekerModel");
const mongoose = require("mongoose");

exports.saveJobSeekerProfile = [
  auth,
  body("experienceType", "Experience Type must not be empty.").notEmpty(),
  body("experience", "Experience must not be empty.").isNumeric(),
  body("currentRole", "current Role must not be empty.").notEmpty(),
  body("skills", "skills must not be empty.").notEmpty().isArray({ max: 4 }),
  body("currentLocation", "current Location must not be empty.").notEmpty(),
  body("openToWork", "openTo Work must not be empty.").notEmpty().isArray(),
  body("currentCTC", "current CTC must not be empty.").isNumeric(),
  body("noticePeriod", "notice Period must not be empty.").isNumeric(),
  body("resume", "resume must not be empty.").notEmpty(),
  body("userPhoto", "User Photo must not be empty.").notEmpty(),
  body("about", "about must not be empty.").notEmpty().isLength({ max: 1000 }),
  (req, res) => {
    try {
      const user = req.user;

      if (user.userType !== constants.userTypes.JOBSEEKER)
        return apiResponse.unauthorizedResponse(res, "Invalid Permission.");

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // TODO: Save Job Seeker Profile Here

        const {
          experienceType,
          experience,
          currentRole,
          skills,
          currentLocation,
          openToWork,
          currentCTC,
          noticePeriod,
          resume,
          about,
          userPhoto,
        } = req.body;

        const jobSeekerPayload = {
          experienceType,
          experience,
          currentRole,
          skills,
          currentLocation,
          openToWork,
          currentCTC,
          noticePeriod,
          resume,
          about,
          userPhoto,
        };

        JobSeekerModel.findOneAndUpdate(
          { _id: req.body.updateId || mongoose.Types.ObjectId() },
          jobSeekerPayload,
          { upsert: true, new: true },
          (error, jobseeker) => {
            // jobSeeker.save((error, jobseeker) => {
            if (error) {
              return apiResponse.ErrorResponse(
                res,
                "Error Saving Profile",
                error
              );
            }
            UserModel.findOneAndUpdate(
              { _id: user.id },
              {
                $set: { jobseeker: jobseeker._id, isOnboardingCompleted: true },
              },
              {
                new: true,
                projection: {
                  name: 1,
                  email: 1,
                  userType: 1,
                  isOnboardingCompleted: 1,
                  jobseeker: 1,
                },
              },
              (error, user) => {
                if (error) {
                  return apiResponse.ErrorResponse(
                    res,
                    "Error Saving Profile",
                    error
                  );
                }

                UserModel.populate(
                  user,
                  { path: "jobseeker", model: "JobSeeker" },
                  (err, user) => {
                    if (err) {
                      return apiResponse.ErrorResponse(res, err);
                    }

                    return apiResponse.successResponseWithData(
                      res,
                      "Profile Saved",
                      user
                    );
                  }
                );
              }
            );
          }
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
