import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import ZoomMSDK from './pages/ZoomMSDK/ZoomMSDK';
import Admin from './pages/Admin/Admin';
import User from './pages/User/User';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({
    userName: "user",
    userEmail: "user@email.com",
    role: 0,
  })
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/msdk' element={<ZoomMSDK user={user} />} />
        <Route exact path="/admin" element={<Admin user={user} setUser={setUser} />} />
        <Route exact path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;