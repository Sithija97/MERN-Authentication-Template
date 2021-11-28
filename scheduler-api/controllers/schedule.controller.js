const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

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

// setInterval(() => {
//   Schedule.find({}, (err, scheduleList) => {
//     if (err) {
//       console.log(err);
//     }
//     if (scheduleList) {
//       scheduleList.map((schedule) => {
//         if (!schedule.isReminded) {
//           const now = new Date();
//           if (new Date(schedule.scheduleAt) - now < 0) {
//             Schedule.findByIdAndUpdate(
//               schedule._id,
//               { isScheduled: true },
//               (err, scheduleObj) => {
//                 if (err) {
//                   console.log(err);
//                 }
//                 const accountSid = process.env.ACCOUNT_SID;
//                 const authToken = process.env.AUTH_TOKEN;
//                 const client = require("twilio")(accountSid, authToken);
//                 client.messages
//                   .create({
//                     body: schedule.message,
//                     from: "whatsapp:+14155238886",
//                     to: "whatsapp:+94770689521",
//                   })
//                   .then((message) => console.log(message.sid))
//                   .done();
//               }
//             );
//           }
//         }
//       });
//     }
//   });
// }, 1000);

setInterval(() => {
  Schedule.find({}, (err, scheduleList) => {
    if (err) {
      console.log(err);
    }
    if (scheduleList) {
      scheduleList.forEach((scheduler) => {
        if (!scheduler.isScheduled) {
          const now = new Date();
          if (new Date(scheduler.scheduleAt) - now < 0) {
            Schedule.findByIdAndUpdate(
              scheduler._id,
              { isScheduled: true },
              (err, remindObj) => {
                if (err) {
                  console.log(err);
                }
                const accountSid = process.env.ACCOUNT_SID;
                const authToken = process.env.AUTH_TOKEN;
                const client = require("twilio")(accountSid, authToken);
                client.messages
                  .create({
                    body: scheduler.message,
                    from: "whatsapp:+14155238886",
                    to: "whatsapp:+94770689521",
                  })
                  .then((message) => console.log(message.sid))
                  .done();
              }
            );
          }
        }
      });
    }
  });
}, 1000);

module.exports = { getAll, addSchedule, deleteSchedule };
