import React from "react";
import Dropdown from "../../../components/Dropdown";
import FormButton from "../../../components/FormButton";
import styled from "styled-components";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import Colors from "../../../constants/Colors";

type Step1Props = {
  titleOfStudy?: string;
  titleOfStudyHandler: (val: string) => void;
  fundingStudy: (val: string) => void;
  fundDisplay?: string;
  researchWorkLoadHandler: () => void;
  fundingOfStudy?: string;
  hasNext: boolean;
};

const Step1 = ({
  titleOfStudy,
  titleOfStudyHandler,
  fundingStudy,
  fundDisplay,
  researchWorkLoadHandler,
  fundingOfStudy,
  hasNext
}: Step1Props) => {
  return (
    <Container>
      <SubContainer>
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
            val={fundDisplay}
          />
        </InputsContainer>
        {hasNext && (
          <ButtonContainer>
            <FormButton
              text="Next"
              onClicked={researchWorkLoadHandler}
              disabled={
                (titleOfStudy!.length <= 0 && fundingOfStudy?.length! <= 0) ||
                titleOfStudy!.length <= 0 ||
                fundDisplay?.length! <= 0
              }
            ></FormButton>
          </ButtonContainer>
        )}
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
  width: 60%;
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
  font-size: 17px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
`;

const TextInput = styled.input`
  background-color: ${Colors.textFieldBackground};
  border-width: 1px;
  font-family: HurmeGeometricSans3;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 40px 20px 0px 0px;
`;

export default Step1;
