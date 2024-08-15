const chalk = require("chalk");
const Note = require("./models/Note");

async function addNote(title) {
  await Note.create({ title });

  console.log(chalk.bgGreen.inverse("Note was added"));
}

async function getNotes() {
  const notes = await Note.find();
  return notes;
}

async function removeNote(id) {
  await Note.deleteOne({ id });

  console.log(chalk.bgGreen.inverse(`Note id:${id} was removed`));
}

async function modifyNote(noteData) {
  await Note.updateOne({ id: noteData.id, title: noteData.title });
  console.log(chalk.bgYellow.inverse(`Note id:${noteData.id} was modified`));
}

module.exports = { addNote, getNotes, modifyNote, removeNote };
