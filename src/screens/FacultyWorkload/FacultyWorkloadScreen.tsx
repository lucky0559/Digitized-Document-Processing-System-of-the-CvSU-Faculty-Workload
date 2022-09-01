import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Menu from "../../components/Menu";
import ProfileTab from "../../components/ProfileTab";
import ScreenTitle from "../../components/ScreenTitle";
import TopNav from "../../components/TopNav";
import ResearchWorkload from "./ResearchWorkload/ResearchWorkload";
import ResearchWorkload1 from "./ResearchWorkload/ResearchWorkload1";
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
  const [twlFileName, setTwlFileName] = useState<string | undefined>("");

  //RWL
  const [titleOfStudy, setTitleOfStudy] = useState("");
  const [fundingOfStudy, setFundingOfStudy] = useState<string | undefined>("");
  const [displayFundingOfStudy, setDisplayFundingOfStudy] = useState<
    string | undefined
  >("");
  const [typeOfStudy, setTypeOfStudy] = useState("");
  const [designationStudy, setDesignationStudy] = useState<string | undefined>(
    ""
  );
  const [rwlFile, setRwlFile] = useState<File>();
  const [rwlFileName, setRwlFileName] = useState<string | undefined>("");

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

  useEffect(() => {
    setTwlFileName(twlFile?.name);
  }, [twlFile]);

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

  useEffect(() => {
    setDisplayFundingOfStudy(fundingOfStudy);
  }, [fundingOfStudy]);

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
        designationStudy
      });
    } else {
      setResearchWorkLoad({
        typeOfStudy,
        designationStudy,
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

  useEffect(() => {
    setRwlFileName(rwlFile?.name);
  }, [rwlFile]);

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
            twlFileName={twlFileName}
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
            designationStudy={designationStudy}
            rwlFileName={rwlFileName}
          />
        )}
        {steps === 4 && (
          <ResearchWorkload1
            researchWorkLoadHandler1={researchWorkLoadHandler1}
            typeOfStudyHandler={typeOfStudyHandler}
            designationStudyHandler={designationStudyHandler}
            backHandler={backHandler}
            rwlFileHandler={rwlFileHandler}
            typeOfStudy={typeOfStudy}
            designationStudy={designationStudy}
            rwlFileName={rwlFileName}
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
