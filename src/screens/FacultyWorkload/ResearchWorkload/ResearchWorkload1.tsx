import React from "react";
import styled from "styled-components";
import Dropdown from "../../../components/Dropdown";
import Colors from "../../../constants/Colors";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import { VscCircleLargeOutline, VscCircleLargeFilled } from "react-icons/vsc";
import UploadFileButton from "../../../components/UploadFileButton";
import FormButton from "../../../components/FormButton";
import DropdownWithUpload from "../../../components/DropdownWithUpload";

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
  onSelectStudy1: (value: string) => void;
  study1?: string;
  onStudy1FileSelect: (value?: File) => void;
  study1FileName?: string;
  onSelectStudy2: (value: string) => void;
  study2?: string;
  onStudy2FileSelect: (value?: File) => void;
  study2FileName?: string;
  onSelectStudy3: (value: string) => void;
  study3?: string;
  onStudy3FileSelect: (value?: File) => void;
  study3FileName?: string;
  onSelectStudy4: (value: string) => void;
  study4?: string;
  onStudy4FileSelect: (value?: File) => void;
  study4FileName?: string;
  study1Points: number;
  study2Points: number;
  study3Points: number;
  study4Points: number;
  fundGeneratedPoints: number;
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
  points,
  onSelectStudy1,
  study1,
  onStudy1FileSelect,
  study1FileName,
  onSelectStudy2,
  study2,
  onStudy2FileSelect,
  study2FileName,
  onSelectStudy3,
  study3,
  onStudy3FileSelect,
  study3FileName,
  onSelectStudy4,
  study4,
  onStudy4FileSelect,
  study4FileName,
  study1Points,
  study2Points,
  study3Points,
  study4Points,
  fundGeneratedPoints
}: ResearchWorkload1Props) => {
  const fileHandler = (file?: File) => {
    rwlFileHandler(file);
  };

  const setDesignationStudy = (designationStudyValue?: string) => {
    designationStudyHandler(designationStudyValue);
  };

  const onStudy1FileSelectHandler = (value?: File) => {
    onStudy1FileSelect(value);
  };

  const onStudy2FileSelectHandler = (value?: File) => {
    onStudy2FileSelect(value);
  };

  const onStudy3FileSelectHandler = (value?: File) => {
    onStudy3FileSelect(value);
  };

  const onStudy4FileSelectHandler = (value?: File) => {
    onStudy4FileSelect(value);
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
        <text>
          Disseminated research output in College or University In-House
          Review/Conferences
        </text>
        <div>
          <DropdownWithUpload
            inputLabel="Study 1"
            uploadLabel="Upload Certificate of Presentation here:"
            options={DROPDOWN_LISTS.DISSEMINATED_RESEARCH_OUTPUT}
            onSelect={onSelectStudy1}
            val={study1}
            onFileSelect={onStudy1FileSelectHandler}
            fileName={study1FileName}
          />
          <DropdownWithUpload
            inputLabel="Study 2"
            uploadLabel="Upload Certificate of Presentation here:"
            options={DROPDOWN_LISTS.DISSEMINATED_RESEARCH_OUTPUT}
            onSelect={onSelectStudy2}
            val={study2}
            onFileSelect={onStudy2FileSelectHandler}
            fileName={study2FileName}
          />
          <DropdownWithUpload
            inputLabel="Study 3"
            uploadLabel="Upload Certificate of Presentation here:"
            options={DROPDOWN_LISTS.DISSEMINATED_RESEARCH_OUTPUT}
            onSelect={onSelectStudy3}
            val={study3}
            onFileSelect={onStudy3FileSelectHandler}
            fileName={study3FileName}
          />
          <DropdownWithUpload
            inputLabel="Study 4"
            uploadLabel="Upload Certificate of Presentation here:"
            options={DROPDOWN_LISTS.DISSEMINATED_RESEARCH_OUTPUT}
            onSelect={onSelectStudy4}
            val={study4}
            onFileSelect={onStudy4FileSelectHandler}
            fileName={study4FileName}
          />
        </div>
        {/* <AddStudyContainer>
          <AddStudyText>Add Another Study</AddStudyText>
        </AddStudyContainer> */}
        <div style={{ marginTop: 50 }}>
          <Label style={{ fontWeight: "bold" }}>
            Total Research Workload ={" "}
            {(
              points +
              study1Points +
              study2Points +
              study3Points +
              study4Points +
              fundGeneratedPoints
            ).toString()}
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
                rwlFileName === undefined
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
  width: 80%;
  max-width: 500px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
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
