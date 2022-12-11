import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UploadFileButton from "../../../components/UploadFileButton";
import FormButton from "../../../components/FormButton";
import Colors from "../../../constants/Colors";
import { WorkloadType } from "../../../constants/Strings";
import { StrategicFunctionType } from "../../../types/StrategicFunction";
import { useNavigate } from "react-router";
import { SaveStrategicFunctionWorkload } from "../../../lib/faculty-workload.hooks";
import TopNav from "../../../components/TopNav";
import Menu from "../../../components/Menu";
import ProfileTab from "../../../components/ProfileTab";
import ScreenTitle from "../../../components/ScreenTitle";
import StrategicFunction1 from "./StrategicFunction1";
import StrategicFunction2 from "./StrategicFunction2";

const StrategicFunction = () => {
  const [strategicFunctionWorkload, setStrategicFunctionWorkload] =
    useState<StrategicFunctionType>();

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [designationCollegeCampusLevel, setDesignationCollegeCampusLevel] =
    useState<string[] | undefined>([]);
  const [designationDepartmentLevel, setDesignationDepartmentLevel] = useState<
    string[] | undefined
  >([]);
  const [
    designationAsSportTrainorAcademic,
    setDesignationAsSportTrainorAcademic
  ] = useState<string | undefined>("");
  const [designationAsMemberOfAdhoc, setDesignationAsMemberOfAdhoc] = useState<
    string | undefined
  >("");
  const [totalOfAcademicAdvisees, setTotalOfAcademicAdvisees] = useState<
    string | undefined
  >("");
  const [
    approvedUniversityDesignationFile,
    setApprovedUniversityDesignationFile
  ] = useState<File>();
  const [
    approvedCollegeCampusDesignationFile,
    setApprovedCollegeCampusDesignationFile
  ] = useState<File>();
  const [
    approvedDepartmentDesignationFile,
    setApprovedDepartmentDesignationFile
  ] = useState<File>();
  const [coachAdviserCertificateFile, setCoachAdviserCertificateFile] =
    useState<File>();
  const [approvedDesignationFile, setApprovedDesignationFile] =
    useState<File>();
  const [listOfAdviseesFile, setListOfAdviseesFile] = useState<File>();

  const [steps, setSteps] = useState(1);

  // const fileHandler = (file?: File) => {
  //   approvedUniversityDesignationFileHandler(file);
  // };

  // const approvedUniversityDesignationFileHandler = (value?: File) => {
  //   setApprovedUniversityDesignationFile(value);
  // };

  // const setDesignationUniversityLevelHandler = (
  //   designationUniversityLevelValue: string
  // ) => {
  //   dataClicked(designationUniversityLevelValue);
  //   designationUniversityLevelHandler(designationUniversityLevelValue);
  // };

  // const onSubmit = () => {
  //   setStrategicFunctionHandler();
  // };

  // //SF
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const [designationUniversityLevel, setDesignationUniversityLevel] = useState<
  //   string[]
  // >([]);

  // let dataValue: string[] = [...designationUniversityLevel];

  // const [boxClicked, setBoxClicked] = useState(0);

  // const dataClicked = (value: string) => {
  //   if (dataValue.includes(value)) {
  //     const index = dataValue.indexOf(value);
  //     if (index > -1) {
  //       dataValue.splice(index, 1);
  //     }
  //   } else {
  //     dataValue.push(value);
  //   }
  //   setBoxClicked(boxClicked + 1);
  // };

  // useEffect(() => {
  //   dataValue = [...designationUniversityLevel];
  // }, [boxClicked]);

  // const designationUniversityLevelHandler = (value: string) => {
  //   if (designationUniversityLevel.includes(value)) {
  //     const index = designationUniversityLevel.indexOf(value);
  //     if (index > -1) {
  //       designationUniversityLevel.splice(index, 1);
  //     }
  //   } else {
  //     designationUniversityLevel.push(value);
  //   }
  // };

  // const setStrategicFunctionHandler = async () => {
  //   setStrategicFunctionWorkload({
  //     designationUniversityLevel: designationUniversityLevel,
  //     approvedUniversityDesignationFile
  //   });
  //   setSteps(steps + 1);
  // };

  // // SF1
  // const [
  //   designationCollegeCampusLevelReserve,
  //   setDesignationCollegeCampusLevelReserve
  // ] = useState<string[]>([]);

  // const designationCollegeCampusLevelHandler = (value: string) => {
  //   if (designationCollegeCampusLevelReserve.includes(value)) {
  //     const index = designationCollegeCampusLevelReserve.indexOf(value);
  //     if (index > -1) {
  //       designationCollegeCampusLevelReserve.splice(index, 1);
  //     }
  //   } else {
  //     designationCollegeCampusLevelReserve.push(value);
  //   }
  // };

  // const setStrategicFunction1Handler = async () => {
  //   setStrategicFunctionWorkload({
  //     ...strategicFunctionWorkload,
  //     designationCollegeCampusLevel: designationCollegeCampusLevelReserve,
  //     approvedCollegeCampusDesignationFile
  //   });
  //   setSteps(steps + 1);
  // };

  // const approvedCollegeCampusDesignationFileHandler = (value?: File) => {
  //   setApprovedCollegeCampusDesignationFile(value);
  // };

  // //SF2
  // const [
  //   designationDepartmentLevelReserve,
  //   setDesignationDepartmentLevelReserve
  // ] = useState<string[]>([]);

  // const designationDepartmentLevelHandler = (value: string) => {
  //   if (designationDepartmentLevelReserve.includes(value)) {
  //     const index = designationDepartmentLevelReserve.indexOf(value);
  //     if (index > -1) {
  //       designationDepartmentLevelReserve.splice(index, 1);
  //     }
  //   } else {
  //     designationDepartmentLevelReserve.push(value);
  //   }
  // };

  // const setStrategicFunction2Handler = async () => {
  //   setStrategicFunctionWorkload({
  //     ...strategicFunctionWorkload,
  //     designationDepartmentLevel: designationDepartmentLevelReserve,
  //     approvedDepartmentDesignationFile
  //   });
  //   setSteps(steps + 1);
  // };

  // const approvedDepartmentDesignationFileHandler = (value?: File) => {
  //   setApprovedDepartmentDesignationFile(value);
  // };

  // //SF3
  // const setStrategicFunction3Handler = async () => {
  //   setStrategicFunctionWorkload({
  //     ...strategicFunctionWorkload,
  //     designationAsSportTrainorAcademic,
  //     coachAdviserCertificateFile,
  //     designationAsMemberOfAdhoc,
  //     approvedDesignationFile,
  //     totalOfAcademicAdvisees,
  //     listOfAdviseesFile
  //   });
  //   setIsSubmitting(true);
  // };

  // const coachAdviserCertificateFileHandler = (value?: File) => {
  //   setCoachAdviserCertificateFile(value);
  // };

  // const approvedDesignationFileHandler = (value?: File) => {
  //   setApprovedDesignationFile(value);
  // };

  // const designationAsMemberHandler = (value?: string) => {
  //   setDesignationAsMemberOfAdhoc(value);
  // };

  // const setTotalNumberAcademicAdviseesHandler = (value?: string) => {
  //   setTotalOfAcademicAdvisees(value);
  // };

  // const listAdviseesFileHandler = (value?: File) => {
  //   setListOfAdviseesFile(value);
  // };

  // const setDesignationSSTAActivity = (value?: string) => {
  //   setDesignationAsSportTrainorAcademic(value);
  // };

  // useEffect(() => {
  //   (async () => {
  //     if (isSubmitting) {
  //       if (
  //         strategicFunctionWorkload?.approvedUniversityDesignationFile &&
  //         strategicFunctionWorkload.designationUniversityLevel &&
  //         strategicFunctionWorkload.approvedCollegeCampusDesignationFile &&
  //         strategicFunctionWorkload.approvedDepartmentDesignationFile &&
  //         strategicFunctionWorkload.approvedDesignationFile &&
  //         strategicFunctionWorkload.coachAdviserCertificateFile &&
  //         strategicFunctionWorkload.designationAsMemberOfAdhoc &&
  //         strategicFunctionWorkload.designationAsSportTrainorAcademic &&
  //         strategicFunctionWorkload.designationCollegeCampusLevel &&
  //         strategicFunctionWorkload.designationDepartmentLevel &&
  //         strategicFunctionWorkload.listOfAdviseesFile &&
  //         strategicFunctionWorkload.totalOfAcademicAdvisees
  //       ) {
  //         let designationUniversityPoints;
  //         let designationCollegeCampusPoints;
  //         let designationDepartmentPoints;
  //         let designationSportsSocioPoint;
  //         let totalNumberOfAcademicAdviseesPoints;

  //         designationUniversityPoints =
  //           strategicFunctionWorkload.designationUniversityLevel.length * 18;
  //         designationCollegeCampusPoints =
  //           strategicFunctionWorkload.designationCollegeCampusLevel.length * 15;
  //         designationDepartmentPoints =
  //           strategicFunctionWorkload.designationDepartmentLevel.length * 12;

  //         if (
  //           strategicFunctionWorkload.designationAsSportTrainorAcademic ===
  //           "University Level"
  //         ) {
  //           designationSportsSocioPoint = 5;
  //         } else {
  //           designationSportsSocioPoint = 3;
  //         }

  //         totalNumberOfAcademicAdviseesPoints =
  //           parseFloat(strategicFunctionWorkload.totalOfAcademicAdvisees) *
  //           0.023;

  //         strategicFunctionWorkload.sfwPoints =
  //           designationUniversityPoints +
  //           designationCollegeCampusPoints +
  //           designationDepartmentPoints +
  //           designationSportsSocioPoint +
  //           totalNumberOfAcademicAdviseesPoints;

  //         // await SaveStrategicFunctionWorkload(strategicFunctionWorkload);
  //         setIsSubmitting(false);
  //         window.location.reload();
  //       }
  //     }
  //   })();
  // }, [isSubmitting]);

  const clearStates = () => {};

  const backHandler = () => {
    if (steps > 1) {
      setSteps(steps - 1);
    }
  };

  const [designationUniversityLevel, setDesignationUniversityLevel] = useState<
    string[]
  >([]);

  const [designationUniversity1, setDesignationUniversity1] = useState("");
  const [designationUniversity2, setDesignationUniversity2] = useState("");
  const [designationUniversity3, setDesignationUniversity3] = useState("");

  let designationUniversity: string[] = [];

  const [universityLevelInputDesignation, setUniversityLevelInputDesignation] =
    useState("");

  const onSelectDesignation = (value: string) => {
    designationUniversity.push(value);
  };

  const onSelectDesignationUniversity1 = (value: string) => {
    if (value.length > 0) {
      setDesignationUniversity1(value);
    }
  };

  const onSelectDesignationUniversity2 = (value: string) => {
    if (value.length > 0) {
      setDesignationUniversity2(value);
    }
  };

  const onSelectDesignationUniversity3 = (value: string) => {
    if (value.length > 0) {
      setDesignationUniversity3(value);
    }
  };

  const textInputDesignationUniversity4 = (value: string) => {
    if (value.length > 0) {
      setUniversityLevelInputDesignation(value);
    }
  };

  const onNextSubmit = () => {
    if (steps === 1) {
      setDesignationUniversityLevel(
        [
          designationUniversity1,
          designationUniversity2,
          designationUniversity3,
          universityLevelInputDesignation
        ].filter(Boolean)
      );
    }
    setSteps(steps + 1);
    if (steps === 3) console.log(strategicFunctionWorkload);
  };

  useEffect(() => {
    setStrategicFunctionWorkload({
      designationUniversityLevel,
      designationCollegeCampusLevel
    });
  }, [designationUniversityLevel]);

  return (
    <MainContainer>
      <TopNav
        menuHandler={() => setIsMenuOpen(!isMenuOpen)}
        profileHandler={() => setIsProfileOpen(!isProfileOpen)}
      />
      <Menu isMenuOpen={isMenuOpen} />
      <ProfileTab isProfileOpen={isProfileOpen} />
      <BodyContainer>
        <ScreenTitle title="Strategic Functions (SF)" />
        <Container>
          {steps === 1 && (
            <StrategicFunction1
              onSelect1={onSelectDesignationUniversity1}
              onSelect2={onSelectDesignationUniversity2}
              onSelect3={onSelectDesignationUniversity3}
              textInput4={textInputDesignationUniversity4}
              designationUniversity={
                strategicFunctionWorkload?.designationUniversityLevel
              }
              universityLevelInputDesignation={universityLevelInputDesignation}
              designationUniversity1={designationUniversity1}
              designationUniversity2={designationUniversity2}
              designationUniversity3={designationUniversity3}
            />
          )}
          {steps === 2 && <StrategicFunction2 onSelect={onSelectDesignation} />}
          <Buttons>
            {steps > 1 && (
              <ButtonContainer>
                <FormButton text="Back" onClicked={backHandler}></FormButton>
              </ButtonContainer>
            )}
            <ButtonContainer>
              <FormButton
                text={steps !== 2 ? "Next" : "Submit"}
                onClicked={onNextSubmit}
              ></FormButton>
            </ButtonContainer>
          </Buttons>
        </Container>
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
  border: 5px solid black;
  border-radius: 15px;
  margin: 80px;
`;

const Container = styled.div`
  padding: 30px;
  width: 95%;
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

const UploadContainer = styled.div`
  width: auto;
  max-width: 500px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const UploadTextDescription = styled.label`
  font-weight: 400;
  font-size: 17px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  margin: 20px 20px 0px 0px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 80px;
  justify-content: flex-end;
`;

const UploadFileContainer = styled.div`
  max-width: 100px;
`;

const UniversityLabelContainer = styled.div`
  display: flex;
  align-self: flex-start;
  margin: 30px;
`;

const UniversityLabelText = styled.text`
  font-family: HurmeGeometricSans3SemiBold;
  font-size: 15px;
  line-height: 15px;
`;

const CheckBoxGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
`;

const CheckBoxColumnContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const CheckBox = styled.div<{ isSelected: boolean }>`
  border: 1px solid black;
  min-width: 12px;
  min-height: 12px;
  margin-right: 5px;
  cursor: pointer;
  background-color: ${p => (p.isSelected ? Colors.active : "none")};
  transition: opacity 0.1s ease-in-out;
  &:hover {
    opacity: 0.3;
  }
`;

const CheckBoxLabel = styled.text`
  font-family: HurmeGeometricSans3;
  font-size: 15px;
  line-height: 15px;
`;

export default StrategicFunction;
