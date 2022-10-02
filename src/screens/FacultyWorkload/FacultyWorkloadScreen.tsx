import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import ProfileTab from "../../components/ProfileTab";
import ScreenTitle from "../../components/ScreenTitle";
import TopNav from "../../components/TopNav";
import {
  SaveExtensionWorkload,
  SaveResearchWorkload,
  SaveStrategicFunctionWorkload,
  SaveTeachingWorkload
} from "../../lib/faculty-workload.hooks";
import { ExtensionWorkloadType } from "../../types/ExtensionWorkload";
import { ResearchWorkLoadType } from "../../types/ResearchWorkLoad";
import { StrategicFunctionType } from "../../types/StrategicFunction";
import { TeachingWorkLoadType } from "../../types/TeachingWorkload";
import ExtensionWorkload from "./ExtensionWorkload/ExtensionWorkload";
import ResearchWorkload from "./ResearchWorkload/ResearchWorkload";
import ResearchWorkload1 from "./ResearchWorkload/ResearchWorkload1";
import ResearchWorkload2 from "./ResearchWorkload/ResearchWorkload2";
import ResearchWorkload3 from "./ResearchWorkload/ResearchWorkload3";
import StrategicFunction from "./StrategicFunction/StrategicFunction";
import StrategicFunction1 from "./StrategicFunction/StrategicFunction1";
import StrategicFunction2 from "./StrategicFunction/StrategicFunction2";
import StrategicFunction3 from "./StrategicFunction/StrategicFunction3";
import TeachingWorkLoad from "./TeachingWorkload/TeachingWorkLoad";

