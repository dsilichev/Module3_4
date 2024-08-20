const chalk = require("chalk");
const Note = require("./models/Request");

async function addNote(title, owner) {
  await Note.create({ title, owner });

  console.log(chalk.bgGreen.inverse("Note was added"));
}

async function getNotes() {
  const notes = await Note.find();
  return notes;
}

async function removeNote(id, owner) {
  const result = await Note.deleteOne({ id, owner });

  if (result.matchedCount === 0) {
    throw new Error("No note to delete");
  }

  console.log(chalk.bgGreen.inverse(`Note id:${id} was removed`));
}

async function modifyNote(noteData, owner) {
  const result = await Note.updateOne(
    { id: noteData.id, owner },
    { title: noteData.title }
  );
  
  if (result.matchedCount === 0) {
    throw new Error("No note to edit");
  }

  console.log(chalk.bgYellow.inverse(`Note id:${noteData.id} was modified`));
}

module.exports = { addNote, getNotes, modifyNote, removeNote };
