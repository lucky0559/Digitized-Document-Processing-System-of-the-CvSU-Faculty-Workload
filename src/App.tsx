import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FacultyWorkloadScreen from "./screens/FacultyWorkload/FacultyWorkloadScreen";
import WelcomeScreen from "./screens/LoginRegister/WelcomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="faculty-workload" element={<FacultyWorkloadScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