const FacultyWorkloadScreen = () => {
  const [teachingWorkLoad, setTeachingWorkLoad] =
    useState<TeachingWorkLoadType>();
  const [researchWorkLoad, setResearchWorkLoad] =
    useState<ResearchWorkLoadType>();
  const [extensionWorkload, setExtensionWorkload] =
    useState<ExtensionWorkloadType>();
  const [strategicFunctionWorkload, setStrategicFunctionWorkload] =
    useState<StrategicFunctionType>();

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //TWL
  const [numberOfPreparations, setNumberOfPreparations] = useState("");
  const [contactHours, setContactHours] = useState("");
  const [totalNoOfStudents, setTotalNoOfStudents] = useState("");
  const [twlFile, setTwlFile] = useState<File>();

  //RWL
  const [titleOfStudy, setTitleOfStudy] = useState("");
  const [fundingOfStudy, setFundingOfStudy] = useState<string | undefined>("");
  const [fundDisplay, setFundDisplay] = useState<string | undefined>("");
  const [typeOfStudy, setTypeOfStudy] = useState("");
  const [designationStudy, setDesignationStudy] = useState<string | undefined>(
    ""
  );
  const [disseminatedResearch, setDisseminatedResearch] = useState<
    string | undefined
  >("");
  const [rwlFile, setRwlFile] = useState<File>();
  const [rwlFile1, setRwlFile1] = useState<File>();
  const [rwlFile2, setRwlFile2] = useState<File>();
  const [fundGenerated, setFundGenerated] = useState<string | undefined>("");

  //EWL
  const [designationExtensionActivity, setDesignationExtensionActivity] =
    useState<string | undefined>("");
  const [extensionActivityFile, setExtensionActivityFile] = useState<File>();
  const [resourcePerson, setResourcePerson] = useState<string | undefined>("");
  const [certificateFile, setCertificateFile] = useState<File>();
  const [totalNumberHours, setTotalNumberHours] = useState<string | undefined>(
    ""
  );
  const [summaryOfHoursFile, setSummaryOfHoursFile] = useState<File>();

  //SF
  const [designationCollegeCampusLevel, setDesignationCollegeCampusLevel] =
    useState<string[] | undefined>([]);
  const [designationDepartmentLevel, setDesignationDepartmentLevel] = useState<
    string[] | undefined
  >([]);
  const [
    designationAsSportTrainorAcademic,
    setDesignationAsSportTrainorAcademic
  ] = useState<string | undefined>("");
  const [designationAsMemberOfAdhoc, setDesignationAsMemberOfAdhoc] = useState<
    string | undefined
  >("");
  const [totalOfAcademicAdvisees, setTotalOfAcademicAdvisees] = useState<
    string | undefined
  >("");
  const [
    approvedUniversityDesignationFile,
    setApprovedUniversityDesignationFile
  ] = useState<File>();
  const [
    approvedCollegeCampusDesignationFile,
    setApprovedCollegeCampusDesignationFile
  ] = useState<File>();
  const [
    approvedDepartmentDesignationFile,
    setApprovedDepartmentDesignationFile
  ] = useState<File>();
  const [coachAdviserCertificateFile, setCoachAdviserCertificateFile] =
    useState<File>();
  const [approvedDesignationFile, setApprovedDesignationFile] =
    useState<File>();
  const [listOfAdviseesFile, setListOfAdviseesFile] = useState<File>();

  const [steps, setSteps] = useState(1);

  //TWL
  const teachingWorkLoadHandler = async () => {
    setTeachingWorkLoad({
      numberOfPreparations,
      contactHours,
      totalNoOfStudents,
      twlFile
    });
    setSteps(steps + 1);
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

  //RWL
  const researchWorkLoadHandler = () => {
    if (fundingOfStudy) {
      if (fundingOfStudy?.length > 0) {
        setResearchWorkLoad({
          ...researchWorkLoad,
          titleOfStudy,
          fundingOfStudy
        });
      }
    }
    if (fundingOfStudy === "CvSU Research Grant") {
      setSteps(3);
    } else if (fundingOfStudy === "Externally Funded") {
      setSteps(4);
    } else if (fundDisplay === "Externally Funded") {
      setSteps(4);
    } else if (fundDisplay === "CvSU Research Grant") {
      setSteps(3);
    } else {
      setSteps(6);
    }
  };

  const titleOfStudyHandler = (value: string) => {
    setTitleOfStudy(value);
  };

  const fundingOfStudyHandler = (value?: string) => {
    setFundingOfStudy(value);
  };

  useEffect(() => {
    if (fundDisplay !== researchWorkLoad?.fundingOfStudy) {
      setResearchWorkLoad({
        ...researchWorkLoad,
        fundingOfStudy: fundDisplay
      });
    }
    if (researchWorkLoad?.fundingOfStudy) {
      setFundDisplay(researchWorkLoad?.fundingOfStudy);
    } else {
      setFundDisplay(fundingOfStudy);
    }
  }, [fundingOfStudy]);

  const backHandler = () => {
    if (steps > 1) {
      setSteps(steps - 1);
    }
  };

  //RWL1
  const researchWorkLoadHandler1 = () => {
    if (designationStudy) {
      setResearchWorkLoad({
        ...researchWorkLoad,
        typeOfStudy,
        designationStudy,
        rwlFile
      });
    } else {
      setResearchWorkLoad({
        typeOfStudy,
        designationStudy,
        rwlFile,
        ...researchWorkLoad
      });
    }
    setSteps(6);
  };

  const typeOfStudyHandler = (value: string) => {
    setTypeOfStudy(value);
  };

  const designationStudyHandler = (value?: string) => {
    setDesignationStudy(value);
  };

  const rwlFileHandler = (value?: File) => {
    setRwlFile(value);
  };

  //RWL2
  const researchWorkLoadHandler2 = () => {
    if (fundGenerated) {
      setResearchWorkLoad({
        ...researchWorkLoad,
        fundGenerated,
        rwlFile1
      });
    } else {
      setResearchWorkLoad({
        fundGenerated,
        rwlFile1,
        ...researchWorkLoad
      });
    }
    setSteps(steps + 1);
  };

  const fundGeneratedHandler = (value?: string) => {
    setFundGenerated(value);
  };

  const rwlFile1Handler = (value?: File) => {
    setRwlFile1(value);
  };

  //RWL3
  const researchWorkLoadHandler3 = () => {
    setResearchWorkLoad({
      ...researchWorkLoad,
      disseminatedResearch,
      rwlFile2
    });
    setSteps(steps + 1);
  };

  const disseminatedResearchHandler = (value?: string) => {
    setDisseminatedResearch(value);
  };

  const rwlFile2Handler = (value?: File) => {
    setRwlFile2(value);
  };

  //EWL
  const extensionWorkloadHandler = () => {
    setExtensionWorkload({
      designationExtensionActivity,
      extensionActivityFile,
      resourcePerson,
      certificateFile,
      totalNumberHours,
      summaryOfHoursFile
    });
    setSteps(steps + 1);
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
    setTotalNumberHours(value);
  };

  const summaryOfHoursFileHandler = (value?: File) => {
    setSummaryOfHoursFile(value);
  };

  //SF
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [designationUniversityLevel, setDesignationUniversityLevel] = useState<
    string[]
  >([]);
  const designationUniversityLevelHandler = (value: string) => {
    if (designationUniversityLevel.includes(value)) {
      const index = designationUniversityLevel.indexOf(value);
      if (index > -1) {
        designationUniversityLevel.splice(index, 1);
      }
    } else {
      designationUniversityLevel.push(value);
    }
  };

  const setStrategicFunctionHandler = async () => {
    setStrategicFunctionWorkload({
      designationUniversityLevel: designationUniversityLevel,
      approvedUniversityDesignationFile
    });
    setSteps(steps + 1);
  };

  //SF1
  const [
    designationCollegeCampusLevelReserve,
    setDesignationCollegeCampusLevelReserve
  ] = useState<string[]>([]);

  const designationCollegeCampusLevelHandler = (value: string) => {
    if (designationCollegeCampusLevelReserve.includes(value)) {
      const index = designationCollegeCampusLevelReserve.indexOf(value);
      if (index > -1) {
        designationCollegeCampusLevelReserve.splice(index, 1);
      }
    } else {
      designationCollegeCampusLevelReserve.push(value);
    }
  };

  const setStrategicFunction1Handler = async () => {
    setStrategicFunctionWorkload({
      ...strategicFunctionWorkload,
      designationCollegeCampusLevel: designationCollegeCampusLevelReserve,
      approvedCollegeCampusDesignationFile
    });
    setSteps(steps + 1);
  };

  const approvedCollegeCampusDesignationFileHandler = (value?: File) => {
    setApprovedCollegeCampusDesignationFile(value);
  };

  //SF2
  const [
    designationDepartmentLevelReserve,
    setDesignationDepartmentLevelReserve
  ] = useState<string[]>([]);

  const designationDepartmentLevelHandler = (value: string) => {
    if (designationDepartmentLevelReserve.includes(value)) {
      const index = designationDepartmentLevelReserve.indexOf(value);
      if (index > -1) {
        designationDepartmentLevelReserve.splice(index, 1);
      }
    } else {
      designationDepartmentLevelReserve.push(value);
    }
  };

  const setStrategicFunction2Handler = async () => {
    setStrategicFunctionWorkload({
      ...strategicFunctionWorkload,
      designationDepartmentLevel: designationDepartmentLevelReserve,
      approvedDepartmentDesignationFile
    });
    setSteps(steps + 1);
  };

  const approvedDepartmentDesignationFileHandler = (value?: File) => {
    setApprovedDepartmentDesignationFile(value);
  };

  //SF3
  const setStrategicFunction3Handler = async () => {
    setStrategicFunctionWorkload({
      ...strategicFunctionWorkload,
      designationAsSportTrainorAcademic,
      coachAdviserCertificateFile,
      designationAsMemberOfAdhoc,
      approvedDesignationFile,
      totalOfAcademicAdvisees,
      listOfAdviseesFile
    });
    setIsSubmitting(true);
  };

  const coachAdviserCertificateFileHandler = (value?: File) => {
    setCoachAdviserCertificateFile(value);
  };

  const approvedDesignationFileHandler = (value?: File) => {
    setApprovedDesignationFile(value);
  };

  const designationAsMemberHandler = (value?: string) => {
    setDesignationAsMemberOfAdhoc(value);
  };

  const setTotalNumberAcademicAdviseesHandler = (value?: string) => {
    setTotalOfAcademicAdvisees(value);
  };

  const listAdviseesFileHandler = (value?: File) => {
    setListOfAdviseesFile(value);
  };

  const setDesignationSSTAActivity = (value?: string) => {
    setDesignationAsSportTrainorAcademic(value);
  };

  const clearStates = () => {
    setTeachingWorkLoad({});
    setResearchWorkLoad({});
    setExtensionWorkload({});
    setStrategicFunctionWorkload({});
    setNumberOfPreparations("");
    setContactHours("");
    setTotalNoOfStudents("");
    setTwlFile(undefined);
    setTitleOfStudy("");
    setFundingOfStudy("");
    setTypeOfStudy("");
    setDesignationStudy("");
    setDisseminatedResearch("");
    setRwlFile(undefined);
    setRwlFile1(undefined);
    setRwlFile2(undefined);
    setFundGenerated("");
    setDesignationExtensionActivity("");
    setExtensionActivityFile(undefined);
    setResourcePerson("");
    setCertificateFile(undefined);
    setTotalNumberHours("");
    setSummaryOfHoursFile(undefined);
    strategicFunctionWorkload!.designationUniversityLevel = [];
    setApprovedUniversityDesignationFile(undefined);
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
          await SaveTeachingWorkload(teachingWorkLoad);
        }
        if (
          researchWorkLoad?.titleOfStudy &&
          researchWorkLoad.fundingOfStudy &&
          researchWorkLoad.typeOfStudy &&
          researchWorkLoad.designationStudy &&
          researchWorkLoad.fundGenerated &&
          researchWorkLoad.disseminatedResearch &&
          researchWorkLoad.rwlFile &&
          researchWorkLoad.rwlFile1 &&
          researchWorkLoad.rwlFile2
        ) {
          let designationStudyPoints;
          await SaveResearchWorkload(researchWorkLoad);
        }
        if (
          extensionWorkload?.designationExtensionActivity &&
          extensionWorkload.extensionActivityFile &&
          extensionWorkload.resourcePerson &&
          extensionWorkload.certificateFile &&
          extensionWorkload.totalNumberHours &&
          extensionWorkload.summaryOfHoursFile
        ) {
          await SaveExtensionWorkload(extensionWorkload);
        }
        if (
          strategicFunctionWorkload?.approvedUniversityDesignationFile &&
          strategicFunctionWorkload.designationUniversityLevel &&
          strategicFunctionWorkload.approvedCollegeCampusDesignationFile &&
          strategicFunctionWorkload.approvedDepartmentDesignationFile &&
          strategicFunctionWorkload.approvedDesignationFile &&
          strategicFunctionWorkload.coachAdviserCertificateFile &&
          strategicFunctionWorkload.designationAsMemberOfAdhoc &&
          strategicFunctionWorkload.designationAsSportTrainorAcademic &&
          strategicFunctionWorkload.designationCollegeCampusLevel &&
          strategicFunctionWorkload.designationDepartmentLevel &&
          strategicFunctionWorkload.listOfAdviseesFile &&
          strategicFunctionWorkload.totalOfAcademicAdvisees
        ) {
          await SaveStrategicFunctionWorkload(strategicFunctionWorkload);
        }
        setIsSubmitting(false);
        clearStates();
        navigate("/faculty-workload", { replace: true });
        setSteps(1);
      }
    })();
  }, [isSubmitting]);

  const approvedUniversityDesignationFileHandler = (value?: File) => {
    setApprovedUniversityDesignationFile(value);
  };

  return (
    <Container>
      <TopNav
        menuHandler={() => setIsMenuOpen(!isMenuOpen)}
        profileHandler={() => setIsProfileOpen(!isProfileOpen)}
      />
      <Menu isMenuOpen={isMenuOpen} />
      <ProfileTab isProfileOpen={isProfileOpen} />
      <BodyContainer>
        <ScreenTitle title="Faculty Workload" />
        {steps === 1 && (
          <TeachingWorkLoad
            teachingWorkLoadHandler={teachingWorkLoadHandler}
            numberOfPreparationsHandler={numberOfPreparationsHandler}
            contactHoursHandler={contactHoursHandler}
            totalNoOfStudentsHandler={totalNoOfStudentsHandler}
            twlFileHandler={twlFileHandler}
            numberOfPreparations={numberOfPreparations}
            contactHours={contactHours}
            totalNoOfStudents={totalNoOfStudents}
            twlFileName={teachingWorkLoad?.twlFile?.name}
          />
        )}
        {steps === 2 && (
          <ResearchWorkload
            researchWorkLoadHandler={researchWorkLoadHandler}
            titleOfStudyHandler={titleOfStudyHandler}
            fundingOfStudyHandler={fundingOfStudyHandler}
            backHandler={backHandler}
            titleOfStudy={titleOfStudy}
            fundingOfStudy={fundDisplay}
          />
        )}
        {steps === 3 && (
          <ResearchWorkload1
            researchWorkLoadHandler1={researchWorkLoadHandler1}
            typeOfStudyHandler={typeOfStudyHandler}
            designationStudyHandler={designationStudyHandler}
            backHandler={backHandler}
            rwlFileHandler={rwlFileHandler}
            typeOfStudy={typeOfStudy}
            designationStudy={researchWorkLoad?.designationStudy}
            rwlFileName={researchWorkLoad?.rwlFile?.name}
          />
        )}
        {steps === 4 && (
          <ResearchWorkload2
            researchWorkLoadHandler2={researchWorkLoadHandler2}
            fundGeneratedHandler={fundGeneratedHandler}
            rwlFile1Handler={rwlFile1Handler}
            backHandler={() => setSteps(2)}
            fundGenerated={researchWorkLoad?.fundGenerated}
            rwlFileName1={researchWorkLoad?.rwlFile1?.name}
          />
        )}
        {steps === 5 && (
          <ResearchWorkload3
            researchWorkLoadHandler3={researchWorkLoadHandler3}
            backHandler={() => setSteps(2)}
            disseminatedResearchHandler={disseminatedResearchHandler}
            rwlFile2Handler={rwlFile2Handler}
            disseminatedResearch={researchWorkLoad?.disseminatedResearch}
            rwlFile2Name={researchWorkLoad?.rwlFile2?.name}
          />
        )}
        {steps === 6 && (
          <ExtensionWorkload
            extensionWorkloadHandler={extensionWorkloadHandler}
            designationExtensionActivityHandler={
              designationExtensionActivityHandler
            }
            extensionActivityFileHandler={extensionActivityFileHandler}
            resourcePersonHandler={resourcePersonHandler}
            certificateFileHandler={certificateFileHandler}
            totalNumberHoursHandler={totalNumberHoursHandler}
            summaryOfHoursFileHandler={summaryOfHoursFileHandler}
            backHandler={() => setSteps(2)}
            designationExtensionActivity={
              extensionWorkload?.designationExtensionActivity
            }
            extensionActivityFileName={
              extensionWorkload?.extensionActivityFile?.name
            }
            resourcePerson={extensionWorkload?.resourcePerson}
            certificateFileName={extensionWorkload?.certificateFile?.name}
            totalNumberHours={extensionWorkload?.totalNumberHours}
            summaryOfHoursFileName={extensionWorkload?.summaryOfHoursFile?.name}
          />
        )}
        {steps === 7 && (
          <StrategicFunction
            strategicFunctionHandler={setStrategicFunctionHandler}
            designationUniversityLevelHandler={
              designationUniversityLevelHandler
            }
            approvedUniversityDesignationFileHandler={
              approvedUniversityDesignationFileHandler
            }
            backHandler={backHandler}
            approvedUniversityDesignationFileName={
              strategicFunctionWorkload?.approvedUniversityDesignationFile?.name
            }
            designationUniversityLevel={designationUniversityLevel}
          />
        )}
        {steps === 8 && (
          <StrategicFunction1
            strategicFunction1Handler={setStrategicFunction1Handler}
            designationCampusCollegeLevelHandler={
              designationCollegeCampusLevelHandler
            }
            approvedCollegeCampusDesignationFileHandler={
              approvedCollegeCampusDesignationFileHandler
            }
            backHandler={backHandler}
            approvedCollegeCampusDesignationFileName={
              strategicFunctionWorkload?.approvedCollegeCampusDesignationFile
                ?.name
            }
            designationCollegeCampusLevel={designationCollegeCampusLevelReserve}
          />
        )}
        {steps === 9 && (
          <StrategicFunction2
            strategicFunction2Handler={setStrategicFunction2Handler}
            designationDepartmentLevelHandler={
              designationDepartmentLevelHandler
            }
            approvedDepartmentDesignationFileHandler={
              approvedDepartmentDesignationFileHandler
            }
            backHandler={backHandler}
            approvedDepartmentDesignationFileName={
              strategicFunctionWorkload?.approvedDepartmentDesignationFile?.name
            }
            designationDepartmentLevel={designationDepartmentLevelReserve}
          />
        )}
        {steps === 10 && (
          <StrategicFunction3
            coachAdviserCertificateFileHandler={
              coachAdviserCertificateFileHandler
            }
            backHandler={backHandler}
            designationSSTAActivity={
              strategicFunctionWorkload?.designationAsSportTrainorAcademic
            }
            coachAdviserCertificateFileName={
              strategicFunctionWorkload?.coachAdviserCertificateFile?.name
            }
            designationAsMemberHandler={designationAsMemberHandler}
            designationAsMember={designationAsMemberOfAdhoc}
            approvedDesignationFileHandler={approvedDesignationFileHandler}
            approvedDesignationFileName={
              strategicFunctionWorkload?.approvedDesignationFile?.name
            }
            totalNumberAcademicAdviseesHandler={
              setTotalNumberAcademicAdviseesHandler
            }
            totalNumberAcademicAdvisees={totalOfAcademicAdvisees}
            listAdviseesFileHandler={listAdviseesFileHandler}
            listAdviseesFileName={
              strategicFunctionWorkload?.listOfAdviseesFile?.name
            }
            setStrategicFunction3Handler={setStrategicFunction3Handler}
            setDesignationSSTAActivity={setDesignationSSTAActivity}
            isSubmitting={isSubmitting}
          />
        )}
      </BodyContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </Container>
  );
};

const Container = styled.div`
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

const FooterContainer = styled.div`
  margin-top: auto;
`;

export default FacultyWorkloadScreen;
