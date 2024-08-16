const chalk = require("chalk");
const User = require("./models/User");
const bcrypt = require("bcrypt");

async function addUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, password: passwordHash });

  console.log(chalk.bgGreen.inverse("User was added"));
}

// async function getNotes() {
//   const notes = await Note.find();
//   return notes;
// }

// async function removeNote(id) {
//   await Note.deleteOne({ id });

//   console.log(chalk.bgGreen.inverse(`Note id:${id} was removed`));
// }

// async function modifyNote(noteData) {
//   await Note.updateOne({ id: noteData.id, title: noteData.title });
//   console.log(chalk.bgYellow.inverse(`Note id:${noteData.id} was modified`));
// }

module.exports = { addUser };
