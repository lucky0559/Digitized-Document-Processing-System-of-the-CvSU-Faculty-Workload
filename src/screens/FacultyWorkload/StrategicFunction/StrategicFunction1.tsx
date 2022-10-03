import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UploadFileButton from "../../../components/UploadFileButton";
import FormButton from "../../../components/FormButton";
import Colors from "../../../constants/Colors";
import { WorkloadType } from "../../../constants/Strings";

type StrategicFunction1Props = {
  strategicFunction1Handler: () => void;
  designationCampusCollegeLevelHandler: (value: string) => void;
  approvedCollegeCampusDesignationFileHandler: (value?: File) => void;
  backHandler: () => void;
  approvedCollegeCampusDesignationFileName?: string;
  designationCollegeCampusLevel: string[];
};

const StrategicFunction1 = ({
  strategicFunction1Handler,
  designationCampusCollegeLevelHandler,
  approvedCollegeCampusDesignationFileHandler,
  backHandler,
  approvedCollegeCampusDesignationFileName,
  designationCollegeCampusLevel
}: StrategicFunction1Props) => {
  const fileHandler = (file?: File) => {
    approvedCollegeCampusDesignationFileHandler(file);
  };

  const setDesignationUniversityLevel = (
    designationUniversityLevelValue: string
  ) => {
    dataClicked(designationUniversityLevelValue);
    designationCampusCollegeLevelHandler(designationUniversityLevelValue);
  };

  let dataValue: string[] = [...designationCollegeCampusLevel];

  const [boxClicked, setBoxClicked] = useState(0);

  const dataClicked = (value: string) => {
    if (dataValue.includes(value)) {
      const index = dataValue.indexOf(value);
      if (index > -1) {
        dataValue.splice(index, 1);
      }
    } else {
      dataValue.push(value);
    }
    setBoxClicked(boxClicked + 1);
  };

  useEffect(() => {
    dataValue = [...designationCollegeCampusLevel];
  }, [boxClicked]);

  const onSubmit = () => {
    strategicFunction1Handler();
  };

  return (
    <Container>
      <WorkloadTextContainer>
        <WorkloadText>{WorkloadType.STRATEGIC_FUNCTION}</WorkloadText>
      </WorkloadTextContainer>
      <UniversityLabelContainer>
        <UniversityLabelText>
          Designation at the College/Campus Label:
        </UniversityLabelText>
      </UniversityLabelContainer>
      <CheckBoxGroupContainer>
        <CheckBoxColumnContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                dataValue.includes("Department Chair/Principal/Administrator")!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "Department Chair/Principal/Administrator"
                )
              }
            />
            <CheckBoxLabel>
              Department Chair/Principal/Administrator
            </CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                dataValue.includes(
                  "College/Campus Coordinator (Research, Extension, GAD, Sports, Job Placement, Guidance, Quality Assurance or Extramural Study)"
                )!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "College/Campus Coordinator (Research, Extension, GAD, Sports, Job Placement, Guidance, Quality Assurance or Extramural Study)"
                )
              }
            />
            <CheckBoxLabel>
              College/Campus Coordinator (Research, Extension, GAD, Sports, Job
              Placement, Guidance, Quality Assurance or Extramural Study)
            </CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                dataValue.includes(
                  "College/Campus Budget Officer/Property Custodian"
                )!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "College/Campus Budget Officer/Property Custodian"
                )
              }
            />
            <CheckBoxLabel>
              College/Campus Budget Officer/Property Custodian
            </CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                dataValue.includes("In-Charge of College Reading Room")!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "In-Charge of College Reading Room"
                )
              }
            />
            <CheckBoxLabel>In-Charge of College Reading Room</CheckBoxLabel>
          </CheckBoxContainer>
        </CheckBoxColumnContainer>
        <CheckBoxColumnContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={dataValue.includes("College/Campus Secretary")!}
              onClick={() =>
                setDesignationUniversityLevel("College/Campus Secretary")
              }
            />
            <CheckBoxLabel>College/Campus Secretary</CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                dataValue.includes(
                  "Graduate Program/Learning Center Coordinator"
                )!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "Graduate Program/Learning Center Coordinator"
                )
              }
            />
            <CheckBoxLabel>
              Graduate Program/Learning Center Coordinator
            </CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={dataValue.includes("College IMDU Chair/Member")!}
              onClick={() =>
                setDesignationUniversityLevel("College IMDU Chair/Member")
              }
            />
            <CheckBoxLabel>College IMDU Chair/Member</CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                dataValue.includes("College/Campus Student Misdemeanor Member")!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "College/Campus Student Misdemeanor Member"
                )
              }
            />
            <CheckBoxLabel>
              College/Campus Student Misdemeanor Member
            </CheckBoxLabel>
          </CheckBoxContainer>
        </CheckBoxColumnContainer>
        <CheckBoxColumnContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={dataValue.includes("College/Campus Registrar")!}
              onClick={() =>
                setDesignationUniversityLevel("College/Campus Registrar")
              }
            />
            <CheckBoxLabel>College/Campus Registrar</CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                dataValue.includes(
                  "College/Campus Liaison Officer/MISO/PIO/Enterprise Laboratory/Resource Generation Officer"
                )!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "College/Campus Liaison Officer/MISO/PIO/Enterprise Laboratory/Resource Generation Officer"
                )
              }
            />
            <CheckBoxLabel>
              College/Campus Liaison Officer/MISO/PIO/Enterprise
              Laboratory/Resource Generation Officer
            </CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                dataValue.includes("Accreditation Task Force Chairman/Member")!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "Accreditation Task Force Chairman/Member"
                )
              }
            />
            <CheckBoxLabel>
              Accreditation Task Force Chairman/Member
            </CheckBoxLabel>
          </CheckBoxContainer>
        </CheckBoxColumnContainer>
      </CheckBoxGroupContainer>
      <UploadContainer>
        <UploadTextDescription>
          Upload approved university designation here:
        </UploadTextDescription>
        <UploadFileContainer>
          <UploadFileButton
            fileHandler={fileHandler}
            workloadFileName={approvedCollegeCampusDesignationFileName}
          />
        </UploadFileContainer>
      </UploadContainer>
      <Buttons>
        <ButtonContainer>
          <FormButton text="Back" onClicked={backHandler}></FormButton>
        </ButtonContainer>
        <ButtonContainer>
          <FormButton text="Next" onClicked={onSubmit}></FormButton>
        </ButtonContainer>
      </Buttons>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px;
  width: auto;
  max-width: 60%;
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
  font-size: 16px;
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
  font-size: 14px;
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
  justify-content: space-between;
  width: 100%;
  margin-top: 80px;
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
  font-size: 13px;
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
  font-size: 12px;
  line-height: 15px;
`;

export default StrategicFunction1;
