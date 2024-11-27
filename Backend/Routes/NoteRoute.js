const express = require("express");
const router = express.Router();

const NoteModel =  require("../Model/NoteModel");
const NoteController = require("../Controllers/NoteController");

router.get("/",NoteController.getAllNote);
router.post("/",NoteController.addNotes);
router.get("/:id",NoteController.getByNoteId);
router.put("/:id",NoteController.updateNote);
router.delete("/:id",NoteController.deleteNote);

module.exports = router;
