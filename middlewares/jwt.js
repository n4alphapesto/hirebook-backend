const jwt = require("express-jwt");
const { CONFIG } = require('./../helpers/config')

const authenticate = jwt({
	secret: CONFIG.JWT_SECRET
});

module.exports = authenticate;