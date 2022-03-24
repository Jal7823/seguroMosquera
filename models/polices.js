const mongoose = require("mongoose");
const schema = mongoose.Schema;

const policiesSchema = new schema({
  name: String,
  descriptions: String,
  img:String
});

//model

const policies = mongoose.model("policies", policiesSchema);

module.exports = policies;

