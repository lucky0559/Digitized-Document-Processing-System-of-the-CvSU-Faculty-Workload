import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import ProfileTab from "../../components/ProfileTab";
import ScreenTitle from "../../components/ScreenTitle";
import TopNav from "../../components/TopNav";
import { GetTotalWorkloadPoints } from "../../lib/faculty-workload.hooks";
import { User } from "../../types/User";
import ReportsLists from "./ReportsLists";

const ReportsScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [usersReports, setUsersReports] = useState<User[]>();

  useEffect(() => {
    (async () => {
      const reports = await GetTotalWorkloadPoints();
      setUsersReports(reports.data);
    })();
  }, []);

  return (
    <Container>
      <TopNav
        menuHandler={() => setIsMenuOpen(!isMenuOpen)}
        profileHandler={() => setIsProfileOpen(!isProfileOpen)}
      />
      <Menu isMenuOpen={isMenuOpen} />
      <ProfileTab isProfileOpen={isProfileOpen} />
      <BodyContainer>
        <ScreenTitle title="Reports" />
        <ReportsLists usersReports={usersReports} />
      </BodyContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FooterContainer = styled.div`
  margin-top: auto;
`;

const WorkloadsContainer = styled.div`
  margin-right: 20%;
`;

export default ReportsScreen;
