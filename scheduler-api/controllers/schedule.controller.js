const express = require("express");
const router = express.Router();

// model
const { Schedule } = require("../db/models/index");

async function getAll(req, res) {
  try {
    const scheduleList = await Schedule.find({});
    res.status(200).json(scheduleList);
    console.log("@getAll - pass");
  } catch (error) {
    res.status(500).json(error);
    console.log("@getAll - fail");
  }
}

async function addSchedule(req, res) {
  const { message, scheduleAt } = req.body;

  const schedule = new Schedule({
    message,
    scheduleAt,
    isScheduled: false,
  });

  try {
    await schedule.save();
    res.status(200).json(schedule);
    console.log("@addSchedule - pass");
  } catch (error) {
    res.status(500).json(error);
    console.log("@addSchedule - fail");
  }
}

async function deleteSchedule(req, res) {
  try {
    const { id } = req.body;
    await Schedule.deleteOne({ _id: id });
    res.status(200);
    console.log("@deleteSchedule - pass");
  } catch (error) {
    res.status(500).json(error);
    console.log("@deleteSchedule - fail");
  }
}

module.exports = { getAll, addSchedule, deleteSchedule };
