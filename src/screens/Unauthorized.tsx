import styled from "styled-components";
import Menu from "../components/Menu";
import TopNav from "../components/TopNav";

const UnauthorizedPage = () => {
  return (
    <MainContainer>
      <TopNav profileHandler={() => {}} />
      <BodyContainer>
        <UnauthorizedText>Unauthorized!</UnauthorizedText>
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

const UnauthorizedText = styled.text``;

export default UnauthorizedPage;
