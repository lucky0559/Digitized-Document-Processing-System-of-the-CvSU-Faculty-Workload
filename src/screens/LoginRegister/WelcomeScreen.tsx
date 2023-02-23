import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/Footer";
import TopNav from "../../components/TopNav";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const WelcomeScreen = () => {
  const [activeScreen, setActiveScreen] = useState("login");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
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
