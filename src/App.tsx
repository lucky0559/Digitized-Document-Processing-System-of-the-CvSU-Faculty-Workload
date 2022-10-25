import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FacultyWorkloadScreen from "./screens/FacultyWorkload/FacultyWorkloadScreen";
import TeachingWorkLoad from "./screens/FacultyWorkload/TeachingWorkload/TeachingWorkLoad";
import WelcomeScreen from "./screens/LoginRegister/WelcomeScreen";
import Profile from "./screens/Profile/Profile";
import ReportsScreen from "./screens/Reports/ReportsScreen";
import VerifyScreen from "./screens/Verify/VerifyScreen";
import WorkloadReviewScreen from "./screens/WorkloadReview/WorkloadReviewScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/teaching-workload" element={<TeachingWorkLoad />} />
        <Route path="verify/:token" element={<VerifyScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workload-review" element={<WorkloadReviewScreen />} />
        <Route path="/reports" element={<ReportsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
