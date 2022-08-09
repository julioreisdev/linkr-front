import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import "../assets/css/reset.css";
import "../assets/css/style.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
