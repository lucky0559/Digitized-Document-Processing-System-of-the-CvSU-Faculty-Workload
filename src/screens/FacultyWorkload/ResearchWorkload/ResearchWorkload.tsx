import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Dropdown from "../../../components/Dropdown";
import FormButton from "../../../components/FormButton";
import Colors from "../../../constants/Colors";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";

type ResearchWorkloadProps = {
  researchWorkLoadHandler: () => void;
  titleOfStudyHandler: (value: string) => void;
  fundingOfStudyHandler: (value?: string) => void;
  backHandler: () => void;
  titleOfStudy: string;
  fundingOfStudy?: string;
};

const ResearchWorkload = ({
  researchWorkLoadHandler,
  titleOfStudyHandler,
  fundingOfStudyHandler,
  backHandler,
  titleOfStudy,
  fundingOfStudy
}: ResearchWorkloadProps) => {
  const fundingStudy = (fundingStudyValue?: string) => {
    fundingOfStudyHandler(fundingStudyValue);
  };

  return (
    <Container>
      <WorkloadTextContainer>
        <WorkloadText>{WorkloadType.RESEARCH_WORKLOAD}</WorkloadText>
      </WorkloadTextContainer>
      <InputsContainer>
        <TextInputContainer>
          <Label>Title of the Study</Label>
          <TextInput
            type="text"
            value={titleOfStudy}
            onChange={e => titleOfStudyHandler(e.target.value)}
          />
        </TextInputContainer>
        <Dropdown
          option={DROPDOWN_LISTS.FUNDING_OF_STUDY}
          label="Funding of the Study"
          onSelect={fundingStudy}
          val={fundingOfStudy}
        />
      </InputsContainer>
      <ButtonContainer>
        <FormButton text="Back" onClicked={backHandler}></FormButton>
      </ButtonContainer>
      <ButtonContainer>
        <FormButton
          text="Next"
          onClicked={researchWorkLoadHandler}
        ></FormButton>
      </ButtonContainer>
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
  font-size: 16px;
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
  max-width: 300px;
`;

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
`;

const TextInput = styled.input`
  width: 200px;
  background-color: ${Colors.textFieldBackground};
  border-width: 1px;
  font-family: HurmeGeometricSans3;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  margin: 20px 20px 0px 0px;
`;

export default ResearchWorkload;
