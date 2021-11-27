import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import React, { useEffect, useState } from "react";

function HomePage() {
  const [message, setMessage] = useState("");
  const [scheduleAt, setScheduleAt] = useState();
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(async () => {
    await axios.get("http://localhost:9000/api/getAllSchedules", (res) => {
      setScheduleList(res.data);
    });
  }, []);

  const addSchedule = async () => {
    await axios.post(
      "http://localhost:9000/api/addSchedule",
      {
        message,
        scheduleAt,
      },
      (res) => {
        setScheduleList(res.data);
      }
    );
  };

  return (
    <div className="App">
      <div>hello sithija welcome to the scheduler</div>
      <input
        type="text"
        placeholder="add your schedules.."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <DateTimePicker
        value={scheduleAt}
        onChange={setScheduleAt}
        minDate={new Date()}
        minutePlaceholder="mm"
        hourPlaceholder="hh"
        dayPlaceholder="DD"
        monthPlaceholder="MM"
        yearPlaceholder="YYYY"
      />
      <button onClick={addSchedule}>Add Schedule</button>
    </div>
  );
}

export default HomePage;
