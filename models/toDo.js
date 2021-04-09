const { Schema, model } = require("mongoose");

const schema = new Schema({
  titleName: { type: String, required: true },
  finished: { type: Boolean, default: false },
});

module.exports = model("Todo", schema);
