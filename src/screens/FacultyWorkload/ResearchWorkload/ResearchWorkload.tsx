import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Dropdown from "../../../components/Dropdown";
import FormButton from "../../../components/FormButton";
import Menu from "../../../components/Menu";
import ProfileTab from "../../../components/ProfileTab";
import ScreenTitle from "../../../components/ScreenTitle";
import TopNav from "../../../components/TopNav";
import Colors from "../../../constants/Colors";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import { SaveResearchWorkload } from "../../../lib/faculty-workload.hooks";
import { ResearchWorkLoadType } from "../../../types/ResearchWorkLoad";
import ResearchWorkload1 from "./ResearchWorkload1";
import ResearchWorkload2 from "./ResearchWorkload2";
import ResearchWorkload3 from "./ResearchWorkload3";

const ResearchWorkload = () => {
  const [researchWorkLoad, setResearchWorkLoad] =
    useState<ResearchWorkLoadType>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [titleOfStudy, setTitleOfStudy] = useState("");
  const [fundingOfStudy, setFundingOfStudy] = useState<string | undefined>("");
  const [fundDisplay, setFundDisplay] = useState<string | undefined>("");
  const [typeOfStudy, setTypeOfStudy] = useState("");
  const [designationStudy, setDesignationStudy] = useState<string | undefined>(
    ""
  );
  const [designationStudyDisplay, setDesignationStudyDisplay] = useState<
    string | undefined
  >("");
  const [disseminatedResearch, setDisseminatedResearch] = useState<
    string | undefined
  >("");
  const [disseminatedResearchDisplay, setDisseminatedResearchDisplay] =
    useState<string | undefined>("");
  const [rwlFile, setRwlFile] = useState<File>();
  const [rwlFile1, setRwlFile1] = useState<File>();
  const [rwlFile2, setRwlFile2] = useState<File>();
  const [fundGenerated, setFundGenerated] = useState<string | undefined>("");
  const [fundGeneratedDisplay, setFundGeneratedDisplay] = useState<
    string | undefined
  >("");

  const [steps, setSteps] = useState(1);

  const fundingStudy = (fundingStudyValue?: string) => {
    fundingOfStudyHandler(fundingStudyValue);
  };

  const researchWorkLoadHandler = () => {
    if (fundingOfStudy) {
      if (fundingOfStudy?.length > 0) {
        setResearchWorkLoad({
          ...researchWorkLoad,
          titleOfStudy,
          fundingOfStudy
        });
      }
    }
    if (fundingOfStudy === "CvSU Research Grant") {
      setSteps(2);
    } else if (fundingOfStudy === "Externally Funded") {
      setSteps(3);
    } else if (fundDisplay === "Externally Funded") {
      setSteps(3);
    } else if (fundDisplay === "CvSU Research Grant") {
      setSteps(2);
    }
  };

  useEffect(() => {
    if (fundDisplay !== researchWorkLoad?.fundingOfStudy) {
      setResearchWorkLoad({
        ...researchWorkLoad,
        fundingOfStudy: fundDisplay
      });
    }
    if (researchWorkLoad?.fundingOfStudy) {
      setFundDisplay(researchWorkLoad?.fundingOfStudy);
    } else {
      setFundDisplay(fundingOfStudy);
    }
  }, [fundingOfStudy]);

  const titleOfStudyHandler = (value: string) => {
    setTitleOfStudy(value);
  };

  const fundingOfStudyHandler = (value?: string) => {
    setFundingOfStudy(value);
  };

  const backHandler = () => {
    if (steps === 2) {
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
      setSteps(1);
    }

    if (steps === 3) {
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
      setSteps(1);
    }

    if (steps === 4) {
      if (disseminatedResearch) {
        setResearchWorkLoad({
          ...researchWorkLoad,
          disseminatedResearch,
          rwlFile2
        });
      } else {
        setResearchWorkLoad({
          disseminatedResearch,
          rwlFile2,
          ...researchWorkLoad
        });
      }

      setSteps(steps - 1);
    }
  };

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
    onSubmit();
  };

  useEffect(() => {
    if (designationStudy !== researchWorkLoad?.designationStudy) {
      setResearchWorkLoad({
        ...researchWorkLoad,
        designationStudy: designationStudyDisplay
      });
    }
    if (researchWorkLoad?.designationStudy) {
      setDesignationStudyDisplay(researchWorkLoad?.designationStudy);
    } else {
      setDesignationStudyDisplay(designationStudy);
    }
  }, [designationStudy]);

  const typeOfStudyHandler = (value: string) => {
    setTypeOfStudy(value);
  };

  const designationStudyHandler = (value?: string) => {
    setDesignationStudy(value);
  };

  const rwlFileHandler = (value?: File) => {
    setRwlFile(value);
  };

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

  useEffect(() => {
    if (fundGeneratedDisplay !== researchWorkLoad?.fundGenerated) {
      setResearchWorkLoad({
        ...researchWorkLoad,
        fundGenerated: fundGeneratedDisplay
      });
    }
    if (researchWorkLoad?.fundGenerated) {
      setFundGeneratedDisplay(researchWorkLoad?.fundGenerated);
    } else {
      setFundGeneratedDisplay(fundGenerated);
    }
  }, [fundGenerated]);

  const researchWorkLoadHandler3 = () => {
    setResearchWorkLoad({
      ...researchWorkLoad,
      disseminatedResearch,
      rwlFile2
    });
    researchWorkLoad!.typeOfStudy = undefined;
    researchWorkLoad!.designationStudy = undefined;
    researchWorkLoad!.rwlFile = undefined;
    researchWorkLoad!.rwlFilePath = undefined;
    onSubmit();
  };

  const disseminatedResearchHandler = (value?: string) => {
    setDisseminatedResearch(value);
  };

  const rwlFile2Handler = (value?: File) => {
    setRwlFile2(value);
  };

  useEffect(() => {
    if (
      disseminatedResearchDisplay !== researchWorkLoad?.disseminatedResearch
    ) {
      setResearchWorkLoad({
        ...researchWorkLoad,
        disseminatedResearch: disseminatedResearchDisplay
      });
    }
    if (researchWorkLoad?.disseminatedResearch) {
      setDisseminatedResearchDisplay(researchWorkLoad?.disseminatedResearch);
    } else {
      setDisseminatedResearchDisplay(disseminatedResearch);
    }
  }, [disseminatedResearch]);

  const onSubmit = async () => {
    setIsSubmitting(true);
  };

  useEffect(() => {
    (async () => {
      if (isSubmitting) {
        if (
          researchWorkLoad?.titleOfStudy &&
          researchWorkLoad.fundingOfStudy &&
          researchWorkLoad.typeOfStudy &&
          researchWorkLoad.designationStudy &&
          researchWorkLoad.rwlFile
        ) {
          let designationStudyPoints;
          if (
            researchWorkLoad.designationStudy ===
            "Program Leader/Co-Program Leader"
          ) {
            designationStudyPoints = 9;
          } else if (
            researchWorkLoad.designationStudy ===
            "Project Leader/Co-Project Leader"
          ) {
            designationStudyPoints = 6;
          } else {
            designationStudyPoints = 3;
          }
          researchWorkLoad.rwlPoints = designationStudyPoints;
          await SaveResearchWorkload(researchWorkLoad);
        } else {
          // for external funded
          let fundGeneratedPoints;
          let disseminatedResearchPoints;

          if (researchWorkLoad?.fundGenerated === "Above 1,000,000.00") {
            fundGeneratedPoints = 3;
          } else if (
            researchWorkLoad?.fundGenerated === "500,001.00 - 1,000,000.00"
          ) {
            fundGeneratedPoints = 2;
          } else {
            fundGeneratedPoints = 1;
          }

          if (researchWorkLoad?.disseminatedResearch === "International") {
            disseminatedResearchPoints = 4;
          } else if (researchWorkLoad?.disseminatedResearch === "National") {
            disseminatedResearchPoints = 3;
          } else if (researchWorkLoad?.disseminatedResearch === "Regional") {
            disseminatedResearchPoints = 2;
          } else {
            disseminatedResearchPoints = 1;
          }

          researchWorkLoad!.rwlPoints =
            fundGeneratedPoints + disseminatedResearchPoints;
          await SaveResearchWorkload(researchWorkLoad!);
        }
      }
      clearStates();
      setIsSubmitting(false);
      setSteps(1);
    })();
  }, [isSubmitting]);

  const clearStates = () => {
    setTitleOfStudy("");
    setFundingOfStudy("");
    setFundDisplay("");
    setTypeOfStudy("");
    setDesignationStudy("");
    setRwlFile(undefined);
    setResearchWorkLoad(undefined);
  };

  return (
    <MainContainer>
      <TopNav
        menuHandler={() => setIsMenuOpen(!isMenuOpen)}
        profileHandler={() => setIsProfileOpen(!isProfileOpen)}
      />
      <Menu />
      <ProfileTab isProfileOpen={isProfileOpen} />
      <BodyContainer>
        <ScreenTitle title="Faculty Workload" />
        {steps === 1 && (
          <Container>
            <WorkloadTextContainer>
              <WorkloadText>{WorkloadType.RESEARCH_WORKLOAD}</WorkloadText>
            </WorkloadTextContainer>
            <InputsContainer>
              <TextInputContainer>
                <Label>Title of the Study</Label>
                <TextInput
                  type="text"
                  value={titleOfStudy}
                  onChange={e => titleOfStudyHandler(e.target.value)}
                />
              </TextInputContainer>
              <Dropdown
                option={DROPDOWN_LISTS.FUNDING_OF_STUDY}
                label="Funding of the Study"
                onSelect={fundingStudy}
                val={fundDisplay}
              />
            </InputsContainer>
            <ButtonContainer>
              <FormButton
                text="Next"
                onClicked={researchWorkLoadHandler}
                disabled={
                  (titleOfStudy.length <= 0 && fundingOfStudy?.length! <= 0) ||
                  titleOfStudy.length <= 0 ||
                  fundDisplay?.length! <= 0
                }
              ></FormButton>
            </ButtonContainer>
          </Container>
        )}
        {steps === 2 && (
          <ResearchWorkload1
            researchWorkLoadHandler1={researchWorkLoadHandler1}
            typeOfStudyHandler={typeOfStudyHandler}
            designationStudyHandler={designationStudyHandler}
            backHandler={backHandler}
            rwlFileHandler={rwlFileHandler}
            typeOfStudy={typeOfStudy}
            designationStudy={designationStudyDisplay}
            rwlFileName={rwlFile?.name}
            isSubmitting={isSubmitting}
          />
        )}
        {steps === 3 && (
          <ResearchWorkload2
            researchWorkLoadHandler2={researchWorkLoadHandler2}
            fundGeneratedHandler={fundGeneratedHandler}
            rwlFile1Handler={rwlFile1Handler}
            backHandler={backHandler}
            fundGeneratedDisplay={fundGeneratedDisplay}
            rwlFileName1={rwlFile1?.name}
          />
        )}
        {steps === 4 && (
          <ResearchWorkload3
            researchWorkLoadHandler3={researchWorkLoadHandler3}
            backHandler={backHandler}
            disseminatedResearchHandler={disseminatedResearchHandler}
            rwlFile2Handler={rwlFile2Handler}
            disseminatedResearchDisplay={disseminatedResearchDisplay}
            rwlFile2Name={rwlFile2?.name}
            isSubmitting={isSubmitting}
          />
        )}
      </BodyContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
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

const Container = styled.div`
  padding: 30px;
  width: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const WorkloadTextContainer = styled.div`
  display: flex;
  align-self: flex-start;
`;

const WorkloadText = styled.text`
  font-size: 19px;
  font-weight: 600;
  line-height: 20px;
  font-family: HurmeGeometricSans3;
`;

const InputsContainer = styled.div`
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: auto;
  max-width: 300px;
`;

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 17px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
`;

const TextInput = styled.input`
  width: 200px;
  background-color: ${Colors.textFieldBackground};
  border-width: 1px;
  font-family: HurmeGeometricSans3;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  margin: 100px 20px 0px 0px;
`;

export default ResearchWorkload;
