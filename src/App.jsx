import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homework from "./Homework";
import Day40 from "./Day40/Day40";
import Day41 from "./Day41/Day41";
import Day41hw from "./Day41/Day41hw";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/homework" element={<Homework />}>
            <Route path="Day41/*" element={<Day41hw />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <div>{ Day41hw() }</div> */}
    </>
  );
}

export default App;
