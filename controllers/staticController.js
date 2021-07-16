const apiResponse = require("../helpers/apiResponse");
const CityModel = require("../models/CityModel");
const jobRolesModel = require("../models/JobRoleModel");

function MasterData(data) {
	this.id = data._id;
	this.title = data.title;
	this.type = data.type;
}

exports.Cities = (req, res) => {
	try {
		CityModel.find({}).then((cities) => {
			let CitiesData = [];
			cities.forEach(city => {
				let data = new MasterData(city);
				CitiesData.push(data);
			});
			return apiResponse.successResponseWithData(res, "Operation success", CitiesData);
		});
	} catch (err) {
		return apiResponse.ErrorResponse(res, err);
	}
};

exports.jobRoles = (req, res) => {
	try {
		const filter = req.query.filter;
		let query = jobRolesModel.find({});
		if(filter){
			query = jobRolesModel.find({type: filter});
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
