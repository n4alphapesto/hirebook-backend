const apiResponse = require("../helpers/apiResponse");
const UserModel = require("../models/UserModel");
const { validationResult } = require("express-validator");
const auth = require("../middlewares/jwt");

exports.getUser = [
  auth,
  (req, res) => {
    try {
      const user = req.user;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      }

      UserModel.findOne(
        { _id: user.id },
        {
          name: 1,
          email: 1,
          userType: 1,
          isOnboardingCompleted: 1,
          recruiter: 1,
        }
      )
        .populate({ path: "recruiter", model: "Recruiter" })
        .populate({ path: "jobseeker", model: "JobSeeker" })
        .exec((error, user) => {
          if (error) {
            return apiResponse.ErrorResponse(res, error);
          }

          return apiResponse.successResponseWithData(res, "Success", user);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
