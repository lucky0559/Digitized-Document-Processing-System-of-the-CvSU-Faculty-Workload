import React from "react";
import styled from "styled-components";
import Dropdown from "../../../components/Dropdown";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import UploadFileButton from "../../../components/UploadFileButton";
import FormButton from "../../../components/FormButton";

type ResearchWorkload2Props = {
  researchWorkLoadHandler2: () => void;
  fundGeneratedHandler: (value?: string) => void;
  rwlFile1Handler: (value?: File) => void;
  backHandler: () => void;
  fundGenerated?: string;
  rwlFileName1?: string;
};

const ResearchWorkload2 = ({
  researchWorkLoadHandler2,
  fundGeneratedHandler,
  rwlFile1Handler,
  backHandler,
  fundGenerated,
  rwlFileName1
}: ResearchWorkload2Props) => {
  const fileHandler = (file?: File) => {
    rwlFile1Handler(file);
  };

  const setFundGenerated = (fundGeneratedValue?: string) => {
    fundGeneratedHandler(fundGeneratedValue);
  };

  return (
    <Container>
      <WorkloadTextContainer>
        <WorkloadText>{WorkloadType.RESEARCH_WORKLOAD}</WorkloadText>
      </WorkloadTextContainer>
      <InputsContainer>
        <Dropdown
          option={DROPDOWN_LISTS.FUND_GENERATED_PER_SEMESTER}
          label="Fund Generated per Semester (in peso)"
          onSelect={setFundGenerated}
          val={fundGenerated}
        />
      </InputsContainer>
      <UploadContainer>
        <UploadTextDescription>
          Upload Proposal (for Approved Externally Funded Proposal) or Progress
          Report (for On-going Externally Funded Study) here:
        </UploadTextDescription>
        <UploadFileContainer>
          <UploadFileButton
            fileHandler={fileHandler}
            workloadFileName={rwlFileName1}
          />
        </UploadFileContainer>
      </UploadContainer>
      <AddStudyContainer>
        <AddStudyText>Add Another Study</AddStudyText>
      </AddStudyContainer>
      <Buttons>
        <ButtonContainer>
          <FormButton text="Back" onClicked={backHandler}></FormButton>
        </ButtonContainer>
        <ButtonContainer>
          <FormButton
            text="Next"
            onClicked={researchWorkLoadHandler2}
          ></FormButton>
        </ButtonContainer>
      </Buttons>
    </Container>
  );
};

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

const AddStudyContainer = styled.div`
  display: flex;
  align-self: flex-start;
  margin-top: 50px;
`;

const AddStudyText = styled.text`
  font-family: HurmeGeometricSans3SemiBold;
  font-size: 17px;
  line-height: 18px;
  text-decoration: underline;
  cursor: pointer;
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

export default ResearchWorkload2;
