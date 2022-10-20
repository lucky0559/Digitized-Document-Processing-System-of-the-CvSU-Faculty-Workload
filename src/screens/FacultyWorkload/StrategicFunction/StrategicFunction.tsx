import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UploadFileButton from "../../../components/UploadFileButton";
import FormButton from "../../../components/FormButton";
import Colors from "../../../constants/Colors";
import { WorkloadType } from "../../../constants/Strings";

type StrategicFunctionProps = {
  strategicFunctionHandler: () => void;
  designationUniversityLevelHandler: (value: string) => void;
  approvedUniversityDesignationFileHandler: (value?: File) => void;
  backHandler: () => void;
  approvedUniversityDesignationFileName?: string;
  designationUniversityLevel: string[];
};

const StrategicFunction = ({
  strategicFunctionHandler,
  designationUniversityLevelHandler,
  approvedUniversityDesignationFileHandler,
  backHandler,
  approvedUniversityDesignationFileName,
  designationUniversityLevel
}: StrategicFunctionProps) => {
  const fileHandler = (file?: File) => {
    approvedUniversityDesignationFileHandler(file);
  };

  const setDesignationUniversityLevel = (
    designationUniversityLevelValue: string
  ) => {
    dataClicked(designationUniversityLevelValue);
    designationUniversityLevelHandler(designationUniversityLevelValue);
  };

  const onSubmit = () => {
    strategicFunctionHandler();
  };

  let dataValue: string[] = [...designationUniversityLevel];

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
    dataValue = [...designationUniversityLevel];
  }, [boxClicked]);

  return (
    <Container>
      <WorkloadTextContainer>
        <WorkloadText>{WorkloadType.STRATEGIC_FUNCTION}</WorkloadText>
      </WorkloadTextContainer>
      <UniversityLabelContainer>
        <UniversityLabelText>
          Designation at the University Label
        </UniversityLabelText>
      </UniversityLabelContainer>
      <CheckBoxGroupContainer>
        <CheckBoxColumnContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={dataValue?.includes("Dean/Director")!}
              onClick={() => setDesignationUniversityLevel("Dean/Director")}
            />
            <CheckBoxLabel>Dean/Director</CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                designationUniversityLevel?.includes(
                  "University Project Head/Assistant Project Head"
                )!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "University Project Head/Assistant Project Head"
                )
              }
            />
            <CheckBoxLabel>
              University Project Head/Assistant Project Head
            </CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                designationUniversityLevel?.includes(
                  "Head, Physical Planning/Project Implementation Unit"
                )!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "Head, Physical Planning/Project Implementation Unit"
                )
              }
            />
            <CheckBoxLabel>
              Head, Physical Planning/Project Implementation Unit
            </CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                designationUniversityLevel?.includes(
                  "Chair/Member of Review Boards (ERB, IBC, IACUC, CSC)"
                )!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "Chair/Member of Review Boards (ERB, IBC, IACUC, CSC)"
                )
              }
            />
            <CheckBoxLabel>
              Chair/Member of Review Boards (ERB, IBC, IACUC, CSC)
            </CheckBoxLabel>
          </CheckBoxContainer>
        </CheckBoxColumnContainer>
        <CheckBoxColumnContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                designationUniversityLevel?.includes(
                  "University Pollution Control Officer"
                )!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "University Pollution Control Officer"
                )
              }
            />
            <CheckBoxLabel>University Pollution Control Officer</CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                designationUniversityLevel?.includes(
                  "University Inspector/Engineer/Architect/Estimator"
                )!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "University Inspector/Engineer/Architect/Estimator"
                )
              }
            />
            <CheckBoxLabel>
              University Inspector/Engineer/Architect/Estimator
            </CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                designationUniversityLevel?.includes("Curricular Program Head")!
              }
              onClick={() =>
                setDesignationUniversityLevel("Curricular Program Head")
              }
            />
            <CheckBoxLabel>Curricular Program Head</CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                designationUniversityLevel?.includes("RECETS Council Members")!
              }
              onClick={() =>
                setDesignationUniversityLevel("RECETS Council Members")
              }
            />
            <CheckBoxLabel>RECETS Council Members</CheckBoxLabel>
          </CheckBoxContainer>
        </CheckBoxColumnContainer>
        <CheckBoxColumnContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                designationUniversityLevel?.includes(
                  "University Textbook Board Chairman/Member"
                )!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "University Textbook Board Chairman/Member"
                )
              }
            />
            <CheckBoxLabel>
              University Textbook Board Chairman/Member
            </CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                designationUniversityLevel?.includes(
                  "Internal Assessment Body Member (Evaluated at least 3 programs)"
                )!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "Internal Assessment Body Member (Evaluated at least 3 programs)"
                )
              }
            />
            <CheckBoxLabel>
              Internal Assessment Body Member (Evaluated at least 3 programs)
            </CheckBoxLabel>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                designationUniversityLevel?.includes(
                  "Head of Research Monitoring & Evaluation/Public Office/Central Experiment Station/ITSO/other units of Research & Extension Center"
                )!
              }
              onClick={() =>
                setDesignationUniversityLevel(
                  "Head of Research Monitoring & Evaluation/Public Office/Central Experiment Station/ITSO/other units of Research & Extension Center"
                )
              }
            />
            <CheckBoxLabel>
              Head of Research Monitoring & Evaluation/Public Office/Central
              Experiment Station/ITSO/other units of Research & Extension Center
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
            workloadFileName={approvedUniversityDesignationFileName}
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
