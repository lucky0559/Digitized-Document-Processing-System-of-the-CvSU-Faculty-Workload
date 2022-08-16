import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeachingWorkLoad from "./screens/FacultyWorkload/TeachingWorkload/TeachingWorkLoad";
import WelcomeScreen from "./screens/LoginRegister/WelcomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="teaching-workload" element={<TeachingWorkLoad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
