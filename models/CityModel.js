var mongoose = require("mongoose");

var CitySchema = new mongoose.Schema({
    title: { type: String, required: true }
})

module.exports = mongoose.model("City", CitySchema);
