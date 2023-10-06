import { useState, createContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
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
import WorkloadSummary from "./screens/WorkloadReview/WorkloadSummary";
import Config from "./screens/SystemConfig/Config";
import { getConfig } from "./lib/config.hooks";

export const UserContext = createContext<any>(null);

function App() {
  const [user, setUser] = useState<User>();

  const hasAccessInFacultyWorkloads =
    user?.role === "Department Chairperson" || user?.role === "Faculty";

  const hasAccessInWorkloadReview =
    user?.role === "Department Chairperson" ||
    user?.role === "Dean" ||
    user?.role === "OVPAA";

  const hasAccessInWorkloadSummary =
    user?.role === "Department Chairperson" || user?.role === "Faculty";

  const hasAccessInReports =
    user?.role === "Department Chairperson" ||
    user?.role === "Dean" ||
    user?.role === "OVPAA";

  const [hasPendingTeachingWorkload, setHasPendingTeachingWorkload] =
    useState(false);
  const [hasPendingExtensionWorkload, setHasPendingExtensionWorkload] =
    useState(false);
  const [hasPendingResearchWorkload, setHasPendingResearchWorkload] =
    useState(false);
  const [hasPendingStrategicWorkload, setHasPendingStrategicWorkload] =
    useState(false);

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");

  const UseLogin = async (values: LoginDTO) => {
    setLoginError("");
    await Login(values)
      .then(async res => {
        localStorage.setItem("userId", res.data.id);
        const {
          teachingWorkloads,
          extensionWorkloads,
          researchWorkloads,
          strategicFunctionWorkloads
        } = await GetAllUserPendingWorkloads(res.data.email);
        const { data: config } = await getConfig();

        const isAbleToSubmit =
          new Date() >= new Date(config.submissionDateStart) &&
          new Date() <= new Date(config.submissionDateEnd);

        setHasPendingTeachingWorkload(
          !!teachingWorkloads.length && teachingWorkloads[0].isSubmitted
        );
        setHasPendingExtensionWorkload(
          !!extensionWorkloads.length && extensionWorkloads[0].isSubmitted
        );
        setHasPendingResearchWorkload(
          !!researchWorkloads.length && researchWorkloads[0].isSubmitted
        );
        setHasPendingStrategicWorkload(
          !!strategicFunctionWorkloads.length &&
            strategicFunctionWorkloads[0].isSubmitted
        );
        if (res.data.role === "System Administrator") {
          navigate("accounts", { replace: true });
        } else if (res.data.role === "Dean" || res.data.role === "OVPAA") {
          navigate("/workload-review", { replace: true });
        } else if (!!!teachingWorkloads.length && isAbleToSubmit) {
          navigate("teaching-workload", { replace: true });
        } else if (!!!extensionWorkloads.length && isAbleToSubmit) {
          navigate("extension-workload", { replace: true });
        } else if (!!!researchWorkloads.length && isAbleToSubmit) {
          navigate("research-workload", { replace: true });
        } else if (!!!strategicFunctionWorkloads.length && isAbleToSubmit) {
          navigate("strategic-function-workload", { replace: true });
        } else {
          navigate("workload-summary", { replace: true });
        }
        setUser(res.data);
      })
      .catch(e => {
        setLoginError(e.response.data.message);
      });
  };

  const UseLogout = () => {
    localStorage.removeItem("userId");
    setUser(undefined);
    navigate("/", { replace: true });
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
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
            },
            loginError
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
              path="/workload-summary"
              element={
                <Protected isSignedIn={!!user || hasAccessInWorkloadSummary}>
                  <WorkloadSummary UseLogout={UseLogout} />
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
                  isSignedIn={
                    !!(
                      user &&
                      (user.role === "System Administrator" ||
                        user.role === "OVPAA")
                    )
                  }
                >
                  <AccountsScreen UseLogout={UseLogout} />
                </Protected>
              }
            />
            <Route
              path="/config"
              element={
                <Protected isSignedIn={!!user && user.role === "OVPAA"}>
                  <Config UseLogout={UseLogout} />
                </Protected>
              }
            />
          </Routes>
        </UserContext.Provider>
      </LocalizationProvider>
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
