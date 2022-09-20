import React from "react";
import styled from "styled-components";
import Dropdown from "../../../components/Dropdown";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import UploadFileButton from "../../../components/UploadFileButton";
import FormButton from "../../../components/FormButton";

type StrategicFunction3Props = {
  coachAdviserCertificateFileHandler: (value?: File) => void;
  backHandler: () => void;
  designationAsMemberHandler: (value?: string) => void;
  approvedDesignationFileHandler: (value?: File) => void;
  totalNumberAcademicAdviseesHandler: (value?: string) => void;
  listAdviseesFileHandler: (value?: File) => void;
  setStrategicFunction3Handler: () => void;
  setDesignationSSTAActivity: (value?: string) => void;
  designationSSTAActivity?: string;
  coachAdviserCertificateFileName?: string;
  designationAsMember?: string;
  approvedDesignationFileName?: string;
  totalNumberAcademicAdvisees?: string;
  listAdviseesFileName?: string;
  isSubmitting: boolean;
};

const StrategicFunction3 = ({
  coachAdviserCertificateFileHandler,
  backHandler,
  designationAsMemberHandler,
  approvedDesignationFileHandler,
  totalNumberAcademicAdviseesHandler,
  listAdviseesFileHandler,
  setStrategicFunction3Handler,
  setDesignationSSTAActivity,
  designationSSTAActivity,
  coachAdviserCertificateFileName,
  designationAsMember,
  approvedDesignationFileName,
  totalNumberAcademicAdvisees,
  listAdviseesFileName,
  isSubmitting
}: StrategicFunction3Props) => {
  const setCoachAdviserCertificateFileHandler = (file?: File) => {
    coachAdviserCertificateFileHandler(file);
  };

  const setApprovedDesignationFileHandler = (file?: File) => {
    approvedDesignationFileHandler(file);
  };

  const setListAdviseesFileHandler = (file?: File) => {
    listAdviseesFileHandler(file);
  };

  const setDesignationSSTAA = (designationSSTAActivityValue?: string) => {
    setDesignationSSTAActivity(designationSSTAActivityValue);
  };

  return (
    <Container>
      <WorkloadTextContainer>
        <WorkloadText>{WorkloadType.STRATEGIC_FUNCTION}</WorkloadText>
      </WorkloadTextContainer>
      <InputsContainer>
        <Dropdown
          option={DROPDOWN_LISTS.DESIGNATION_SPORTS_SOCIO_TRAINOR_ACADEMIC}
          label="Designation as Sports/Socio-cultural Coach or Trainor & Academic Organization Adviser"
          onSelect={setDesignationSSTAA}
          val={designationSSTAActivity}
        />
      </InputsContainer>
      <UploadContainer>
        <UploadTextDescription>
          Upload coach or adviser certificate here:
        </UploadTextDescription>
        <UploadFileContainer>
          <UploadFileButton
            fileHandler={setCoachAdviserCertificateFileHandler}
            workloadFileName={coachAdviserCertificateFileName}
          />
        </UploadFileContainer>
      </UploadContainer>
      <InputsContainer>
        <Label>Designation as Member of University-wide Adhoc Committee</Label>
        <TextInput
          type="text"
          onChange={e => designationAsMemberHandler(e.target.value)}
          value={designationAsMember}
        />
      </InputsContainer>
      <UploadContainer>
        <UploadTextDescription>
          Upload approved designation here:
        </UploadTextDescription>
        <UploadFileContainer>
          <UploadFileButton
            fileHandler={setApprovedDesignationFileHandler}
            workloadFileName={approvedDesignationFileName}
          />
        </UploadFileContainer>
      </UploadContainer>
      <InputsContainer>
        <Label>Total Number of Academic Advisees</Label>
        <TextInput
          type="number"
          onChange={e => totalNumberAcademicAdviseesHandler(e.target.value)}
          value={totalNumberAcademicAdvisees}
        />
      </InputsContainer>
      <UploadContainer>
        <UploadTextDescription>
          Upload list of advisees here:
        </UploadTextDescription>
        <UploadFileContainer>
          <UploadFileButton
            fileHandler={setListAdviseesFileHandler}
            workloadFileName={listAdviseesFileName}
          />
        </UploadFileContainer>
      </UploadContainer>
      <Buttons>
        <ButtonContainer>
          <FormButton text="Back" onClicked={backHandler}></FormButton>
        </ButtonContainer>
        <ButtonContainer>
          <FormButton
            text="Submit"
            onClicked={setStrategicFunction3Handler}
            isSubmitting={isSubmitting}
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
  max-width: 350px;
`;

const UploadContainer = styled.div`
  width: auto;
  max-width: 400px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const UploadTextDescription = styled.label`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  margin: 20px 20px 0px 0px;
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

const Label = styled.label`
  font-size: 12px;
  font-family: HurmeGeometricSans3;
  align-self: flex-start;
  font-weight: 400;
`;

const TextInput = styled.input``;

export default StrategicFunction3;
