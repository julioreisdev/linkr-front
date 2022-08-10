import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "../contexts/UserContext";

import SignUp from "./SignUp";
import Login from "./Login";
import TimeLine from "./TimeLine";

import "../assets/css/reset.css";
import "../assets/css/style.css";

export default function App() {
  const [userdata, setUserdata] = useState("");

  return (
    <UserContext.Provider value={{userdata, setUserdata}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/timeline' element={<TimeLine />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
