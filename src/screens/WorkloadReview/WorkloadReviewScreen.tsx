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
  GetExtensionWorkloadRemarksFaculty,
  GetResearchWorkloadRemarksFaculty,
  GetStrategicWorkloadRemarksFaculty,
  GetTeachingWorkloadRemarksFaculty
} from "../../lib/faculty-workload.hooks";
import { User } from "../../types/User";
import RemarksWorkload from "./RemarksWorkload";
import Workload from "./Workload";

type WorkloadReviewScreenProps = {
  UseLogout: () => void;
};

const WorkloadReviewScreen = ({ UseLogout }: WorkloadReviewScreenProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [allTeachingWorkload, setAllTeachingWorkload] = useState<User[]>();
  const [allResearchWorkload, setAllResearchWorkload] = useState<User[]>();
  const [allExtensionWorkload, setAllExtensionWorkload] = useState<User[]>();
  const [allStrategicWorkload, setAllStrategicWorkload] = useState<User[]>();

  const [isFacultySubmenuOpen, setIsFacultySubmenuOpen] = useState(false);

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
      } else if (userRole === "Faculty") {
        const teachingWorkloads = await GetTeachingWorkloadRemarksFaculty(
          userId!
        );
        setAllTeachingWorkload(teachingWorkloads.data);
        const researchWorkLoads = await GetResearchWorkloadRemarksFaculty(
          userId!
        );
        setAllResearchWorkload(researchWorkLoads.data);
        const extensionWorkloads = await GetExtensionWorkloadRemarksFaculty(
          userId!
        );
        setAllExtensionWorkload(extensionWorkloads.data);
        const strategicWorkloads = await GetStrategicWorkloadRemarksFaculty(
          userId!
        );
        setAllStrategicWorkload(strategicWorkloads.data);
      }

      setIsDataLoading(false);
    })();
  }, []);

  return (
    <Container>
      <div>
        <TopNav profileHandler={() => setIsProfileOpen(!isProfileOpen)} />
        <ProfileTab isProfileOpen={isProfileOpen} UseLogout={UseLogout} />
      </div>
      <div style={{ flexDirection: "row", marginTop: 54, display: "flex" }}>
        {/* <div style={{ backgroundColor: "red" }}>
          <Menu
            isFacultySubmenuOpen={isFacultySubmenuOpen}
            facultySubMenuHandler={() =>
              setIsFacultySubmenuOpen(!isFacultySubmenuOpen)
            }
          />
        </div> */}
        <div style={{ width: 248 }}>
          <Menu
            isFacultySubmenuOpen={isFacultySubmenuOpen}
            facultySubMenuHandler={() =>
              setIsFacultySubmenuOpen(!isFacultySubmenuOpen)
            }
          />
        </div>
        <BodyContainer>
          <ScreenTitleContainer>
            <ScreenTitle title="Workload Review" />
          </ScreenTitleContainer>
          <WorkloadsContainer>
            {userRole === "Faculty" ? (
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
      </div>
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
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

const FooterContainer = styled.div`
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  z-index: 1;
`;

const WorkloadsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScreenTitleContainer = styled.div`
  align-self: start;
`;

export default WorkloadReviewScreen;
