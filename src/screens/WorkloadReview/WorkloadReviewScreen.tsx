import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import ProfileTab from "../../components/ProfileTab";
import ScreenTitle from "../../components/ScreenTitle";
import TopNav from "../../components/TopNav";
import {
  GetAllExtensionWorkload,
  GetAllResearchWorkload,
  GetAllStrategicWorkload,
  GetAllTeachingWorkload
} from "../../lib/faculty-workload.hooks";
import { User } from "../../types/User";
import Workload from "./Workload";

const WorkloadReviewScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // const allTeachingWorkload = await GetAllTeachingWorkload();
  const [allTeachingWorkload, setAllTeachingWorkload] = useState<User[]>();
  const [allResearchWorkload, setAllResearchWorkload] = useState<User[]>();
  const [allExtensionWorkload, setAllExtensionWorkload] = useState<User[]>();
  const [allStrategicWorkload, setAllStrategicWorkload] = useState<User[]>();

  useEffect(() => {
    (async () => {
      const teachingWorkloads = await GetAllTeachingWorkload();
      setAllTeachingWorkload(teachingWorkloads.data);
      const researchWorkLoads = await GetAllResearchWorkload();
      setAllResearchWorkload(researchWorkLoads.data);
      const extensionWorkloads = await GetAllExtensionWorkload();
      setAllExtensionWorkload(extensionWorkloads.data);
      const strategicWorkloads = await GetAllStrategicWorkload();
      setAllStrategicWorkload(strategicWorkloads.data);
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
        <ScreenTitle title="Workload Review" />
        <WorkloadsContainer>
          <Workload
            teachingWorkload={allTeachingWorkload}
            researchWorkload={allResearchWorkload}
            extensionWorkload={allExtensionWorkload}
            allStrategicWorkload={allStrategicWorkload}
          />
        </WorkloadsContainer>
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

export default WorkloadReviewScreen;
