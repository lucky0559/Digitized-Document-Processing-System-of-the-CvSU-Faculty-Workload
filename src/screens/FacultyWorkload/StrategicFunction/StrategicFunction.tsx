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

export type DesignationWithPoints = {
  title?: string;
  points?: string;
  file?: File;
};

export type Designation = {
  title?: string;
  file?: File;
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
  const [memberUniversity, setMemberUniversity] =
    useState<DesignationWithPoints>();
  const [academicAdviser, setAcademicAdviser] =
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
    if (value.length >= 0 && value !== "") {
      setDesignationUniversity4({
        ...designationUniversity4,
        title: value
      });
    }
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
    if (value.length >= 0 && value !== "") {
      setCollegeCampusDesignation4({
        ...collegeCampusDesignation4,
        title: value
      });
    }
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
    if (value.length >= 0 && value !== "") {
      setDepartmentDesignation4({
        ...departmentDesignation4,
        title: value
      });
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

  const textInputTitleSportsSocio = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setSportsSocio({
        ...sportsSocio,
        title: value
      });
    }
  };

  const textInputPointsSportsSocio = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setSportsSocio({
        ...sportsSocio,
        points: value
      });
    }
  };

  const fileHandlerSportsSocio = (value?: File) => {
    setSportsSocio({
      ...sportsSocio,
      file: value
    });
  };

  const textInputTitleMemberUniversity = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setMemberUniversity({
        ...memberUniversity,
        title: value
      });
    }
  };

  const textInputPointsMemberUniversity = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setMemberUniversity({
        ...memberUniversity,
        points: value
      });
    }
  };

  const fileHandlerMemberUniversity = (value?: File) => {
    setMemberUniversity({
      ...memberUniversity,
      file: value
    });
  };

  const textInputTitleAcademicAdviser = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setAcademicAdviser({
        ...academicAdviser,
        title: value
      });
    }
  };

  const textInputPointsAcademicAdviser = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setAcademicAdviser({
        ...academicAdviser,
        points: value
      });
    }
  };

  const fileHandlerAcademicAdviser = (value?: File) => {
    setAcademicAdviser({
      ...academicAdviser,
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
    if (steps === 1) {
      // // UNIVERSITY
      // if (
      //   approvedUniversityDesignationFile.length !== 0 ||
      //   strategicFunctionWorkload?.approvedUniversityDesignationFile?.length! <
      //     approvedUniversityDesignationFile.length
      // ) {
      //   if (
      //     approvedUniversityDesignationFile[0] &&
      //     approvedUniversityDesignationFile[1] &&
      //     approvedUniversityDesignationFile[2]
      //   ) {
      //     console.log(approvedUniversityDesignationFile);
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedUniversityDesignationFile
      //     });
      //   } else if (
      //     approvedUniversityDesignationFile[0] &&
      //     approvedUniversityDesignationFile[1]
      //   ) {
      //     approvedUniversityDesignationFile[2] =
      //       strategicFunctionWorkload?.approvedUniversityDesignationFile?.[2]!;
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedUniversityDesignationFile
      //     });
      //   } else if (
      //     approvedUniversityDesignationFile[0] &&
      //     approvedUniversityDesignationFile[2]
      //   ) {
      //     approvedUniversityDesignationFile[1] =
      //       strategicFunctionWorkload?.approvedUniversityDesignationFile?.[1]!;
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedUniversityDesignationFile
      //     });
      //   } else if (
      //     approvedUniversityDesignationFile[1] &&
      //     approvedUniversityDesignationFile[2]
      //   ) {
      //     approvedUniversityDesignationFile[0] =
      //       strategicFunctionWorkload?.approvedUniversityDesignationFile?.[0]!;
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedUniversityDesignationFile
      //     });
      //   } else if (approvedUniversityDesignationFile[0]) {
      //     approvedUniversityDesignationFile[1] =
      //       strategicFunctionWorkload?.approvedUniversityDesignationFile?.[1]!;
      //     approvedUniversityDesignationFile[2] =
      //       strategicFunctionWorkload?.approvedUniversityDesignationFile?.[2]!;
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedUniversityDesignationFile
      //     });
      //   } else if (approvedUniversityDesignationFile[1]) {
      //     approvedUniversityDesignationFile[0] =
      //       strategicFunctionWorkload?.approvedUniversityDesignationFile?.[0]!;
      //     approvedUniversityDesignationFile[2] =
      //       strategicFunctionWorkload?.approvedUniversityDesignationFile?.[2]!;
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedUniversityDesignationFile
      //     });
      //   } else if (approvedUniversityDesignationFile[2]) {
      //     approvedUniversityDesignationFile[0] =
      //       strategicFunctionWorkload?.approvedUniversityDesignationFile?.[0]!;
      //     approvedUniversityDesignationFile[1] =
      //       strategicFunctionWorkload?.approvedUniversityDesignationFile?.[1]!;
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedUniversityDesignationFile
      //     });
      //   }
      // }
      // // COLEGE CAMPUS
      // if (
      //   approvedCollegeCampusDesignationFile.length !== 0 ||
      //   strategicFunctionWorkload?.approvedCollegeCampusDesignationFile
      //     ?.length! < approvedCollegeCampusDesignationFile.length
      // ) {
      //   if (
      //     approvedCollegeCampusDesignationFile[0] &&
      //     approvedCollegeCampusDesignationFile[1] &&
      //     approvedCollegeCampusDesignationFile[2]
      //   ) {
      //     setStrategicFunctionWorkload({
      //       approvedUniversityDesignationFile,
      //       approvedCollegeCampusDesignationFile
      //     });
      //   } else if (
      //     approvedCollegeCampusDesignationFile[0] &&
      //     approvedCollegeCampusDesignationFile[1]
      //   ) {
      //     approvedCollegeCampusDesignationFile[2] =
      //       strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[2]!;
      //     setStrategicFunctionWorkload({
      //       approvedUniversityDesignationFile,
      //       approvedCollegeCampusDesignationFile
      //     });
      //   } else if (
      //     approvedCollegeCampusDesignationFile[0] &&
      //     approvedCollegeCampusDesignationFile[2]
      //   ) {
      //     approvedCollegeCampusDesignationFile[1] =
      //       strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[1]!;
      //     setStrategicFunctionWorkload({
      //       approvedUniversityDesignationFile,
      //       approvedCollegeCampusDesignationFile
      //     });
      //   } else if (
      //     approvedCollegeCampusDesignationFile[1] &&
      //     approvedCollegeCampusDesignationFile[2]
      //   ) {
      //     approvedCollegeCampusDesignationFile[0] =
      //       strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[0]!;
      //     setStrategicFunctionWorkload({
      //       approvedUniversityDesignationFile,
      //       approvedCollegeCampusDesignationFile
      //     });
      //   } else if (approvedCollegeCampusDesignationFile[0]) {
      //     approvedCollegeCampusDesignationFile[1] =
      //       strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[1]!;
      //     approvedCollegeCampusDesignationFile[2] =
      //       strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[2]!;
      //     setStrategicFunctionWorkload({
      //       approvedUniversityDesignationFile,
      //       approvedCollegeCampusDesignationFile
      //     });
      //   } else if (approvedCollegeCampusDesignationFile[1]) {
      //     approvedCollegeCampusDesignationFile[0] =
      //       strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[0]!;
      //     approvedCollegeCampusDesignationFile[2] =
      //       strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[2]!;
      //     setStrategicFunctionWorkload({
      //       approvedUniversityDesignationFile,
      //       approvedCollegeCampusDesignationFile
      //     });
      //   } else if (approvedCollegeCampusDesignationFile[2]) {
      //     approvedCollegeCampusDesignationFile[0] =
      //       strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[0]!;
      //     approvedCollegeCampusDesignationFile[1] =
      //       strategicFunctionWorkload?.approvedCollegeCampusDesignationFile?.[1]!;
      //     setStrategicFunctionWorkload({
      //       approvedUniversityDesignationFile,
      //       approvedCollegeCampusDesignationFile
      //     });
      //   }
      // }
      setSteps(steps + 1);
    }
    if (steps === 2) {
      // DEPARTMENT CAMPUS
      // if (
      //   approvedDepartmentDesignationFile.length !== 0 ||
      //   strategicFunctionWorkload?.approvedDepartmentDesignationFile?.length! <
      //     approvedDepartmentDesignationFile.length
      // ) {
      //   if (
      //     approvedDepartmentDesignationFile[0] &&
      //     approvedDepartmentDesignationFile[1] &&
      //     approvedDepartmentDesignationFile[2]
      //   ) {
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedDepartmentDesignationFile
      //     });
      //   } else if (
      //     approvedDepartmentDesignationFile[0] &&
      //     approvedDepartmentDesignationFile[1]
      //   ) {
      //     approvedDepartmentDesignationFile[2] =
      //       strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[2]!;
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedDepartmentDesignationFile
      //     });
      //   } else if (
      //     approvedDepartmentDesignationFile[0] &&
      //     approvedDepartmentDesignationFile[2]
      //   ) {
      //     approvedDepartmentDesignationFile[1] =
      //       strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[1]!;
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedDepartmentDesignationFile
      //     });
      //   } else if (
      //     approvedDepartmentDesignationFile[1] &&
      //     approvedDepartmentDesignationFile[2]
      //   ) {
      //     approvedDepartmentDesignationFile[0] =
      //       strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[0]!;
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedDepartmentDesignationFile
      //     });
      //   } else if (approvedDepartmentDesignationFile[0]) {
      //     approvedDepartmentDesignationFile[1] =
      //       strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[1]!;
      //     approvedDepartmentDesignationFile[2] =
      //       strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[2]!;
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedDepartmentDesignationFile
      //     });
      //   } else if (approvedDepartmentDesignationFile[1]) {
      //     approvedDepartmentDesignationFile[0] =
      //       strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[0]!;
      //     approvedDepartmentDesignationFile[2] =
      //       strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[2]!;
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedDepartmentDesignationFile
      //     });
      //   } else if (approvedDepartmentDesignationFile[2]) {
      //     approvedDepartmentDesignationFile[0] =
      //       strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[0]!;
      //     approvedDepartmentDesignationFile[1] =
      //       strategicFunctionWorkload?.approvedDepartmentDesignationFile?.[1]!;
      //     setStrategicFunctionWorkload({
      //       ...strategicFunctionWorkload,
      //       approvedDepartmentDesignationFile
      //     });
      //   }
      // }
      // setDesignationDepartmentLevel(
      //   [
      //     departmentDesignation1,
      //     departmentDesignation2,
      //     departmentDesignation3,
      //     departmentLevelInputDesignation
      //   ].filter(Boolean)
      // );
      setIsSubmitting(true);
    }
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
            designationUniversity1?.title!,
            designationUniversity2?.title!,
            designationUniversity3?.title!,
            designationUniversity4?.title!
          ].filter(Boolean),
          designationUniversityLevelFiles: [
            designationUniversity1?.file!,
            designationUniversity2?.file!,
            designationUniversity3?.file!,
            designationUniversity4?.file!
          ],
          designationCollegeCampusLevel: [
            collegeCampusDesignation1?.title!,
            collegeCampusDesignation2?.title!,
            collegeCampusDesignation3?.title!,
            collegeCampusDesignation4?.title!
          ].filter(Boolean),
          designationCollegeCampusLevelFiles: [
            collegeCampusDesignation1?.file!,
            collegeCampusDesignation2?.file!,
            collegeCampusDesignation3?.file!,
            collegeCampusDesignation4?.file!
          ],
          designationAsSportTrainorAcademic: sportsSocio,
          designationAsMemberOfAdhoc: memberUniversity,
          academicAdvisees: academicAdviser
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
        } catch (e) {
          console.log(e);
        }
        setIsSubmitting(false);
      }
    })();
  }, [strategicFunctionWorkload]);

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
              universityLevelInputDesignation={designationUniversity4?.title}
              displayDesignationUniversity1={designationUniversity1?.title}
              displayDesignationUniversity2={designationUniversity2?.title}
              displayDesignationUniversity3={designationUniversity3?.title}
              onCollegeCampusLevelSelect1={onSelectCollegeCampusDesignation1}
              onCollegeCampusLevelSelect2={onSelectCollegeCampusDesignation2}
              onCollegeCampusLevelSelect3={onSelectCollegeCampusDesignation3}
              textInputCollegeCampusLevel4={textInputCollegeCampusDesignation4}
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
          )}
          {steps === 2 && (
            <StrategicFunction2
              onSelectDepartmentDesignation1={onSelectDepartmentDesignation1}
              onSelectDepartmentDesignation2={onSelectDepartmentDesignation2}
              onSelectDepartmentDesignation3={onSelectDepartmentDesignation3}
              textInputDepartmentDesignation4={textInputDepartmentDesignation4}
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
              onTextInputSportsSocioDesignationTitle={textInputTitleSportsSocio}
              onTextInputSportsSocioDesignationPoints={
                textInputPointsSportsSocio
              }
              sportsSocioTitle={sportsSocio?.title}
              sportsSocioPoints={sportsSocio?.points}
              fileHandlerSportsSocio={fileHandlerSportsSocio}
              fileNameSportsSocio={sportsSocio?.file?.name}
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
            />
          )}
          <Buttons>
            {steps > 1 && (
              <ButtonContainer>
                <FormButton
                  text="Back"
                  onClicked={() => setSteps(steps - 1)}
                ></FormButton>
              </ButtonContainer>
            )}
            <ButtonContainer>
              <FormButton
                text={steps !== 2 ? "Next" : "Submit"}
                onClicked={onNextSubmit}
                isSubmitting={isSubmitting}
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
