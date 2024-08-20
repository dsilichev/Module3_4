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

// async function removeNote(id, owner) {
//   const result = await Note.deleteOne({ id, owner });

//   if (result.matchedCount === 0) {
//     throw new Error("No note to delete");
//   }

//   console.log(chalk.bgGreen.inverse(`Note id:${id} was removed`));
// }

// async function modifyNote(noteData, owner) {
//   const result = await Note.updateOne(
//     { id: noteData.id, owner },
//     { title: noteData.title }
//   );
  
//   if (result.matchedCount === 0) {
//     throw new Error("No note to edit");
//   }

//   console.log(chalk.bgYellow.inverse(`Note id:${noteData.id} was modified`));
// }

module.exports = { addRequest, getRequests };
