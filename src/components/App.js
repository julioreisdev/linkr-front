import { BrowserRouter,Routes, Route } from "react-router-dom";
import TimelinePage from "./timelineRoute/timelinePage.js";
import { useContext,useState } from "react";
import elementStatusContext from "../context/ElementsStatus.js";
export default function App () {
  const[Status,Setstatus]=useState({dropDown:"disable"})
  return (
  <elementStatusContext.Provider value={{Status,Setstatus}}>
    <BrowserRouter>
      <Routes>
        <Route path="/timeline" element = {<TimelinePage/>} />
      </Routes>
    </BrowserRouter>
  </elementStatusContext.Provider>
  );
}