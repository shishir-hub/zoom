import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <h1>Welcome to Zoom Meeting</h1>
        <div className="links">
          <Link to={"/admin"}>Admin</Link>
          <Link to={"/user"}>User</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
