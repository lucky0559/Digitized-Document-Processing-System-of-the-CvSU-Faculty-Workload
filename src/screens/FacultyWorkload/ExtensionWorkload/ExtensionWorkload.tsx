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

const ExtensionWorkload = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [extensionWorkload, setExtensionWorkload] =
    useState<ExtensionWorkloadType>();

  const [designationExtensionActivity, setDesignationExtensionActivity] =
    useState<string | undefined>("");
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
      designationExtensionActivity,
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
            extensionWorkload.designationExtensionActivity === "Project Leader"
          ) {
            designationExtensionActivityPoints = 3;
          } else if (
            extensionWorkload.designationExtensionActivity ===
            "Project Coordinator"
          ) {
            designationExtensionActivityPoints = 2.5;
          } else if (
            extensionWorkload.designationExtensionActivity ===
            "Project Facilitator"
          ) {
            designationExtensionActivityPoints = 2;
          } else {
            designationExtensionActivityPoints = 1;
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

          if (parseFloat(extensionWorkload.totalNumberHours) >= 3) {
            totalNumberHoursPoints = 3;
          } else {
            totalNumberHoursPoints =
              parseFloat(extensionWorkload.totalNumberHours) * 0.05556;
          }

          extensionWorkload.ewlPoints =
            designationExtensionActivityPoints +
            resourcePersonPoints +
            totalNumberHoursPoints;
          await SaveExtensionWorkload(extensionWorkload);
          setIsSubmitting(false);
          clearStates();
          window.location.reload();
        }
      }
    })();
  });

  const clearStates = () => {
    setDesignationExtensionActivity("");
    setExtensionActivityFile(undefined);
    setResourcePerson("");
    setCertificateFile(undefined);
    setTotalNumberHours("");
    setSummaryOfHoursFile(undefined);
    setExtensionWorkload(undefined);
  };

  const designationExtensionActivityHandler = (value?: string) => {
    setDesignationExtensionActivity(value);
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
    if (value?.length! > 1 || Number(value) > 3) {
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
      designationExtensionActivity === "Project Leader" &&
      extensionActivityFile
    ) {
      setDesignationActivityPoints(3);
    } else if (
      designationExtensionActivity === "Project Coordinator" &&
      extensionActivityFile
    ) {
      setDesignationActivityPoints(2.5);
    } else if (
      designationExtensionActivity === "Project Facilitator" &&
      extensionActivityFile
    ) {
      setDesignationActivityPoints(2);
    } else if (
      designationExtensionActivity === "Project Assistants" &&
      extensionActivityFile
    ) {
      setDesignationActivityPoints(1);
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

  useEffect(() => {}, []);

  return (
    <MainContainer>
      <TopNav profileHandler={() => setIsProfileOpen(!isProfileOpen)} />
      <Menu
        isFacultySubmenuOpen={isFacultySubmenuOpen}
        facultySubMenuHandler={() =>
          setIsFacultySubmenuOpen(!isFacultySubmenuOpen)
        }
      />
      <ProfileTab isProfileOpen={isProfileOpen} />
      <BodyContainer>
        <ScreenTitle title="Faculty Workload" />
        <Container>
          <SubContainer>
            <WorkloadTextContainer>
              <WorkloadText>{WorkloadType.EXTENSION_WORKLOAD}</WorkloadText>
            </WorkloadTextContainer>
            <InputsContainer>
              <Dropdown
                option={DROPDOWN_LISTS.DESIGNATION_EXTENSION_ACTIVITY}
                label="Designation in Extension Activity"
                onSelect={designationExtensionActivityHandler}
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
                  workloadFileName={extensionActivityFile?.name}
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
            <div style={{ marginTop: 50 }}>
              <Label style={{ fontWeight: "bold" }}>
                Total Extension Workload ={" "}
                {(
                  points +
                  designationActivityPoints +
                  resourcePersonActivityPoints +
                  (summaryOfHoursFile ? Number(totalNumberHours) * 0.05556 : 0)
                ).toString()}
              </Label>
            </div>
            <ButtonContainer>
              <FormButton
                text="Submit"
                onClicked={extensionWorkloadHandler}
                isSubmitting={isSubmitting}
                disabled={
                  designationExtensionActivity?.length! <= 0 ||
                  designationExtensionActivity === undefined ||
                  extensionActivityFile?.name.length! <= 0 ||
                  extensionActivityFile?.name === undefined ||
                  resourcePerson?.length! <= 0 ||
                  resourcePerson === undefined ||
                  certificateFile?.name.length! <= 0 ||
                  certificateFile?.name === undefined ||
                  totalNumberHours?.length! <= 0 ||
                  totalNumberHours === undefined ||
                  summaryOfHoursFile?.name.length! <= 0 ||
                  summaryOfHoursFile?.name === undefined
                }
              ></FormButton>
            </ButtonContainer>
          </SubContainer>
        </Container>
      </BodyContainer>
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
  font-size: 17px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 100px 20px 0px 0px;
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
