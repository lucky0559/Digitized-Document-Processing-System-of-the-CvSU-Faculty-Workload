import React from "react";
import styled from "styled-components";
import Dropdown from "../../../components/Dropdown";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import UploadFileButton from "../../../components/UploadFileButton";
import FormButton from "../../../components/FormButton";

type ResearchWorkload3Props = {
  researchWorkLoadHandler3: () => void;
  backHandler: () => void;
  disseminatedResearchHandler: (value?: string) => void;
  rwlFile2Handler: (value?: File) => void;
  disseminatedResearchDisplay?: string;
  rwlFile2Name?: string;
  isSubmitting: boolean;
};

const ResearchWorkload3 = ({
  researchWorkLoadHandler3,
  backHandler,
  disseminatedResearchHandler,
  rwlFile2Handler,
  disseminatedResearchDisplay,
  rwlFile2Name,
  isSubmitting
}: ResearchWorkload3Props) => {
  const fileHandler = (file?: File) => {
    rwlFile2Handler(file);
  };

  const setDisseminatedResearch = (disseminatedResearchValue?: string) => {
    disseminatedResearchHandler(disseminatedResearchValue);
  };

  return (
    <Container>
      <WorkloadTextContainer>
        <WorkloadText>{WorkloadType.RESEARCH_WORKLOAD}</WorkloadText>
      </WorkloadTextContainer>
      <InputsContainer>
        <Dropdown
          option={DROPDOWN_LISTS.DISSEMINATED_RESEARCH_OUTPUT}
          label="Disseminated research output in College or University In-House Review/Conferences"
          onSelect={setDisseminatedResearch}
          val={disseminatedResearchDisplay}
        />
      </InputsContainer>
      <UploadContainer>
        <UploadTextDescription>
          Upload certificate of presentation here:
        </UploadTextDescription>
        <UploadFileContainer>
          <UploadFileButton
            fileHandler={fileHandler}
            workloadFileName={rwlFile2Name}
          />
        </UploadFileContainer>
      </UploadContainer>
      <AddStudyContainer>
        <AddStudyText>
          Add another disseminated research output in College or University
          In-House Review/Conferences
        </AddStudyText>
      </AddStudyContainer>
      <Buttons>
        <ButtonContainer>
          <FormButton text="Back" onClicked={backHandler}></FormButton>
        </ButtonContainer>
        <ButtonContainer>
          <FormButton
            text="Submit"
            onClicked={researchWorkLoadHandler3}
            isSubmitting={isSubmitting}
            disabled={
              disseminatedResearchDisplay?.length! <= 0 ||
              disseminatedResearchDisplay === undefined ||
              // rwlFile2Name?.length! <= 0 ||
              rwlFile2Name === undefined
            }
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
  max-width: 350px;
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
  max-width: 400px;
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

export default ResearchWorkload3;
