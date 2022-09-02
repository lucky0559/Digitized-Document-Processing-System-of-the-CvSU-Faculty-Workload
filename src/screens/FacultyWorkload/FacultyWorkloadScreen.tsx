import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import ProfileTab from "../../components/ProfileTab";
import ScreenTitle from "../../components/ScreenTitle";
import TopNav from "../../components/TopNav";
import ExtensionWorkload from "./ExtensionWorkload/ExtensionWorkload";
import ResearchWorkload from "./ResearchWorkload/ResearchWorkload";
import ResearchWorkload1 from "./ResearchWorkload/ResearchWorkload1";
import ResearchWorkload2 from "./ResearchWorkload/ResearchWorkload2";
import ResearchWorkload3 from "./ResearchWorkload/ResearchWorkload3";
import StrategicFunction from "./StrategicFunction/StrategicFunction";
import TeachingWorkLoad from "./TeachingWorkload/TeachingWorkLoad";

export type TeachingWorkLoadProps = {
  numberOfPreparations?: string;
  contactHours?: string;
  totalNoOfHours?: string;
  twlFile?: File;
};

type ResearchWorkLoadProps = {
  titleOfStudy?: string;
  fundingOfStudy?: string;
  typeOfStudy?: string;
  designationStudy?: string;
  fundGenerated?: string;
  disseminatedResearch?: string;
  rwlFile?: File;
  rwlFile1?: File;
  rwlFile2?: File;
};

type ExtensionWorkloadProps = {
  designationExtensionActivity?: string;
  extensionActivityFile?: File;
  resourcePerson?: string;
  certificateFile?: File;
  totalNumberHours?: string;
  summaryOfHoursFile?: File;
};

type StrategicFunctionProps = {
  designationUniversityLevel?: string[];
  approvedUniversityDesignationFile?: File;
};

