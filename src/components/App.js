
import elementStatusContext from "../context/ElementsStatus.js";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";


import SignUp from "./authRoute/SignUp";
import Login from "./authRoute/Login";
import TimelinePage from "./timelineRoute/timelinePage.js";
import HashtagPage from "./hashtagPage/HashtagPage.js";
import avatar from "../assets/images/linkr_Logo.png";
export default function App() {
  const [userdata, setUserdata] = useState("");
  const [userName, setUserName] = useState("...");
  const [userImg, setUserImg] = useState(avatar);
  const [postLoader, setPostLoader] = useState(false);
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
        postLoader,
        setPostLoader,
      }}
    >
      <elementStatusContext.Provider value={{ Status, Setstatus }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/hashtag/:hashtag" element={<HashtagPage/>}/>  
          </Routes>
        </BrowserRouter>
      </elementStatusContext.Provider>
    </UserContext.Provider>
  );
}
