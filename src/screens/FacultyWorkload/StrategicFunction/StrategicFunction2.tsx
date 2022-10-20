import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UploadFileButton from "../../../components/UploadFileButton";
import FormButton from "../../../components/FormButton";
import Colors from "../../../constants/Colors";
import { WorkloadType } from "../../../constants/Strings";

type StrategicFunction2Props = {
  strategicFunction2Handler: () => void;
  designationDepartmentLevelHandler: (value: string) => void;
  approvedDepartmentDesignationFileHandler: (value?: File) => void;
  backHandler: () => void;
  approvedDepartmentDesignationFileName?: string;
  designationDepartmentLevel: string[];
};

const StrategicFunction2 = ({
  strategicFunction2Handler,
  designationDepartmentLevelHandler,
  approvedDepartmentDesignationFileHandler,
  backHandler,
  approvedDepartmentDesignationFileName,
  designationDepartmentLevel
}: StrategicFunction2Props) => {
  const fileHandler = (file?: File) => {
    approvedDepartmentDesignationFileHandler(file);
  };

  const setDesignationDepartmentLevel = (
    designationDepartmentLevelValue: string
  ) => {
    dataClicked(designationDepartmentLevelValue);
    designationDepartmentLevelHandler(designationDepartmentLevelValue);
  };

  let dataValue: string[] = [...designationDepartmentLevel];

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
    dataValue = [...designationDepartmentLevel];
  }, [boxClicked]);

  const onSubmit = () => {
    strategicFunction2Handler();
  };

  return (
    <Container>
      <WorkloadTextContainer>
        <WorkloadText>{WorkloadType.STRATEGIC_FUNCTION}</WorkloadText>
      </WorkloadTextContainer>
      <UniversityLabelContainer>
        <UniversityLabelText>
          Designation at the Department Label:
        </UniversityLabelText>
      </UniversityLabelContainer>
      <CheckBoxGroupContainer>
        <CheckBoxColumnContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={
                dataValue.includes(
                  "Department Coordinator (Research, Extension, GAD, Budget Officer, OJT, Guidance)"
                )!
              }
              onClick={() =>
                setDesignationDepartmentLevel(
                  "Department Coordinator (Research, Extension, GAD, Budget Officer, OJT, Guidance)"
                )
              }
            />
            <CheckBoxLabel>
              Department Coordinator (Research, Extension, GAD, Budget Officer,
              OJT, Guidance)
            </CheckBoxLabel>
          </CheckBoxContainer>
        </CheckBoxColumnContainer>
        <CheckBoxColumnContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={dataValue.includes("Department MISOT")!}
              onClick={() => setDesignationDepartmentLevel("Department MISOT")}
            />
            <CheckBoxLabel>Department MISOT</CheckBoxLabel>
          </CheckBoxContainer>
        </CheckBoxColumnContainer>
        <CheckBoxColumnContainer>
          <CheckBoxContainer>
            <CheckBox
              isSelected={dataValue.includes("IMDU Chair/Member")!}
              onClick={() => setDesignationDepartmentLevel("IMDU Chair/Member")}
            />
            <CheckBoxLabel>IMDU Chair/Member</CheckBoxLabel>
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
            workloadFileName={approvedDepartmentDesignationFileName}
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
  font-size: 16px;
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

export default StrategicFunction2;