const FacultyWorkloadScreen = () => {
  const [teachingWorkLoad, setTeachingWorkLoad] =
    useState<TeachingWorkLoadProps>();
  const [researchWorkLoad, setResearchWorkLoad] =
    useState<ResearchWorkLoadProps>();
  const [extensionWorkload, setExtensionWorkload] =
    useState<ExtensionWorkloadProps>();
  const [strategicFunction, setStrategicFunction] =
    useState<StrategicFunctionProps>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  //TWL
  const [numberOfPreparations, setNumberOfPreparations] = useState("");
  const [contactHours, setContactHours] = useState("");
  const [totalNoOfHours, setTotalNoOfHours] = useState("");
  const [twlFile, setTwlFile] = useState<File>();

  //RWL
  const [titleOfStudy, setTitleOfStudy] = useState("");
  const [fundingOfStudy, setFundingOfStudy] = useState<string | undefined>("");
  const [typeOfStudy, setTypeOfStudy] = useState("");
  const [designationStudy, setDesignationStudy] = useState<string | undefined>(
    ""
  );
  const [disseminatedResearch, setDisseminatedResearch] = useState<
    string | undefined
  >("");
  const [rwlFile, setRwlFile] = useState<File>();
  const [rwlFile1, setRwlFile1] = useState<File>();
  const [rwlFile2, setRwlFile2] = useState<File>();
  const [fundGenerated, setFundGenerated] = useState<string | undefined>("");

  //EWL
  const [designationExtensionActivity, setDesignationExtensionActivity] =
    useState<string | undefined>("");
  const [extensionActivityFile, setExtensionActivityFile] = useState<File>();
  const [resourcePerson, setResourcePerson] = useState<string | undefined>("");
  const [certificateFile, setCertificateFile] = useState<File>();
  const [totalNumberHours, setTotalNumberHours] = useState<string | undefined>(
    ""
  );
  const [summaryOfHoursFile, setSummaryOfHoursFile] = useState<File>();

  //SF
  const [designationUniversityLevel, setDesignationUniversityLevel] = useState<
    string[] | undefined
  >([]);

  const [
    approvedUniversityDesignationFile,
    setApprovedUniversityDesignationFile
  ] = useState<File>();

  const [steps, setSteps] = useState(1);

  //TWL
  const teachingWorkLoadHandler = () => {
    setTeachingWorkLoad({
      numberOfPreparations,
      contactHours,
      totalNoOfHours,
      twlFile
    });
    setSteps(steps + 1);
  };

  const numberOfPreparationsHandler = (value: string) => {
    setNumberOfPreparations(value);
  };

  const contactHoursHandler = (value: string) => {
    setContactHours(value);
  };

  const totalNoOfHoursHandler = (value: string) => {
    setTotalNoOfHours(value);
  };

  const twlFileHandler = (value?: File) => {
    setTwlFile(value);
  };

  //RWL
  const researchWorkLoadHandler = () => {
    if (fundingOfStudy) {
      setResearchWorkLoad({
        ...researchWorkLoad,
        titleOfStudy,
        fundingOfStudy
      });
    } else {
      setResearchWorkLoad({
        titleOfStudy,
        fundingOfStudy,
        ...researchWorkLoad
      });
    }
    setSteps(steps + 1);
  };

  const titleOfStudyHandler = (value: string) => {
    setTitleOfStudy(value);
  };

  const fundingOfStudyHandler = (value?: string) => {
    setFundingOfStudy(value);
  };

  const backHandler = () => {
    if (steps > 1) {
      setSteps(steps - 1);
    }
  };

  //RWL1
  const researchWorkLoadHandler1 = () => {
    if (designationStudy) {
      setResearchWorkLoad({
        ...researchWorkLoad,
        typeOfStudy,
        designationStudy,
        rwlFile
      });
    } else {
      setResearchWorkLoad({
        typeOfStudy,
        designationStudy,
        rwlFile,
        ...researchWorkLoad
      });
    }
    setSteps(steps + 1);
  };

  const typeOfStudyHandler = (value: string) => {
    setTypeOfStudy(value);
  };

  const designationStudyHandler = (value?: string) => {
    setDesignationStudy(value);
  };

  const rwlFileHandler = (value?: File) => {
    setRwlFile(value);
  };

  //RWL2
  const researchWorkLoadHandler2 = () => {
    if (fundGenerated) {
      setResearchWorkLoad({
        ...researchWorkLoad,
        fundGenerated,
        rwlFile1
      });
    } else {
      setResearchWorkLoad({
        fundGenerated,
        rwlFile1,
        ...researchWorkLoad
      });
    }
    setSteps(steps + 1);
  };

  const fundGeneratedHandler = (value?: string) => {
    setFundGenerated(value);
  };

  const rwlFile1Handler = (value?: File) => {
    setRwlFile1(value);
  };

  //RWL3
  const researchWorkLoadHandler3 = () => {
    setResearchWorkLoad({
      ...researchWorkLoad,
      disseminatedResearch,
      rwlFile2
    });
    setSteps(steps + 1);
  };

  const disseminatedResearchHandler = (value?: string) => {
    setDisseminatedResearch(value);
  };

  const rwlFile2Handler = (value?: File) => {
    setRwlFile2(value);
  };

  //EWL
  const extensionWorkloadHandler = () => {
    setExtensionWorkload({
      designationExtensionActivity,
      extensionActivityFile,
      resourcePerson,
      certificateFile,
      totalNumberHours,
      summaryOfHoursFile
    });
    setSteps(steps + 1);
  };

  const designationExtensionActivityHandler = (value?: string) => {
    setDesignationExtensionActivity(value);
  };

  const extensionActivityFileHandler = (value?: File) => {
    setExtensionActivityFile(value);
  };

  const resourcePersonHandler = (value?: string) => {
    setResourcePerson(value);
  };

  const certificateFileHandler = (value?: File) => {
    setCertificateFile(value);
  };

  const totalNumberHoursHandler = (value?: string) => {
    setTotalNumberHours(value);
  };

  const summaryOfHoursFileHandler = (value?: File) => {
    setSummaryOfHoursFile(value);
  };

  //SF
  const setStrategicFunctionHandler = () => {
    setStrategicFunction({
      designationUniversityLevel,
      approvedUniversityDesignationFile
    });
  };

  const designationUniversityLevelHandler = (value?: string[]) => {
    setDesignationUniversityLevel(value);
  };

  const approvedUniversityDesignationFileHandler = (value?: File) => {
    setApprovedUniversityDesignationFile(value);
  };

  return (
    <Container>
      <TopNav
        menuHandler={() => setIsMenuOpen(!isMenuOpen)}
        profileHandler={() => setIsProfileOpen(!isProfileOpen)}
      />
      <Menu isMenuOpen={isMenuOpen} />
      <ProfileTab isProfileOpen={isProfileOpen} />
      <BodyContainer>
        <ScreenTitle title="Faculty Workload" />
        {steps === 1 && (
          <TeachingWorkLoad
            teachingWorkLoadHandler={teachingWorkLoadHandler}
            numberOfPreparationsHandler={numberOfPreparationsHandler}
            contactHoursHandler={contactHoursHandler}
            totalNoOfHoursHandler={totalNoOfHoursHandler}
            twlFileHandler={twlFileHandler}
            numberOfPreparations={numberOfPreparations}
            contactHours={contactHours}
            totalNoOfHours={totalNoOfHours}
            twlFileName={teachingWorkLoad?.twlFile?.name}
          />
        )}
        {steps === 2 && (
          <ResearchWorkload
            researchWorkLoadHandler={researchWorkLoadHandler}
            titleOfStudyHandler={titleOfStudyHandler}
            fundingOfStudyHandler={fundingOfStudyHandler}
            backHandler={backHandler}
            titleOfStudy={titleOfStudy}
            fundingOfStudy={researchWorkLoad?.fundingOfStudy}
          />
        )}
        {steps === 3 && (
          <ResearchWorkload1
            researchWorkLoadHandler1={researchWorkLoadHandler1}
            typeOfStudyHandler={typeOfStudyHandler}
            designationStudyHandler={designationStudyHandler}
            backHandler={backHandler}
            rwlFileHandler={rwlFileHandler}
            typeOfStudy={typeOfStudy}
            designationStudy={researchWorkLoad?.designationStudy}
            rwlFileName={researchWorkLoad?.rwlFile?.name}
          />
        )}
        {steps === 4 && (
          <ResearchWorkload2
            researchWorkLoadHandler2={researchWorkLoadHandler2}
            fundGeneratedHandler={fundGeneratedHandler}
            rwlFile1Handler={rwlFile1Handler}
            backHandler={backHandler}
            fundGenerated={researchWorkLoad?.fundGenerated}
            rwlFileName1={researchWorkLoad?.rwlFile1?.name}
          />
        )}
        {steps === 5 && (
          <ResearchWorkload3
            researchWorkLoadHandler3={researchWorkLoadHandler3}
            backHandler={backHandler}
            disseminatedResearchHandler={disseminatedResearchHandler}
            rwlFile2Handler={rwlFile2Handler}
            disseminatedResearch={researchWorkLoad?.disseminatedResearch}
            rwlFile2Name={researchWorkLoad?.rwlFile2?.name}
          />
        )}
        {steps === 6 && (
          <ExtensionWorkload
            extensionWorkloadHandler={extensionWorkloadHandler}
            designationExtensionActivityHandler={
              designationExtensionActivityHandler
            }
            extensionActivityFileHandler={extensionActivityFileHandler}
            resourcePersonHandler={resourcePersonHandler}
            certificateFileHandler={certificateFileHandler}
            totalNumberHoursHandler={totalNumberHoursHandler}
            summaryOfHoursFileHandler={summaryOfHoursFileHandler}
            backHandler={backHandler}
            designationExtensionActivity={
              extensionWorkload?.designationExtensionActivity
            }
            extensionActivityFileName={
              extensionWorkload?.extensionActivityFile?.name
            }
            resourcePerson={extensionWorkload?.resourcePerson}
            certificateFileName={extensionWorkload?.certificateFile?.name}
            totalNumberHours={extensionWorkload?.totalNumberHours}
            summaryOfHoursFileName={extensionWorkload?.summaryOfHoursFile?.name}
          />
        )}
        {steps === 7 && (
          <StrategicFunction
            strategicFunctionHandler={setStrategicFunctionHandler}
            designationUniversityLevelHandler={
              designationUniversityLevelHandler
            }
            approvedUniversityDesignationFileHandler={
              approvedUniversityDesignationFileHandler
            }
            backHandler={backHandler}
            designationUniversityLevel={
              strategicFunction?.designationUniversityLevel
            }
            approvedUniversityDesignationFileName={
              strategicFunction?.approvedUniversityDesignationFile?.name
            }
          />
        )}
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

export default FacultyWorkloadScreen;
