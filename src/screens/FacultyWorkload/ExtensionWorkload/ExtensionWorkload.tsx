import { useEffect, useState } from "react";
import styled from "styled-components";
import Dropdown from "../../../components/Dropdown";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import UploadFileButton from "../../../components/UploadFileButton";
import FormButton from "../../../components/FormButton";
import { ExtensionWorkloadType } from "../../../types/ExtensionWorkload";
import TopNav from "../../../components/TopNav";
import Menu from "../../../components/Menu";
import ProfileTab from "../../../components/ProfileTab";
import { SaveExtensionWorkload } from "../../../lib/faculty-workload.hooks";
import ScreenTitle from "../../../components/ScreenTitle";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import DesignationExtensionActivity from "./DesignationExtensionActivity";

type ExtensionWorkloadProps = {
  UseLogout: () => void;
};

const ExtensionWorkload = ({ UseLogout }: ExtensionWorkloadProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const [extensionWorkload, setExtensionWorkload] =
    useState<ExtensionWorkloadType>();

  const [designationExtensionActivity, setDesignationExtensionActivity] =
    useState<string[] | undefined>();
  const [leader, setLeader] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [facilitator, setFacilitator] = useState("");
  const [assistants, setAssistants] = useState("");
  const [extensionActivityFile, setExtensionActivityFile] = useState<File>();
  const [resourcePerson, setResourcePerson] = useState<string | undefined>("");
  const [certificateFile, setCertificateFile] = useState<File>();
  const [totalNumberHours, setTotalNumberHours] = useState<string | undefined>(
    ""
  );
  const [summaryOfHoursFile, setSummaryOfHoursFile] = useState<File>();

  const [isFacultySubmenuOpen, setIsFacultySubmenuOpen] = useState(false);

  const [points, setPoints] = useState(0);

  const [designationActivityPoints, setDesignationActivityPoints] = useState(0);
  const [resourcePersonActivityPoints, setResourcePersonActivityPoints] =
    useState(0);

  const extensionWorkloadHandler = () => {
    setExtensionWorkload({
      designationExtensionActivity: [
        leader,
        coordinator,
        facilitator,
        assistants
      ].filter(Boolean),
      extensionActivityFile,
      resourcePerson,
      certificateFile,
      totalNumberHours,
      summaryOfHoursFile
    });
    setIsSubmitting(true);
  };

  useEffect(() => {
    (async () => {
      if (isSubmitting) {
        if (
          extensionWorkload?.designationExtensionActivity &&
          extensionWorkload.extensionActivityFile &&
          extensionWorkload.resourcePerson &&
          extensionWorkload.certificateFile &&
          extensionWorkload.totalNumberHours &&
          extensionWorkload.summaryOfHoursFile
        ) {
          let designationExtensionActivityPoints;
          let resourcePersonPoints;
          let totalNumberHoursPoints;
          if (
            extensionWorkload.designationExtensionActivity.includes(
              "Project Leader"
            )
          ) {
            designationExtensionActivityPoints =
              Number(designationExtensionActivityPoints) + 3;
          }
          if (
            extensionWorkload.designationExtensionActivity.includes(
              "Project Coordinator"
            )
          ) {
            designationExtensionActivityPoints =
              Number(designationExtensionActivityPoints) + 2.5;
          }
          if (
            extensionWorkload.designationExtensionActivity.includes(
              "Project Facilitator"
            )
          ) {
            designationExtensionActivityPoints =
              Number(designationExtensionActivityPoints) + 2;
          }
          if (
            extensionWorkload.designationExtensionActivity.includes(
              "Project Assistants"
            )
          ) {
            designationExtensionActivityPoints =
              Number(designationExtensionActivityPoints) + 1;
          }

          if (extensionWorkload.resourcePerson === "International") {
            resourcePersonPoints = 4;
          } else if (extensionWorkload.resourcePerson === "National") {
            resourcePersonPoints = 3;
          } else if (extensionWorkload.resourcePerson === "Regional") {
            resourcePersonPoints = 2;
          } else {
            resourcePersonPoints = 1;
          }

          if (Number(extensionWorkload.totalNumberHours) * 0.05556 >= 3) {
            totalNumberHoursPoints = 3;
          } else {
            totalNumberHoursPoints =
              parseFloat(extensionWorkload.totalNumberHours) * 0.05556;
          }

          extensionWorkload.ewlPoints =
            Number(designationExtensionActivityPoints) +
            resourcePersonPoints +
            totalNumberHoursPoints;
          await SaveExtensionWorkload(extensionWorkload);
          setIsSubmitting(false);
          clearStates();
          navigate("/strategic-function-workload", { replace: true });
        }
      }
    })();
  });

  const clearStates = () => {
    setDesignationExtensionActivity(undefined);
    setExtensionActivityFile(undefined);
    setResourcePerson("");
    setCertificateFile(undefined);
    setTotalNumberHours("");
    setSummaryOfHoursFile(undefined);
    setExtensionWorkload(undefined);
  };

  const extensionActivityFileHandler = (value?: File) => {
    setExtensionActivityFile(value);
  };

  const resourcePersonHandler = (value?: string) => {
    setResourcePerson(value);
  };

  const certificateFileHandler = (value?: File) => {
    setCertificateFile(value);
  };

  const totalNumberHoursHandler = (value?: string) => {
    if (value?.length! > 3 || Number(value) > 100) {
      return;
    } else {
      setTotalNumberHours(value);
    }
  };

  const summaryOfHoursFileHandler = (value?: File) => {
    setSummaryOfHoursFile(value);
  };

  const setExtensionActivityFileHandler = (file?: File) => {
    extensionActivityFileHandler(file);
  };

  const setCertificateFileHandler = (file?: File) => {
    certificateFileHandler(file);
  };

  const setSummaryOfHoursFileHandler = (file?: File) => {
    summaryOfHoursFileHandler(file);
  };

  useEffect(() => {
    if (
      designationExtensionActivity?.includes("Project Leader") &&
      extensionActivityFile
    ) {
      setDesignationActivityPoints(designationActivityPoints + 3);
    }
    if (
      designationExtensionActivity?.includes("Project Coordinator") &&
      extensionActivityFile
    ) {
      setDesignationActivityPoints(designationActivityPoints + 2.5);
    }
    if (
      designationExtensionActivity?.includes("Project Facilitator") &&
      extensionActivityFile
    ) {
      setDesignationActivityPoints(designationActivityPoints + 2);
    }
    if (
      designationExtensionActivity?.includes("Project Assistants") &&
      extensionActivityFile
    ) {
      setDesignationActivityPoints(designationActivityPoints + 1);
    }
  }, [designationExtensionActivity, extensionActivityFile]);

  useEffect(() => {
    if (resourcePerson === "International" && certificateFile) {
      setResourcePersonActivityPoints(4);
    } else if (resourcePerson === "National" && certificateFile) {
      setResourcePersonActivityPoints(3);
    } else if (resourcePerson === "Regional" && certificateFile) {
      setResourcePersonActivityPoints(2);
    } else if (resourcePerson === "Local" && certificateFile) {
      setResourcePersonActivityPoints(1);
    }
  }, [resourcePerson, certificateFile]);

  const onChangeValueCheckbox = (isChecked: boolean, value: string) => {
    console.log(isChecked, value);
    if (isChecked) {
      if (value === "Project Leader") {
        setLeader("Project Leader");
      } else if (value === "Project Coordinator") {
        setCoordinator("Project Coordinator");
      } else if (value === "Project Facilitator") {
        setFacilitator("Project Facilitator");
      } else {
        setAssistants("Project Assistants");
      }
    } else {
      if (value === "Project Leader") {
        setLeader("");
      } else if (value === "Project Coordinator") {
        setCoordinator("");
      } else if (value === "Project Facilitator") {
        setFacilitator("");
      } else {
        setAssistants("");
      }
    }
  };

  return (
    <MainContainer>
      <TopNav profileHandler={() => setIsProfileOpen(!isProfileOpen)} />
      <ProfileTab isProfileOpen={isProfileOpen} UseLogout={UseLogout} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <Menu
            isFacultySubmenuOpen={isFacultySubmenuOpen}
            facultySubMenuHandler={() =>
              setIsFacultySubmenuOpen(!isFacultySubmenuOpen)
            }
            position="relative"
          />
        </div>
        <BodyContainer>
          <ScreenTitle title="Faculty Workload" />
          <Container>
            <SubContainer>
              <WorkloadTextContainer>
                <WorkloadText>{WorkloadType.EXTENSION_WORKLOAD}</WorkloadText>
              </WorkloadTextContainer>
              <InputsContainer>
                {/* <Dropdown
                option={DROPDOWN_LISTS.DESIGNATION_EXTENSION_ACTIVITY}
                label="Designation in Extension Activity"
                onSelect={designationExtensionActivityHandler}
                val={designationExtensionActivity}
              /> */}
                <DesignationExtensionActivity
                  onChangeValueCheckbox={onChangeValueCheckbox}
                />
              </InputsContainer>
              <div
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex"
                }}
              >
                <div
                  style={{
                    maxWidth: 450,
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <UploadContainer>
                    <UploadTextDescription>
                      Upload Extension Activity Accomplishment Report here:
                    </UploadTextDescription>
                    <UploadFileContainer>
                      <UploadFileButton
                        fileHandler={setExtensionActivityFileHandler}
                        workloadFileName={extensionActivityFile?.name}
                      />
                    </UploadFileContainer>
                  </UploadContainer>
                  <InputsContainer>
                    <Label>
                      Total Number of Hours Rendered in Extension Activities
                    </Label>
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
                        workloadFileName={summaryOfHoursFile?.name}
                      />
                    </UploadFileContainer>
                  </UploadContainer>
                  <InputsContainer>
                    <Dropdown
                      option={DROPDOWN_LISTS.RESOURCE_PERSON}
                      label="Resource Person in an Extension Activity"
                      onSelect={resourcePersonHandler}
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
                        workloadFileName={certificateFile?.name}
                      />
                    </UploadFileContainer>
                  </UploadContainer>
                </div>
              </div>
            </SubContainer>

            <ButtonContainer>
              <div>
                <Label style={{ fontWeight: "bold" }}>
                  Total Extension Workload ={" "}
                  {(
                    points +
                    designationActivityPoints +
                    resourcePersonActivityPoints +
                    (!summaryOfHoursFile
                      ? 0
                      : Number(totalNumberHours) * 0.05556 >= 3
                      ? 3
                      : Number((Number(totalNumberHours) * 0.05556).toFixed(2)))
                  ).toString()}
                </Label>
              </div>
              <FormButton
                text="Submit"
                onClicked={extensionWorkloadHandler}
                isSubmitting={isSubmitting}
                disabled={
                  !designationExtensionActivity &&
                  !extensionActivityFile?.name &&
                  !resourcePerson &&
                  !certificateFile &&
                  !totalNumberHours &&
                  !summaryOfHoursFile?.name
                }
              ></FormButton>
            </ButtonContainer>
          </Container>
        </BodyContainer>
      </div>

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
  margin: 120px 50px;
  width: 100%;
`;

const Container = styled.div`
  padding: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 90%;
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
  flex-direction: column;
  width: auto;
`;

const UploadContainer = styled.div`
  width: auto;
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
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px 0px 0px;
  width: 100%;
`;

const UploadFileContainer = styled.div`
  max-width: 100px;
`;

const Label = styled.label`
  font-size: 15px;
  font-family: HurmeGeometricSans3;
  align-self: flex-start;
  font-weight: 400;
`;

const TextInput = styled.input``;

const FooterContainer = styled.div`
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  z-index: 1;
`;

export default ExtensionWorkload;
