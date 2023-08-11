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

type ReportsScreenProps = {
  UseLogout: () => void;
};

const ReportsScreen = ({ UseLogout }: ReportsScreenProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [usersReports, setUsersReports] = useState<User[]>();

  const [isFacultySubmenuOpen, setIsFacultySubmenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const reports = await GetTotalWorkloadPoints();
      setUsersReports(reports.data);
    })();
  }, []);

  return (
    <Container>
      <TopNav profileHandler={() => setIsProfileOpen(!isProfileOpen)} />
      <Menu
        isFacultySubmenuOpen={isFacultySubmenuOpen}
        facultySubMenuHandler={() =>
          setIsFacultySubmenuOpen(!isFacultySubmenuOpen)
        }
      />
      <ProfileTab isProfileOpen={isProfileOpen} UseLogout={UseLogout} />
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
  margin-top: 50px;
`;

const FooterContainer = styled.div`
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  z-index: 1;
`;

export default ReportsScreen;
