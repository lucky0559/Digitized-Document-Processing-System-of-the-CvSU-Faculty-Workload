import React from "react";
import styled from "styled-components";
import Dropdown from "../../../components/Dropdown";
import Colors from "../../../constants/Colors";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import { VscCircleLargeOutline, VscCircleLargeFilled } from "react-icons/vsc";
import UploadFileButton from "../../../components/UploadFileButton";
import FormButton from "../../../components/FormButton";

type ResearchWorkload1Props = {
  researchWorkLoadHandler1: () => void;
  typeOfStudyHandler: (value: string) => void;
  designationStudyHandler: (value?: string) => void;
  backHandler: () => void;
  rwlFileHandler: (value?: File) => void;
  typeOfStudy: string;
  designationStudy?: string;
  rwlFileName?: string;
  rwlFileNameDisplay?: string;
  isSubmitting: boolean;
  points: number;
};

const ResearchWorkload1 = ({
  researchWorkLoadHandler1,
  typeOfStudyHandler,
  designationStudyHandler,
  backHandler,
  rwlFileHandler,
  typeOfStudy,
  designationStudy,
  rwlFileName,
  isSubmitting,
  points
}: ResearchWorkload1Props) => {
  const fileHandler = (file?: File) => {
    rwlFileHandler(file);
  };

  const setDesignationStudy = (designationStudyValue?: string) => {
    designationStudyHandler(designationStudyValue);
  };

  return (
    <Container>
      <SubContainer>
        <WorkloadTextContainer>
          <WorkloadText>{WorkloadType.RESEARCH_WORKLOAD}</WorkloadText>
        </WorkloadTextContainer>
        <InputsContainer>
          <TextInputContainer>
            <Label>Type of Study:</Label>
            <RadioInputContainer>
              {typeOfStudy === "Approved Proposal" ? (
                <VscCircleLargeFilled color={Colors.active} />
              ) : (
                <VscCircleLargeOutline
                  onClick={() => typeOfStudyHandler("Approved Proposal")}
                />
              )}
              <Label>Approved Proposal</Label>
            </RadioInputContainer>
            <RadioInputContainer>
              {typeOfStudy === "On-going Study" ? (
                <VscCircleLargeFilled color={Colors.active} />
              ) : (
                <VscCircleLargeOutline
                  onClick={() => typeOfStudyHandler("On-going Study")}
                />
              )}
              <Label>On-going Study</Label>
            </RadioInputContainer>
          </TextInputContainer>
          <Dropdown
            option={DROPDOWN_LISTS.DESIGNATION_IN_THE_STUDY}
            label="Designation in the Study"
            onSelect={setDesignationStudy}
            val={designationStudy}
          />
        </InputsContainer>
        <UploadContainer>
          <UploadTextDescription>
            Upload Proposal (for Approved Proposal) or Progress Report (for
            On-going Study) here:
          </UploadTextDescription>
          <UploadFileContainer>
            <UploadFileButton
              fileHandler={fileHandler}
              workloadFileName={rwlFileName}
            />
          </UploadFileContainer>
        </UploadContainer>
        {/* <AddStudyContainer>
          <AddStudyText>Add Another Study</AddStudyText>
        </AddStudyContainer> */}
        <div style={{ marginTop: 50 }}>
          <Label style={{ fontWeight: "bold" }}>
            Total Teaching Workload = {points.toString()}
          </Label>
        </div>
        <Buttons>
          <ButtonContainer>
            <FormButton text="Back" onClicked={backHandler}></FormButton>
          </ButtonContainer>
          <ButtonContainer>
            <FormButton
              text="Submit"
              onClicked={researchWorkLoadHandler1}
              disabled={
                typeOfStudy.length <= 0 ||
                designationStudy?.length! <= 0 ||
                rwlFileName?.length! <= 0
              }
              isSubmitting={isSubmitting}
            ></FormButton>
          </ButtonContainer>
        </Buttons>
      </SubContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
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

const RadioInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 15px 0px 0px;
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
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px 0px 0px;
`;

// const AddStudyContainer = styled.div`
//   display: flex;
//   align-self: flex-start;
//   margin-top: 50px;
// `;

// const AddStudyText = styled.text`
//   font-family: HurmeGeometricSans3SemiBold;
//   font-size: 17px;
//   line-height: 18px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
`;

const UploadFileContainer = styled.div`
  max-width: 100px;
`;

export default ResearchWorkload1;
