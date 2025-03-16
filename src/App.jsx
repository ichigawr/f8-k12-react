import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homework from "./Homework";
import Day40 from "./Day40/Day40";
import Day41 from "./Day41/Day41";
import Day41hw from "./Day41/Day41hw";
import Day42 from "./Day42/Day42";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Day42 />} />
          <Route path="/homework" element={<Homework />} />
          <Route path="/homework/Day41/*" element={<Day41hw />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
