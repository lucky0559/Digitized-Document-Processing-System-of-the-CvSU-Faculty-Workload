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
import Footer from "../../../components/Footer";

export type DesignationWithTitleAndPoints = {
  title: string;
  points: string;
};

export type DesignationWithPoints = {
  title?: string;
  points?: string;
  file?: File;
};

export type Designation = {
  title?: string;
  file?: File;
};

type StrategicFunctionProps = {
  UseLogout: () => void;
};

const StrategicFunction = ({ UseLogout }: StrategicFunctionProps) => {
  const [strategicFunctionWorkload, setStrategicFunctionWorkload] =
    useState<StrategicFunctionType>();

  const navigate = useNavigate();

  const [points, setPoints] = useState(0);

  // POINTS FULLFILL FOR UNIVERSITY WORKLOAD
  const [
    isDesignationUniversity1Fullfill,
    setIsDesignationUniversity1Fullfill
  ] = useState(false);
  const [
    isDesignationUniversity2Fullfill,
    setIsDesignationUniversity2Fullfill
  ] = useState(false);
  const [
    isDesignationUniversity3Fullfill,
    setIsDesignationUniversity3Fullfill
  ] = useState(false);
  const [
    isDesignationUniversity4Fullfill,
    setIsDesignationUniversity4Fullfill
  ] = useState(false);

  // POINTS FULLFILL FOR COLLEGE/CAMPUS WORKLOAD
  const [
    isDesignationCollegeCampus1Fullfill,
    setIsDesignationCollegeCampus1Fullfill
  ] = useState(false);
  const [
    isDesignationCollegeCampus2Fullfill,
    setIsDesignationCollegeCampus2Fullfill
  ] = useState(false);
  const [
    isDesignationCollegeCampus3Fullfill,
    setIsDesignationCollegeCampus3Fullfill
  ] = useState(false);
  const [
    isDesignationCollegeCampus4Fullfill,
    setIsDesignationCollegeCampus4Fullfill
  ] = useState(false);

  // POINTS FULLFILL FOR DEPARTMENT WORKLOAD
  const [
    isDesignationDepartment1Fullfill,
    setIsDesignationDepartment1Fullfill
  ] = useState(false);
  const [
    isDesignationDepartment2Fullfill,
    setIsDesignationDepartment2Fullfill
  ] = useState(false);
  const [
    isDesignationDepartment3Fullfill,
    setIsDesignationDepartment3Fullfill
  ] = useState(false);
  const [
    isDesignationDepartment4Fullfill,
    setIsDesignationDepartment4Fullfill
  ] = useState(false);

  // POINTS FULLFILL ON OTHER DESIGNATION
  const [isSportsSocioFullfill, setIsSportsSocioFullfill] = useState(false);
  const [isMemberUniversityFullfill, setIsMemberUniversityFullfill] =
    useState(false);
  const [isAcademicAdviserFullfill, setIsAcadmicAdviserFullfill] =
    useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isFacultySubmenuOpen, setIsFacultySubmenuOpen] = useState(false);

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
  const [
    customApprovedUniversityDesignation,
    setCustomApprovedUniversityDesignation
  ] = useState<Designation>();
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
  const [sportsSocio, setSportsSocio] = useState<DesignationWithPoints>();
  const [sportsSocio1, setSportsSocio1] = useState<DesignationWithPoints>();
  const [memberUniversity, setMemberUniversity] =
    useState<DesignationWithPoints>();
  const [memberUniversity1, setMemberUniversity1] =
    useState<DesignationWithPoints>();
  const [academicAdviser, setAcademicAdviser] =
    useState<DesignationWithPoints>();
  const [academicAdviser1, setAcademicAdviser1] =
    useState<DesignationWithPoints>();
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
    setDesignationUniversity1({
      ...designationUniversity1,
      file: value
    });
  };
  const approvedUniversityDesignationFileHandler2 = (value?: File) => {
    setDesignationUniversity2({
      ...designationUniversity2,
      file: value
    });
  };
  const approvedUniversityDesignationFileHandler3 = (value?: File) => {
    setDesignationUniversity3({
      ...designationUniversity3,
      file: value
    });
  };
  const customApprovedUniversityDesignationFileHandler = (value?: File) => {
    setDesignationUniversity4({
      ...designationUniversity4,
      file: value
    });
  };

  // COLLEGE CAMPUS FILE SELECT
  const approvedCollegeCampusDesignationFileHandler1 = (value?: File) => {
    setCollegeCampusDesignation1({
      ...collegeCampusDesignation1,
      file: value
    });
  };
  const approvedCollegeCampusDesignationFileHandler2 = (value?: File) => {
    setCollegeCampusDesignation2({
      ...collegeCampusDesignation2,
      file: value
    });
  };
  const approvedCollegeCampusDesignationFileHandler3 = (value?: File) => {
    setCollegeCampusDesignation3({
      ...collegeCampusDesignation3,
      file: value
    });
  };
  const customApprovedCollegeCampusDesignationFileHandler = (value?: File) => {
    setCollegeCampusDesignation4({
      ...collegeCampusDesignation4,
      file: value
    });
  };

  // DEPARTMENT FILE SELECT
  const approvedDepartmentDesignationFileHandler1 = (value?: File) => {
    setDepartmentDesignation1({
      ...departmentDesignation1,
      file: value
    });
  };
  const approvedDepartmentDesignationFileHandler2 = (value?: File) => {
    setDepartmentDesignation2({
      ...departmentDesignation2,
      file: value
    });
  };
  const approvedDepartmentDesignationFileHandler3 = (value?: File) => {
    setDepartmentDesignation3({
      ...departmentDesignation3,
      file: value
    });
  };
  const customApprovedDepartmentDesignationFileHandler = (value?: File) => {
    setDepartmentDesignation4({
      ...departmentDesignation4,
      file: value
    });
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

  const [designationUniversity1, setDesignationUniversity1] =
    useState<Designation>();
  const [designationUniversity2, setDesignationUniversity2] =
    useState<Designation>();
  const [designationUniversity3, setDesignationUniversity3] =
    useState<Designation>();
  const [designationUniversity4, setDesignationUniversity4] =
    useState<Designation>();

  const [collegeCampusDesignation1, setCollegeCampusDesignation1] =
    useState<Designation>();
  const [collegeCampusDesignation2, setCollegeCampusDesignation2] =
    useState<Designation>();
  const [collegeCampusDesignation3, setCollegeCampusDesignation3] =
    useState<Designation>();
  const [collegeCampusDesignation4, setCollegeCampusDesignation4] =
    useState<Designation>();

  const [departmentDesignation1, setDepartmentDesignation1] =
    useState<Designation>();
  const [departmentDesignation2, setDepartmentDesignation2] =
    useState<Designation>();
  const [departmentDesignation3, setDepartmentDesignation3] =
    useState<Designation>();
  const [departmentDesignation4, setDepartmentDesignation4] =
    useState<Designation>();

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
    if (value.length >= 0 && value !== "") {
      setDesignationUniversity1({
        ...designationUniversity1,
        title: value
      });
    }
  };

  const onSelectDesignationUniversity2 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setDesignationUniversity2({
        ...designationUniversity2,
        title: value
      });
    }
  };

  const onSelectDesignationUniversity3 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setDesignationUniversity3({
        ...designationUniversity3,
        title: value
      });
    }
  };

  const textInputDesignationUniversity4 = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setDesignationUniversity4({
      ...designationUniversity4,
      title: value
    });
    // }
  };

  const onSelectCollegeCampusDesignation1 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setCollegeCampusDesignation1({
        ...collegeCampusDesignation1,
        title: value
      });
    }
  };

  const onSelectCollegeCampusDesignation2 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setCollegeCampusDesignation2({
        ...collegeCampusDesignation2,
        title: value
      });
    }
  };

  const onSelectCollegeCampusDesignation3 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setCollegeCampusDesignation3({
        ...collegeCampusDesignation3,
        title: value
      });
    }
  };

  const textInputCollegeCampusDesignation4 = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setCollegeCampusDesignation4({
      ...collegeCampusDesignation4,
      title: value
    });
    // }
  };

  const onSelectDepartmentDesignation1 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setDepartmentDesignation1({
        ...departmentDesignation1,
        title: value
      });
    }
  };

  const onSelectDepartmentDesignation2 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setDepartmentDesignation2({
        ...departmentDesignation2,
        title: value
      });
    }
  };

  const onSelectDepartmentDesignation3 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setDepartmentDesignation3({
        ...departmentDesignation3,
        title: value
      });
    }
  };

  const textInputDepartmentDesignation4 = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setDepartmentDesignation4({
      ...departmentDesignation4,
      title: value
    });
    // }
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

  const textInputTitleSportsSocio = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setSportsSocio({
      ...sportsSocio,
      title: value
    });
    // }
  };

  const textInputTitleSportsSocio1 = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setSportsSocio1({
      ...sportsSocio1,
      title: value
    });
    // }
  };

  const textInputPointsSportsSocio = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setSportsSocio({
      ...sportsSocio,
      points: value
    });
    // }
  };

  const textInputPointsSportsSocio1 = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setSportsSocio1({
      ...sportsSocio1,
      points: value
    });
    // }
  };

  const fileHandlerSportsSocio = (value?: File) => {
    setSportsSocio({
      ...sportsSocio,
      file: value
    });
  };

  const fileHandlerSportsSocio1 = (value?: File) => {
    setSportsSocio1({
      ...sportsSocio1,
      file: value
    });
  };

  const textInputTitleMemberUniversity = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setMemberUniversity({
      ...memberUniversity,
      title: value
    });
    // }
  };

  const textInputTitleMemberUniversity1 = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setMemberUniversity1({
      ...memberUniversity1,
      title: value
    });
    // }
  };

  const textInputPointsMemberUniversity = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setMemberUniversity({
      ...memberUniversity,
      points: value
    });
    // }
  };

  const textInputPointsMemberUniversity1 = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setMemberUniversity1({
      ...memberUniversity1,
      points: value
    });
    // }
  };

  const fileHandlerMemberUniversity = (value?: File) => {
    setMemberUniversity({
      ...memberUniversity,
      file: value
    });
  };

  const fileHandlerMemberUniversity1 = (value?: File) => {
    setMemberUniversity1({
      ...memberUniversity1,
      file: value
    });
  };

  const textInputTitleAcademicAdviser = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setAcademicAdviser({
      ...academicAdviser,
      title: value
    });
    // }
  };

  const textInputTitleAcademicAdviser1 = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setAcademicAdviser1({
      ...academicAdviser1,
      title: value
    });
    // }
  };

  const textInputPointsAcademicAdviser = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setAcademicAdviser({
      ...academicAdviser,
      points: value
    });
    // }
  };

  const textInputPointsAcademicAdviser1 = (value: string) => {
    // if (value.length >= 0 && value !== "") {
    setAcademicAdviser1({
      ...academicAdviser1,
      points: value
    });
    // }
  };

  const fileHandlerAcademicAdviser = (value?: File) => {
    setAcademicAdviser({
      ...academicAdviser,
      file: value
    });
  };

  const fileHandlerAcademicAdviser1 = (value?: File) => {
    setAcademicAdviser1({
      ...academicAdviser1,
      file: value
    });
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
    setIsSubmitting(true);
  };

  // DESIGNATION UNIVERSITY
  // useEffect(() => {
  //   if (designationUniversity1) {
  //     setDisplayDesignationUniversity1(designationUniversity1.title);
  //   }
  //   if (designationUniversity2) {
  //     setDisplayDesignationUniversity2(designationUniversity2);
  //   }
  //   if (designationUniversity3) {
  //     setDisplayDesignationUniversity3(designationUniversity3);
  //   }
  // }, [designationUniversity1, designationUniversity2, designationUniversity3]);

  // useEffect(() => {
  //   if (
  //     displayDesignationUniversity1 !==
  //       strategicFunctionWorkload?.designationUniversityLevel?.[0] ||
  //     displayDesignationUniversity2 !==
  //       strategicFunctionWorkload?.designationUniversityLevel?.[1] ||
  //     displayDesignationUniversity3 !==
  //       strategicFunctionWorkload?.designationUniversityLevel?.[2]
  //   ) {
  //     if (
  //       displayDesignationUniversity1 &&
  //       displayDesignationUniversity2 &&
  //       displayDesignationUniversity3
  //     ) {
  //       setDesignationUniversityLevel(
  //         [
  //           displayDesignationUniversity1,
  //           displayDesignationUniversity2,
  //           displayDesignationUniversity3
  //         ].filter(Boolean)
  //       );
  //     } else if (
  //       displayDesignationUniversity1 &&
  //       displayDesignationUniversity2
  //     ) {
  //       setDesignationUniversityLevel(
  //         [displayDesignationUniversity1, displayDesignationUniversity2].filter(
  //           Boolean
  //         )
  //       );
  //     } else if (displayDesignationUniversity1) {
  //       setDesignationUniversityLevel(
  //         [displayDesignationUniversity1].filter(Boolean)
  //       );
  //     } else if (displayDesignationUniversity2) {
  //       setDesignationUniversityLevel(
  //         [displayDesignationUniversity2].filter(Boolean)
  //       );
  //     } else if (displayDesignationUniversity3) {
  //       setDesignationUniversityLevel(
  //         [displayDesignationUniversity3].filter(Boolean)
  //       );
  //     }
  //   }
  // }, [
  //   displayDesignationUniversity1,
  //   displayDesignationUniversity2,
  //   displayDesignationUniversity3
  // ]);

  // COLLEGE CAMPUS DESIGNATION
  // useEffect(() => {
  //   if (collegeCampusDesignation1) {
  //     setDisplayCollegeCampusDesignation1(collegeCampusDesignation1);
  //   }
  //   if (collegeCampusDesignation2) {
  //     setDisplayCollegeCampusDesignation2(collegeCampusDesignation2);
  //   }
  //   if (collegeCampusDesignation3) {
  //     setDisplayCollegeCampusDesignation3(collegeCampusDesignation3);
  //   }
  // }, [
  //   collegeCampusDesignation1,
  //   collegeCampusDesignation2,
  //   collegeCampusDesignation3
  // ]);

  // useEffect(() => {
  //   if (
  //     displayCollegeCampusDesignation1 !==
  //       strategicFunctionWorkload?.designationCollegeCampusLevel?.[0] ||
  //     displayCollegeCampusDesignation2 !==
  //       strategicFunctionWorkload?.designationCollegeCampusLevel?.[1] ||
  //     displayCollegeCampusDesignation3 !==
  //       strategicFunctionWorkload?.designationCollegeCampusLevel?.[2]
  //   ) {
  //     if (
  //       displayCollegeCampusDesignation1 &&
  //       displayCollegeCampusDesignation2 &&
  //       displayCollegeCampusDesignation3
  //     ) {
  //       setDesignationCollegeCampusLevel(
  //         [
  //           displayCollegeCampusDesignation1,
  //           displayCollegeCampusDesignation2,
  //           displayCollegeCampusDesignation3
  //         ].filter(Boolean)
  //       );
  //     } else if (
  //       displayCollegeCampusDesignation1 &&
  //       displayCollegeCampusDesignation2
  //     ) {
  //       setDesignationCollegeCampusLevel(
  //         [
  //           displayCollegeCampusDesignation1,
  //           displayCollegeCampusDesignation2
  //         ].filter(Boolean)
  //       );
  //     } else if (displayCollegeCampusDesignation1) {
  //       setDesignationCollegeCampusLevel(
  //         [displayCollegeCampusDesignation1].filter(Boolean)
  //       );
  //     } else if (displayCollegeCampusDesignation2) {
  //       setDesignationCollegeCampusLevel(
  //         [displayCollegeCampusDesignation2].filter(Boolean)
  //       );
  //     } else if (displayCollegeCampusDesignation3) {
  //       setDesignationCollegeCampusLevel(
  //         [displayCollegeCampusDesignation3].filter(Boolean)
  //       );
  //     }
  //   }
  // }, [
  //   displayCollegeCampusDesignation1,
  //   displayCollegeCampusDesignation2,
  //   displayCollegeCampusDesignation3
  // ]);

  // DEPARTMENT DESIGNATION
  // useEffect(() => {
  //   if (departmentDesignation1) {
  //     setDisplayDepartmentDesignation1(departmentDesignation1);
  //   }
  //   if (departmentDesignation2) {
  //     setDisplayDepartmentDesignation2(departmentDesignation2);
  //   }
  //   if (departmentDesignation3) {
  //     setDisplayDepartmentDesignation3(departmentDesignation3);
  //   }
  // }, [departmentDesignation1, departmentDesignation2, departmentDesignation3]);

  // useEffect(() => {
  //   if (
  //     displayDepartmentDesignation1 !==
  //       strategicFunctionWorkload?.designationDepartmentLevel?.[0] ||
  //     displayDepartmentDesignation2 !==
  //       strategicFunctionWorkload?.designationDepartmentLevel?.[1] ||
  //     displayDepartmentDesignation3 !==
  //       strategicFunctionWorkload?.designationDepartmentLevel?.[2]
  //   ) {
  //     if (
  //       displayDepartmentDesignation1 &&
  //       displayDepartmentDesignation2 &&
  //       displayDepartmentDesignation3
  //     ) {
  //       setDesignationDepartmentLevel(
  //         [
  //           displayDepartmentDesignation1,
  //           displayDepartmentDesignation2,
  //           displayDepartmentDesignation3
  //         ].filter(Boolean)
  //       );
  //     } else if (
  //       displayDepartmentDesignation1 &&
  //       displayDepartmentDesignation2
  //     ) {
  //       setDesignationDepartmentLevel(
  //         [displayDepartmentDesignation1, displayDepartmentDesignation2].filter(
  //           Boolean
  //         )
  //       );
  //     } else if (displayDepartmentDesignation1) {
  //       setDesignationDepartmentLevel(
  //         [displayDepartmentDesignation1].filter(Boolean)
  //       );
  //     } else if (displayDepartmentDesignation2) {
  //       setDesignationDepartmentLevel(
  //         [displayDepartmentDesignation2].filter(Boolean)
  //       );
  //     } else if (displayDepartmentDesignation3) {
  //       setDesignationDepartmentLevel(
  //         [displayDepartmentDesignation3].filter(Boolean)
  //       );
  //     }
  //   }
  // }, [
  //   displayDepartmentDesignation1,
  //   displayDepartmentDesignation2,
  //   displayDepartmentDesignation3
  // ]);

  useEffect(() => {
    (async () => {
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
        // console.log(strategicFunctionWorkload);
        setStrategicFunctionWorkload({
          designationUniversityLevel: [
            designationUniversity1?.file! && designationUniversity1?.title!,
            designationUniversity2?.file! && designationUniversity2?.title!,
            designationUniversity3?.file! && designationUniversity3?.title!,
            designationUniversity4?.file! && designationUniversity4?.title!
          ].filter(Boolean),
          designationUniversityLevelFiles: [
            designationUniversity1?.file!,
            designationUniversity2?.file!,
            designationUniversity3?.file!,
            designationUniversity4?.file!
          ],
          designationCollegeCampusLevel: [
            collegeCampusDesignation1?.file! &&
              collegeCampusDesignation1?.title!,
            collegeCampusDesignation2?.file! &&
              collegeCampusDesignation2?.title!,
            collegeCampusDesignation3?.file! &&
              collegeCampusDesignation3?.title!,
            collegeCampusDesignation4?.file! &&
              collegeCampusDesignation4?.title!
          ].filter(Boolean),
          designationCollegeCampusLevelFiles: [
            collegeCampusDesignation1?.file!,
            collegeCampusDesignation2?.file!,
            collegeCampusDesignation3?.file!,
            collegeCampusDesignation4?.file!
          ],
          designationDepartmentLevel: [
            departmentDesignation1?.file! && departmentDesignation1?.title!,
            departmentDesignation2?.file! && departmentDesignation2?.title!,
            departmentDesignation3?.file! && departmentDesignation3?.title!,
            departmentDesignation4?.file! && departmentDesignation4?.title!
          ].filter(Boolean),
          designationDepartmentLevelFiles: [
            departmentDesignation1?.file!,
            departmentDesignation2?.file!,
            departmentDesignation3?.file!,
            departmentDesignation4?.file!
          ],
          designationAsSportTrainorAcademic: sportsSocio?.title,
          designationAsSportTrainorAcademicFile: sportsSocio?.file,
          designationAsSportTrainorAcademicPoints: Number(sportsSocio?.points),
          designationAsMemberOfAdhoc: memberUniversity?.title,
          designationAsMemberOfAdhocFile: memberUniversity?.file,
          designationAsMemberOfAdhocPoints: Number(memberUniversity?.points),
          academicAdvisees: academicAdviser?.title,
          academicAdviseesFile: academicAdviser?.file,
          academicAdviseesPoints: Number(academicAdviser?.points)
        });
      }

      // if (designationUniversityLevel!.length > 0) {
      //   if (
      //     strategicFunctionWorkload?.designationUniversityLevel?.[0] !==
      //       designationUniversityLevel?.[0] ||
      //     strategicFunctionWorkload?.designationUniversityLevel?.[1] !==
      //       designationUniversityLevel?.[1] ||
      //     strategicFunctionWorkload?.designationUniversityLevel?.[2] !==
      //       designationUniversityLevel?.[2]
      //   ) {
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedUniversityDesignationFil
      //     });
      //   }
      // }

      // if (designationCollegeCampusLevel!.length > 0) {
      //   if (
      //     strategicFunctionWorkload?.designationCollegeCampusLevel?.[0] !==
      //       designationCollegeCampusLevel?.[0] ||
      //     strategicFunctionWorkload?.designationCollegeCampusLevel?.[1] !==
      //       designationCollegeCampusLevel?.[1] ||
      //     strategicFunctionWorkload?.designationCollegeCampusLevel?.[2] !==
      //       designationCollegeCampusLevel?.[2]
      //   ) {
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedCollegeCampusDesignationFile
      //     });
      //   }
      // }

      // if (designationDepartmentLevel!.length > 0) {
      //   if (
      //     strategicFunctionWorkload?.designationDepartmentLevel?.[0] !==
      //       designationDepartmentLevel?.[0] ||
      //     strategicFunctionWorkload?.designationDepartmentLevel?.[1] !==
      //       designationDepartmentLevel?.[1] ||
      //     strategicFunctionWorkload?.designationDepartmentLevel?.[2] !==
      //       designationDepartmentLevel?.[2]
      //   ) {
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedDepartmentDesignationFile
      //     });
      //   }
      // }
    })();
  }, [isSubmitting]);

  useEffect(() => {
    (async () => {
      if (isSubmitting) {
        try {
          await SaveStrategicFunctionWorkload(strategicFunctionWorkload);
          // window.location.reload();
        } catch (e) {
          console.log(e);
        }
        setIsSubmitting(false);
      }
    })();
  }, [strategicFunctionWorkload]);

  // POINTS FOR UNIVERSITY WORKLOAD
  useEffect(() => {
    if (
      designationUniversity1?.title &&
      designationUniversity1.file &&
      !isDesignationUniversity1Fullfill
    ) {
      setIsDesignationUniversity1Fullfill(true);
      setPoints(points + 18);
    }
    if (
      designationUniversity2?.title &&
      designationUniversity2.file &&
      !isDesignationUniversity2Fullfill
    ) {
      setIsDesignationUniversity2Fullfill(true);
      setPoints(points + 18);
    }
    if (
      designationUniversity3?.title &&
      designationUniversity3.file &&
      !isDesignationUniversity3Fullfill
    ) {
      setIsDesignationUniversity3Fullfill(true);
      setPoints(points + 18);
    }
    if (
      designationUniversity4?.title &&
      designationUniversity4.file &&
      !isDesignationUniversity4Fullfill
    ) {
      setIsDesignationUniversity4Fullfill(true);
      setPoints(points + 18);
    } else if (
      !designationUniversity4?.title &&
      designationUniversity4?.file &&
      isDesignationUniversity4Fullfill
    ) {
      setIsDesignationUniversity4Fullfill(false);
      setPoints(points - 18);
    }
  }, [
    designationUniversity1,
    designationUniversity2,
    designationUniversity3,
    designationUniversity4
  ]);

  // POINTS FOR COLLEGE/CAMPUS WORKLOAD
  useEffect(() => {
    if (
      collegeCampusDesignation1?.title &&
      collegeCampusDesignation1.file &&
      !isDesignationCollegeCampus1Fullfill
    ) {
      setIsDesignationCollegeCampus1Fullfill(true);
      setPoints(points + 15);
    }
    if (
      collegeCampusDesignation2?.title &&
      collegeCampusDesignation2.file &&
      !isDesignationCollegeCampus2Fullfill
    ) {
      setIsDesignationCollegeCampus2Fullfill(true);
      setPoints(points + 15);
    }
    if (
      collegeCampusDesignation3?.title &&
      collegeCampusDesignation3.file &&
      !isDesignationCollegeCampus3Fullfill
    ) {
      setIsDesignationCollegeCampus3Fullfill(true);
      setPoints(points + 15);
    }
    if (
      collegeCampusDesignation4?.title &&
      collegeCampusDesignation4.file &&
      !isDesignationCollegeCampus4Fullfill
    ) {
      setIsDesignationCollegeCampus4Fullfill(true);
      setPoints(points + 15);
    } else if (
      !collegeCampusDesignation4?.title &&
      collegeCampusDesignation4?.file &&
      isDesignationCollegeCampus4Fullfill
    ) {
      setIsDesignationCollegeCampus4Fullfill(false);
      setPoints(points - 15);
    }
  }, [
    collegeCampusDesignation1,
    collegeCampusDesignation2,
    collegeCampusDesignation3,
    collegeCampusDesignation4
  ]);

  // POINTS FOR DEPARTMENT WORKLOAD
  useEffect(() => {
    if (
      departmentDesignation1?.title &&
      departmentDesignation1.file &&
      !isDesignationDepartment1Fullfill
    ) {
      setIsDesignationDepartment1Fullfill(true);
      setPoints(points + 12);
    }
    if (
      departmentDesignation2?.title &&
      departmentDesignation2.file &&
      !isDesignationDepartment2Fullfill
    ) {
      setIsDesignationDepartment2Fullfill(true);
      setPoints(points + 12);
    }
    if (
      departmentDesignation3?.title &&
      departmentDesignation3.file &&
      !isDesignationDepartment3Fullfill
    ) {
      setIsDesignationDepartment3Fullfill(true);
      setPoints(points + 12);
    }
    if (
      departmentDesignation4?.title &&
      departmentDesignation4.file &&
      !isDesignationDepartment4Fullfill
    ) {
      setIsDesignationDepartment4Fullfill(true);
      setPoints(points + 12);
    } else if (
      !departmentDesignation4?.title &&
      departmentDesignation4?.file &&
      isDesignationDepartment4Fullfill
    ) {
      setIsDesignationDepartment4Fullfill(false);
      setPoints(points - 12);
    }
  }, [
    departmentDesignation1,
    departmentDesignation2,
    departmentDesignation3,
    departmentDesignation4
  ]);

  const hasSportsSocio =
    sportsSocio?.points && sportsSocio?.file && sportsSocio?.title;

  const hasSportsSocio1 =
    sportsSocio1?.points && sportsSocio1?.file && sportsSocio1?.title;

  const hasMemberUniversity =
    memberUniversity?.points &&
    memberUniversity?.file &&
    memberUniversity?.title;

  const hasMemberUniversity1 =
    memberUniversity1?.points &&
    memberUniversity1?.file &&
    memberUniversity1?.title;

  const hasAcademicAdviser =
    academicAdviser?.points && academicAdviser?.file && academicAdviser?.title;

  const hasAcademicAdviser1 =
    academicAdviser1?.points &&
    academicAdviser1?.file &&
    academicAdviser1?.title;

  return (
    <MainContainer>
      <TopNav profileHandler={() => setIsProfileOpen(!isProfileOpen)} />
      <Content>
        <Menu
          isFacultySubmenuOpen={isFacultySubmenuOpen}
          facultySubMenuHandler={() =>
            setIsFacultySubmenuOpen(!isFacultySubmenuOpen)
          }
        />
        <ProfileTab isProfileOpen={isProfileOpen} UseLogout={UseLogout} />
        <BodyContainer>
          <ScreenTitle title="Strategic Functions (SF)" />
          <Container>
            {steps === 1 && (
              <>
                <StrategicFunction1
                  onUniversityLevelSelect1={onSelectDesignationUniversity1}
                  onUniversityLevelSelect2={onSelectDesignationUniversity2}
                  onUniversityLevelSelect3={onSelectDesignationUniversity3}
                  textInputUniversityLevel4={textInputDesignationUniversity4}
                  universityLevelInputDesignation={
                    designationUniversity4?.title
                  }
                  displayDesignationUniversity1={designationUniversity1?.title}
                  displayDesignationUniversity2={designationUniversity2?.title}
                  displayDesignationUniversity3={designationUniversity3?.title}
                  onCollegeCampusLevelSelect1={
                    onSelectCollegeCampusDesignation1
                  }
                  onCollegeCampusLevelSelect2={
                    onSelectCollegeCampusDesignation2
                  }
                  onCollegeCampusLevelSelect3={
                    onSelectCollegeCampusDesignation3
                  }
                  textInputCollegeCampusLevel4={
                    textInputCollegeCampusDesignation4
                  }
                  displayDesignationCollegeCampus1={
                    collegeCampusDesignation1?.title
                  }
                  displayDesignationCollegeCampus2={
                    collegeCampusDesignation2?.title
                  }
                  displayDesignationCollegeCampus3={
                    collegeCampusDesignation3?.title
                  }
                  collegeCampusLevelInputDesignation={
                    collegeCampusDesignation4?.title
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
                  customUniversityFileName={designationUniversity4?.file?.name}
                  universityLevelFileName1={designationUniversity1?.file?.name}
                  universityLevelFileName2={designationUniversity2?.file?.name}
                  universityLevelFileName3={designationUniversity3?.file?.name}
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
                    collegeCampusDesignation1?.file?.name
                  }
                  collegeCampusLevelFileName2={
                    collegeCampusDesignation2?.file?.name
                  }
                  collegeCampusLevelFileName3={
                    collegeCampusDesignation3?.file?.name
                  }
                  customcollegeCampusLevelFileName={
                    collegeCampusDesignation4?.file?.name
                  }
                />
                <StrategicFunction2
                  onSelectDepartmentDesignation1={
                    onSelectDepartmentDesignation1
                  }
                  onSelectDepartmentDesignation2={
                    onSelectDepartmentDesignation2
                  }
                  onSelectDepartmentDesignation3={
                    onSelectDepartmentDesignation3
                  }
                  textInputDepartmentDesignation4={
                    textInputDepartmentDesignation4
                  }
                  displayDesignationDepartment1={departmentDesignation1?.title}
                  displayDesignationDepartment2={departmentDesignation2?.title}
                  displayDesignationDepartment3={departmentDesignation3?.title}
                  departmentLevelInputDesignation={
                    departmentDesignation4?.title
                  }
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
                  departmentLevelFileName1={departmentDesignation1?.file?.name}
                  departmentLevelFileName2={departmentDesignation2?.file?.name}
                  departmentLevelFileName3={departmentDesignation3?.file?.name}
                  customDepartmentFileName={departmentDesignation4?.file?.name}
                  onTextInputSportsSocioDesignationTitle={
                    textInputTitleSportsSocio
                  }
                  onTextInputSportsSocioDesignationPoints={
                    textInputPointsSportsSocio
                  }
                  sportsSocioTitle={sportsSocio?.title}
                  sportsSocioPoints={sportsSocio?.points}
                  fileHandlerSportsSocio={fileHandlerSportsSocio}
                  fileNameSportsSocio={sportsSocio?.file?.name}
                  onTextInputSportsSocioDesignationTitle1={
                    textInputTitleSportsSocio1
                  }
                  onTextInputSportsSocioDesignationPoints1={
                    textInputPointsSportsSocio1
                  }
                  sportsSocioTitle1={sportsSocio1?.title}
                  sportsSocioPoints1={sportsSocio1?.points}
                  fileHandlerSportsSocio1={fileHandlerSportsSocio1}
                  fileNameSportsSocio1={sportsSocio1?.file?.name}
                  onTextInputMemberUniversityWideDesignationTitle={
                    textInputTitleMemberUniversity
                  }
                  onTextInputMemberUniversityWideDesignationPoints={
                    textInputPointsMemberUniversity
                  }
                  memberUniversityTitle={memberUniversity?.title}
                  memberUniversityPoints={memberUniversity?.points}
                  fileHandlerMemberUniversity={fileHandlerMemberUniversity}
                  fileNameMemberUniversity={memberUniversity?.file?.name}
                  onTextInputMemberUniversityWideDesignationTitle1={
                    textInputTitleMemberUniversity1
                  }
                  onTextInputMemberUniversityWideDesignationPoints1={
                    textInputPointsMemberUniversity1
                  }
                  memberUniversityTitle1={memberUniversity1?.title}
                  memberUniversityPoints1={memberUniversity1?.points}
                  fileHandlerMemberUniversity1={fileHandlerMemberUniversity1}
                  fileNameMemberUniversity1={memberUniversity1?.file?.name}
                  onTextInputAcademicAdviserDesignationTitle={
                    textInputTitleAcademicAdviser
                  }
                  onTextInputAcademicAdviserDesignationPoints={
                    textInputPointsAcademicAdviser
                  }
                  academicAdviserTitle={academicAdviser?.title}
                  academicAdviserPoints={academicAdviser?.points}
                  fileHandlerAcademicAdviser={fileHandlerAcademicAdviser}
                  fileNameAcademicAdviser={academicAdviser?.file?.name}
                  onTextInputAcademicAdviserDesignationTitle1={
                    textInputTitleAcademicAdviser1
                  }
                  onTextInputAcademicAdviserDesignationPoints1={
                    textInputPointsAcademicAdviser1
                  }
                  academicAdviserTitle1={academicAdviser1?.title}
                  academicAdviserPoints1={academicAdviser1?.points}
                  fileHandlerAcademicAdviser1={fileHandlerAcademicAdviser1}
                  fileNameAcademicAdviser1={academicAdviser1?.file?.name}
                />
              </>
            )}
            {steps === 2 && (
              <StrategicFunction2
                onSelectDepartmentDesignation1={onSelectDepartmentDesignation1}
                onSelectDepartmentDesignation2={onSelectDepartmentDesignation2}
                onSelectDepartmentDesignation3={onSelectDepartmentDesignation3}
                textInputDepartmentDesignation4={
                  textInputDepartmentDesignation4
                }
                displayDesignationDepartment1={departmentDesignation1?.title}
                displayDesignationDepartment2={departmentDesignation2?.title}
                displayDesignationDepartment3={departmentDesignation3?.title}
                departmentLevelInputDesignation={departmentDesignation4?.title}
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
                departmentLevelFileName1={departmentDesignation1?.file?.name}
                departmentLevelFileName2={departmentDesignation2?.file?.name}
                departmentLevelFileName3={departmentDesignation3?.file?.name}
                customDepartmentFileName={departmentDesignation4?.file?.name}
                onTextInputSportsSocioDesignationTitle={
                  textInputTitleSportsSocio
                }
                onTextInputSportsSocioDesignationPoints={
                  textInputPointsSportsSocio
                }
                sportsSocioTitle={sportsSocio?.title}
                sportsSocioPoints={sportsSocio?.points}
                fileHandlerSportsSocio={fileHandlerSportsSocio}
                fileNameSportsSocio={sportsSocio?.file?.name}
                onTextInputSportsSocioDesignationTitle1={
                  textInputTitleSportsSocio1
                }
                onTextInputSportsSocioDesignationPoints1={
                  textInputPointsSportsSocio1
                }
                sportsSocioTitle1={sportsSocio1?.title}
                sportsSocioPoints1={sportsSocio1?.points}
                fileHandlerSportsSocio1={fileHandlerSportsSocio1}
                fileNameSportsSocio1={sportsSocio1?.file?.name}
                onTextInputMemberUniversityWideDesignationTitle={
                  textInputTitleMemberUniversity
                }
                onTextInputMemberUniversityWideDesignationPoints={
                  textInputPointsMemberUniversity
                }
                memberUniversityTitle={memberUniversity?.title}
                memberUniversityPoints={memberUniversity?.points}
                fileHandlerMemberUniversity={fileHandlerMemberUniversity}
                fileNameMemberUniversity={memberUniversity?.file?.name}
                onTextInputMemberUniversityWideDesignationTitle1={
                  textInputTitleMemberUniversity1
                }
                onTextInputMemberUniversityWideDesignationPoints1={
                  textInputPointsMemberUniversity1
                }
                memberUniversityTitle1={memberUniversity1?.title}
                memberUniversityPoints1={memberUniversity1?.points}
                fileHandlerMemberUniversity1={fileHandlerMemberUniversity1}
                fileNameMemberUniversity1={memberUniversity1?.file?.name}
                onTextInputAcademicAdviserDesignationTitle={
                  textInputTitleAcademicAdviser
                }
                onTextInputAcademicAdviserDesignationPoints={
                  textInputPointsAcademicAdviser
                }
                academicAdviserTitle={academicAdviser?.title}
                academicAdviserPoints={academicAdviser?.points}
                fileHandlerAcademicAdviser={fileHandlerAcademicAdviser}
                fileNameAcademicAdviser={academicAdviser?.file?.name}
                onTextInputAcademicAdviserDesignationTitle1={
                  textInputTitleAcademicAdviser1
                }
                onTextInputAcademicAdviserDesignationPoints1={
                  textInputPointsAcademicAdviser1
                }
                academicAdviserTitle1={academicAdviser1?.title}
                academicAdviserPoints1={academicAdviser1?.points}
                fileHandlerAcademicAdviser1={fileHandlerAcademicAdviser1}
                fileNameAcademicAdviser1={academicAdviser1?.file?.name}
              />
            )}
            <FormFooterContainer>
              <Label style={{ fontWeight: "bold" }}>
                {hasSportsSocio &&
                  hasSportsSocio1 &&
                  !hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  !hasAcademicAdviser &&
                  !hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(sportsSocio?.points) +
                    Number(sportsSocio1?.points)
                  }`}
                {hasSportsSocio &&
                  hasSportsSocio1 &&
                  hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  !hasAcademicAdviser &&
                  !hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(sportsSocio?.points) +
                    Number(sportsSocio1?.points) +
                    Number(memberUniversity.points)
                  }`}
                {hasSportsSocio &&
                  hasSportsSocio1 &&
                  !hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  !hasAcademicAdviser &&
                  !hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(sportsSocio?.points) +
                    Number(sportsSocio1?.points) +
                    Number(memberUniversity1.points)
                  }`}
                {hasSportsSocio &&
                  !hasSportsSocio1 &&
                  !hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  !hasAcademicAdviser &&
                  !hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points + Number(sportsSocio?.points)
                  }`}
                {!hasSportsSocio &&
                  hasSportsSocio1 &&
                  !hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  !hasAcademicAdviser &&
                  !hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points + Number(sportsSocio1?.points)
                  }`}
                {hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  !hasSportsSocio &&
                  !hasSportsSocio1 &&
                  !hasAcademicAdviser &&
                  !hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points + Number(memberUniversity.points)
                  }`}
                {!hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  !hasSportsSocio &&
                  !hasSportsSocio1 &&
                  !hasAcademicAdviser &&
                  !hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points + Number(memberUniversity1.points)
                  }`}
                {hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  !hasSportsSocio &&
                  !hasSportsSocio1 &&
                  !hasAcademicAdviser &&
                  !hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(memberUniversity.points) +
                    Number(memberUniversity1.points)
                  }`}
                {hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  hasSportsSocio &&
                  !hasSportsSocio1 &&
                  !hasAcademicAdviser &&
                  !hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(memberUniversity.points) +
                    Number(memberUniversity1.points) +
                    Number(sportsSocio.points)
                  }`}
                {hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  !hasSportsSocio &&
                  hasSportsSocio1 &&
                  !hasAcademicAdviser &&
                  !hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(memberUniversity.points) +
                    Number(memberUniversity1.points) +
                    Number(sportsSocio1.points)
                  }`}
                {hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  hasSportsSocio &&
                  hasSportsSocio1 &&
                  !hasAcademicAdviser &&
                  !hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(memberUniversity.points) +
                    Number(memberUniversity1.points) +
                    Number(sportsSocio1.points) +
                    Number(sportsSocio.points)
                  }`}
                {hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  hasSportsSocio &&
                  hasSportsSocio1 &&
                  hasAcademicAdviser &&
                  !hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(memberUniversity.points) +
                    Number(memberUniversity1.points) +
                    Number(sportsSocio1.points) +
                    Number(sportsSocio.points) +
                    Number(academicAdviser.points)
                  }`}
                {hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  hasSportsSocio &&
                  hasSportsSocio1 &&
                  !hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(memberUniversity.points) +
                    Number(memberUniversity1.points) +
                    Number(sportsSocio1.points) +
                    Number(sportsSocio.points) +
                    Number(academicAdviser1.points)
                  }`}
                {hasAcademicAdviser &&
                  !hasAcademicAdviser1 &&
                  !hasSportsSocio &&
                  !hasSportsSocio1 &&
                  !hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  `Total Strategic Function Workload = ${
                    points + Number(academicAdviser.points)
                  }`}
                {!hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  !hasSportsSocio &&
                  !hasSportsSocio1 &&
                  !hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  `Total Strategic Function Workload = ${
                    points + Number(academicAdviser1.points)
                  }`}
                {hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  !hasSportsSocio &&
                  !hasSportsSocio1 &&
                  !hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(academicAdviser.points) +
                    Number(academicAdviser1.points)
                  }`}
                {hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  hasSportsSocio &&
                  !hasSportsSocio1 &&
                  !hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(academicAdviser.points) +
                    Number(academicAdviser1.points) +
                    Number(sportsSocio.points)
                  }`}
                {hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  !hasSportsSocio &&
                  hasSportsSocio1 &&
                  !hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(academicAdviser.points) +
                    Number(academicAdviser1.points) +
                    Number(sportsSocio1.points)
                  }`}
                {hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  hasSportsSocio &&
                  hasSportsSocio1 &&
                  !hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(academicAdviser.points) +
                    Number(academicAdviser1.points) +
                    Number(sportsSocio1.points) +
                    Number(sportsSocio.points)
                  }`}
                {hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  hasSportsSocio &&
                  hasSportsSocio1 &&
                  hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(academicAdviser.points) +
                    Number(academicAdviser1.points) +
                    Number(sportsSocio1.points) +
                    Number(sportsSocio.points) +
                    Number(memberUniversity.points)
                  }`}
                {hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  hasSportsSocio &&
                  hasSportsSocio1 &&
                  !hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(academicAdviser.points) +
                    Number(academicAdviser1.points) +
                    Number(sportsSocio1.points) +
                    Number(sportsSocio.points) +
                    Number(memberUniversity1.points)
                  }`}
                {hasSportsSocio &&
                  hasSportsSocio1 &&
                  hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(sportsSocio.points) +
                    Number(sportsSocio1.points) +
                    Number(memberUniversity?.points) +
                    Number(memberUniversity1?.points) +
                    Number(academicAdviser?.points) +
                    Number(academicAdviser1?.points)
                  }`}
                {hasSportsSocio &&
                  hasSportsSocio1 &&
                  hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  !hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(sportsSocio.points) +
                    Number(sportsSocio1.points) +
                    Number(memberUniversity?.points) +
                    Number(memberUniversity1?.points) +
                    Number(academicAdviser1?.points)
                  }`}
                {hasSportsSocio &&
                  hasSportsSocio1 &&
                  hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  !hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(sportsSocio.points) +
                    Number(sportsSocio1.points) +
                    Number(academicAdviser?.points) +
                    Number(academicAdviser1?.points)
                  }`}
                {hasSportsSocio &&
                  hasSportsSocio1 &&
                  hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  hasMemberUniversity &&
                  !hasMemberUniversity1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(sportsSocio.points) +
                    Number(sportsSocio1.points) +
                    Number(academicAdviser?.points) +
                    Number(academicAdviser1?.points) +
                    Number(memberUniversity?.points)
                  }`}
                {hasSportsSocio &&
                  hasSportsSocio1 &&
                  hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  !hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(sportsSocio.points) +
                    Number(sportsSocio1.points) +
                    Number(academicAdviser?.points) +
                    Number(academicAdviser1?.points) +
                    Number(memberUniversity1?.points)
                  }`}
                {hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  !hasSportsSocio &&
                  !hasSportsSocio1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(memberUniversity?.points) +
                    Number(memberUniversity1?.points) +
                    Number(academicAdviser?.points) +
                    Number(academicAdviser1?.points)
                  }`}
                {hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  hasSportsSocio &&
                  !hasSportsSocio1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(memberUniversity?.points) +
                    Number(memberUniversity1?.points) +
                    Number(academicAdviser?.points) +
                    Number(academicAdviser1?.points) +
                    Number(sportsSocio.points)
                  }`}
                {hasMemberUniversity &&
                  hasMemberUniversity1 &&
                  hasAcademicAdviser &&
                  hasAcademicAdviser1 &&
                  !hasSportsSocio &&
                  hasSportsSocio1 &&
                  `Total Strategic Function Workload = ${
                    points +
                    Number(memberUniversity?.points) +
                    Number(memberUniversity1?.points) +
                    Number(academicAdviser?.points) +
                    Number(academicAdviser1?.points) +
                    Number(sportsSocio1.points)
                  }`}
                {!hasSportsSocio &&
                  !hasMemberUniversity &&
                  !hasAcademicAdviser &&
                  `Total Strategic Function Workload = ${points}`}
              </Label>
              <Buttons>
                <ButtonContainer>
                  <FormButton
                    text="Submit"
                    onClicked={onNextSubmit}
                    isSubmitting={isSubmitting}
                  ></FormButton>
                </ButtonContainer>
              </Buttons>
            </FormFooterContainer>
          </Container>
        </BodyContainer>
      </Content>
      {/* <FooterContainer>
        <Footer />
      </FooterContainer> */}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
`;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 5px solid black;
  border-radius: 15px;
  margin: 120px 120px 120px 268px;
`;

const Container = styled.div`
  padding: 30px;
  width: 85%;
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

const FooterContainer = styled.div`
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  z-index: 1000;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 17px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
  width: 100%;
  margin-top: 20px;
`;

const FormFooterContainer = styled.div`
  display: flex;
  width: 100%;
`;

export default StrategicFunction;
