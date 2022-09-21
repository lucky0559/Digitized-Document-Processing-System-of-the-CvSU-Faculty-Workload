import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FacultyWorkloadScreen from "./screens/FacultyWorkload/FacultyWorkloadScreen";
import WelcomeScreen from "./screens/LoginRegister/WelcomeScreen";
import Profile from "./screens/Profile/Profile";
import VerifyScreen from "./screens/Verify/VerifyScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/faculty-workload" element={<FacultyWorkloadScreen />} />
        <Route path="verify/:token" element={<VerifyScreen />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
