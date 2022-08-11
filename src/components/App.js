import TimelinePage from "./timelineRoute/timelinePage.js";

import elementStatusContext from "../context/ElementsStatus.js";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "../contexts/UserContext";

import SignUp from "./SignUp";
import Login from "./Login";

<<<<<<< HEAD
=======
import "../assets/css/reset.css";
import "../assets/css/style.css";

import avatar from "../assets/images/linkr_Logo.png";

>>>>>>> 95f2b3bcc4e11a29afc4999c293e7b47ddcbaf15
export default function App() {
  const [userdata, setUserdata] = useState("");
  const [userName, setUserName] = useState("...");
  const [userImg, setUserImg] = useState(avatar);
  const [Status, Setstatus] = useState({ dropDown: "disable" });
  return (
    <UserContext.Provider
      value={{
        userdata,
        setUserdata,
        userName,
        setUserName,
        userImg,
        setUserImg,
      }}
    >
      <elementStatusContext.Provider value={{ Status, Setstatus }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/timeline" element={<TimelinePage />} />
          </Routes>
        </BrowserRouter>
      </elementStatusContext.Provider>
    </UserContext.Provider>
  );
}
