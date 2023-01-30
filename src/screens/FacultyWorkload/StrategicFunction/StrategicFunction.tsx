import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UploadFileButton from "../../../components/UploadFileButton";
import FormButton from "../../../components/FormButton";
import Colors from "../../../constants/Colors";
import { WorkloadType } from "../../../constants/Strings";
import { StrategicFunctionType } from "../../../types/StrategicFunction";
import { useNavigate } from "react-router";
import { SaveStrategicFunctionWorkload } from "../../../lib/faculty-workload.hooks";
import TopNav from "../../../components/TopNav";
import Menu from "../../../components/Menu";
import ProfileTab from "../../../components/ProfileTab";
import ScreenTitle from "../../../components/ScreenTitle";
import StrategicFunction1 from "./StrategicFunction1";
import StrategicFunction2 from "./StrategicFunction2";

export type DesignationWithTitleAndPoints = {
  title: string;
  points: string;
};

const StrategicFunction = () => {
  const [strategicFunctionWorkload, setStrategicFunctionWorkload] =
    useState<StrategicFunctionType>();

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  // const [
  //   approvedUniversityDesignationFile,
  //   setApprovedUniversityDesignationFile
  // ] = useState<File[]>();
  const approvedUniversityDesignationFile: File[] = [];
  const [
    customApprovedUniversityDesignationFile,
    setCustomApprovedUniversityDesignationFile
  ] = useState<File>();
  const approvedCollegeCampusDesignationFile: File[] = [];
  const [
    customApprovedCollegeCampusDesignationFile,
    setCustomApprovedCollegeCampusDesignationFile
  ] = useState<File>();
  const approvedDepartmentDesignationFile: File[] = [];
  const [
    customApprovedDepartmentDesignationFile,
    setCustomApprovedDepartmentDesignationFile
  ] = useState<File>();
  const [coachAdviserCertificateFile, setCoachAdviserCertificateFile] =
    useState<File>();
  const [approvedDesignationFile, setApprovedDesignationFile] =
    useState<File>();
  const [listOfAdviseesFile, setListOfAdviseesFile] = useState<File>();

  const [steps, setSteps] = useState(1);

  // const fileHandler = (file?: File) => {
  //   approvedUniversityDesignationFileHandler(file);
  // };

  // UNIVERSITY FILE SELECT
  const approvedUniversityDesignationFileHandler1 = (value?: File) => {
    approvedUniversityDesignationFile[0] = value!;
  };
  const approvedUniversityDesignationFileHandler2 = (value?: File) => {
    approvedUniversityDesignationFile[1] = value!;
  };
  const approvedUniversityDesignationFileHandler3 = (value?: File) => {
    approvedUniversityDesignationFile[2] = value!;
  };
  const customApprovedUniversityDesignationFileHandler = (value?: File) => {
    setCustomApprovedUniversityDesignationFile(value);
  };

  // COLLEGE CAMPUS FILE SELECT
  const approvedCollegeCampusDesignationFileHandler1 = (value?: File) => {
    approvedCollegeCampusDesignationFile[0] = value!;
  };
  const approvedCollegeCampusDesignationFileHandler2 = (value?: File) => {
    approvedCollegeCampusDesignationFile[1] = value!;
  };
  const approvedCollegeCampusDesignationFileHandler3 = (value?: File) => {
    approvedCollegeCampusDesignationFile[2] = value!;
  };
  const customApprovedCollegeCampusDesignationFileHandler = (value?: File) => {
    setCustomApprovedCollegeCampusDesignationFile(value);
  };

  // DEPARTMENT FILE SELECT
  const approvedDepartmentDesignationFileHandler1 = (value?: File) => {
    approvedDepartmentDesignationFile[0] = value!;
  };
  const approvedDepartmentDesignationFileHandler2 = (value?: File) => {
    approvedDepartmentDesignationFile[1] = value!;
  };
  const approvedDepartmentDesignationFileHandler3 = (value?: File) => {
    approvedDepartmentDesignationFile[2] = value!;
  };
  const customApprovedDepartmentDesignationFileHandler = (value?: File) => {
    setCustomApprovedDepartmentDesignationFile(value);
  };

  // const setDesignationUniversityLevelHandler = (
  //   designationUniversityLevelValue: string
  // ) => {
  //   dataClicked(designationUniversityLevelValue);
  //   designationUniversityLevelHandler(designationUniversityLevelValue);
  // };

  // const onSubmit = () => {
  //   setStrategicFunctionHandler();
  // };

  // //SF
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const [designationUniversityLevel, setDesignationUniversityLevel] = useState<
  //   string[]
  // >([]);

  // const [boxClicked, setBoxClicked] = useState(0);

  // const dataClicked = (value: string) => {
  //   if (dataValue.includes(value)) {
  //     const index = dataValue.indexOf(value);
  //     if (index > -1) {
  //       dataValue.splice(index, 1);
  //     }
  //   } else {
  //     dataValue.push(value);
  //   }
  //   setBoxClicked(boxClicked + 1);
  // };

  // useEffect(() => {
  //   dataValue = [...designationUniversityLevel];
  // }, [boxClicked]);

  // const designationUniversityLevelHandler = (value: string) => {
  //   if (designationUniversityLevel.includes(value)) {
  //     const index = designationUniversityLevel.indexOf(value);
  //     if (index > -1) {
  //       designationUniversityLevel.splice(index, 1);
  //     }
  //   } else {
  //     designationUniversityLevel.push(value);
  //   }
  // };

  // const setStrategicFunctionHandler = async () => {
  //   setStrategicFunctionWorkload({
  //     designationUniversityLevel: designationUniversityLevel,
  //     approvedUniversityDesignationFile
  //   });
  //   setSteps(steps + 1);
  // };

  // // SF1
  // const [
  //   designationCollegeCampusLevelReserve,
  //   setDesignationCollegeCampusLevelReserve
  // ] = useState<string[]>([]);

  // const designationCollegeCampusLevelHandler = (value: string) => {
  //   if (designationCollegeCampusLevelReserve.includes(value)) {
  //     const index = designationCollegeCampusLevelReserve.indexOf(value);
  //     if (index > -1) {
  //       designationCollegeCampusLevelReserve.splice(index, 1);
  //     }
  //   } else {
  //     designationCollegeCampusLevelReserve.push(value);
  //   }
  // };

  // const setStrategicFunction1Handler = async () => {
  //   setStrategicFunctionWorkload({
  //     ...strategicFunctionWorkload,

  //     designationCollegeCampusLevel: designationCollegeCampusLevelReserve,
  //     approvedCollegeCampusDesignationFile
  //   });
  //   setSteps(steps + 1);
  // };

  // const approvedCollegeCampusDesignationFileHandler = (value?: File) => {
  //   setApprovedCollegeCampusDesignationFile(value);
  // };

  // //SF2
  // const [
  //   designationDepartmentLevelReserve,
  //   setDesignationDepartmentLevelReserve
  // ] = useState<string[]>([]);

  // const designationDepartmentLevelHandler = (value: string) => {
  //   if (designationDepartmentLevelReserve.includes(value)) {
  //     const index = designationDepartmentLevelReserve.indexOf(value);
  //     if (index > -1) {
  //       designationDepartmentLevelReserve.splice(index, 1);
  //     }
  //   } else {
  //     designationDepartmentLevelReserve.push(value);
  //   }
  // };

  // const setStrategicFunction2Handler = async () => {
  //   setStrategicFunctionWorkload({
  //     ...strategicFunctionWorkload,
  //     designationDepartmentLevel: designationDepartmentLevelReserve,
  //     approvedDepartmentDesignationFile
  //   });
  //   setSteps(steps + 1);
  // };

  // const approvedDepartmentDesignationFileHandler = (value?: File) => {
  //   setApprovedDepartmentDesignationFile(value);
  // };

  // //SF3
  // const setStrategicFunction3Handler = async () => {
  //   setStrategicFunctionWorkload({
  //     ...strategicFunctionWorkload,
  //     designationAsSportTrainorAcademic,
  //     coachAdviserCertificateFile,
  //     designationAsMemberOfAdhoc,
  //     approvedDesignationFile,
  //     totalOfAcademicAdvisees,
  //     listOfAdviseesFile
  //   });
  //   setIsSubmitting(true);
  // };

  // const coachAdviserCertificateFileHandler = (value?: File) => {
  //   setCoachAdviserCertificateFile(value);
  // };

  // const approvedDesignationFileHandler = (value?: File) => {
  //   setApprovedDesignationFile(value);
  // };

  // const designationAsMemberHandler = (value?: string) => {
  //   setDesignationAsMemberOfAdhoc(value);
  // };

  // const setTotalNumberAcademicAdviseesHandler = (value?: string) => {
  //   setTotalOfAcademicAdvisees(value);
  // };

  // const listAdviseesFileHandler = (value?: File) => {
  //   setListOfAdviseesFile(value);
  // };

  // const setDesignationSSTAActivity = (value?: string) => {
  //   setDesignationAsSportTrainorAcademic(value);
  // };

  // useEffect(() => {
  //   (async () => {
  //     if (isSubmitting) {
  //       if (
  //         strategicFunctionWorkload?.approvedUniversityDesignationFile &&
  //         strategicFunctionWorkload.designationUniversityLevel &&
  //         strategicFunctionWorkload.approvedCollegeCampusDesignationFile &&
  //         strategicFunctionWorkload.approvedDepartmentDesignationFile &&
  //         strategicFunctionWorkload.approvedDesignationFile &&
  //         strategicFunctionWorkload.coachAdviserCertificateFile &&
  //         strategicFunctionWorkload.designationAsMemberOfAdhoc &&
  //         strategicFunctionWorkload.designationAsSportTrainorAcademic &&
  //         strategicFunctionWorkload.designationCollegeCampusLevel &&
  //         strategicFunctionWorkload.designationDepartmentLevel &&
  //         strategicFunctionWorkload.listOfAdviseesFile &&
  //         strategicFunctionWorkload.totalOfAcademicAdvisees
  //       ) {
  //         let designationUniversityPoints;
  //         let designationCollegeCampusPoints;
  //         let designationDepartmentPoints;
  //         let designationSportsSocioPoint;
  //         let totalNumberOfAcademicAdviseesPoints;

  //         designationUniversityPoints =
  //           strategicFunctionWorkload.designationUniversityLevel.length * 18;
  //         designationCollegeCampusPoints =
  //           strategicFunctionWorkload.designationCollegeCampusLevel.length * 15;
  //         designationDepartmentPoints =
  //           strategicFunctionWorkload.designationDepartmentLevel.length * 12;

  //         if (
  //           strategicFunctionWorkload.designationAsSportTrainorAcademic ===
  //           "University Level"
  //         ) {
  //           designationSportsSocioPoint = 5;
  //         } else {
  //           designationSportsSocioPoint = 3;
  //         }

  //         totalNumberOfAcademicAdviseesPoints =
  //           parseFloat(strategicFunctionWorkload.totalOfAcademicAdvisees) *
  //           0.023;

  //         strategicFunctionWorkload.sfwPoints =
  //           designationUniversityPoints +
  //           designationCollegeCampusPoints +
  //           designationDepartmentPoints +
  //           designationSportsSocioPoint +
  //           totalNumberOfAcademicAdviseesPoints;

  //         // await SaveStrategicFunctionWorkload(strategicFunctionWorkload);
  //         setIsSubmitting(false);
  //         window.location.reload();
  //       }
  //     }
  //   })();
  // }, [isSubmitting]);

  const clearStates = () => {};

  const [designationUniversityLevel, setDesignationUniversityLevel] = useState<
    string[]
  >([]);
  const [designationCollegeCampusLevel, setDesignationCollegeCampusLevel] =
    useState<string[]>([]);
  const [designationDepartmentLevel, setDesignationDepartmentLevel] = useState<
    string[]
  >([]);

  const [designationUniversity1, setDesignationUniversity1] = useState<
    string | undefined
  >("");
  const [displayDesignationUniversity1, setDisplayDesignationUniversity1] =
    useState<string | undefined>("");
  const [designationUniversity2, setDesignationUniversity2] = useState("");
  const [displayDesignationUniversity2, setDisplayDesignationUniversity2] =
    useState("");
  const [designationUniversity3, setDesignationUniversity3] = useState("");
  const [displayDesignationUniversity3, setDisplayDesignationUniversity3] =
    useState("");

  const [collegeCampusDesignation1, setCollegeCampusDesignation1] = useState<
    string | undefined
  >("");
  const [
    displayCollegeCampusDesignation1,
    setDisplayCollegeCampusDesignation1
  ] = useState<string | undefined>("");
  const [collegeCampusDesignation2, setCollegeCampusDesignation2] = useState<
    string | undefined
  >("");
  const [
    displayCollegeCampusDesignation2,
    setDisplayCollegeCampusDesignation2
  ] = useState<string | undefined>("");
  const [collegeCampusDesignation3, setCollegeCampusDesignation3] = useState<
    string | undefined
  >("");
  const [
    displayCollegeCampusDesignation3,
    setDisplayCollegeCampusDesignation3
  ] = useState<string | undefined>("");

  const [departmentDesignation1, setDepartmentDesignation1] = useState("");
  const [displayDepartmentDesignation1, setDisplayDepartmentDesignation1] =
    useState<string | undefined>("");
  const [departmentDesignation2, setDepartmentDesignation2] = useState("");
  const [displayDepartmentDesignation2, setDisplayDepartmentDesignation2] =
    useState<string | undefined>("");
  const [departmentDesignation3, setDepartmentDesignation3] = useState("");
  const [displayDepartmentDesignation3, setDisplayDepartmentDesignation3] =
    useState<string | undefined>("");

  const [universityLevelInputDesignation, setUniversityLevelInputDesignation] =
    useState("");
  const [
    collegeCampusLevelInputDesignation,
    setCollegeCampusLevelInputDesignation
  ] = useState("");
  const [departmentLevelInputDesignation, setDepartmentLevelInputDesignation] =
    useState("");
  const [sportsSocioInputDesignation, setSportsSocioInputDesignation] =
    useState<DesignationWithTitleAndPoints>();
  const [
    sportsSocioInputDesignationTitle,
    setSportsSocioInputDesignationTitle
  ] = useState("");
  const [
    sportsSocioInputDesignationPoints,
    setSportsSocioInputDesignationPoints
  ] = useState("");
  const [
    memberUniversityWideInputDesignation,
    setMemberUniversityWideInputDesignation
  ] = useState<DesignationWithTitleAndPoints>();
  const [
    memberUniversityWideInputDesignationTitle,
    setMemberUniversityWideInputDesignationTitle
  ] = useState("");
  const [
    memberUniversityWideInputDesignationPoints,
    setMemberUniversityWideInputDesignationPoints
  ] = useState("");
  const [academicAdviserInputDesignation, setAcademicAdviserInputDesignation] =
    useState<DesignationWithTitleAndPoints>();
  const [
    academicAdviserInputDesignationTitle,
    setAcademicAdviserInputDesignationTitle
  ] = useState("");
  const [
    academicAdviserInputDesignationPoints,
    setAcademicAdviserInputDesignationPoints
  ] = useState("");

  const onSelectDesignationUniversity1 = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setDesignationUniversity1(value);
    }
  };

  const onSelectDesignationUniversity2 = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setDesignationUniversity2(value);
    }
  };

  const onSelectDesignationUniversity3 = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setDesignationUniversity3(value);
    }
  };

  const textInputDesignationUniversity4 = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setUniversityLevelInputDesignation(value);
    }
  };

  const onSelectCollegeCampusDesignation1 = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setCollegeCampusDesignation1(value);
    }
  };

  const onSelectCollegeCampusDesignation2 = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setCollegeCampusDesignation2(value);
    }
  };

  const onSelectCollegeCampusDesignation3 = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setCollegeCampusDesignation3(value);
    }
  };

  const textInputCollegeCampusDesignation4 = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setCollegeCampusLevelInputDesignation(value);
    }
  };

  const onSelectDepartmentDesignation1 = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setDepartmentDesignation1(value);
    }
  };

  const onSelectDepartmentDesignation2 = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setDepartmentDesignation2(value);
    }
  };

  const onSelectDepartmentDesignation3 = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setDepartmentDesignation3(value);
    }
  };

  const textInputDepartmentDesignation4 = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setDepartmentLevelInputDesignation(value);
    }
  };

  const textInputSportsSocioDesignationTitle = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setSportsSocioInputDesignationTitle(value);
    }
  };

  const textInputSportsSocioDesignationPoints = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setSportsSocioInputDesignationPoints(value);
    }
  };

  const textInputMemberUniversityWideDesignationTitle = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setMemberUniversityWideInputDesignationTitle(value);
    }
  };

  const textInputMemberUniversityWideDesignationPoints = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setMemberUniversityWideInputDesignationPoints(value);
    }
  };

  const textInputAcademicAdviserDesignationTitle = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setAcademicAdviserInputDesignationTitle(value);
    }
  };

  const textInputAcademicAdviserDesignationPoints = (value: string) => {
    if (value.length >= 0 || value !== "") {
      setAcademicAdviserInputDesignationPoints(value);
    }
  };

  const backHandler = () => {
    // console.log(approvedDepartmentDesignationFile);

    // DEPARTMENT CAMPUS
    if (
      approvedDepartmentDesignationFile.length !== 0 ||
      strategicFunctionWorkload?.approvedDepartmentDesignationFile?.length! <
        approvedDepartmentDesignationFile.length
    ) {
      if (
        approvedDepartmentDesignationFile[0] &&
        approvedDepartmentDesignationFile[1] &&
        approvedDepartmentDesignationFile[2]
      ) {
        setStrategicFunctionWorkload({
          approvedDepartmentDesignationFile
        });
      } else if (
        approvedDepartmentDesignationFile[0] &&
        approvedDepartmentDesignationFile[1]
      ) {
        approvedDepartmentDesignationFile[2] =
          strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[2]!;
        setStrategicFunctionWorkload({
          approvedDepartmentDesignationFile
        });
      } else if (
        approvedDepartmentDesignationFile[0] &&
        approvedDepartmentDesignationFile[2]
      ) {
        approvedDepartmentDesignationFile[1] =
          strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[1]!;
        setStrategicFunctionWorkload({
          approvedDepartmentDesignationFile
        });
      } else if (
        approvedDepartmentDesignationFile[1] &&
        approvedDepartmentDesignationFile[2]
      ) {
        approvedDepartmentDesignationFile[0] =
          strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[0]!;
        setStrategicFunctionWorkload({
          approvedDepartmentDesignationFile
        });
      } else if (approvedDepartmentDesignationFile[0]) {
        approvedDepartmentDesignationFile[1] =
          strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[1]!;
        approvedDepartmentDesignationFile[2] =
          strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[2]!;
        setStrategicFunctionWorkload({
          approvedDepartmentDesignationFile
        });
      } else if (approvedDepartmentDesignationFile[1]) {
        approvedDepartmentDesignationFile[0] =
          strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[0]!;
        approvedDepartmentDesignationFile[2] =
          strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[2]!;
        setStrategicFunctionWorkload({
          approvedDepartmentDesignationFile
        });
      } else if (approvedDepartmentDesignationFile[2]) {
        approvedDepartmentDesignationFile[0] =
          strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[0]!;
        approvedDepartmentDesignationFile[1] =
          strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[1]!;
        setStrategicFunctionWorkload({
          approvedDepartmentDesignationFile
        });
      }
    }
    setSteps(steps - 1);
  };

  // useEffect(() => {
  //   if (designationUniversityLevel[0]) {
  //     setDisplayDesignationUniversity1(designationUniversityLevel[0]);
  //   }
  //   if (designationUniversityLevel[1]) {
  //     setDesignationUniversity2(designationUniversityLevel[1]);
  //   }
  //   if (designationUniversityLevel[2]) {
  //     setDesignationUniversity3(designationUniversityLevel[2]);
  //   }
  // }, [backHandler]);

  const onNextSubmit = () => {
    if (steps === 1) {
      // UNIVERSITY
      if (
        approvedUniversityDesignationFile.length !== 0 ||
        strategicFunctionWorkload?.approvedUniversityDesignationFile?.length! <
          approvedUniversityDesignationFile.length
      ) {
        if (
          approvedUniversityDesignationFile[0] &&
          approvedUniversityDesignationFile[1] &&
          approvedUniversityDesignationFile[2]
        ) {
          setStrategicFunctionWorkload({
            approvedUniversityDesignationFile
          });
        } else if (
          approvedUniversityDesignationFile[0] &&
          approvedUniversityDesignationFile[1]
        ) {
          approvedUniversityDesignationFile[2] =
            strategicFunctionWorkload?.approvedUniversityDesignationFile?.[2]!;
          setStrategicFunctionWorkload({
            approvedUniversityDesignationFile
          });
        } else if (
          approvedUniversityDesignationFile[0] &&
          approvedUniversityDesignationFile[2]
        ) {
          approvedUniversityDesignationFile[1] =
            strategicFunctionWorkload?.approvedUniversityDesignationFile?.[1]!;
          setStrategicFunctionWorkload({
            approvedUniversityDesignationFile
          });
        } else if (
          approvedUniversityDesignationFile[1] &&
          approvedUniversityDesignationFile[2]
        ) {
          approvedUniversityDesignationFile[0] =
            strategicFunctionWorkload?.approvedUniversityDesignationFile?.[0]!;
          setStrategicFunctionWorkload({
            approvedUniversityDesignationFile
          });
        } else if (approvedUniversityDesignationFile[0]) {
          approvedUniversityDesignationFile[1] =
            strategicFunctionWorkload?.approvedUniversityDesignationFile?.[1]!;
          approvedUniversityDesignationFile[2] =
            strategicFunctionWorkload?.approvedUniversityDesignationFile?.[2]!;
          setStrategicFunctionWorkload({
            approvedUniversityDesignationFile
          });
        } else if (approvedUniversityDesignationFile[1]) {
          approvedUniversityDesignationFile[0] =
            strategicFunctionWorkload?.approvedUniversityDesignationFile?.[0]!;
          approvedUniversityDesignationFile[2] =
            strategicFunctionWorkload?.approvedUniversityDesignationFile?.[2]!;
          setStrategicFunctionWorkload({
            approvedUniversityDesignationFile
          });
        } else if (approvedUniversityDesignationFile[2]) {
          approvedUniversityDesignationFile[0] =
            strategicFunctionWorkload?.approvedUniversityDesignationFile?.[0]!;
          approvedUniversityDesignationFile[1] =
            strategicFunctionWorkload?.approvedUniversityDesignationFile?.[1]!;
          setStrategicFunctionWorkload({
            approvedUniversityDesignationFile
          });
        }
        console.log(approvedUniversityDesignationFile);
      }
      // COLEGE CAMPUS
      if (
        approvedCollegeCampusDesignationFile.length !== 0 ||
        strategicFunctionWorkload?.approvedCollegeCampusDesignationFile
          ?.length! < approvedCollegeCampusDesignationFile.length
      ) {
        if (
          approvedCollegeCampusDesignationFile[0] &&
          approvedCollegeCampusDesignationFile[1] &&
          approvedCollegeCampusDesignationFile[2]
        ) {
          setStrategicFunctionWorkload({
            approvedCollegeCampusDesignationFile
          });
        } else if (
          approvedCollegeCampusDesignationFile[0] &&
          approvedCollegeCampusDesignationFile[1]
        ) {
          approvedCollegeCampusDesignationFile[2] =
            strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[2]!;
          setStrategicFunctionWorkload({
            approvedCollegeCampusDesignationFile
          });
        } else if (
          approvedCollegeCampusDesignationFile[0] &&
          approvedCollegeCampusDesignationFile[2]
        ) {
          approvedCollegeCampusDesignationFile[1] =
            strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[1]!;
          setStrategicFunctionWorkload({
            approvedCollegeCampusDesignationFile
          });
        } else if (
          approvedCollegeCampusDesignationFile[1] &&
          approvedCollegeCampusDesignationFile[2]
        ) {
          approvedCollegeCampusDesignationFile[0] =
            strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[0]!;
          setStrategicFunctionWorkload({
            approvedCollegeCampusDesignationFile
          });
        } else if (approvedCollegeCampusDesignationFile[0]) {
          approvedCollegeCampusDesignationFile[1] =
            strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[1]!;
          approvedCollegeCampusDesignationFile[2] =
            strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[2]!;
          setStrategicFunctionWorkload({
            approvedCollegeCampusDesignationFile
          });
        } else if (approvedCollegeCampusDesignationFile[1]) {
          approvedCollegeCampusDesignationFile[0] =
            strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[0]!;
          approvedCollegeCampusDesignationFile[2] =
            strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[2]!;
          setStrategicFunctionWorkload({
            approvedCollegeCampusDesignationFile
          });
        } else if (approvedCollegeCampusDesignationFile[2]) {
          approvedCollegeCampusDesignationFile[0] =
            strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[0]!;
          approvedCollegeCampusDesignationFile[1] =
            strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[1]!;
          setStrategicFunctionWorkload({
            approvedCollegeCampusDesignationFile
          });
        }
      }
      setSteps(steps + 1);
    }
    if (steps === 3) {
      setDesignationDepartmentLevel(
        [
          departmentDesignation1,
          departmentDesignation2,
          departmentDesignation3,
          departmentLevelInputDesignation
        ].filter(Boolean)
      );
      setIsSubmitting(true);
    }
  };

  // DESIGNATION UNIVERSITY
  useEffect(() => {
    if (designationUniversity1) {
      setDisplayDesignationUniversity1(designationUniversity1);
    }
    if (designationUniversity2) {
      setDisplayDesignationUniversity2(designationUniversity2);
    }
    if (designationUniversity3) {
      setDisplayDesignationUniversity3(designationUniversity3);
    }
  }, [designationUniversity1, designationUniversity2, designationUniversity3]);

  useEffect(() => {
    if (
      displayDesignationUniversity1 !==
        strategicFunctionWorkload?.designationUniversityLevel?.[0] ||
      displayDesignationUniversity2 !==
        strategicFunctionWorkload?.designationUniversityLevel?.[1] ||
      displayDesignationUniversity3 !==
        strategicFunctionWorkload?.designationUniversityLevel?.[2]
    ) {
      if (
        displayDesignationUniversity1 &&
        displayDesignationUniversity2 &&
        displayDesignationUniversity3
      ) {
        setDesignationUniversityLevel(
          [
            displayDesignationUniversity1,
            displayDesignationUniversity2,
            displayDesignationUniversity3
          ].filter(Boolean)
        );
      } else if (
        displayDesignationUniversity1 &&
        displayDesignationUniversity2
      ) {
        setDesignationUniversityLevel(
          [displayDesignationUniversity1, displayDesignationUniversity2].filter(
            Boolean
          )
        );
      } else if (displayDesignationUniversity1) {
        setDesignationUniversityLevel(
          [displayDesignationUniversity1].filter(Boolean)
        );
      } else if (displayDesignationUniversity2) {
        setDesignationUniversityLevel(
          [displayDesignationUniversity2].filter(Boolean)
        );
      } else if (displayDesignationUniversity3) {
        setDesignationUniversityLevel(
          [displayDesignationUniversity3].filter(Boolean)
        );
      }
    }
  }, [
    displayDesignationUniversity1,
    displayDesignationUniversity2,
    displayDesignationUniversity3
  ]);

  // COLLEGE CAMPUS DESIGNATION
  useEffect(() => {
    if (collegeCampusDesignation1) {
      setDisplayCollegeCampusDesignation1(collegeCampusDesignation1);
    }
    if (collegeCampusDesignation2) {
      setDisplayCollegeCampusDesignation2(collegeCampusDesignation2);
    }
    if (collegeCampusDesignation3) {
      setDisplayCollegeCampusDesignation3(collegeCampusDesignation3);
    }
  }, [
    collegeCampusDesignation1,
    collegeCampusDesignation2,
    collegeCampusDesignation3
  ]);

  useEffect(() => {
    if (
      displayCollegeCampusDesignation1 !==
        strategicFunctionWorkload?.designationCollegeCampusLevel?.[0] ||
      displayCollegeCampusDesignation2 !==
        strategicFunctionWorkload?.designationCollegeCampusLevel?.[1] ||
      displayCollegeCampusDesignation3 !==
        strategicFunctionWorkload?.designationCollegeCampusLevel?.[2]
    ) {
      if (
        displayCollegeCampusDesignation1 &&
        displayCollegeCampusDesignation2 &&
        displayCollegeCampusDesignation3
      ) {
        setDesignationCollegeCampusLevel(
          [
            displayCollegeCampusDesignation1,
            displayCollegeCampusDesignation2,
            displayCollegeCampusDesignation3
          ].filter(Boolean)
        );
      } else if (
        displayCollegeCampusDesignation1 &&
        displayCollegeCampusDesignation2
      ) {
        setDesignationCollegeCampusLevel(
          [
            displayCollegeCampusDesignation1,
            displayCollegeCampusDesignation2
          ].filter(Boolean)
        );
      } else if (displayCollegeCampusDesignation1) {
        setDesignationCollegeCampusLevel(
          [displayCollegeCampusDesignation1].filter(Boolean)
        );
      } else if (displayCollegeCampusDesignation2) {
        setDesignationCollegeCampusLevel(
          [displayCollegeCampusDesignation2].filter(Boolean)
        );
      } else if (displayCollegeCampusDesignation3) {
        setDesignationCollegeCampusLevel(
          [displayCollegeCampusDesignation3].filter(Boolean)
        );
      }
    }
  }, [
    displayCollegeCampusDesignation1,
    displayCollegeCampusDesignation2,
    displayCollegeCampusDesignation3
  ]);

  // DEPARTMENT DESIGNATION
  useEffect(() => {
    if (departmentDesignation1) {
      setDisplayDepartmentDesignation1(departmentDesignation1);
    }
    if (departmentDesignation2) {
      setDisplayDepartmentDesignation2(departmentDesignation2);
    }
    if (departmentDesignation3) {
      setDisplayDepartmentDesignation3(departmentDesignation3);
    }
  }, [departmentDesignation1, departmentDesignation2, departmentDesignation3]);

  useEffect(() => {
    if (
      displayDepartmentDesignation1 !==
        strategicFunctionWorkload?.designationDepartmentLevel?.[0] ||
      displayDepartmentDesignation2 !==
        strategicFunctionWorkload?.designationDepartmentLevel?.[1] ||
      displayDepartmentDesignation3 !==
        strategicFunctionWorkload?.designationDepartmentLevel?.[2]
    ) {
      if (
        displayDepartmentDesignation1 &&
        displayDepartmentDesignation2 &&
        displayDepartmentDesignation3
      ) {
        setDesignationDepartmentLevel(
          [
            displayDepartmentDesignation1,
            displayDepartmentDesignation2,
            displayDepartmentDesignation3
          ].filter(Boolean)
        );
      } else if (
        displayDepartmentDesignation1 &&
        displayDepartmentDesignation2
      ) {
        setDesignationDepartmentLevel(
          [displayDepartmentDesignation1, displayDepartmentDesignation2].filter(
            Boolean
          )
        );
      } else if (displayDepartmentDesignation1) {
        setDesignationDepartmentLevel(
          [displayDepartmentDesignation1].filter(Boolean)
        );
      } else if (displayDepartmentDesignation2) {
        setDesignationDepartmentLevel(
          [displayDepartmentDesignation2].filter(Boolean)
        );
      } else if (displayDepartmentDesignation3) {
        setDesignationDepartmentLevel(
          [displayDepartmentDesignation3].filter(Boolean)
        );
      }
    }
  }, [
    displayDepartmentDesignation1,
    displayDepartmentDesignation2,
    displayDepartmentDesignation3
  ]);

  useEffect(() => {
    (async () => {
      // console.log(designationUniversityLevel);
      if (isSubmitting) {
        // if (
        //   strategicFunctionWorkload?.approvedUniversityDesignationFile &&
        //   strategicFunctionWorkload.designationUniversityLevel &&
        //   strategicFunctionWorkload.approvedCollegeCampusDesignationFile &&
        //   strategicFunctionWorkload.approvedDepartmentDesignationFile &&
        //   strategicFunctionWorkload.approvedDesignationFile &&
        //   strategicFunctionWorkload.coachAdviserCertificateFile &&
        //   strategicFunctionWorkload.designationAsMemberOfAdhoc &&
        //   strategicFunctionWorkload.designationAsSportTrainorAcademic &&
        //   strategicFunctionWorkload.designationCollegeCampusLevel &&
        //   strategicFunctionWorkload.designationDepartmentLevel &&
        //   strategicFunctionWorkload.listOfAdviseesFile &&
        //   strategicFunctionWorkload.totalOfAcademicAdvisees
        // ) {
        //   let designationUniversityPoints;
        //   let designationCollegeCampusPoints;
        //   let designationDepartmentPoints;
        //   let designationSportsSocioPoint;
        //   let totalNumberOfAcademicAdviseesPoints;
        //   designationUniversityPoints =
        //     strategicFunctionWorkload.designationUniversityLevel.length * 18;
        //   designationCollegeCampusPoints =
        //     strategicFunctionWorkload.designationCollegeCampusLevel.length * 15;
        //   designationDepartmentPoints =
        //     strategicFunctionWorkload.designationDepartmentLevel.length * 12;
        //   if (
        //     strategicFunctionWorkload.designationAsSportTrainorAcademic ===
        //     "University Level"
        //   ) {
        //     designationSportsSocioPoint = 5;
        //   } else {
        //     designationSportsSocioPoint = 3;
        //   }
        //   totalNumberOfAcademicAdviseesPoints =
        //     parseFloat(strategicFunctionWorkload.totalOfAcademicAdvisees) *
        //     0.023;
        //   strategicFunctionWorkload.sfwPoints =
        //     designationUniversityPoints +
        //     designationCollegeCampusPoints +
        //     designationDepartmentPoints +
        //     designationSportsSocioPoint +
        //     totalNumberOfAcademicAdviseesPoints;
        //   // await SaveStrategicFunctionWorkload(strategicFunctionWorkload);
        //   setIsSubmitting(false);
        //   // window.location.reload();
        // }
      }

      if (designationUniversityLevel!.length > 0) {
        if (
          strategicFunctionWorkload?.designationUniversityLevel?.[0] !==
            designationUniversityLevel?.[0] ||
          strategicFunctionWorkload?.designationUniversityLevel?.[1] !==
            designationUniversityLevel?.[1] ||
          strategicFunctionWorkload?.designationUniversityLevel?.[2] !==
            designationUniversityLevel?.[2]
        ) {
          setStrategicFunctionWorkload({
            designationUniversityLevel,
            approvedUniversityDesignationFile: approvedUniversityDesignationFile
          });
        }
      }

      if (designationCollegeCampusLevel!.length > 0) {
        if (
          strategicFunctionWorkload?.designationCollegeCampusLevel?.[0] !==
            designationCollegeCampusLevel?.[0] ||
          strategicFunctionWorkload?.designationCollegeCampusLevel?.[1] !==
            designationCollegeCampusLevel?.[1] ||
          strategicFunctionWorkload?.designationCollegeCampusLevel?.[2] !==
            designationCollegeCampusLevel?.[2]
        ) {
          setStrategicFunctionWorkload({
            designationCollegeCampusLevel,
            approvedCollegeCampusDesignationFile
          });
        }
      }

      if (designationDepartmentLevel!.length > 0) {
        if (
          strategicFunctionWorkload?.designationDepartmentLevel?.[0] !==
            designationDepartmentLevel?.[0] ||
          strategicFunctionWorkload?.designationDepartmentLevel?.[1] !==
            designationDepartmentLevel?.[1] ||
          strategicFunctionWorkload?.designationDepartmentLevel?.[2] !==
            designationDepartmentLevel?.[2]
        ) {
          setStrategicFunctionWorkload({
            ...strategicFunctionWorkload,
            designationDepartmentLevel
          });
        }
      }
    })();
  }, [
    designationUniversityLevel,
    designationCollegeCampusLevel,
    designationDepartmentLevel
  ]);

  return (
    <MainContainer>
      <TopNav
        menuHandler={() => setIsMenuOpen(!isMenuOpen)}
        profileHandler={() => setIsProfileOpen(!isProfileOpen)}
      />
      <Menu isMenuOpen={isMenuOpen} />
      <ProfileTab isProfileOpen={isProfileOpen} />
      <BodyContainer>
        <ScreenTitle title="Strategic Functions (SF)" />
        <Container>
          {steps === 1 && (
            <StrategicFunction1
              onUniversityLevelSelect1={onSelectDesignationUniversity1}
              onUniversityLevelSelect2={onSelectDesignationUniversity2}
              onUniversityLevelSelect3={onSelectDesignationUniversity3}
              textInputUniversityLevel4={textInputDesignationUniversity4}
              universityLevelInputDesignation={universityLevelInputDesignation}
              displayDesignationUniversity1={designationUniversityLevel[0]}
              displayDesignationUniversity2={designationUniversityLevel[1]}
              displayDesignationUniversity3={designationUniversityLevel[2]}
              onCollegeCampusLevelSelect1={onSelectCollegeCampusDesignation1}
              onCollegeCampusLevelSelect2={onSelectCollegeCampusDesignation2}
              onCollegeCampusLevelSelect3={onSelectCollegeCampusDesignation3}
              textInputCollegeCampusLevel4={textInputCollegeCampusDesignation4}
              displayDesignationCollegeCampus1={
                designationCollegeCampusLevel[0]
              }
              displayDesignationCollegeCampus2={
                designationCollegeCampusLevel[1]
              }
              displayDesignationCollegeCampus3={
                designationCollegeCampusLevel[2]
              }
              collegeCampusLevelInputDesignation={
                collegeCampusLevelInputDesignation
              }
              onFileUniversityLevelSelect1={
                approvedUniversityDesignationFileHandler1
              }
              onFileUniversityLevelSelect2={
                approvedUniversityDesignationFileHandler2
              }
              onFileUniversityLevelSelect3={
                approvedUniversityDesignationFileHandler3
              }
              onFileCustomUniversityLevelSelect={
                customApprovedUniversityDesignationFileHandler
              }
              customUniversityFileName={
                customApprovedUniversityDesignationFile?.name
              }
              universityLevelFileName1={
                strategicFunctionWorkload
                  ?.approvedUniversityDesignationFile?.[0]?.name
              }
              universityLevelFileName2={
                strategicFunctionWorkload
                  ?.approvedUniversityDesignationFile?.[1]?.name
              }
              universityLevelFileName3={
                strategicFunctionWorkload
                  ?.approvedUniversityDesignationFile?.[2]?.name
              }
              onFileCollegeCampusLevelSelect1={
                approvedCollegeCampusDesignationFileHandler1
              }
              onFileCollegeCampusLevelSelect2={
                approvedCollegeCampusDesignationFileHandler2
              }
              onFileCollegeCampusLevelSelect3={
                approvedCollegeCampusDesignationFileHandler3
              }
              onFileCustomCollegeCampusLevelSelect={
                customApprovedCollegeCampusDesignationFileHandler
              }
              collegeCampusLevelFileName1={
                strategicFunctionWorkload
                  ?.approvedCollegeCampusDesignationFile?.[0]?.name
              }
              collegeCampusLevelFileName2={
                strategicFunctionWorkload
                  ?.approvedCollegeCampusDesignationFile?.[1]?.name
              }
              collegeCampusLevelFileName3={
                strategicFunctionWorkload
                  ?.approvedCollegeCampusDesignationFile?.[2]?.name
              }
              customcollegeCampusLevelFileName={
                customApprovedCollegeCampusDesignationFile?.name
              }
            />
          )}
          {steps === 2 && (
            <StrategicFunction2
              onSelectDepartmentDesignation1={onSelectDepartmentDesignation1}
              onSelectDepartmentDesignation2={onSelectDepartmentDesignation2}
              onSelectDepartmentDesignation3={onSelectDepartmentDesignation3}
              textInputDepartmentDesignation4={textInputDepartmentDesignation4}
              displayDesignationDepartment1={designationDepartmentLevel[0]}
              displayDesignationDepartment2={designationDepartmentLevel[1]}
              displayDesignationDepartment3={designationDepartmentLevel[2]}
              designationDepartment={
                strategicFunctionWorkload?.designationDepartmentLevel
              }
              departmentDesignation1={departmentDesignation1}
              departmentDesignation2={departmentDesignation2}
              departmentDesignation3={departmentDesignation3}
              departmentLevelInputDesignation={departmentLevelInputDesignation}
              textInputSportsSocioDesignationTitle={
                textInputSportsSocioDesignationTitle
              }
              textInputSportsSocioDesignationPoints={
                textInputSportsSocioDesignationPoints
              }
              textInputMemberUniversityWideDesignationTitle={
                textInputMemberUniversityWideDesignationTitle
              }
              textInputMemberUniversityWideDesignationPoints={
                textInputMemberUniversityWideDesignationPoints
              }
              textInputAcademicAdviserDesignationTitle={
                textInputAcademicAdviserDesignationTitle
              }
              textInputAcademicAdviserDesignationPoints={
                textInputAcademicAdviserDesignationPoints
              }
              sportsSocioInputDesignation={sportsSocioInputDesignation}
              memberUniversityWideInputDesignation={
                memberUniversityWideInputDesignation
              }
              academicAdviserInputDesignation={academicAdviserInputDesignation}
              onFileDepartmentLevelSelect1={
                approvedDepartmentDesignationFileHandler1
              }
              onFileDepartmentLevelSelect2={
                approvedDepartmentDesignationFileHandler2
              }
              onFileDepartmentLevelSelect3={
                approvedDepartmentDesignationFileHandler3
              }
              onFileCustomDepartmentLevelSelect={
                customApprovedDepartmentDesignationFileHandler
              }
              departmentLevelFileName1={
                strategicFunctionWorkload
                  ?.approvedDepartmentDesignationFile?.[0]?.name
              }
              departmentLevelFileName2={
                strategicFunctionWorkload
                  ?.approvedDepartmentDesignationFile?.[1]?.name
              }
              departmentLevelFileName3={
                strategicFunctionWorkload
                  ?.approvedDepartmentDesignationFile?.[2]?.name
              }
              customDepartmentFileName={
                customApprovedDepartmentDesignationFile?.name
              }
            />
          )}
          <Buttons>
            {steps > 1 && (
              <ButtonContainer>
                <FormButton text="Back" onClicked={backHandler}></FormButton>
              </ButtonContainer>
            )}
            <ButtonContainer>
              <FormButton
                text={steps !== 2 ? "Next" : "Submit"}
                onClicked={onNextSubmit}
              ></FormButton>
            </ButtonContainer>
          </Buttons>
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
  border: 5px solid black;
  border-radius: 15px;
  margin: 80px;
`;

const Container = styled.div`
  padding: 30px;
  width: 95%;
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

const UploadContainer = styled.div`
  width: auto;
  max-width: 500px;
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
  align-self: flex-end;
  margin: 20px 20px 0px 0px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 80px;
  justify-content: flex-end;
`;

const UploadFileContainer = styled.div`
  max-width: 100px;
`;

const UniversityLabelContainer = styled.div`
  display: flex;
  align-self: flex-start;
  margin: 30px;
`;

const UniversityLabelText = styled.text`
  font-family: HurmeGeometricSans3SemiBold;
  font-size: 15px;
  line-height: 15px;
`;

const CheckBoxGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
`;

const CheckBoxColumnContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const CheckBox = styled.div<{ isSelected: boolean }>`
  border: 1px solid black;
  min-width: 12px;
  min-height: 12px;
  margin-right: 5px;
  cursor: pointer;
  background-color: ${p => (p.isSelected ? Colors.active : "none")};
  transition: opacity 0.1s ease-in-out;
  &:hover {
    opacity: 0.3;
  }
`;

const CheckBoxLabel = styled.text`
  font-family: HurmeGeometricSans3;
  font-size: 15px;
  line-height: 15px;
`;

export default StrategicFunction;
