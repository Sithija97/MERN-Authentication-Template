import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import React, { useEffect, useState } from "react";
import ScheduleCard from "../components/scheduleCard";

function HomePage() {
  const [message, setMessage] = useState("");
  const [scheduleAt, setScheduleAt] = useState();
  const [scheduleList, setScheduleList] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:9000/api/getAllSchedules"
    );
    await setScheduleList(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [scheduleList]);

  const addSchedule = async () => {
    await axios.post("http://localhost:9000/api/addSchedule", {
      message,
      scheduleAt,
    });
    // await fetchData();
    setMessage("");
    setScheduleAt();
  };

  const deleteSchedule = async (id) => {
    await axios.post("http://localhost:9000/api/deleteSchedule", { id });
    // await fetchData();
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
      {scheduleList &&
        scheduleList.map((schedule) => (
          <ScheduleCard
            schedule={schedule}
            key={schedule._id}
            deleteSchedule={deleteSchedule}
          />
        ))}
    </div>
  );
}

export default HomePage;
