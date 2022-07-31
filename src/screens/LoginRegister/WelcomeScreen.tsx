import React, { useState } from "react";
import styled from "styled-components";
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
    </WelcomeScreenContainer>
  );
};

const WelcomeScreenContainer = styled.div``;

const LoginRegisterContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

export default WelcomeScreen;
