import styled from "styled-components";
import Menu from "../../components/Menu";
import ScreenTitle from "../../components/ScreenTitle";
import TopNav from "../../components/TopNav";

const AccountsScreen = () => {
  return (
    <MainContainer>
      <TopNav profileHandler={() => {}} />
      <Menu isFacultySubmenuOpen={false} facultySubMenuHandler={() => {}} />
      <BodyContainer>
        <ScreenTitle title="Accounts" />
        <Container></Container>
      </BodyContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 5px solid black;
  border-radius: 15px;
  margin: 120px auto;
  width: 70%;
`;

const Container = styled.div`
  padding: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export default AccountsScreen;
