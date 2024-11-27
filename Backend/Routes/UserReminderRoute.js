const express = require("express");
const router = express.Router();

const UserReminderModel = require("../Model/UserReminderModel");

const UserReminderController = require("../Controllers/UserReminderController");

router.get("/",UserReminderController.getAllReminder);
router.post("/",UserReminderController.addReminder);
router.get("/:id",UserReminderController.getByReminderId);
router.delete("/:id",UserReminderController.deleteReminder);

module.exports = router;