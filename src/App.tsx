import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Login, LoginDTO } from "./lib/user.hooks";
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
import { User } from "./types/User";
import ReviewFacultyScreen from "./screens/WorkloadReview/ReviewFacultyScreen";

function App() {
  const userRole = localStorage.getItem("role");

  const [user, setUser] = useState<User>();

  const hasAccessInFacultyWorkloads =
    userRole === "Department Chairperson" ||
    userRole === "Dean" ||
    userRole === "Faculty";

  const hasAccessInWorkloadReview =
    userRole === "Department Chairperson" ||
    userRole === "Dean" ||
    userRole === "OVPAA" ||
    userRole === "Faculty";

  const hasAccessInReports =
    userRole === "Department Chairperson" ||
    userRole === "Dean" ||
    userRole === "OVPAA";

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const UseLogin = async (values: LoginDTO) => {
    await Login(values).then(res => {
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("role", res.data.role);
      if (res.data.role === "System Administrator") {
        navigate("accounts", { replace: true });
      } else {
        navigate("teaching-workload", { replace: true });
      }
      setUser(res.data);
    });
  };

  const UseLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setUser(undefined);
    navigate("/", { replace: true });
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomeScreen UseLogin={UseLogin} />} />
        <Route
          path="/teaching-workload"
          element={
            <Protected
              isSignedIn={
                !!userId &&
                !!(userId && userRole) &&
                hasAccessInFacultyWorkloads
              }
            >
              <TeachingWorkLoad UseLogout={UseLogout} />
            </Protected>
          }
        />
        <Route
          path="/research-workload"
          element={
            <Protected
              isSignedIn={
                (!!user && !!(userId && userRole)) ||
                hasAccessInFacultyWorkloads
              }
            >
              <ResearchWorkload UseLogout={UseLogout} />
            </Protected>
          }
        />
        <Route
          path="/extension-workload"
          element={
            <Protected
              isSignedIn={
                (!!user && !!(userId && userRole)) ||
                hasAccessInFacultyWorkloads
              }
            >
              <ExtensionWorkload UseLogout={UseLogout} />
            </Protected>
          }
        />
        <Route
          path="/strategic-function-workload"
          element={
            <Protected
              isSignedIn={
                (!!user && !!(userId && userRole)) ||
                hasAccessInFacultyWorkloads
              }
            >
              <StrategicFunction UseLogout={UseLogout} />
            </Protected>
          }
        />
        <Route path="verify/:token" element={<VerifyScreen />} />
        <Route
          path="/profile"
          element={
            <Protected
              isSignedIn={
                !!user || !!(userId && userRole !== "System Administrator")
              }
            >
              <Profile UseLogout={UseLogout} />
            </Protected>
          }
        />
        <Route
          path="/workload-review"
          element={
            <Protected
              isSignedIn={
                (!!user && !!(userId && userRole)) || hasAccessInWorkloadReview
              }
            >
              <WorkloadReviewScreen UseLogout={UseLogout} />
            </Protected>
          }
        />
        <Route
          path="/reports"
          element={
            <Protected
              isSignedIn={
                (!!user && !!(userId && userRole)) || hasAccessInReports
              }
            >
              <ReportsScreen UseLogout={UseLogout} />
            </Protected>
          }
        />
        <Route path="*" element={<UnauthorizedPage />} />
        <Route
          path="/accounts"
          element={
            <Protected
              isSignedIn={
                !!user || !!(userId && userRole === "System Administrator")
              }
            >
              <AccountsScreen UseLogout={UseLogout} />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}

type ProtectedProps = {
  isSignedIn: boolean;
  children: any;
};

export const Protected = ({ isSignedIn, children }: ProtectedProps) => {
  if (!isSignedIn) {
    return <Navigate to="*" replace />;
  }
  return children;
};

export default App;
