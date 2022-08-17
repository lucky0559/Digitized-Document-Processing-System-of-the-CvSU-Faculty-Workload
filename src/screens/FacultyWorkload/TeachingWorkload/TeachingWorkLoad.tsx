import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormButton from "../../../components/FormButton";
import UploadFileButton from "../../../components/UploadFileButton";
import Colors from "../../../constants/Colors";
import { WorkloadType } from "../../../constants/Strings";
import { TeachingWorkLoadProps } from "../FacultyWorkloadScreen";

type TeachingWorkLoadScreenProps = {
  teachingWorkLoadHandler: (values?: TeachingWorkLoadProps) => void;
};

const TeachingWorkLoad = ({
  teachingWorkLoadHandler
}: TeachingWorkLoadScreenProps) => {
  const [numberOfPreparations, setNumberOfPreparations] = useState("");
  const [contactHours, setContactHours] = useState("");
  const [totalNoOfHours, setTotalNoOfHours] = useState("");
  const [teachingWorkLoadValues, setTeachingWorkLoadValues] =
    useState<TeachingWorkLoadProps>();
  const [file, setFile] = useState<File>();

  const nextHandler = () => {
    setTeachingWorkLoadValues({
      numberOfPreparations,
      contactHours,
      totalNoOfHours,
      twlFile: file
    });
  };

  const fileHandler = (file?: File) => {
    setFile(file);
  };

  useEffect(() => {
    teachingWorkLoadHandler(teachingWorkLoadValues);
  }, [teachingWorkLoadValues]);

  return (
    <Container>
      <WorkloadTextContainer>
        <WorkloadText>{WorkloadType.TEACHING_WORKLOAD}</WorkloadText>
      </WorkloadTextContainer>
      <InputsContainer>
        <TextInputContainer>
          <Label>Number of preparations</Label>
          <TextInput
            type="text"
            value={numberOfPreparations}
            onChange={e => setNumberOfPreparations(e.target.value)}
          />
        </TextInputContainer>
        <TextInputContainer>
          <Label>Contact Hours</Label>
          <TextInput
            type="text"
            value={contactHours}
            onChange={e => setContactHours(e.target.value)}
          />
        </TextInputContainer>
        <TextInputContainer>
          <Label>Total No. of Hours</Label>
          <TextInput
            type="text"
            value={totalNoOfHours}
            onChange={e => setTotalNoOfHours(e.target.value)}
          />
        </TextInputContainer>
        <UploadFileContainer>
          <Label>Upload class schedule here:</Label>
          <UploadFileButton fileHandler={fileHandler} />
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

export default TeachingWorkLoad;
