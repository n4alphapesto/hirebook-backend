const { body, validationResult, sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const { constants } = require("../helpers/constants");
const auth = require("../middlewares/jwt");
const RecruiterModel = require("../models/RecruiterModel");
const UserModel = require("../models/UserModel");
const mongoose = require("mongoose");

exports.saveRecruiterProfile = [
  auth,
  body("companyName", "company Name must not be empty.").notEmpty(),
  body("userRole", "user Role must not be empty.").notEmpty(),
  body("mobileNo", "mobileNo must be 10 digits.").isLength({
    min: 10,
    max: 10,
  }),
  body("locations", "locations must not be empty.").notEmpty().isArray(),
  body("website", "website must not be empty.").notEmpty(),
  body("foundationYear", "foundation Year must not be empty.").isNumeric(),
  body("noOfEmployees", "no Of Employees must not be empty.").isNumeric(),
  body("aboutCompany", "about must not be empty.").notEmpty(),
  body("companyPhotos", "company Photos must not be empty.").isArray({
    max: 5,
  }),
  body("companyLogo", "companyLogo must be empty.").notEmpty(),
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
        const payload = {
          companyName: req.body.companyName,
          companyLogo: req.body.companyLogo,
          userRole: req.body.userRole,
          mobileNo: req.body.mobileNo,
          locations: req.body.locations,
          website: req.body.website,
          foundationYear: req.body.foundationYear,
          noOfEmployees: req.body.noOfEmployees,
          aboutCompany: req.body.aboutCompany,
          companyPhotos: req.body.companyPhotos,
        };

        if (req.body.linkedinProfile)
          payload.linkedinProfile = req.body.linkedinProfile;
        if (req.body.twitterProfile)
          payload.twitterProfile = req.body.twitterProfile;
        if (req.body.facebookProfile)
          payload.facebookProfile = req.body.facebookProfile;

        const recruiterPayload = payload;

        RecruiterModel.findOneAndUpdate(
          { _id: req.body.updateId || mongoose.Types.ObjectId() },
          { $set: recruiterPayload },
          { new: true, upsert: true },
          (error, recruiter) => {
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
                $set: { recruiter: recruiter._id, isOnboardingCompleted: true },
              },
              {
                new: true,
                projection: {
                  name: 1,
                  email: 1,
                  userType: 1,
                  isOnboardingCompleted: 1,
                  recruiter: 1,
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
                  { path: "recruiter", model: "Recruiter" },
                  (err, user) => {
                    if (err) return apiResponse.ErrorResponse(res, err); // or something

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
