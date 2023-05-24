import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/Footer";
import TopNav from "../../components/TopNav";
import { LoginDTO } from "../../lib/user.hooks";
import { User } from "../../types/User";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

type WelcomeScreenProps = {
  UseLogin: (value: LoginDTO) => void;
  user?: User;
};

const WelcomeScreen = ({ UseLogin, user }: WelcomeScreenProps) => {
  const [activeScreen, setActiveScreen] = useState("login");
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "System Administrator") {
      navigate("/accounts", { replace: true });
    } else if (user && user.role === "Dean") {
      console.log(user.role);
      navigate("/workload-review", { replace: true });
    } else if (
      user &&
      user.role !== "System Administrator" &&
      user.role !== "Dean"
    ) {
      console.log(user.role, "fake");
      navigate("/teaching-workload", { replace: true });
    }
  }, []);

  return (
    <WelcomeScreenContainer>
      <TopNav />
      <LoginRegisterContainer>
        {activeScreen === "login" ? (
          <LoginScreen
            onLoginButtonClick={() => setActiveScreen("login")}
            onRegisterButtonClick={() => setActiveScreen("register")}
            UseLogin={UseLogin}
            user={user}
          />
        ) : (
          <RegisterScreen onLoginButtonClick={() => setActiveScreen("login")} />
        )}
      </LoginRegisterContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </WelcomeScreenContainer>
  );
};

const WelcomeScreenContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LoginRegisterContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

const FooterContainer = styled.div`
  margin-top: auto;
`;

export default WelcomeScreen;
