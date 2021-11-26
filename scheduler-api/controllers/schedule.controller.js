const express = require("express");
const router = express.Router();

// model
const { Schedule } = require("../db/models/index");

async function getAll(req, res) {
  await Schedule.find({}, (err, scheduleList) => {
    err ? res.send("error occured @getAll") : res.send(scheduleList);
  });
}

async function addSchedule(req, res) {
  const { message, scheduleAt } = req.body;

  const schedule = new Schedule({
    message,
    scheduleAt,
    isScheduled: false,
  });
  await schedule.save((err) => {
    err
      ? res.send("error occured @addSchedule")
      : Schedule.find({}, (err, scheduleList) => {
          err ? res.send("error occured @getAll") : res.send(scheduleList);
        });
  });
}

async function deleteSchedule(req, res) {
  schedule.deleteOne({ _id: req.body.id }, () => {
    res.send("schedule was deleted");
  });
}

module.exports = { getAll, addSchedule, deleteSchedule };
