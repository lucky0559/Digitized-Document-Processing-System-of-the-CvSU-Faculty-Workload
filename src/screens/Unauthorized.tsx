import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/Menu";
import TopNav from "../components/TopNav";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <TopNav profileHandler={() => {}} />
      <BodyContainer>
        <UnauthorizedContainer>
          <WarningImage src={require("../assets/warning.png")} />
          <UnauthorizedText>Unauthorized!</UnauthorizedText>
        </UnauthorizedContainer>
        <LoginLinkText onClick={() => navigate("/")}>
          Go back to homepage.
        </LoginLinkText>
      </BodyContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 120px auto;
`;

const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LoginLinkText = styled.span`
  text-transform: uppercase;
  font-family: HurmeGeometricSans3;
  font-size: 28px;
  text-decoration: underline;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.4;
  }
`;

const WarningImage = styled.img`
  width: 150px;
  height: 150px;
`;

const UnauthorizedText = styled.h1`
  font-size: 80px;
`;

export default UnauthorizedPage;
