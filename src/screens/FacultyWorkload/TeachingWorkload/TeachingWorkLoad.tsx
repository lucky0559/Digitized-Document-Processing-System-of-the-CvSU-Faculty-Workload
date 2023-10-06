import { useContext, useEffect, useState } from "react";
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
import { getTwlSavedWorkload } from "../../../lib/teaching-workload.hooks";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { getConfig } from "../../../lib/config.hooks";

type TeachingWorkLoadProps = {
  UseLogout: () => void;
};

const TeachingWorkLoad = ({ UseLogout }: TeachingWorkLoadProps) => {
  const fileHandler = (file?: File) => {
    twlFileHandler(file);
  };

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
  };

  useEffect(() => {
    (async () => {
      if (isSubmitting) {
        if (
          teachingWorkLoad?.contactHours &&
          teachingWorkLoad.numberOfPreparations &&
          teachingWorkLoad.totalNoOfStudents &&
          (teachingWorkLoad.twlFile || teachingWorkLoad?.filename)
        ) {
          const totalNoOfStudents =
            parseFloat(teachingWorkLoad.numberOfPreparations) +
            parseFloat(teachingWorkLoad?.contactHours) +
            parseFloat(teachingWorkLoad.totalNoOfStudents) * 0.023;
          teachingWorkLoad.totalTeachingWorkload = Number(
            totalNoOfStudents.toFixed(2)
          );
          await SaveTeachingWorkload(teachingWorkLoad, WORKLOAD_STATUS.SAVE);
          const {
            extensionWorkloads,
            researchWorkloads,
            strategicFunctionWorkloads
          } = await GetAllUserPendingWorkloads(user.email);
          const { data: config } = await getConfig();
          const isAbleToSubmit = !(
            new Date() >= new Date(config.submissionDateStart) &&
            new Date() <= new Date(config.submissionDateEnd)
          );
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
          if (!!!researchWorkloads.length && isAbleToSubmit) {
            navigate("/research-workload", { replace: true });
          } else if (!!!extensionWorkloads.length && isAbleToSubmit) {
            navigate("/extension-workload", { replace: true });
          } else if (!!!strategicFunctionWorkloads.length && isAbleToSubmit) {
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
    if (
      numberOfPreparations &&
      contactHours &&
      totalNoOfStudents &&
      (twlFile || teachingWorkLoad?.filename)
    ) {
      const totalNoOfStudentsPoints = Number(totalNoOfStudents) * 0.023;
      return setPoints(
        Number(numberOfPreparations) +
          Number(contactHours) +
          totalNoOfStudentsPoints
      );
    }
    setPoints(0);
  }, [
    numberOfPreparations,
    contactHours,
    totalNoOfStudents,
    twlFile,
    teachingWorkLoad?.filename
  ]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { data } = await getTwlSavedWorkload(user.id);
      setTeachingWorkLoad(data);
      setNumberOfPreparations(data.numberOfPreparations || "");
      setContactHours(data.contactHours || "");
      setTotalNoOfStudents(data.totalNoOfStudents || "");

      if (
        data.numberOfPreparations &&
        data.contactHours &&
        data.totalNoOfStudents
      ) {
        const totalNoOfStudentsPoints = Number(data.totalNoOfStudents) * 0.023;
        setPoints(
          Number(numberOfPreparations) +
            Number(contactHours) +
            totalNoOfStudentsPoints
        );
      }

      setPoints(Number(data.totalTeachingWorkload));
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const onRemoveFile = () => {
    setTwlFile(undefined);
    setTeachingWorkLoad({
      ...teachingWorkLoad,
      filename: undefined
    });
  };

  return (
    <MainContainer>
      <Confirm
        open={isSaving}
        onCancel={() => setIsSaving(false)}
        onConfirm={onSave}
        content="Confirm saving of workload?"
        size="large"
      />
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
        <>
          <TopNav profileHandler={() => setIsProfileOpen(!isProfileOpen)} />
          <Menu />
          <ProfileTab isProfileOpen={isProfileOpen} UseLogout={UseLogout} />
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
                      onChange={e =>
                        numberOfPreparationsHandler(e.target.value)
                      }
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
                        onRemoveFile={onRemoveFile}
                      />
                    </UploadFileButtonContainer>
                  </UploadFileContainer>
                </InputsContainer>
              </SubContainer>
              <ButtonContainer>
                <Label style={{ fontWeight: "bold" }}>
                  Total Teaching Workload ={" "}
                  {points ? points.toFixed(2).toString() : 0}
                </Label>
                <div>
                  <FormButton
                    text="Save"
                    onClicked={() => setIsSaving(true)}
                    isSubmitting={isSubmitting}
                    disabled={
                      numberOfPreparations.length <= 0 ||
                      contactHours.length <= 0 ||
                      totalNoOfStudents.length <= 0 ||
                      twlFile
                        ? twlFile?.name.length! <= 0 ||
                          twlFile?.name === undefined
                        : teachingWorkLoad?.filename?.length! <= 0 ||
                          teachingWorkLoad?.filename === undefined ||
                          isSubmitting
                    }
                  ></FormButton>
                </div>
              </ButtonContainer>
            </Container>
          </BodyContainer>
        </>
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
