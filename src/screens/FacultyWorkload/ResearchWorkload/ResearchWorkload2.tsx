import React from "react";
import styled from "styled-components";
import Dropdown from "../../../components/Dropdown";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import UploadFileButton from "../../../components/UploadFileButton";
import ResearchWorkload3 from "./ResearchWorkload3";

type ResearchWorkload2Props = {
  researchWorkLoadHandler2: () => void;
  fundGeneratedHandler: (value?: string) => void;
  rwlFile1Handler: (value?: File) => void;
  backHandler: () => void;
  fundGeneratedDisplay?: string;
  rwlFileName1?: string;
  points: number;
  study1Points: number;
  study2Points: number;
  study3Points: number;
  study4Points: number;
  fundGeneratedPoints: number;
  researchWorkLoadHandler3: (value: boolean) => void;
  isSubmitting: boolean;
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
  studyPoints: number;
};

const ResearchWorkload2 = ({
  researchWorkLoadHandler2,
  fundGeneratedHandler,
  rwlFile1Handler,
  backHandler,
  fundGeneratedDisplay,
  rwlFileName1,
  points,
  study1Points,
  study2Points,
  study3Points,
  study4Points,
  fundGeneratedPoints,
  researchWorkLoadHandler3,
  isSubmitting,
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
  studyPoints
}: ResearchWorkload2Props) => {
  const fileHandler = (file?: File) => {
    rwlFile1Handler(file);
  };

  const setFundGenerated = (fundGeneratedValue?: string) => {
    fundGeneratedHandler(fundGeneratedValue);
  };

  return (
    <>
      <Container>
        <SubContainer>
          <WorkloadTextContainer>
            <WorkloadText>{WorkloadType.RESEARCH_WORKLOAD}</WorkloadText>
          </WorkloadTextContainer>
          <InputsContainer>
            <Dropdown
              option={DROPDOWN_LISTS.FUND_GENERATED_PER_SEMESTER}
              label="Fund Generated per Semester (in peso)"
              onSelect={setFundGenerated}
              val={fundGeneratedDisplay}
            />
          </InputsContainer>
          <UploadContainer>
            <UploadTextDescription>
              Upload Proposal (for Approved Externally Funded Proposal) or
              Progress Report (for On-going Externally Funded Study) here:
            </UploadTextDescription>
            <UploadFileContainer>
              <UploadFileButton
                fileHandler={fileHandler}
                workloadFileName={rwlFileName1}
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
        researchWorkLoadHandler2={researchWorkLoadHandler2}
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
        fundGeneratedPoints={fundGeneratedPoints}
        studyPoints={studyPoints}
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
  width: 90%;
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

const UploadContainer = styled.div`
  width: 95%;
  max-width: 50rem;
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
  padding: 20px;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 17px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
`;

const UploadFileContainer = styled.div`
  max-width: 100px;
`;

const TotalPointsContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  padding-left: 40px;
`;

export default ResearchWorkload2;
