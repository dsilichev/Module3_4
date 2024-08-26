const chalk = require("chalk");
const Request = require("./models/Request");

async function addRequest(name, phone, description) {
  await Request.create({ name, phone, description });

  console.log(chalk.bgGreen.inverse("Request was added"));
}

async function getRequests() {
  const requests = await Request.find();
  return requests;
}

module.exports = { addRequest, getRequests };
