import React, { useState, createContext } from "react";
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
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import { GetAllUserPendingWorkloads } from "./lib/faculty-workload.hooks";

export const UserContext = createContext<any>(null);

function App() {
  const userRole = localStorage.getItem("role");

  const [user, setUser] = useState<User>();

  const hasAccessInFacultyWorkloads =
    user?.role === "Department Chairperson" || user?.role === "Faculty";

  const hasAccessInWorkloadReview =
    user?.role === "Department Chairperson" ||
    user?.role === "Dean" ||
    user?.role === "OVPAA" ||
    user?.role === "Faculty";

  const hasAccessInReports =
    user?.role === "Department Chairperson" ||
    user?.role === "Dean" ||
    user?.role === "OVPAA";

  const userId = localStorage.getItem("userId");

  const [hasPendingTeachingWorkload, setHasPendingTeachingWorkload] =
    useState(false);
  const [hasPendingExtensionWorkload, setHasPendingExtensionWorkload] =
    useState(false);
  const [hasPendingResearchWorkload, setHasPendingResearchWorkload] =
    useState(false);
  const [hasPendingStrategicWorkload, setHasPendingStrategicWorkload] =
    useState(false);

  const navigate = useNavigate();

  const UseLogin = async (values: LoginDTO) => {
    await Login(values).then(async res => {
      localStorage.setItem("userId", res.data.id);
      // localStorage.setItem("role", res.data.role);
      const {
        teachingWorkloads,
        extensionWorkloads,
        researchWorkloads,
        strategicFunctionWorkloads
      } = await GetAllUserPendingWorkloads(res.data.email);
      setHasPendingTeachingWorkload(teachingWorkloads.length > 0);
      setHasPendingExtensionWorkload(extensionWorkloads.length > 0);
      setHasPendingResearchWorkload(researchWorkloads.length > 0);
      setHasPendingStrategicWorkload(strategicFunctionWorkloads.length > 0);
      if (res.data.role === "System Administrator") {
        navigate("accounts", { replace: true });
      } else if (res.data.role === "Dean" || res.data.role === "OVPAA") {
        navigate("/workload-review", { replace: true });
      } else if (teachingWorkloads.length === 0) {
        navigate("teaching-workload", { replace: true });
      } else if (extensionWorkloads.length === 0) {
        navigate("extension-workload", { replace: true });
      } else if (researchWorkloads.length === 0) {
        navigate("research-workload", { replace: true });
      } else if (strategicFunctionWorkloads.length === 0) {
        navigate("strategic-function-workload", { replace: true });
      } else {
        navigate("workload-review", { replace: true });
      }
      setUser(res.data);
    });
  };

  const UseLogout = () => {
    localStorage.removeItem("userId");
    // localStorage.removeItem("role");
    setUser(undefined);
    navigate("/", { replace: true });
  };

  return (
    <>
      <UserContext.Provider
        value={{
          user: user,
          hasPendingTeachingWorkload,
          hasPendingExtensionWorkload,
          hasPendingResearchWorkload,
          hasPendingStrategicWorkload,
          actions: {
            setHasPendingExtensionWorkload,
            setHasPendingResearchWorkload,
            setHasPendingStrategicWorkload,
            setHasPendingTeachingWorkload
          }
        }}
      >
        <Routes>
          <Route path="/" element={<WelcomeScreen UseLogin={UseLogin} />} />
          <Route
            path="/teaching-workload"
            element={
              <Protected
                isSignedIn={
                  !!user ||
                  hasAccessInFacultyWorkloads ||
                  !hasPendingTeachingWorkload
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
                  !!user ||
                  hasAccessInFacultyWorkloads ||
                  !hasPendingResearchWorkload
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
                  !!user ||
                  hasAccessInFacultyWorkloads ||
                  !hasPendingExtensionWorkload
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
                  !!user ||
                  hasAccessInFacultyWorkloads ||
                  !hasPendingStrategicWorkload
                }
              >
                <StrategicFunction UseLogout={UseLogout} />
              </Protected>
            }
          />
          <Route path="verify/:token" element={<VerifyScreen />} />
          <Route
            path="reset-password/:resetPasswordCode"
            element={<ResetPasswordScreen />}
          />
          <Route
            path="/profile"
            element={
              <Protected
                isSignedIn={!!(user && user.role !== "System Administrator")}
              >
                <Profile UseLogout={UseLogout} />
              </Protected>
            }
          />
          <Route
            path="/workload-review"
            element={
              <Protected isSignedIn={!!user || hasAccessInWorkloadReview}>
                <WorkloadReviewScreen UseLogout={UseLogout} />
              </Protected>
            }
          />
          <Route
            path="/reports"
            element={
              <Protected isSignedIn={!!user || hasAccessInReports}>
                <ReportsScreen UseLogout={UseLogout} />
              </Protected>
            }
          />
          <Route path="*" element={<UnauthorizedPage />} />
          <Route
            path="/accounts"
            element={
              <Protected
                isSignedIn={!!(user && user.role === "System Administrator")}
              >
                <AccountsScreen UseLogout={UseLogout} />
              </Protected>
            }
          />
        </Routes>
      </UserContext.Provider>
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
