import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountsScreen from "./screens/Admin/AccountsScreen";
import ExtensionWorkload from "./screens/FacultyWorkload/ExtensionWorkload/ExtensionWorkload";
import ResearchWorkload from "./screens/FacultyWorkload/ResearchWorkload/ResearchWorkload";
import StrategicFunction from "./screens/FacultyWorkload/StrategicFunction/StrategicFunction";
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
        <Route path="/research-workload" element={<ResearchWorkload />} />
        <Route path="/extension-workload" element={<ExtensionWorkload />} />
        <Route
          path="/strategic-function-workload"
          element={<StrategicFunction />}
        />
        <Route path="verify/:token" element={<VerifyScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workload-review" element={<WorkloadReviewScreen />} />
        <Route path="/reports" element={<ReportsScreen />} />
        <Route path="/accounts" element={<AccountsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
