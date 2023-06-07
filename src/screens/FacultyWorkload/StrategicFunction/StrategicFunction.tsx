import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FormButton from "../../../components/FormButton";
import { StrategicFunctionType } from "../../../types/StrategicFunction";
import { SaveStrategicFunctionWorkload } from "../../../lib/faculty-workload.hooks";
import TopNav from "../../../components/TopNav";
import Menu from "../../../components/Menu";
import ProfileTab from "../../../components/ProfileTab";
import ScreenTitle from "../../../components/ScreenTitle";
import StrategicFunction1 from "./StrategicFunction1";
import StrategicFunction2 from "./StrategicFunction2";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import { useNavigate } from "react-router-dom";
import { Confirm } from "semantic-ui-react";
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

type AcademicAdviserType = {
  numberOfStudents?: string;
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

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isFacultySubmenuOpen, setIsFacultySubmenuOpen] = useState(false);

  const [sportsSocio, setSportsSocio] = useState<DesignationWithPoints>();
  const [sportsSocio1, setSportsSocio1] = useState<DesignationWithPoints>();
  const [sportsSocio2, setSportsSocio2] = useState<DesignationWithPoints>();
  const [memberUniversity, setMemberUniversity] =
    useState<DesignationWithPoints>();
  const [memberUniversity1, setMemberUniversity1] =
    useState<DesignationWithPoints>();
  const [memberUniversity2, setMemberUniversity2] =
    useState<DesignationWithPoints>();
  const [academicAdviser, setAcademicAdviser] = useState<AcademicAdviserType>();

  const [isConfirming, setIsConfirming] = useState(false);

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

  const [numberOfStudents, setNumberOfStudents] = useState("");

  const navigate = useNavigate();

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
    setDesignationUniversity4({
      ...designationUniversity4,
      title: value
    });
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
    setCollegeCampusDesignation4({
      ...collegeCampusDesignation4,
      title: value
    });
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
    setDepartmentDesignation4({
      ...departmentDesignation4,
      title: value
    });
  };

  const textInputTitleSportsSocio = (value: string) => {
    setSportsSocio({
      ...sportsSocio,
      title: value
    });
  };

  const textInputTitleSportsSocio1 = (value: string) => {
    setSportsSocio1({
      ...sportsSocio1,
      title: value
    });
  };

  const textInputTitleSportsSocio2 = (value: string) => {
    setSportsSocio2({
      ...sportsSocio2,
      title: value
    });
  };

  const textInputPointsSportsSocio = (value: string) => {
    setSportsSocio({
      ...sportsSocio,
      points: value
    });
  };

  const textInputPointsSportsSocio1 = (value: string) => {
    setSportsSocio1({
      ...sportsSocio1,
      points: value
    });
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

  const fileHandlerSportsSocio2 = (value?: File) => {
    setSportsSocio2({
      ...sportsSocio2,
      file: value
    });
  };

  useEffect(() => {
    if (sportsSocio?.title && sportsSocio.file) {
      let designationPoints;
      if (sportsSocio.title === DROPDOWN_LISTS.DESIGNATION_SPORTS_TRAINOR[1]) {
        designationPoints = "5";
      } else {
        designationPoints = "3";
      }
      setSportsSocio({
        ...sportsSocio,
        points: designationPoints
      });
    }
  }, [sportsSocio]);

  useEffect(() => {
    if (sportsSocio1?.title && sportsSocio1.file) {
      let designationPoints;
      if (sportsSocio1.title === DROPDOWN_LISTS.DESIGNATION_SPORTS_TRAINOR[1]) {
        designationPoints = "5";
      } else {
        designationPoints = "3";
      }
      setSportsSocio1({
        ...sportsSocio1,
        points: designationPoints
      });
    }
  }, [sportsSocio1]);

  useEffect(() => {
    if (sportsSocio2?.title && sportsSocio2.file) {
      let designationPoints;
      if (sportsSocio2.title === DROPDOWN_LISTS.DESIGNATION_SPORTS_TRAINOR[1]) {
        designationPoints = "5";
      } else {
        designationPoints = "3";
      }
      setSportsSocio2({
        ...sportsSocio2,
        points: designationPoints
      });
    }
  }, [sportsSocio2]);

  const textInputTitleMemberUniversity = (value: string) => {
    setMemberUniversity({
      ...memberUniversity,
      title: value
    });
  };

  const textInputTitleMemberUniversity1 = (value: string) => {
    setMemberUniversity1({
      ...memberUniversity1,
      title: value
    });
  };

  const textInputTitleMemberUniversity2 = (value: string) => {
    setMemberUniversity2({
      ...memberUniversity2,
      title: value
    });
  };

  const textInputPointsMemberUniversity = (value: string) => {
    setMemberUniversity({
      ...memberUniversity,
      points: value
    });
  };

  const textInputPointsMemberUniversity1 = (value: string) => {
    setMemberUniversity1({
      ...memberUniversity1,
      points: value
    });
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

  const fileHandlerMemberUniversity2 = (value?: File) => {
    setMemberUniversity2({
      ...memberUniversity2,
      file: value
    });
  };

  useEffect(() => {
    if (memberUniversity?.title && memberUniversity.file) {
      setMemberUniversity({
        ...memberUniversity,
        points: "0.05"
      });
    }
  }, [memberUniversity]);

  useEffect(() => {
    if (memberUniversity1?.title && memberUniversity1.file) {
      setMemberUniversity1({
        ...memberUniversity1,
        points: "0.05"
      });
    }
  }, [memberUniversity1]);

  useEffect(() => {
    if (memberUniversity2?.title && memberUniversity2.file) {
      setMemberUniversity2({
        ...memberUniversity2,
        points: "0.05"
      });
    }
  }, [memberUniversity2]);

  const textInputTitleAcademicAdviser = (value: string) => {
    console.log(value);
    setAcademicAdviser({
      ...academicAdviser,
      numberOfStudents: value
    });
  };

  const fileHandlerAcademicAdviser = (value?: File) => {
    setAcademicAdviser({
      ...academicAdviser,
      file: value
    });
  };

  const onNextSubmit = () => {
    setIsSubmitting(true);
  };

  useEffect(() => {
    (async () => {
      if (isSubmitting) {
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
          designationAsSportTrainorAcademic1: sportsSocio1?.title,
          designationAsSportTrainorAcademic2: sportsSocio2?.title,
          designationAsSportTrainorAcademicFile: sportsSocio?.file,
          designationAsSportTrainorAcademicFile1: sportsSocio1?.file,
          designationAsSportTrainorAcademicFile2: sportsSocio2?.file,
          designationAsSportTrainorAcademicPoints: Number(sportsSocio?.points),
          designationAsSportTrainorAcademicPoints1: Number(
            sportsSocio1?.points
          ),
          designationAsSportTrainorAcademicPoints2: Number(
            sportsSocio2?.points
          ),
          designationAsMemberOfAdhoc: memberUniversity?.title,
          designationAsMemberOfAdhoc1: memberUniversity1?.title,
          designationAsMemberOfAdhoc2: memberUniversity2?.title,
          designationAsMemberOfAdhocFile: memberUniversity?.file,
          designationAsMemberOfAdhocFile1: memberUniversity1?.file,
          designationAsMemberOfAdhocFile2: memberUniversity2?.file,
          designationAsMemberOfAdhocPoints: Number(memberUniversity?.points),
          designationAsMemberOfAdhocPoints1: Number(memberUniversity1?.points),
          designationAsMemberOfAdhocPoints2: Number(memberUniversity2?.points),
          academicAdvisees: academicAdviser?.numberOfStudents,
          academicAdviseesFile: academicAdviser?.file,
          academicAdviseesPoints:
            Number(academicAdviser?.numberOfStudents) * 0.023
        });
      }
    })();
  }, [isSubmitting]);

  const clearStates = () => {
    setStrategicFunctionWorkload({});
    setPoints(0);
    setIsDesignationUniversity1Fullfill(false);
    setIsDesignationUniversity2Fullfill(false);
    setIsDesignationUniversity3Fullfill(false);
    setIsDesignationUniversity4Fullfill(false);
    setIsDesignationCollegeCampus1Fullfill(false);
    setIsDesignationCollegeCampus2Fullfill(false);
    setIsDesignationCollegeCampus3Fullfill(false);
    setIsDesignationCollegeCampus4Fullfill(false);
    setIsDesignationDepartment1Fullfill(false);
    setIsDesignationDepartment2Fullfill(false);
    setIsDesignationDepartment3Fullfill(false);
    setIsDesignationDepartment4Fullfill(false);
    setIsProfileOpen(false);
    setIsSubmitting(false);
    setIsFacultySubmenuOpen(false);
    setSportsSocio({});
    setSportsSocio1({});
    setSportsSocio2({});
    setMemberUniversity({});
    setMemberUniversity1({});
    setMemberUniversity2({});
    setAcademicAdviser({});
    setDesignationUniversity1({});
    setDesignationUniversity2({});
    setDesignationUniversity3({});
    setDesignationUniversity4({});
    setCollegeCampusDesignation1({});
    setCollegeCampusDesignation2({});
    setCollegeCampusDesignation3({});
    setCollegeCampusDesignation4({});
    setDepartmentDesignation1({});
    setDepartmentDesignation2({});
    setDepartmentDesignation3({});
    setDepartmentDesignation4({});
  };

  useEffect(() => {
    (async () => {
      if (isSubmitting) {
        try {
          await SaveStrategicFunctionWorkload(strategicFunctionWorkload);
          // window.location.reload();
          clearStates();
          navigate("/strategic-function-workload", { replace: true });
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

  const hasSportsSocio2 =
    sportsSocio2?.points && sportsSocio2?.file && sportsSocio2?.title;

  const hasMemberUniversity =
    memberUniversity?.points &&
    memberUniversity?.file &&
    memberUniversity?.title;

  const hasMemberUniversity1 =
    memberUniversity1?.points &&
    memberUniversity1?.file &&
    memberUniversity1?.title;

  const hasMemberUniversity2 =
    memberUniversity2?.points &&
    memberUniversity2?.file &&
    memberUniversity2?.title;

  const hasAcademicAdviser =
    academicAdviser?.numberOfStudents && academicAdviser?.file;

  return (
    <MainContainer>
      <Confirm
        open={isConfirming}
        onCancel={() => setIsConfirming(false)}
        onConfirm={onNextSubmit}
        content="Confirm submission?"
        size="large"
      />
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
          <ScreenTitle title="Faculty Workload" />
          {/* <ScreenTitle title="Strategic Functions (SF)" /> */}
          <Container>
            <>
              <WorkloadTextContainer>
                <WorkloadText>{WorkloadType.STRATEGIC_FUNCTION}</WorkloadText>
              </WorkloadTextContainer>
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
                onTextInputSportsSocioDesignationTitle2={
                  textInputTitleSportsSocio2
                }
                sportsSocioTitle2={sportsSocio2?.title}
                sportsSocioPoints2={sportsSocio2?.points}
                fileHandlerSportsSocio2={fileHandlerSportsSocio2}
                fileNameSportsSocio2={sportsSocio2?.file?.name}
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
                onTextInputMemberUniversityWideDesignationTitle2={
                  textInputTitleMemberUniversity2
                }
                onTextInputMemberUniversityWideDesignationPoints1={
                  textInputPointsMemberUniversity1
                }
                memberUniversityTitle1={memberUniversity1?.title}
                memberUniversityTitle2={memberUniversity2?.title}
                memberUniversityPoints1={memberUniversity1?.points}
                memberUniversityPoints2={memberUniversity2?.points}
                fileHandlerMemberUniversity1={fileHandlerMemberUniversity1}
                fileHandlerMemberUniversity2={fileHandlerMemberUniversity2}
                fileNameMemberUniversity1={memberUniversity1?.file?.name}
                fileNameMemberUniversity2={memberUniversity2?.file?.name}
                onTextInputAcademicAdviserDesignationTitle={
                  textInputTitleAcademicAdviser
                }
                academicAdviserTitle={academicAdviser?.numberOfStudents}
                academicAdviserPoints={academicAdviser?.numberOfStudents}
                fileHandlerAcademicAdviser={fileHandlerAcademicAdviser}
                fileNameAcademicAdviser={academicAdviser?.file?.name}
                universityWidePoints={memberUniversity?.points}
                universityWidePoints1={memberUniversity1?.points}
                universityWidePoints2={memberUniversity2?.points}
              />
            </>
            <FormFooterContainer>
              <Buttons>
                <ButtonContainer>
                  <div>
                    <Label style={{ fontWeight: "bold" }}>
                      {hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasSportsSocio2 &&
                        hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio?.points) +
                          Number(memberUniversity?.points)
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        !hasSportsSocio2 &&
                        hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio?.points) +
                          Number(sportsSocio1?.points) +
                          Number(memberUniversity?.points)
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasSportsSocio2 &&
                        hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio?.points) +
                          Number(sportsSocio1?.points) +
                          Number(sportsSocio2?.points) +
                          Number(memberUniversity?.points)
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasSportsSocio2 &&
                        hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio?.points) +
                          Number(sportsSocio1?.points) +
                          Number(sportsSocio2?.points) +
                          Number(memberUniversity?.points) +
                          Number(memberUniversity1?.points)
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasSportsSocio2 &&
                        hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio?.points) +
                          Number(sportsSocio1?.points) +
                          Number(sportsSocio2?.points) +
                          Number(memberUniversity?.points) +
                          Number(memberUniversity1?.points) +
                          Number(memberUniversity2?.points)
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasSportsSocio2 &&
                        hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio?.points) +
                          Number(sportsSocio1?.points) +
                          Number(sportsSocio2?.points) +
                          Number(memberUniversity?.points) +
                          Number(memberUniversity1?.points) +
                          Number(memberUniversity2?.points) +
                          Number(academicAdviser.numberOfStudents) * 0.023
                        ).toFixed(2)}`}
                      {!hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasSportsSocio2 &&
                        hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(memberUniversity?.points) +
                          Number(memberUniversity1?.points) +
                          Number(academicAdviser.numberOfStudents) * 0.023
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        !hasSportsSocio2 &&
                        !hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio?.points) +
                          Number(sportsSocio1?.points)
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        !hasSportsSocio1 &&
                        hasSportsSocio2 &&
                        !hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio?.points) +
                          Number(sportsSocio2?.points)
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasSportsSocio2 &&
                        !hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio?.points) +
                          Number(sportsSocio1?.points) +
                          Number(sportsSocio2?.points)
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio?.points) +
                          Number(sportsSocio1?.points) +
                          Number(memberUniversity.points)
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        !hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio?.points) +
                          Number(sportsSocio1?.points) +
                          Number(memberUniversity1.points)
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points + Number(sportsSocio?.points)
                        ).toFixed(2)}`}
                      {!hasSportsSocio &&
                        hasSportsSocio1 &&
                        !hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points + Number(sportsSocio1?.points)
                        ).toFixed(2)}`}
                      {hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points + Number(memberUniversity.points)
                        ).toFixed(2)}`}
                      {!hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points + Number(memberUniversity1.points)
                        ).toFixed(2)}`}
                      {!hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        !hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points + Number(memberUniversity2.points)
                        ).toFixed(2)}`}
                      {!hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        !hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(memberUniversity2.points) +
                          Number(memberUniversity1.points)
                        ).toFixed(2)}`}
                      {hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        !hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(memberUniversity.points) +
                          Number(memberUniversity1.points)
                        ).toFixed(2)}`}
                      {hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        !hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(memberUniversity.points) +
                          Number(memberUniversity1.points) +
                          Number(memberUniversity2.points)
                        ).toFixed(2)}`}
                      {hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(memberUniversity.points) +
                          Number(memberUniversity1.points) +
                          Number(memberUniversity2.points) +
                          Number(sportsSocio.points)
                        ).toFixed(2)}`}
                      {hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        !hasSportsSocio &&
                        hasSportsSocio1 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(memberUniversity.points) +
                          Number(memberUniversity1.points) +
                          Number(memberUniversity2.points) +
                          Number(sportsSocio1.points)
                        ).toFixed(2)}`}
                      {hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        hasSportsSocio &&
                        hasSportsSocio1 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(memberUniversity.points) +
                          Number(memberUniversity1.points) +
                          Number(memberUniversity2.points) +
                          Number(sportsSocio1.points) +
                          Number(sportsSocio.points)
                        ).toFixed(2)}`}
                      {hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(memberUniversity.points) +
                          Number(memberUniversity1.points) +
                          Number(memberUniversity2.points) +
                          Number(sportsSocio1.points) +
                          Number(sportsSocio.points) +
                          Number(academicAdviser.numberOfStudents) * 0.023
                        ).toFixed(2)}`}
                      {hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        hasSportsSocio &&
                        hasSportsSocio1 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(memberUniversity.points) +
                          Number(memberUniversity1.points) +
                          Number(memberUniversity2.points) +
                          Number(sportsSocio1.points) +
                          Number(sportsSocio.points)
                        ).toFixed(2)}`}
                      {/* {hasAcademicAdviser &&
                        !hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        `Total Strategic Function Workload = ${
                          points + Number(academicAdviser.points)
                        }`} */}
                      {/* {!hasAcademicAdviser &&
                        !hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        `Total Strategic Function Workload = ${points}`} */}
                      {hasAcademicAdviser &&
                        !hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(academicAdviser.numberOfStudents) * 0.023
                        ).toFixed(2)}`}
                      {hasAcademicAdviser &&
                        hasSportsSocio &&
                        !hasSportsSocio1 &&
                        !hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(academicAdviser.numberOfStudents) * 0.023 +
                          Number(sportsSocio.points)
                        ).toFixed(2)}`}
                      {hasAcademicAdviser &&
                        !hasSportsSocio &&
                        hasSportsSocio1 &&
                        !hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(academicAdviser.numberOfStudents) * 0.023 +
                          Number(sportsSocio1.points)
                        ).toFixed(2)}`}
                      {hasAcademicAdviser &&
                        hasSportsSocio &&
                        hasSportsSocio1 &&
                        !hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(academicAdviser.numberOfStudents) * 0.023 +
                          Number(sportsSocio1.points) +
                          Number(sportsSocio.points)
                        ).toFixed(2)}`}
                      {hasAcademicAdviser &&
                        hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(academicAdviser.numberOfStudents) * 0.023 +
                          Number(sportsSocio1.points) +
                          Number(sportsSocio.points) +
                          Number(memberUniversity.points)
                        ).toFixed(2)}`}
                      {hasAcademicAdviser &&
                        hasSportsSocio &&
                        hasSportsSocio1 &&
                        !hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(academicAdviser.numberOfStudents) * 0.023 +
                          Number(sportsSocio1.points) +
                          Number(sportsSocio.points) +
                          Number(memberUniversity1.points) +
                          Number(memberUniversity2.points)
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio.points) +
                          Number(sportsSocio1.points) +
                          Number(memberUniversity?.points) +
                          Number(memberUniversity1?.points) +
                          Number(memberUniversity2?.points) +
                          Number(academicAdviser.numberOfStudents) * 0.023
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio.points) +
                          Number(sportsSocio1.points) +
                          Number(memberUniversity?.points) +
                          Number(memberUniversity1?.points) +
                          Number(memberUniversity2?.points) +
                          Number(academicAdviser.numberOfStudents) * 0.023
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        !hasAcademicAdviser &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio.points) +
                          Number(sportsSocio1.points) +
                          Number(memberUniversity?.points) +
                          Number(memberUniversity1?.points) +
                          Number(memberUniversity2?.points)
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasAcademicAdviser &&
                        !hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio.points) +
                          Number(sportsSocio1.points) +
                          Number(academicAdviser.numberOfStudents) * 0.023
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasAcademicAdviser &&
                        hasMemberUniversity &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio.points) +
                          Number(sportsSocio1.points) +
                          Number(academicAdviser.numberOfStudents) * 0.023 +
                          Number(memberUniversity?.points)
                        ).toFixed(2)}`}
                      {hasSportsSocio &&
                        hasSportsSocio1 &&
                        hasAcademicAdviser &&
                        !hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(sportsSocio.points) +
                          Number(sportsSocio1.points) +
                          Number(academicAdviser.numberOfStudents) * 0.023 +
                          Number(memberUniversity1?.points) +
                          Number(memberUniversity2?.points)
                        ).toFixed(2)}`}
                      {hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        hasAcademicAdviser &&
                        !hasSportsSocio &&
                        !hasSportsSocio1 &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(memberUniversity?.points) +
                          Number(memberUniversity1?.points) +
                          Number(memberUniversity2?.points) +
                          Number(academicAdviser.numberOfStudents) * 0.023
                        ).toFixed(2)}`}
                      {hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        hasAcademicAdviser &&
                        hasSportsSocio &&
                        !hasSportsSocio1 &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(memberUniversity?.points) +
                          Number(memberUniversity1?.points) +
                          Number(memberUniversity2?.points) +
                          Number(academicAdviser.numberOfStudents) * 0.023 +
                          Number(sportsSocio.points)
                        ).toFixed(2)}`}
                      {hasMemberUniversity &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        hasAcademicAdviser &&
                        !hasSportsSocio &&
                        hasSportsSocio1 &&
                        `Total Strategic Function Workload = ${
                          points +
                          Number(memberUniversity?.points) +
                          Number(memberUniversity1?.points) +
                          Number(memberUniversity2?.points) +
                          Number(academicAdviser.numberOfStudents) * 0.023 +
                          Number(sportsSocio1.points)
                        }`}
                      {!hasSportsSocio &&
                        !hasMemberUniversity &&
                        !hasAcademicAdviser &&
                        !hasSportsSocio1 &&
                        !hasMemberUniversity1 &&
                        !hasMemberUniversity2 &&
                        `Total Strategic Function Workload = ${points}`}
                      {!hasSportsSocio &&
                        !hasMemberUniversity &&
                        hasAcademicAdviser &&
                        !hasSportsSocio1 &&
                        hasMemberUniversity1 &&
                        hasMemberUniversity2 &&
                        `Total Strategic Function Workload = ${(
                          points +
                          Number(memberUniversity1.points) +
                          Number(memberUniversity2?.points) +
                          Number(academicAdviser.numberOfStudents) * 0.023
                        ).toFixed(2)}`}
                    </Label>
                  </div>
                  <FormButton
                    text="Submit"
                    onClicked={() => setIsConfirming(true)}
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px 0px 0px;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 80px;
  justify-content: flex-end;
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

const FooterContainer = styled.div`
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  z-index: 1;
`;

export default StrategicFunction;
