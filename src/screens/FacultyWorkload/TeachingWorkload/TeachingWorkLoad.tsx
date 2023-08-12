import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../../components/Footer";
import FormButton from "../../../components/FormButton";
import Menu from "../../../components/Menu";
import ProfileTab from "../../../components/ProfileTab";
import ScreenTitle from "../../../components/ScreenTitle";
import TopNav from "../../../components/TopNav";
import UploadFileButton from "../../../components/UploadFileButton";
import Colors from "../../../constants/Colors";
import { WorkloadType } from "../../../constants/Strings";
import {
  GetAllUserPendingWorkloads,
  SaveTeachingWorkload
} from "../../../lib/faculty-workload.hooks";
import { TeachingWorkLoadType } from "../../../types/TeachingWorkload";
import { Confirm } from "semantic-ui-react";
import { UserContext } from "../../../App";
import { WORKLOAD_STATUS } from "../../../enums/workloadEnums";
import { getSavedWorkload } from "../../../lib/teaching-workload.hooks";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

type TeachingWorkLoadProps = {
  UseLogout: () => void;
};

const TeachingWorkLoad = ({ UseLogout }: TeachingWorkLoadProps) => {
  const fileHandler = (file?: File) => {
    twlFileHandler(file);
  };

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isFacultySubmenuOpen, setIsFacultySubmenuOpen] = useState(false);

  const [teachingWorkLoad, setTeachingWorkLoad] =
    useState<TeachingWorkLoadType>();
  const [numberOfPreparations, setNumberOfPreparations] = useState("");
  const [contactHours, setContactHours] = useState("");
  const [totalNoOfStudents, setTotalNoOfStudents] = useState("");
  const [twlFile, setTwlFile] = useState<File>();

  const [points, setPoints] = useState(0);

  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);

  const { user, actions } = useContext(UserContext);

  const [workloadStatus, setWorkloadStatus] = useState<number>();

  const [isLoading, setIsLoading] = useState(false);

  const onSave = async () => {
    setIsSaving(false);
    setTeachingWorkLoad(teachingWorkLoad => ({
      ...teachingWorkLoad,
      numberOfPreparations,
      contactHours,
      totalNoOfStudents,
      twlFile
    }));
    setWorkloadStatus(WORKLOAD_STATUS.SAVE);
    setIsSubmitting(true);
  };

  useEffect(() => {
    (async () => {
      if (isSubmitting) {
        console.log(teachingWorkLoad);
        if (
          teachingWorkLoad?.contactHours &&
          teachingWorkLoad.numberOfPreparations &&
          teachingWorkLoad.totalNoOfStudents &&
          (teachingWorkLoad.twlFile || teachingWorkLoad?.filename) &&
          workloadStatus
        ) {
          const totalNoOfStudents =
            parseFloat(teachingWorkLoad.numberOfPreparations) +
            parseFloat(teachingWorkLoad?.contactHours) +
            parseFloat(teachingWorkLoad.totalNoOfStudents) * 0.023;
          teachingWorkLoad.totalTeachingWorkload = Number(
            totalNoOfStudents.toFixed(2)
          );
          await SaveTeachingWorkload(teachingWorkLoad, workloadStatus);
          const {
            extensionWorkloads,
            researchWorkloads,
            strategicFunctionWorkloads
          } = await GetAllUserPendingWorkloads(user.email);
          actions.setHasPendingExtensionWorkload(
            !!extensionWorkloads.length && extensionWorkloads[0].isSubmitted
          );
          actions.setHasPendingResearchWorkload(
            !!researchWorkloads.length && researchWorkloads[0].isSubmitted
          );
          actions.setHasPendingStrategicWorkload(
            !!strategicFunctionWorkloads.length &&
              strategicFunctionWorkloads[0].isSubmitted
          );
          setIsSubmitting(false);
          clearStates();
          if (!!!researchWorkloads.length) {
            navigate("/research-workload", { replace: true });
          } else if (!!!extensionWorkloads.length) {
            navigate("/extension-workload", { replace: true });
          } else if (!!!strategicFunctionWorkloads.length) {
            navigate("/strategic-function-workload", { replace: true });
          } else {
            navigate("/workload-summary", { replace: true });
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    if (numberOfPreparations && contactHours && totalNoOfStudents && twlFile) {
      const totalNoOfStudentsPoints = Number(totalNoOfStudents) * 0.023;
      return setPoints(
        Number(numberOfPreparations) +
          Number(contactHours) +
          totalNoOfStudentsPoints
      );
    }
    setPoints(0);
  }, [numberOfPreparations, contactHours, totalNoOfStudents, twlFile]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { data } = await getSavedWorkload(user.id);
      setTeachingWorkLoad(data);
      setNumberOfPreparations(data.numberOfPreparations || "");
      setContactHours(data.contactHours || "");
      setTotalNoOfStudents(data.totalNoOfStudents || "");
      setPoints(Number(data.totalTeachingWorkload));
      setIsLoading(false);
    })();
  }, [user.id]);

  return (
    <MainContainer>
      <Confirm
        open={isSaving}
        onCancel={() => setIsSaving(false)}
        onConfirm={onSave}
        content="Confirm saving of workload?"
        size="large"
      />
      <TopNav profileHandler={() => setIsProfileOpen(!isProfileOpen)} />
      <Menu
        isFacultySubmenuOpen={isFacultySubmenuOpen}
        facultySubMenuHandler={() =>
          setIsFacultySubmenuOpen(!isFacultySubmenuOpen)
        }
      />
      <ProfileTab isProfileOpen={isProfileOpen} UseLogout={UseLogout} />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <LoadingSpinner color={Colors.primary} />
        </div>
      ) : (
        <BodyContainer>
          <ScreenTitle title="Faculty Workload" />
          <Container>
            <SubContainer>
              <WorkloadTextContainer>
                <WorkloadText>{WorkloadType.TEACHING_WORKLOAD}</WorkloadText>
              </WorkloadTextContainer>
              <InputsContainer>
                <Label style={{ marginBottom: 40, alignSelf: "flex-start" }}>
                  TWL = NP + CH + TNS(0.023)
                </Label>
                <TextInputContainer>
                  <Label style={{ fontWeight: "bold" }}>NP</Label>
                  <Label>Number of preparations</Label>
                  <TextInput
                    type="number"
                    value={numberOfPreparations}
                    onChange={e => numberOfPreparationsHandler(e.target.value)}
                    min={0}
                  />
                </TextInputContainer>
                <TextInputContainer>
                  <Label style={{ fontWeight: "bold" }}>CH</Label>
                  <Label>Contact Hours</Label>
                  <TextInput
                    type="number"
                    value={contactHours}
                    onChange={e => contactHoursHandler(e.target.value)}
                    min={0}
                  />
                </TextInputContainer>
                <TextInputContainer>
                  <Label style={{ fontWeight: "bold" }}>TNS</Label>
                  <Label>Total No. of Students</Label>
                  <TextInput
                    type="number"
                    value={totalNoOfStudents}
                    onChange={e => totalNoOfStudentsHandler(e.target.value)}
                    min={0}
                  />
                </TextInputContainer>
                <UploadFileContainer>
                  <Label>Upload class schedule here:</Label>
                  <UploadFileButtonContainer>
                    <UploadFileButton
                      fileHandler={fileHandler}
                      workloadFileName={
                        teachingWorkLoad?.filename
                          ? teachingWorkLoad?.filename
                          : twlFile?.name
                          ? twlFile?.name
                          : ""
                      }
                    />
                  </UploadFileButtonContainer>
                </UploadFileContainer>
              </InputsContainer>
            </SubContainer>
            <ButtonContainer>
              <Label style={{ fontWeight: "bold" }}>
                Total Teaching Workload ={" "}
                {teachingWorkLoad?.totalTeachingWorkload ||
                  points.toFixed(2).toString()}
              </Label>
              <div>
                <FormButton
                  text="Save"
                  onClicked={() => setIsSaving(true)}
                  isSubmitting={isSubmitting}
                  disabled={
                    (numberOfPreparations.length <= 0 ||
                      contactHours.length <= 0 ||
                      totalNoOfStudents.length <= 0 ||
                      twlFile?.name.length! <= 0 ||
                      twlFile?.name === undefined ||
                      isSubmitting) &&
                    !teachingWorkLoad
                  }
                ></FormButton>
              </div>
            </ButtonContainer>
          </Container>
        </BodyContainer>
      )}
      <FooterContainer>
        <Footer />
      </FooterContainer>
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
  border: 5px solid black;
  border-radius: 15px;
  margin: 120px auto;
`;

const Container = styled.div`
  padding: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
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
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px 0px 0px;
  width: 100%;
`;

const UploadFileButtonContainer = styled.div`
  max-width: 100px;
`;

const FooterContainer = styled.div`
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  z-index: 1;
`;

export default TeachingWorkLoad;
