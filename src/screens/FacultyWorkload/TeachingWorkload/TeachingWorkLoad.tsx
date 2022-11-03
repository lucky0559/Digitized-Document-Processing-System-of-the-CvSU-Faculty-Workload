import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormButton from "../../../components/FormButton";
import Menu from "../../../components/Menu";
import ProfileTab from "../../../components/ProfileTab";
import ScreenTitle from "../../../components/ScreenTitle";
import TopNav from "../../../components/TopNav";
import UploadFileButton from "../../../components/UploadFileButton";
import Colors from "../../../constants/Colors";
import { WorkloadType } from "../../../constants/Strings";
import { SaveTeachingWorkload } from "../../../lib/faculty-workload.hooks";
import { TeachingWorkLoadType } from "../../../types/TeachingWorkload";

const TeachingWorkLoad = () => {
  const fileHandler = (file?: File) => {
    twlFileHandler(file);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [teachingWorkLoad, setTeachingWorkLoad] =
    useState<TeachingWorkLoadType>();
  const [numberOfPreparations, setNumberOfPreparations] = useState("");
  const [contactHours, setContactHours] = useState("");
  const [totalNoOfStudents, setTotalNoOfStudents] = useState("");
  const [twlFile, setTwlFile] = useState<File>();

  const onSubmit = async () => {
    setTeachingWorkLoad({
      numberOfPreparations,
      contactHours,
      totalNoOfStudents,
      twlFile
    });
    setIsSubmitting(true);
  };

  useEffect(() => {
    (async () => {
      if (isSubmitting) {
        if (
          teachingWorkLoad?.contactHours &&
          teachingWorkLoad.numberOfPreparations &&
          teachingWorkLoad.totalNoOfStudents &&
          teachingWorkLoad.twlFile
        ) {
          const totalNoOfStudents =
            parseFloat(teachingWorkLoad.totalNoOfStudents) * 0.023;
          teachingWorkLoad.totalTeachingWorkload = totalNoOfStudents;
          // await SaveTeachingWorkload(teachingWorkLoad);
          setIsSubmitting(false);
          clearStates();
        }
      }
    })();
  }, [isSubmitting]);

  const clearStates = () => {
    setNumberOfPreparations("");
    setContactHours("");
    setTotalNoOfStudents("");
    setTwlFile(undefined);
    setTeachingWorkLoad(undefined);
  };

  const numberOfPreparationsHandler = (value: string) => {
    setNumberOfPreparations(value);
  };

  const contactHoursHandler = (value: string) => {
    setContactHours(value);
  };

  const totalNoOfStudentsHandler = (value: string) => {
    setTotalNoOfStudents(value);
  };

  const twlFileHandler = (value?: File) => {
    setTwlFile(value);
  };

  return (
    <MainContainer>
      <TopNav
        menuHandler={() => setIsMenuOpen(!isMenuOpen)}
        profileHandler={() => setIsProfileOpen(!isProfileOpen)}
      />
      <Menu isMenuOpen={isMenuOpen} />
      <ProfileTab isProfileOpen={isProfileOpen} />
      <BodyContainer>
        <ScreenTitle title="Faculty Workload" />
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
              <Label>Total No. of Students</Label>
              <TextInput
                type="number"
                value={totalNoOfStudents}
                onChange={e => totalNoOfStudentsHandler(e.target.value)}
              />
            </TextInputContainer>
            <UploadFileContainer>
              <Label>Upload class schedule here:</Label>
              <UploadFileButtonContainer>
                <UploadFileButton
                  fileHandler={fileHandler}
                  workloadFileName={twlFile?.name ? twlFile?.name : ""}
                />
              </UploadFileButtonContainer>
            </UploadFileContainer>
          </InputsContainer>
          <ButtonContainer>
            <FormButton
              text="Submit"
              onClicked={onSubmit}
              isSubmitting={isSubmitting}
              disabled={
                numberOfPreparations.length <= 0 ||
                contactHours.length <= 0 ||
                totalNoOfStudents.length <= 0 ||
                twlFile?.name.length! <= 0 ||
                twlFile?.name === undefined
              }
            ></FormButton>
          </ButtonContainer>
        </Container>
      </BodyContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

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
`;

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 17px;
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
