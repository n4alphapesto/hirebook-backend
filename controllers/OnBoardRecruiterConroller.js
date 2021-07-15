const {body, validationResult, sanitizeBody} = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const onBoardRecruiterModel = require("../models/OnBoardRecruiterModel");

exports.Recruiter = [
	body("companyName", "company Name must not be empty.").notEmpty(),
	body("userRole", "user Role must not be empty.").notEmpty(),
	body("mobileNo", "mobileNo must be 10 digits.").isLength({min: 10}),
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
				// create query with onBoardRecruiterModel
				console.log(req.body);
                return apiResponse.successResponseWithData(res, "check Console", req.body);
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
