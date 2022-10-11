import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import ProfileTab from "../../components/ProfileTab";
import ScreenTitle from "../../components/ScreenTitle";
import TopNav from "../../components/TopNav";
import {
  GetAllPendingExtensionWorkloadDC,
  GetAllPendingExtensionWorkloadDean,
  GetAllPendingExtensionWorkloadOVPAA,
  GetAllPendingResearchWorkloadDC,
  GetAllPendingResearchWorkloadDean,
  GetAllPendingResearchWorkloadOVPAA,
  GetAllPendingStrategicWorkloadDC,
  GetAllPendingStrategicWorkloadDean,
  GetAllPendingStrategicWorkloadOVPAA,
  GetAllPendingTeachingWorkloadDC,
  GetAllPendingTeachingWorkloadDean,
  GetAllPendingTeachingWorkloadOVPAA,
  GetExtensionWorkloadRemarksFaculty
} from "../../lib/faculty-workload.hooks";
import { User } from "../../types/User";
import RemarksWorkload from "./RemarksWorkload";
import Workload from "./Workload";

const WorkloadReviewScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [allTeachingWorkload, setAllTeachingWorkload] = useState<User[]>();
  const [allResearchWorkload, setAllResearchWorkload] = useState<User[]>();
  const [allExtensionWorkload, setAllExtensionWorkload] = useState<User[]>();
  const [allStrategicWorkload, setAllStrategicWorkload] = useState<User[]>();

  const [isDataLoading, setIsDataLoading] = useState(false);

  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setIsDataLoading(true);
    (async () => {
      if (userRole === "Department Chairperson") {
        const teachingWorkloads = await GetAllPendingTeachingWorkloadDC();
        setAllTeachingWorkload(teachingWorkloads.data);
        const researchWorkLoads = await GetAllPendingResearchWorkloadDC();
        setAllResearchWorkload(researchWorkLoads.data);
        const extensionWorkloads = await GetAllPendingExtensionWorkloadDC();
        setAllExtensionWorkload(extensionWorkloads.data);
        const strategicWorkloads = await GetAllPendingStrategicWorkloadDC();
        setAllStrategicWorkload(strategicWorkloads.data);
      } else if (userRole === "Dean") {
        const teachingWorkloads = await GetAllPendingTeachingWorkloadDean();
        setAllTeachingWorkload(teachingWorkloads.data);
        const researchWorkLoads = await GetAllPendingResearchWorkloadDean();
        setAllResearchWorkload(researchWorkLoads.data);
        const extensionWorkloads = await GetAllPendingExtensionWorkloadDean();
        setAllExtensionWorkload(extensionWorkloads.data);
        const strategicWorkloads = await GetAllPendingStrategicWorkloadDean();
        setAllStrategicWorkload(strategicWorkloads.data);
      } else if (userRole === "OVPAA") {
        const teachingWorkloads = await GetAllPendingTeachingWorkloadOVPAA();
        setAllTeachingWorkload(teachingWorkloads.data);
        const researchWorkLoads = await GetAllPendingResearchWorkloadOVPAA();
        setAllResearchWorkload(researchWorkLoads.data);
        const extensionWorkloads = await GetAllPendingExtensionWorkloadOVPAA();
        setAllExtensionWorkload(extensionWorkloads.data);
        const strategicWorkloads = await GetAllPendingStrategicWorkloadOVPAA();
        setAllStrategicWorkload(strategicWorkloads.data);
      } else if (userRole === "faculty") {
        // const teachingWorkloads = await GetAllPendingTeachingWorkloadOVPAA();
        // setAllTeachingWorkload(teachingWorkloads.data);
        // const researchWorkLoads = await GetAllPendingResearchWorkloadOVPAA();
        // setAllResearchWorkload(researchWorkLoads.data);
        const extensionWorkloads = await GetExtensionWorkloadRemarksFaculty(
          userId!
        );
        setAllExtensionWorkload(extensionWorkloads.data);
        // const strategicWorkloads = await GetAllPendingStrategicWorkloadOVPAA();
        // setAllStrategicWorkload(strategicWorkloads.data);
      }

      setIsDataLoading(false);
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
          {userRole === "faculty" ? (
            <RemarksWorkload
              teachingWorkload={allTeachingWorkload}
              researchWorkload={allResearchWorkload}
              extensionWorkload={allExtensionWorkload}
              allStrategicWorkload={allStrategicWorkload}
              isDataLoading={isDataLoading}
            />
          ) : (
            <Workload
              teachingWorkload={allTeachingWorkload}
              researchWorkload={allResearchWorkload}
              extensionWorkload={allExtensionWorkload}
              allStrategicWorkload={allStrategicWorkload}
              isDataLoading={isDataLoading}
            />
          )}
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
