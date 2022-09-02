import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Menu from "../../components/Menu";
import ProfileTab from "../../components/ProfileTab";
import ScreenTitle from "../../components/ScreenTitle";
import TopNav from "../../components/TopNav";
import ResearchWorkload from "./ResearchWorkload/ResearchWorkload";
import ResearchWorkload1 from "./ResearchWorkload/ResearchWorkload1";
import ResearchWorkload2 from "./ResearchWorkload/ResearchWorkload2";
import ResearchWorkload3 from "./ResearchWorkload/ResearchWorkload3";
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

const FacultyWorkloadScreen = () => {
  const [teachingWorkLoad, setTeachingWorkLoad] =
    useState<TeachingWorkLoadProps>();
  const [researchWorkLoad, setResearchWorkLoad] =
    useState<ResearchWorkLoadProps>();

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
            disseminatedResearch={disseminatedResearch}
            rwlFile2Name={researchWorkLoad?.rwlFile2?.name}
          />
        )}
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div``;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default FacultyWorkloadScreen;
