const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  message: String,
  scheduleAt: String,
  isScheduled: Boolean,
});

const Schedule = new mongoose.model("Schedule", scheduleSchema);

module.exports = { Schedule };
