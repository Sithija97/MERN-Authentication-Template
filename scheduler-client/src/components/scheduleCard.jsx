import React from "react";

function ScheduleCard(props) {
  const deleteFunction = () => {
    props.deleteSchedule(props.schedule._id);
  };
  return (
    <div>
      <h3>Note :{props.schedule.message}</h3>

      <h4>
        {String(
          new Date(
            props.schedule.scheduleAt.toLocaleString(undefined, {
              timezone: "Asia/Kolkata",
            })
          )
        )}
      </h4>
      <div>
        <button onClick={deleteFunction}>Delete</button>
      </div>
    </div>
  );
}

export default ScheduleCard;
