const express = require("express");
const router = express.Router();

// controllers
const scheduleController = require("../controllers/index");

router.get("/getAllSchedules", scheduleController.getAll);

router.post("/addSchedule", scheduleController.addSchedule);

router.post("/deleteSchedule", scheduleController.deleteSchedule);

router.get("/", (req, res) => {
  res.send("api is working homie");
});

module.exports = router;
