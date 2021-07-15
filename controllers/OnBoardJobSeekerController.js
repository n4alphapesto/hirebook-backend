const {body, validationResult, sanitizeBody} = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const onBoardJobSeekerModel = require("../models/OnBoardJobSeekerModel");

exports.JobSeeker = [
	body("experienceType", "Experience Type must not be empty.").notEmpty(),
	body("experience", "Experience must not be empty.").isNumeric(),
	body("currentRole", "current Role must not be empty.").notEmpty(),
	body("skills", "skills must not be empty.").isArray(),
	body("currentLocation", "current Location must not be empty.").notEmpty(),
	body("openToWork", "openTo Work must not be empty.").notEmpty(),
	body("currentCTC", "current CTC must not be empty.").isNumeric(),
	body("noticePeriod", "notice Period must not be empty.").isNumeric(),
	body("resume", "resume must not be empty.").notEmpty(),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				// create query with onBoardJobSeekerModel
				console.log(req.body);
				return apiResponse.successResponseWithData(res, "check Console", req.body);
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
