const mongoose = require("mongoose");
const { constants } = require("../helpers/constants");

const Schema = mongoose.Schema;
const DataTypes = Schema.Types;

const SkillsSchema = new Schema(
  {
    title: {
      type: DataTypes.String,
      required: true,
    },
    expertiseLevel: {
      type: DataTypes.String,
      enum: Object.values(constants.expertiseLevel),
      default: constants.expertiseLevel.FRESHER,
      required: true,
    },
  },
  { _id: false }
);

module.exports = mongoose.model("Skill", SkillsSchema);
module.exports = SkillsSchema;
