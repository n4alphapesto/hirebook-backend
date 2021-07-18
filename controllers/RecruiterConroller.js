const { body, validationResult, sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const RecruiterModel = require("../models/RecruiterModel");

exports.Recruiter = [auth,
	body("companyName", "company Name must not be empty.").notEmpty(),
	body("userRole", "user Role must not be empty.").notEmpty(),
	body("mobileNo", "mobileNo must be 10 digits.").isLength({ min: 10 }),
	body("locations", "locations must not be empty.").isArray(),
	body("website", "website must not be empty.").notEmpty(),
	body("foundationYear", "foundation Year must not be empty.").isNumeric(),
	body("noOfEmployees", "no Of Employees must not be empty.").isNumeric(),
	body("about", "about must not be empty.").notEmpty(),
	body("companyPhotos", "company Photos must not be empty.").isArray(),
	body("linkedinProfile", "linkedin Profile must not be empty.").notEmpty(),
	body("twitterProfile", "twitter Profile must not be empty.").notEmpty(),
	body("facebookProfile", "facebook Profile must not be empty.").notEmpty(),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				// create query with RecruiterModel
				const recruiter = new RecruiterModel({
					companyName: req.body.companyName,
					userRole: req.body.userRole,
					mobileNo: req.body.mobileNo,
					locations: req.body.locations,
					website: req.body.website,
					foundationYear: req.body.foundationYear,
					noOfEmployees: req.body.noOfEmployees,
					about: req.body.about,
					companyPhotos: req.body.companyPhotos,
					linkedinProfile: req.body.linkedinProfile,
					twitterProfile: req.body.twitterProfile,
					facebookProfile: req.body.facebookProfile
				})

				recruiter.save((error, result) => {
					if (error) {
						return apiResponse.ErrorResponse(res, "Error Saving Profile", error);
					}
					return apiResponse.successResponseWithData(res, "Profile Saved", result);
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
