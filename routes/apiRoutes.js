const express = require("express");
const router = express.Router();
const uuid = require("uuid").v4;
const dataBase = require("../db/db.js");


router.get("/api/notes", async function (req, res) {
  const notes = await dataBase.readNotes();
  return res.json(notes);
});


router.post("/api/notes", async function (req, res) {
  const currentNotes = await dataBase.readNotes();
  let newNote = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };

  await dataBase.addNote([...currentNotes, newNote]);

  return res.send(newNote);
});


router.delete("/api/notes/:id", async function (req, res) {
  const noteToDelete = req.params.id;
  const currentNotes = await dataBase.readNotes();
  const newNoteData = currentNotes.filter((note) => note.id !== noteToDelete);

  await dataBase.deleteNote(newNoteData);
  
  return res.send(newNoteData);
});

module.exports = router;