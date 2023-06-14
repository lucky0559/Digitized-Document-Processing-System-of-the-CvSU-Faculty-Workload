import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Dropdown from "../../../components/Dropdown";
import Footer from "../../../components/Footer";
import FormButton from "../../../components/FormButton";
import Menu from "../../../components/Menu";
import ProfileTab from "../../../components/ProfileTab";
import ScreenTitle from "../../../components/ScreenTitle";
import TopNav from "../../../components/TopNav";
import Colors from "../../../constants/Colors";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import {
  GetAllUserPendingWorkloads,
  SaveResearchWorkload
} from "../../../lib/faculty-workload.hooks";
import { ResearchWorkLoadType } from "../../../types/ResearchWorkLoad";
import { Designation } from "../StrategicFunction/StrategicFunction";
import ResearchWorkload1 from "./ResearchWorkload1";
import ResearchWorkload2 from "./ResearchWorkload2";
import { UserContext } from "../../../App";
import ResearchWorkload3 from "./ResearchWorkload3";

type ResearchWorkLoadProps = {
  UseLogout: () => void;
};

const ResearchWorkload = ({ UseLogout }: ResearchWorkLoadProps) => {
  const [researchWorkLoad, setResearchWorkLoad] =
    useState<ResearchWorkLoadType>();

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
  const [rwlFile, setRwlFile] = useState<File>();
  const [rwlFile1, setRwlFile1] = useState<File>();
  const [fundGenerated, setFundGenerated] = useState<string | undefined>("");
  const [fundGeneratedDisplay, setFundGeneratedDisplay] = useState<
    string | undefined
  >("");

  const [isFacultySubmenuOpen, setIsFacultySubmenuOpen] = useState(false);

  const [steps, setSteps] = useState(1);

  const [points, setPoints] = useState(0);

  const fundingStudy = (fundingStudyValue?: string) => {
    fundingOfStudyHandler(fundingStudyValue);
  };

  const navigate = useNavigate();

  const [isAddStudy, setIsAddStudy] = useState(false);

  const [studyPoints, setStudyPoints] = useState(0);

  const { user } = useContext(UserContext);

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
    if (fundingOfStudy === "CvSU Funded") {
      setSteps(2);
    } else if (fundingOfStudy === "Externally Funded") {
      setSteps(3);
    } else if (fundDisplay === "Externally Funded") {
      setSteps(3);
    } else if (fundDisplay === "CvSU Funded") {
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
      setResearchWorkLoad(undefined);
      setStudy1(undefined);
      setStudy2(undefined);
      setStudy3(undefined);
      setStudy4(undefined);
      setStudy1Points(0);
      setStudy2Points(0);
      setStudy3Points(0);
      setStudy4Points(0);
      setSteps(1);
    }
  };

  const researchWorkLoadHandler1 = () => {
    if (designationStudy) {
      setResearchWorkLoad({
        ...researchWorkLoad,
        typeOfStudy: typeOfStudy,
        designationStudy: designationStudy,
        rwlFile: rwlFile
      });
    } else {
      setResearchWorkLoad({
        typeOfStudy: typeOfStudy,
        designationStudy: designationStudy,
        rwlFile: rwlFile,
        ...researchWorkLoad
      });
    }
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
  }, [designationStudy, designationStudyDisplay]);

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
    setResearchWorkLoad({
      ...researchWorkLoad,
      rwlFile
    });
  }, [rwlFile]);

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
    setResearchWorkLoad({
      ...researchWorkLoad,
      rwlFile1
    });
  }, [rwlFile1]);

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

  const researchWorkLoadHandler3 = (isAddStudy: boolean) => {
    setIsAddStudy(isAddStudy);
    setResearchWorkLoad({
      ...researchWorkLoad,
      disseminatedResearch: [
        study1?.file! && study1?.title!,
        study2?.file! && study2?.title!,
        study3?.file! && study3?.title!,
        study4?.file! && study4?.title!
      ].filter(Boolean),
      disseminatedResearchFiles: [
        study1?.file!,
        study2?.file!,
        study3?.file!,
        study4?.file!
      ]
    });
    if (researchWorkLoad?.fundingOfStudy !== "Cvsu Funded") {
      researchWorkLoad!.typeOfStudy = undefined;
      researchWorkLoad!.designationStudy = undefined;
      researchWorkLoad!.rwlFile = undefined;
      researchWorkLoad!.rwlFilePath = undefined;
    } else {
      researchWorkLoad.fundGenerated = undefined;
      researchWorkLoad.rwlFile1 = undefined;
      researchWorkLoad.rwlFilePath1 = undefined;
    }
    onSubmit();
  };

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
          researchWorkLoad.rwlPoints =
            designationStudyPoints +
            study1Points +
            study2Points +
            study3Points +
            study4Points;
          await SaveResearchWorkload(researchWorkLoad!);
          const { extensionWorkloads } = await GetAllUserPendingWorkloads(
            user.email
          );

          clearStates();
          if (isAddStudy) {
            navigate("/research-workload", { replace: true });
          } else if (!extensionWorkloads) {
            navigate("/extension-workload", { replace: true });
          } else {
            navigate("/workload-review", { replace: true });
          }
        } else {
          // for external funded
          let fundGeneratedPoints;

          if (researchWorkLoad?.fundGenerated === "Above 1,000,000.00") {
            fundGeneratedPoints = 3;
          } else if (
            researchWorkLoad?.fundGenerated === "500,001.00 - 1,000,000.00"
          ) {
            fundGeneratedPoints = 2;
          } else {
            fundGeneratedPoints = 1;
          }

          researchWorkLoad!.rwlPoints =
            fundGeneratedPoints +
            study1Points +
            study2Points +
            study3Points +
            study4Points;
          await SaveResearchWorkload(researchWorkLoad!);
          const { extensionWorkloads } = await GetAllUserPendingWorkloads(
            user.email
          );

          clearStates();
          if (isAddStudy) {
            navigate("/research-workload", { replace: true });
          } else if (!extensionWorkloads) {
            navigate("/extension-workload", { replace: true });
          } else {
            navigate("/workload-review", { replace: true });
          }
        }
      }

      setIsSubmitting(false);
    })();
  }, [isSubmitting]);

  const clearStates = () => {
    setResearchWorkLoad({});
    setIsProfileOpen(false);
    setIsSubmitting(false);
    setTitleOfStudy("");
    setFundingOfStudy("");
    setFundDisplay("");
    setTypeOfStudy("");
    setDesignationStudy("");
    setDesignationStudyDisplay("");
    setRwlFile(undefined);
    setRwlFile1(undefined);
    setFundGenerated("");
    setFundGeneratedDisplay("");
    setIsFacultySubmenuOpen(false);
    setSteps(1);
    setPoints(0);
    setStudy1(undefined);
    setStudy2(undefined);
    setStudy3(undefined);
    setStudy4(undefined);
    designationStudyPoints = 0;
    setFundGeneratedPoints(0);
    setStudy1Points(0);
    setStudy2Points(0);
    setStudy3Points(0);
    setStudy4Points(0);
  };

  const [study1, setStudy1] = useState<Designation>();
  const [study2, setStudy2] = useState<Designation>();
  const [study3, setStudy3] = useState<Designation>();
  const [study4, setStudy4] = useState<Designation>();

  const onSelectStudy1 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setStudy1({
        ...study1,
        title: value
      });
    }
  };

  const onStudy1FileSelect = (value?: File) => {
    setStudy1({
      ...study1,
      file: value
    });
  };

  const onSelectStudy2 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setStudy2({
        ...study2,
        title: value
      });
    }
  };

  const onStudy2FileSelect = (value?: File) => {
    setStudy2({
      ...study2,
      file: value
    });
  };

  const onSelectStudy3 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setStudy3({
        ...study3,
        title: value
      });
    }
  };

  const onStudy3FileSelect = (value?: File) => {
    setStudy3({
      ...study3,
      file: value
    });
  };

  const onSelectStudy4 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setStudy4({
        ...study4,
        title: value
      });
    }
  };

  const onStudy4FileSelect = (value?: File) => {
    setStudy4({
      ...study4,
      file: value
    });
  };

  let designationStudyPoints = 0;
  const [fundGeneratedPoints, setFundGeneratedPoints] = useState(0);
  const [study1Points, setStudy1Points] = useState(0);
  const [study2Points, setStudy2Points] = useState(0);
  const [study3Points, setStudy3Points] = useState(0);
  const [study4Points, setStudy4Points] = useState(0);

  useEffect(() => {
    if (
      designationStudy === "Program Leader/Co-Program Leader" &&
      typeOfStudy &&
      rwlFile
    ) {
      designationStudyPoints = 9;
      setStudyPoints(9);
      return setPoints(designationStudyPoints);
    } else if (
      designationStudy === "Project Leader/Co-Project Leader" &&
      typeOfStudy &&
      rwlFile
    ) {
      designationStudyPoints = 6;
      setStudyPoints(6);
      return setPoints(designationStudyPoints);
    } else if (
      designationStudy === "Study Leader/Co-Study Leader" &&
      typeOfStudy &&
      rwlFile
    ) {
      designationStudyPoints = 3;
      setStudyPoints(3);
      return setPoints(designationStudyPoints);
    }
  }, [designationStudy, rwlFile, fundGenerated]);

  useEffect(() => {
    if (fundGenerated === "Above 1,000,000.00" && rwlFile1) {
      setFundGeneratedPoints(3);
    } else if (fundGenerated === "500,001.00 - 1,000,000.00" && rwlFile1) {
      setFundGeneratedPoints(2);
    } else if (fundGenerated === "500,000.00 and below" && rwlFile1) {
      setFundGeneratedPoints(1);
    }
  }, [fundGenerated, rwlFile1]);

  useEffect(() => {
    if (study1?.title === "International" && study1.file) {
      setStudy1Points(4);
    } else if (study1?.title === "National" && study1.file) {
      setStudy1Points(3);
    } else if (study1?.title === "Regional" && study1.file) {
      setStudy1Points(2);
    } else if (study1?.title === "Local" && study1.file) {
      setStudy1Points(1);
    }

    if (study2?.title === "International" && study2.file) {
      setStudy2Points(4);
    } else if (study2?.title === "National" && study2.file) {
      setStudy2Points(3);
    } else if (study2?.title === "Regional" && study2.file) {
      setStudy2Points(2);
    } else if (study2?.title === "Local" && study2.file) {
      setStudy2Points(1);
    }

    if (study3?.title === "International" && study3.file) {
      setStudy3Points(4);
    } else if (study3?.title === "National" && study3.file) {
      setStudy3Points(3);
    } else if (study3?.title === "Regional" && study3.file) {
      setStudy3Points(2);
    } else if (study3?.title === "Local" && study3.file) {
      setStudy3Points(1);
    }

    if (study4?.title === "International" && study4.file) {
      setStudy4Points(4);
    } else if (study4?.title === "National" && study4.file) {
      setStudy4Points(3);
    } else if (study4?.title === "Regional" && study4.file) {
      setStudy4Points(2);
    } else if (study4?.title === "Local" && study4.file) {
      setStudy4Points(1);
    }
  }, [study1, study2, study3, study4]);

  useEffect(() => {
    setResearchWorkLoad({
      ...researchWorkLoad,
      typeOfStudy: undefined,
      designationStudy: undefined,
      fundGenerated: undefined,
      disseminatedResearch: undefined,
      disseminatedResearchFiles: undefined,
      rwlFile: undefined,
      rwlFilePath: undefined,
      rwlFile1: undefined,
      rwlFilePath1: undefined,
      disseminatedResearchFilesPath: undefined,
      rwlPoints: undefined,
      remarks: undefined,
      status: undefined
    });
    setPoints(0);
    setFundGeneratedPoints(0);
  }, [researchWorkLoad?.fundingOfStudy]);

  return (
    <MainContainer>
      <TopNav profileHandler={() => setIsProfileOpen(!isProfileOpen)} />
      <Menu
        isFacultySubmenuOpen={isFacultySubmenuOpen}
        facultySubMenuHandler={() =>
          setIsFacultySubmenuOpen(!isFacultySubmenuOpen)
        }
      />
      <ProfileTab isProfileOpen={isProfileOpen} UseLogout={UseLogout} />
      <BodyContainer>
        <ScreenTitle title="Faculty Workload" />
        {steps === 1 && (
          <Container>
            <SubContainer>
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
                    (titleOfStudy.length <= 0 &&
                      fundingOfStudy?.length! <= 0) ||
                    titleOfStudy.length <= 0 ||
                    fundDisplay?.length! <= 0
                  }
                ></FormButton>
              </ButtonContainer>
            </SubContainer>
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
            points={points}
            onSelectStudy1={onSelectStudy1}
            study1={study1?.title}
            onStudy1FileSelect={onStudy1FileSelect}
            study1FileName={study1?.file?.name}
            onSelectStudy2={onSelectStudy2}
            study2={study2?.title}
            onStudy2FileSelect={onStudy2FileSelect}
            study2FileName={study2?.file?.name}
            onSelectStudy3={onSelectStudy3}
            study3={study3?.title}
            onStudy3FileSelect={onStudy3FileSelect}
            study3FileName={study3?.file?.name}
            onSelectStudy4={onSelectStudy4}
            study4={study4?.title}
            onStudy4FileSelect={onStudy4FileSelect}
            study4FileName={study4?.file?.name}
            study1Points={study1Points}
            study2Points={study2Points}
            study3Points={study3Points}
            study4Points={study4Points}
            fundGeneratedPoints={fundGeneratedPoints}
            researchWorkLoadHandler3={researchWorkLoadHandler3}
            studyPoints={studyPoints}
          />
        )}
        {steps === 3 && (
          <ResearchWorkload2
            researchWorkLoadHandler2={researchWorkLoadHandler2}
            fundGeneratedHandler={fundGeneratedHandler}
            rwlFile1Handler={rwlFile1Handler}
            backHandler={backHandler}
            fundGeneratedDisplay={fundGenerated || fundGeneratedDisplay}
            rwlFileName1={rwlFile1?.name}
            points={points}
            study1Points={study1Points}
            study2Points={study2Points}
            study3Points={study3Points}
            study4Points={study4Points}
            fundGeneratedPoints={fundGeneratedPoints}
            researchWorkLoadHandler3={researchWorkLoadHandler3}
            isSubmitting={isSubmitting}
            onSelectStudy1={onSelectStudy1}
            study1={study1?.title}
            onStudy1FileSelect={onStudy1FileSelect}
            study1FileName={study1?.file?.name}
            onSelectStudy2={onSelectStudy2}
            study2={study2?.title}
            onStudy2FileSelect={onStudy2FileSelect}
            study2FileName={study2?.file?.name}
            onSelectStudy3={onSelectStudy3}
            study3={study3?.title}
            onStudy3FileSelect={onStudy3FileSelect}
            study3FileName={study3?.file?.name}
            onSelectStudy4={onSelectStudy4}
            study4={study4?.title}
            onStudy4FileSelect={onStudy4FileSelect}
            study4FileName={study4?.file?.name}
          />
        )}
        {steps === 4 && (
          <ResearchWorkload3
            researchWorkLoadHandler3={researchWorkLoadHandler3}
            researchWorkLoadHandler2={researchWorkLoadHandler2}
            backHandler={backHandler}
            isSubmitting={isSubmitting}
            onSelectStudy1={onSelectStudy1}
            study1={study1?.title}
            onStudy1FileSelect={onStudy1FileSelect}
            study1FileName={study1?.file?.name}
            onSelectStudy2={onSelectStudy2}
            study2={study2?.title}
            onStudy2FileSelect={onStudy2FileSelect}
            study2FileName={study2?.file?.name}
            onSelectStudy3={onSelectStudy3}
            study3={study3?.title}
            onStudy3FileSelect={onStudy3FileSelect}
            study3FileName={study3?.file?.name}
            onSelectStudy4={onSelectStudy4}
            study4={study4?.title}
            onStudy4FileSelect={onStudy4FileSelect}
            study4FileName={study4?.file?.name}
            points={points}
            study1Points={study1Points}
            study2Points={study2Points}
            study3Points={study3Points}
            study4Points={study4Points}
            fundGeneratedPoints={fundGeneratedPoints}
            isDisseminatedOnly={true}
          />
        )}
        {steps === 1 && (
          <DisseminatedButtonContainer>
            <DisseminatedTextLink
              onClick={() => {
                setResearchWorkLoad(undefined);
                setSteps(4);
              }}
            >
              Disseminated research output in College or University In-House
              Review/Conferences
            </DisseminatedTextLink>
          </DisseminatedButtonContainer>
        )}
      </BodyContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 5px solid black;
  border-radius: 15px;
  margin: 120px auto;
  width: 50%;
`;

const Container = styled.div`
  padding: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 60%;
`;
const SubContainer = styled.div`
  border: 2px solid black;
  width: 100%;
  height: auto;
  border-radius: 15px;
  padding: 15px;
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
  background-color: ${Colors.textFieldBackground};
  border-width: 1px;
  font-family: HurmeGeometricSans3;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 40px 20px 0px 0px;
`;

const FooterContainer = styled.div`
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  z-index: 1;
`;

const DisseminatedButtonContainer = styled.div`
  max-width: 300px;
  display: flex;
  align-self: end;
  margin-bottom: 30px;
`;

const DisseminatedTextLink = styled.span`
  font-size: 19px;
  font-weight: 600;
  line-height: 20px;
  font-family: HurmeGeometricSans3;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export default ResearchWorkload;
