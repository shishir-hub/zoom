import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MeetingList.css";
import { useNavigate } from "react-router-dom";

function MeetingList({ user, reload }) {
  const [meetList, setMeetList] = useState();
  const [connectingMeeting, setConnectingMeeting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}api/zoom/listmeetings`)
      .then((res) => {
        console.log(res.data.meetings);
        setMeetList(res.data.meetings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  const handleJoinMeeting = (id) => {
    console.log(id);

    setConnectingMeeting(true);

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}api/zoom/getmeeting/${id}`)
      .then((res) => {
        console.log(res.data.meeting.password);
        let password = res.data.meeting.password;
        setConnectingMeeting(false);
        if (id && password) {
          navigate(`/msdk/?mn=${id}&pw=${password}`);
        }
      })
      .catch((err) => {
        console.log(err);
        setConnectingMeeting(false);
      });
  };

  return (
    <div className="meeting">
      <h2>Meeting List</h2>
      {connectingMeeting ? (
        <span>Connecting meeting...</span>
      ) : meetList ? (
        <table>
          <tr>
            <th>Title</th>
            <th>Meeting Id</th>
            <th>Start Time</th>
          </tr>
          {meetList?.map((meeting, i) => {
            return (
              <tr
                key={i}
                className="linked"
                onClick={() => {
                  handleJoinMeeting(meeting.id);
                }}
              >
                <td>{meeting?.topic}</td>
                <td>{meeting?.id}</td>
                <td>{meeting?.start_time}</td>
              </tr>
            );
          })}
        </table>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

export default MeetingList;
