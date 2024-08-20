const mongoose = require("mongoose");

const RequestShema = mongoose.Schema({
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

const Request = mongoose.model("Request", RequestShema);

module.exports = Request;
