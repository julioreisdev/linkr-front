
import TimelinePage from "./timelineRoute/timelinePage.js";

import elementStatusContext from "../context/ElementsStatus.js";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "../contexts/UserContext";

import SignUp from "./SignUp";
import Login from "./Login";

export default function App() {
  const [userdata, setUserdata] = useState("");
  const[Status,Setstatus]=useState({dropDown:"disable"})
  return (
    <UserContext.Provider value={{userdata, setUserdata}}>
      <elementStatusContext.Provider value={{Status,Setstatus}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path="/timeline" element = {<TimelinePage/>} />
          </Routes>
        </BrowserRouter>
      </elementStatusContext.Provider>  
    </UserContext.Provider>
  );
}
