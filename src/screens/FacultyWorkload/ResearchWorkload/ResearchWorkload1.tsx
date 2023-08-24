import React from "react";
import styled from "styled-components";
import Dropdown from "../../../components/Dropdown";
import Colors from "../../../constants/Colors";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import { VscCircleLargeOutline, VscCircleLargeFilled } from "react-icons/vsc";
import UploadFileButton from "../../../components/UploadFileButton";
import ResearchWorkload3 from "./ResearchWorkload3";

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
  researchWorkLoadHandler3: (value: boolean) => void;
  studyPoints: number;
  onRemoveRwlFile: () => void;
  onRemoveStudy1File: () => void;
  onRemoveStudy2File: () => void;
  onRemoveStudy3File: () => void;
  onRemoveStudy4File: () => void;
};

const ResearchWorkload1 = ({
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
  fundGeneratedPoints,
  researchWorkLoadHandler3,
  studyPoints,
  researchWorkLoadHandler1,
  onRemoveRwlFile,
  onRemoveStudy1File,
  onRemoveStudy2File,
  onRemoveStudy3File,
  onRemoveStudy4File
}: ResearchWorkload1Props) => {
  const fileHandler = (file?: File) => {
    rwlFileHandler(file);
  };

  const setDesignationStudy = (designationStudyValue?: string) => {
    designationStudyHandler(designationStudyValue);
  };

  return (
    <>
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
                onRemoveFile={onRemoveRwlFile}
              />
            </UploadFileContainer>
          </UploadContainer>

          <TotalPointsContainer>
            <Label style={{ fontWeight: "bold" }}>
              Study Points = {studyPoints.toString()}
            </Label>
          </TotalPointsContainer>
        </SubContainer>
      </Container>
      <ResearchWorkload3
        researchWorkLoadHandler3={researchWorkLoadHandler3}
        researchWorkLoadHandler1={researchWorkLoadHandler1}
        backHandler={backHandler}
        isSubmitting={isSubmitting}
        onSelectStudy1={onSelectStudy1}
        study1={study1}
        onStudy1FileSelect={onStudy1FileSelect}
        study1FileName={study1FileName}
        onSelectStudy2={onSelectStudy2}
        study2={study2}
        onStudy2FileSelect={onStudy2FileSelect}
        study2FileName={study2FileName}
        onSelectStudy3={onSelectStudy3}
        study3={study3}
        onStudy3FileSelect={onStudy3FileSelect}
        study3FileName={study3FileName}
        onSelectStudy4={onSelectStudy4}
        study4={study4}
        onStudy4FileSelect={onStudy4FileSelect}
        study4FileName={study4FileName}
        points={points}
        study1Points={study1Points}
        study2Points={study2Points}
        study3Points={study3Points}
        study4Points={study4Points}
        studyPoints={studyPoints}
        onRemoveStudy1File={onRemoveStudy1File}
        onRemoveStudy2File={onRemoveStudy2File}
        onRemoveStudy3File={onRemoveStudy3File}
        onRemoveStudy4File={onRemoveStudy4File}
      />
    </>
  );
};

const Container = styled.div`
  padding: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SubContainer = styled.div`
  border: 2px solid black;
  width: 90%;
  height: auto;
  border-radius: 15px;
  padding: 15px;
`;

const WorkloadTextContainer = styled.div`
  display: flex;
  align-self: flex-start;
`;

const WorkloadText = styled.span`
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

const TotalPointsContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  padding-left: 40px;
`;

const UploadFileContainer = styled.div`
  max-width: 100px;
`;

export default ResearchWorkload1;
