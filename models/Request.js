const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  }
});

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
