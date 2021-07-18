const apiResponse = require("../helpers/apiResponse");
const jobRolesModel = require("../models/JobRoleModel");

function MasterData(data) {
	this.id = data._id;
	this.title = data.title;
	this.type = data.type;
}

exports.jobRoles = (req, res) => {
	try {
		const filter = req.query.filter;
		let query = jobRolesModel.find({});
		if (filter) {
			query = jobRolesModel.find({ type: filter });
		}
		query.then((jobRoles) => {
			let jobRolesData = [];
			jobRoles.forEach(jobRole => {
				let data = new MasterData(jobRole);
				jobRolesData.push(data);
			});
			return apiResponse.successResponseWithData(res, "Operation success", jobRolesData);
		});
	} catch (err) {
		return apiResponse.ErrorResponse(res, err);
	}
};
