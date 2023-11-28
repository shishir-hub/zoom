import React, { useState } from "react";
import "./CreateMeeting.css";
import { RiLoader4Fill } from "react-icons/ri";
import axios from "axios";

function CreateMeeting({ setCreateMeeting, setReload, reload }) {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      type: 2,
      topic: e.target.topic.value,
      start_time: `${e.target.start_time.value}Z`,
      duration: e.target.duration.value,
    };

    console.log(data);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}api/zoom/create`, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setCreateMeeting(false);
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="back">
      <div className="create">
        <h1>Create Meeting</h1>
        <form onSubmit={handleFormSubmit} disabled={loading}>
          <div className="inputs">
            <label htmlFor="topic">Meeting Title</label>
            <input type="text" name="topic" required />
          </div>
          <div className="inputs">
            <label htmlFor="duration">Duration (In minutes)</label>
            <input defaultValue={30} type="number" name="duration" required />
          </div>
          <div className="inputs">
            <label htmlFor="start_time">Meeting Title</label>
            <input type="datetime-local" name="start_time" required />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? <RiLoader4Fill /> : "Submit"}
          </button>
          <button
            disabled={loading}
            type="button"
            onClick={() => {
              setCreateMeeting(false);
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateMeeting;
