import { BrowserRouter,Routes, Route } from "react-router-dom";
import TimelinePage from "./timelineRoute/timelinePage.js";
export default function App () {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/timeline" element = {<TimelinePage/>} />
      </Routes>
    </BrowserRouter>
  );
}