import React, { useContext, useEffect, useState } from "react";
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
  GetAllUserPendingWorkloads,
  GetExtensionWorkloadRemarksFaculty,
  GetResearchWorkloadRemarksFaculty,
  GetStrategicWorkloadRemarksFaculty,
  GetTeachingWorkloadRemarksFaculty
} from "../../lib/faculty-workload.hooks";
import { User } from "../../types/User";
import Workload from "./Workload";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Colors from "../../constants/Colors";
import ReviewFacultyScreen from "./ReviewFacultyScreen";
import { UserContext } from "../../App";
import OvpaaWorkloadReview, { OvpaaWorkloads } from "./OvpaaWorkloadReview";

type WorkloadReviewScreenProps = {
  UseLogout: () => void;
};

const WorkloadSummary = ({ UseLogout }: WorkloadReviewScreenProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [allTeachingWorkload, setAllTeachingWorkload] = useState<User[]>();
  const [allResearchWorkload, setAllResearchWorkload] = useState<User[]>();
  const [allExtensionWorkload, setAllExtensionWorkload] = useState<User[]>();
  const [allStrategicWorkload, setAllStrategicWorkload] = useState<User[]>();

  const [ovpaaTeachingWorkloads, setOvpaaTeachingWorkloads] =
    useState<OvpaaWorkloads>();
  const [ovpaaResearchWorkloads, setOvpaaResearchWorkloads] =
    useState<OvpaaWorkloads>();
  const [ovpaaExtensionWorkloads, setOvpaaExtensionWorkloads] =
    useState<OvpaaWorkloads>();
  const [ovpaaStrategicWorkloads, setOvpaaStrategicWorkloads] =
    useState<OvpaaWorkloads>();

  const [isFacultySubmenuOpen, setIsFacultySubmenuOpen] = useState(false);

  const [isDataLoading, setIsDataLoading] = useState(true);

  const {
    user,
    setHasPendingExtensionWorkload,
    setHasPendingResearchWorkload,
    setHasPendingStrategicWorkload,
    setHasPendingTeachingWorkload
  } = useContext(UserContext);

  useEffect(() => {
    if (isDataLoading) {
      (async () => {
        if (user.role === "Department Chairperson") {
          const teachingWorkloads = await GetAllPendingTeachingWorkloadDC(
            user.id
          );
          setAllTeachingWorkload(teachingWorkloads.data);
          const researchWorkLoads = await GetAllPendingResearchWorkloadDC(
            user.id
          );
          setAllResearchWorkload(researchWorkLoads.data);
          const extensionWorkloads = await GetAllPendingExtensionWorkloadDC(
            user.id
          );
          setAllExtensionWorkload(extensionWorkloads.data);
          const strategicWorkloads = await GetAllPendingStrategicWorkloadDC(
            user.id
          );
          setAllStrategicWorkload(strategicWorkloads.data);
        } else if (user.role === "Dean") {
          const teachingWorkloads = await GetAllPendingTeachingWorkloadDean(
            user.id
          );
          setAllTeachingWorkload(teachingWorkloads.data);
          const researchWorkLoads = await GetAllPendingResearchWorkloadDean(
            user.id
          );
          setAllResearchWorkload(researchWorkLoads.data);
          const extensionWorkloads = await GetAllPendingExtensionWorkloadDean(
            user.id
          );
          setAllExtensionWorkload(extensionWorkloads.data);
          const strategicWorkloads = await GetAllPendingStrategicWorkloadDean(
            user.id
          );
          setAllStrategicWorkload(strategicWorkloads.data);
        } else if (user.role === "OVPAA") {
          const teachingWorkloads = await GetAllPendingTeachingWorkloadOVPAA();
          setOvpaaTeachingWorkloads(teachingWorkloads.data);
          setAllTeachingWorkload(teachingWorkloads.data);
          const researchWorkLoads = await GetAllPendingResearchWorkloadOVPAA();
          setOvpaaResearchWorkloads(researchWorkLoads.data);
          setAllResearchWorkload(researchWorkLoads.data);
          const extensionWorkloads =
            await GetAllPendingExtensionWorkloadOVPAA();
          setOvpaaExtensionWorkloads(extensionWorkloads.data);
          setAllExtensionWorkload(extensionWorkloads.data);
          const strategicWorkloads =
            await GetAllPendingStrategicWorkloadOVPAA();
          setOvpaaStrategicWorkloads(strategicWorkloads.data);
          setAllStrategicWorkload(strategicWorkloads.data);
        } else if (user?.role === "Faculty") {
          const teachingWorkloads = await GetTeachingWorkloadRemarksFaculty(
            user.id
          );
          setAllTeachingWorkload(teachingWorkloads.data);
          const researchWorkLoads = await GetResearchWorkloadRemarksFaculty(
            user.id
          );
          setAllResearchWorkload(researchWorkLoads.data);
          const extensionWorkloads = await GetExtensionWorkloadRemarksFaculty(
            user.id
          );
          setAllExtensionWorkload(extensionWorkloads.data);
          const strategicWorkloads = await GetStrategicWorkloadRemarksFaculty(
            user.id
          );
          setAllStrategicWorkload(strategicWorkloads.data);
        }

        setIsDataLoading(false);
      })();
    }
  }, [user?.role, user?.id, isDataLoading]);

  useEffect(() => {
    (async () => {
      const {
        teachingWorkloads,
        extensionWorkloads,
        researchWorkloads,
        strategicFunctionWorkloads
      } = await GetAllUserPendingWorkloads(user.email);
      setHasPendingTeachingWorkload(teachingWorkloads.length > 0);
      setHasPendingExtensionWorkload(extensionWorkloads.length > 0);
      setHasPendingResearchWorkload(researchWorkloads.length > 0);
      setHasPendingStrategicWorkload(strategicFunctionWorkloads.length > 0);
    })();
  }, []);

  return (
    <Container>
      <div>
        <TopNav profileHandler={() => setIsProfileOpen(!isProfileOpen)} />
        <ProfileTab isProfileOpen={isProfileOpen} UseLogout={UseLogout} />
      </div>
      <div style={{ flexDirection: "row", marginTop: 54, display: "flex" }}>
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
            <ScreenTitle title="Workload Summary" />
          </ScreenTitleContainer>
          <WorkloadsContainer>
            <ReviewFacultyScreen userEmail={user?.email} />
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
  @media print {
    width: 130%;
  }
`;

const ScreenTitleContainer = styled.div`
  align-self: start;
  @media print {
    display: none;
  }
`;

export default WorkloadSummary;
