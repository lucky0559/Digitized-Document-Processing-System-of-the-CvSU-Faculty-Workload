import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Default } from "./constants/Defaults";
import AccountsScreen from "./screens/Admin/AccountsScreen";
import ExtensionWorkload from "./screens/FacultyWorkload/ExtensionWorkload/ExtensionWorkload";
import ResearchWorkload from "./screens/FacultyWorkload/ResearchWorkload/ResearchWorkload";
import StrategicFunction from "./screens/FacultyWorkload/StrategicFunction/StrategicFunction";
import TeachingWorkLoad from "./screens/FacultyWorkload/TeachingWorkload/TeachingWorkLoad";
import WelcomeScreen from "./screens/LoginRegister/WelcomeScreen";
import Profile from "./screens/Profile/Profile";
import ReportsScreen from "./screens/Reports/ReportsScreen";
import UnauthorizedPage from "./screens/Unauthorized";
import VerifyScreen from "./screens/Verify/VerifyScreen";
import WorkloadReviewScreen from "./screens/WorkloadReview/WorkloadReviewScreen";

function App() {
  const userAccessToken = localStorage.getItem(
    Default.ACCESS_TOKEN_STORAGE_KEY
  );
  const userRefreshToken = localStorage.getItem(
    Default.REFRESH_TOKEN_STORAGE_KEY
  );
  const userRole = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route
          path="/teaching-workload"
          element={
            userAccessToken && userRefreshToken ? (
              <TeachingWorkLoad />
            ) : (
              <UnauthorizedPage />
            )
          }
        />
        <Route
          path="/research-workload"
          element={
            userAccessToken && userRefreshToken ? (
              <ResearchWorkload />
            ) : (
              <UnauthorizedPage />
            )
          }
        />
        <Route
          path="/extension-workload"
          element={
            userAccessToken && userRefreshToken ? (
              <ExtensionWorkload />
            ) : (
              <UnauthorizedPage />
            )
          }
        />
        <Route
          path="/strategic-function-workload"
          element={
            userAccessToken && userRefreshToken ? (
              <StrategicFunction />
            ) : (
              <UnauthorizedPage />
            )
          }
        />
        <Route path="verify/:token" element={<VerifyScreen />} />
        <Route
          path="/profile"
          element={
            userAccessToken && userRefreshToken ? (
              <Profile />
            ) : (
              <UnauthorizedPage />
            )
          }
        />
        <Route
          path="/workload-review"
          element={
            userAccessToken && userRefreshToken ? (
              <WorkloadReviewScreen />
            ) : (
              <UnauthorizedPage />
            )
          }
        />
        <Route
          path="/reports"
          element={
            userAccessToken && userRefreshToken ? (
              <ReportsScreen />
            ) : (
              <UnauthorizedPage />
            )
          }
        />
        <Route
          path="/accounts"
          element={
            userAccessToken && userRefreshToken ? (
              <AccountsScreen />
            ) : (
              <UnauthorizedPage />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
