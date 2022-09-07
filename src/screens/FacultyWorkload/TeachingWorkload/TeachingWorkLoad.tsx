import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormButton from "../../../components/FormButton";
import UploadFileButton from "../../../components/UploadFileButton";
import Colors from "../../../constants/Colors";
import { WorkloadType } from "../../../constants/Strings";

type TeachingWorkLoadScreenProps = {
  teachingWorkLoadHandler: () => void;
  numberOfPreparationsHandler: (value: string) => void;
  contactHoursHandler: (value: string) => void;
  totalNoOfHoursHandler: (value: string) => void;
  twlFileHandler: (value?: File) => void;
  numberOfPreparations: string;
  contactHours: string;
  totalNoOfHours: string;
  twlFileName?: string;
};

const TeachingWorkLoad = ({
  teachingWorkLoadHandler,
  numberOfPreparations,
  contactHours,
  totalNoOfHours,
  twlFileName,
  numberOfPreparationsHandler,
  contactHoursHandler,
  totalNoOfHoursHandler,
  twlFileHandler
}: TeachingWorkLoadScreenProps) => {
  const nextHandler = () => {
    teachingWorkLoadHandler();
  };

  const fileHandler = (file?: File) => {
    twlFileHandler(file);
  };

  return (
    <Container>
      <WorkloadTextContainer>
        <WorkloadText>{WorkloadType.TEACHING_WORKLOAD}</WorkloadText>
      </WorkloadTextContainer>
      <InputsContainer>
        <TextInputContainer>
          <Label>Number of preparations</Label>
          <TextInput
            type="number"
            value={numberOfPreparations}
            onChange={e => numberOfPreparationsHandler(e.target.value)}
          />
        </TextInputContainer>
        <TextInputContainer>
          <Label>Contact Hours</Label>
          <TextInput
            type="number"
            value={contactHours}
            onChange={e => contactHoursHandler(e.target.value)}
          />
        </TextInputContainer>
        <TextInputContainer>
          <Label>Total No. of Hours</Label>
          <TextInput
            type="number"
            value={totalNoOfHours}
            onChange={e => totalNoOfHoursHandler(e.target.value)}
          />
        </TextInputContainer>
        <UploadFileContainer>
          <Label>Upload class schedule here:</Label>
          <UploadFileButtonContainer>
            <UploadFileButton
              fileHandler={fileHandler}
              workloadFileName={twlFileName}
            />
          </UploadFileButtonContainer>
        </UploadFileContainer>
      </InputsContainer>
      <ButtonContainer>
        <FormButton text="Next" onClicked={nextHandler}></FormButton>
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
`;

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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

const UploadFileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  margin: 20px 20px 0px 0px;
`;

const UploadFileButtonContainer = styled.div`
  max-width: 100px;
`;

export default TeachingWorkLoad;
