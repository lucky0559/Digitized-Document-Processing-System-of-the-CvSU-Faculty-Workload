import React from "react";
import styled from "styled-components";
import Dropdown from "../../../components/Dropdown";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import UploadFileButton from "../../../components/UploadFileButton";
import FormButton from "../../../components/FormButton";

type ExtensionWorkloadProps = {
  extensionWorkloadHandler: () => void;
  designationExtensionActivityHandler: (value?: string) => void;
  extensionActivityFileHandler: (value?: File) => void;
  resourcePersonHandler: (value?: string) => void;
  certificateFileHandler: (value?: File) => void;
  totalNumberHoursHandler: (value?: string) => void;
  summaryOfHoursFileHandler: (value?: File) => void;
  backHandler: () => void;
  designationExtensionActivity?: string;
  extensionActivityFileName?: string;
  resourcePerson?: string;
  certificateFileName?: string;
  totalNumberHours?: string;
  summaryOfHoursFileName?: string;
};

const ExtensionWorkload = ({
  extensionWorkloadHandler,
  designationExtensionActivityHandler,
  extensionActivityFileHandler,
  resourcePersonHandler,
  certificateFileHandler,
  totalNumberHoursHandler,
  summaryOfHoursFileHandler,
  backHandler,
  designationExtensionActivity,
  extensionActivityFileName,
  resourcePerson,
  certificateFileName,
  totalNumberHours,
  summaryOfHoursFileName
}: ExtensionWorkloadProps) => {
  const setExtensionActivityFileHandler = (file?: File) => {
    extensionActivityFileHandler(file);
  };

  const setCertificateFileHandler = (file?: File) => {
    certificateFileHandler(file);
  };

  const setSummaryOfHoursFileHandler = (file?: File) => {
    summaryOfHoursFileHandler(file);
  };

  const setDesignationExtensionActivity = (
    designationExtensionActivityValue?: string
  ) => {
    designationExtensionActivityHandler(designationExtensionActivityValue);
  };

  const setResourcePerson = (resourcePersonValue?: string) => {
    resourcePersonHandler(resourcePersonValue);
  };

  return (
    <Container>
      <WorkloadTextContainer>
        <WorkloadText>{WorkloadType.EXTENSION_WORKLOAD}</WorkloadText>
      </WorkloadTextContainer>
      <InputsContainer>
        <Dropdown
          option={DROPDOWN_LISTS.DESIGNATION_EXTENSION_ACTIVITY}
          label="Designation in Extension Activity"
          onSelect={setDesignationExtensionActivity}
          val={designationExtensionActivity}
        />
      </InputsContainer>
      <UploadContainer>
        <UploadTextDescription>
          Upload Extension Activity Accomplishment Report here:
        </UploadTextDescription>
        <UploadFileContainer>
          <UploadFileButton
            fileHandler={setExtensionActivityFileHandler}
            workloadFileName={extensionActivityFileName}
          />
        </UploadFileContainer>
      </UploadContainer>
      <InputsContainer>
        <Dropdown
          option={DROPDOWN_LISTS.RESOURCE_PERSON}
          label="Resource Person in an Extension Activity"
          onSelect={setResourcePerson}
          val={resourcePerson}
        />
      </InputsContainer>
      <UploadContainer>
        <UploadTextDescription>
          Upload certificate of presentation here:
        </UploadTextDescription>
        <UploadFileContainer>
          <UploadFileButton
            fileHandler={setCertificateFileHandler}
            workloadFileName={certificateFileName}
          />
        </UploadFileContainer>
      </UploadContainer>
      <InputsContainer>
        <Label>Total Number of Hours Rendered in Extension Activities</Label>
        <TextInput
          type="number"
          onChange={e => totalNumberHoursHandler(e.target.value)}
          value={totalNumberHours}
        />
      </InputsContainer>
      <UploadContainer>
        <UploadTextDescription>
          Upload Summary of hours rendered in extension activities:
        </UploadTextDescription>
        <UploadFileContainer>
          <UploadFileButton
            fileHandler={setSummaryOfHoursFileHandler}
            workloadFileName={summaryOfHoursFileName}
          />
        </UploadFileContainer>
      </UploadContainer>
      <Buttons>
        <ButtonContainer>
          <FormButton text="Back" onClicked={backHandler}></FormButton>
        </ButtonContainer>
        <ButtonContainer>
          <FormButton
            text="Next"
            onClicked={extensionWorkloadHandler}
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

export default ExtensionWorkload;
