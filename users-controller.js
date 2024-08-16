const chalk = require("chalk");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'test';

async function addUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, password: passwordHash });

  console.log(chalk.bgGreen.inverse("User was added"));
}

async function loginUser(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User is not found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Password is not correct");
  }

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '30d'});
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

module.exports = { addUser, loginUser };
