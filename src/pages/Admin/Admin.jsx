import React, { useState } from "react";
import "./Admin.css";
import MeetingList from "../../Components/Admin/MeetingList/MeetingList";
import CreateMeeting from "../../Components/Admin/CreateMeeting/CreateMeeting";

function Admin({ user, setUser }) {
  const [showError, setShowError] = useState(false);
  const [createMeeting, setCreateMeeting] = useState(false);
  const [reload, setReload] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.userEmail.value !== "shishir.gaire11@gmail.com") {
      setShowError(true);
    } else if (e.target.userName.value) {
      setUser({
        userEmail: e.target.userEmail.value,
        userName: e.target.userName.value,
        role: 1,
      });
      setShowError(false);
    } else {
      setShowError(false);
      setUser({ ...user, userEmail: e.target.userEmail.value, role: 1 });
    }
  };

  console.log(user);
  return (
    <div className="admin">
      {createMeeting ? (
        <CreateMeeting
          setCreateMeeting={setCreateMeeting}
          setReload={setReload}
          reload={reload}
        />
      ) : (
        <></>
      )}
      <div className="admin_container">
        {user.userEmail !== "shishir.gaire11@gmail.com" ? (
          <>
            <div className="heading">
              <h1>Welcome to admin dashboard</h1>
              <h3>Enter admin email to get access to create meeting</h3>
              {showError ? <p>Please Enter Correct Admin Email !</p> : <></>}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <input
                  type="text"
                  name="userName"
                  placeholder="Username (Default: user)"
                />
                <input
                  type="email"
                  name="userEmail"
                  required
                  placeholder="Admin Email"
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </>
        ) : (
          <>
            <h1>Admin DashBoard</h1>
            <MeetingList user={user} reload={reload} />
            <button
              onClick={() => {
                setCreateMeeting(!createMeeting);
              }}
              className="addMeeting"
            >
              Add Meeting
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;
