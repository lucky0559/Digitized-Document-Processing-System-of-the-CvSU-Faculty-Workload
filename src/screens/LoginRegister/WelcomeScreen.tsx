import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import TopNav from "../../components/TopNav";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const WelcomeScreen = () => {
  const [activeScreen, setActiveScreen] = useState("login");
  return (
    <WelcomeScreenContainer>
      <TopNav />
      <LoginRegisterContainer>
        {activeScreen === "login" ? <LoginScreen /> : <RegisterScreen />}
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
