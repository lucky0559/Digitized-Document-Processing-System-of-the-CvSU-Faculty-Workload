import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Dropdown from "../../../components/Dropdown";
import Footer from "../../../components/Footer";
import FormButton from "../../../components/FormButton";
import Menu from "../../../components/Menu";
import ProfileTab from "../../../components/ProfileTab";
import ScreenTitle from "../../../components/ScreenTitle";
import TopNav from "../../../components/TopNav";
import Colors from "../../../constants/Colors";
import { DROPDOWN_LISTS, WorkloadType } from "../../../constants/Strings";
import {
  GetAllUserPendingWorkloads,
  SaveResearchWorkload
} from "../../../lib/faculty-workload.hooks";
import { ResearchWorkLoadType } from "../../../types/ResearchWorkLoad";
import { Designation } from "../StrategicFunction/StrategicFunction";
import ResearchWorkload1 from "./ResearchWorkload1";
import ResearchWorkload2 from "./ResearchWorkload2";
import { UserContext } from "../../../App";
import ResearchWorkload3 from "./ResearchWorkload3";
import { getRwlSavedWorkload } from "../../../lib/rwl.hooks";
import { WORKLOAD_STATUS } from "../../../enums/workloadEnums";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { CvsuFunded, ExternallyFunded } from "../../../types/Fund";
import FundedCvsu from "./CvsuFunded";
import FundedExternally from "./ExternallyFunded";

type ResearchWorkLoadProps = {
  UseLogout: () => void;
};

enum REDIRECT {
  EWL = 1,
  SFW,
  WS
}

const ResearchWorkload = ({ UseLogout }: ResearchWorkLoadProps) => {
  const [researchWorkLoad, setResearchWorkLoad] =
    useState<ResearchWorkLoadType>();

  const [cvsuFunded1, setCvsuFunded1] = useState<CvsuFunded>();
  const [cvsuFunded2, setCvsuFunded2] = useState<CvsuFunded>();
  const [cvsuFunded3, setCvsuFunded3] = useState<CvsuFunded>();
  const [cvsuFunded4, setCvsuFunded4] = useState<CvsuFunded>();
  const [cvsuFunded5, setCvsuFunded5] = useState<CvsuFunded>();

  const [externalFunded1, setExternalFunded1] = useState<ExternallyFunded>();
  const [externalFunded2, setExternalFunded2] = useState<ExternallyFunded>();
  const [externalFunded3, setExternalFunded3] = useState<ExternallyFunded>();
  const [externalFunded4, setExternalFunded4] = useState<ExternallyFunded>();
  const [externalFunded5, setExternalFunded5] = useState<ExternallyFunded>();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [titleOfStudyCvsu, setTitleOfStudyCvsu] = useState("");
  const [titleOfStudyExternally, setTitleOfStudyExternally] = useState("");
  const [fundingOfStudy, setFundingOfStudy] = useState<string | undefined>("");
  const [fundDisplay, setFundDisplay] = useState<string | undefined>("");
  const [typeOfStudy, setTypeOfStudy] = useState("");
  const [designationStudy, setDesignationStudy] = useState<string | undefined>(
    ""
  );
  const [designationStudyDisplay, setDesignationStudyDisplay] = useState<
    string | undefined
  >("");
  const [typeOfStudyDisplay, setTypeOfStudyDisplay] = useState<
    string | undefined
  >("");
  const [rwlFile, setRwlFile] = useState<File>();
  const [rwlFile1, setRwlFile1] = useState<File>();
  const [fundGenerated, setFundGenerated] = useState<string | undefined>("");
  const [fundGeneratedDisplay, setFundGeneratedDisplay] = useState<
    string | undefined
  >("");

  const [steps, setSteps] = useState(1);

  const [points, setPoints] = useState(0);

  const fundingStudy = (fundingStudyValue?: string) => {
    fundingOfStudyHandler(fundingStudyValue);
  };

  const navigate = useNavigate();

  const [isAddStudy, setIsAddStudy] = useState(false);

  const [studyCvsuPoints, setStudyCvsuPoints] = useState(0);
  const [studyExternallyPoints, setStudyExternallyPoints] = useState(0);
  const [studyPoints, setStudyPoints] = useState(0);

  const [fundGeneratedPoints, setFundGeneratedPoints] = useState(0);

  const { user, actions } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const [isAdding, setIsAdding] = useState(false);

  // const researchWorkLoadHandler = () => {
  // if (!!fundingOfStudy?.length || fundDisplay) {
  //   setResearchWorkLoad({
  //     ...researchWorkLoad,
  //     titleOfStudy,
  //     fundingOfStudy: fundingOfStudy || fundDisplay
  //   });
  // }
  // };

  // useEffect(() => {
  //   if (fundDisplay !== researchWorkLoad?.fundingOfStudy) {
  //     setResearchWorkLoad({
  //       ...researchWorkLoad,
  //       fundingOfStudy: fundDisplay || fundingOfStudy
  //     });
  //   }
  //   if (researchWorkLoad?.fundingOfStudy) {
  //     setFundDisplay(researchWorkLoad?.fundingOfStudy);
  //   } else {
  //     setFundDisplay(fundingOfStudy);
  //   }
  // }, [fundingOfStudy]);

  const titleOfStudyCvsuHandler = (value: string) => {
    setTitleOfStudyCvsu(value);
  };

  const titleOfStudyExternallyHandler = (value: string) => {
    setTitleOfStudyExternally(value);
  };

  const fundingOfStudyHandler = (value?: string) => {
    setFundingOfStudy(value);
  };

  // const backHandler = () => {
  //   if (steps === 2) {
  //     if (designationStudy || designationStudyDisplay) {
  //       setResearchWorkLoad({
  //         ...researchWorkLoad,
  //         typeOfStudy,
  //         designationStudy: designationStudy || designationStudyDisplay,
  //         rwlFile
  //       });
  //     } else {
  //       setResearchWorkLoad({
  //         typeOfStudy,
  //         designationStudy: designationStudy || designationStudyDisplay,
  //         rwlFile,
  //         ...researchWorkLoad
  //       });
  //     }
  //     setSteps(1);
  //   }

  //   if (steps === 3) {
  //     if (fundGenerated || fundGeneratedDisplay) {
  //       setResearchWorkLoad({
  //         ...researchWorkLoad,
  //         fundGenerated: fundGenerated || fundGeneratedDisplay,
  //         rwlFile1
  //       });
  //     } else {
  //       setResearchWorkLoad({
  //         fundGenerated: fundGenerated || fundGeneratedDisplay,
  //         rwlFile1,
  //         ...researchWorkLoad
  //       });
  //     }
  //     setSteps(1);
  //   }

  //   if (steps === 4) {
  //     setResearchWorkLoad(undefined);
  //     setStudy1(undefined);
  //     setStudy2(undefined);
  //     setStudy3(undefined);
  //     setStudy4(undefined);
  //     setStudy1Points(0);
  //     setStudy2Points(0);
  //     setStudy3Points(0);
  //     setStudy4Points(0);
  //     setSteps(1);
  //   }
  // };

  // const researchWorkLoadHandler1 = () => {
  //   if (designationStudy || designationStudyDisplay) {
  //     setResearchWorkLoad({
  //       ...researchWorkLoad,
  //       typeOfStudy,
  //       designationStudy: designationStudy || designationStudyDisplay,
  //       rwlFile: rwlFile
  //     });
  //   } else {
  //     setResearchWorkLoad({
  //       typeOfStudy,
  //       designationStudy: designationStudy || designationStudyDisplay,
  //       rwlFile: rwlFile,
  //       ...researchWorkLoad
  //     });
  //   }
  // };

  // const saveWorkloadHandler = async () => {
  //   if (rwl1) {
  //     console.log(rwl1);

  //     await SaveResearchWorkload(rwl1, WORKLOAD_STATUS.SAVE);
  //   }
  //   if (rwl2) {
  //     console.log(rwl2);
  //     await SaveResearchWorkload(rwl2, WORKLOAD_STATUS.SAVE);
  //   }
  //   if (rwl3) {
  //     console.log(rwl3);
  //     await SaveResearchWorkload(rwl3, WORKLOAD_STATUS.SAVE);
  //   }
  //   if (rwl4) {
  //     console.log(rwl4);
  //     await SaveResearchWorkload(rwl4, WORKLOAD_STATUS.SAVE);
  //   }
  //   if (rwl5) {
  //     console.log(rwl5);
  //     await SaveResearchWorkload(rwl5, WORKLOAD_STATUS.SAVE);
  //   }
  // };

  // useEffect(() => {
  //   if (
  //     (designationStudy || designationStudyDisplay) !==
  //     researchWorkLoad?.designationStudy
  //   ) {
  //     setResearchWorkLoad({
  //       ...researchWorkLoad,
  //       typeOfStudy,
  //       designationStudy: designationStudyDisplay || designationStudy
  //     });
  //   }
  //   if (researchWorkLoad?.designationStudy) {
  //     setDesignationStudyDisplay(researchWorkLoad?.designationStudy);
  //   } else {
  //     setDesignationStudyDisplay(designationStudy);
  //   }
  // }, [designationStudy, designationStudyDisplay]);

  // useEffect(() => {
  //   if ((typeOfStudyDisplay) !== typeOfStudy) {
  //     setResearchWorkLoad({
  //       ...researchWorkLoad,
  //       designationStudy,
  //       typeOfStudy: typeOfStudyDisplay || typeOfStudy
  //     });
  //   }
  //   if (researchWorkLoad?.typeOfStudy) {
  //     setTypeOfStudyDisplay(researchWorkLoad?.typeOfStudy);
  //   } else {
  //     setTypeOfStudyDisplay(typeOfStudy);
  //   }
  // }, [typeOfStudy, typeOfStudyDisplay]);

  const designationStudyHandler = (value?: string) => {
    setDesignationStudy(value);
  };

  const typeOfStudyHandler = (value: string) => {
    setTypeOfStudy(value);
  };

  const rwlFileHandler = (value?: File) => {
    setRwlFile(value);
  };

  // useEffect(() => {
  //   setResearchWorkLoad({
  //     ...researchWorkLoad,
  //     rwlFile
  //   });
  // }, [rwlFile]);

  // useEffect(() => {
  //   setResearchWorkLoad({
  //     ...researchWorkLoad,
  //     rwlFile1
  //   });
  // }, [rwlFile1]);

  // const researchWorkLoadHandler2 = () => {
  //   if (fundGenerated || fundGeneratedDisplay) {
  //     setResearchWorkLoad({
  //       ...researchWorkLoad,
  //       fundGenerated: fundGenerated || fundGeneratedDisplay,
  //       rwlFile1
  //     });
  //   } else {
  //     setResearchWorkLoad({
  //       fundGenerated: fundGenerated || fundGeneratedDisplay,
  //       rwlFile1,
  //       ...researchWorkLoad
  //     });
  //   }
  //   setSteps(steps + 1);
  // };

  const fundGeneratedHandler = (value?: string) => {
    setFundGenerated(value);
  };

  const rwlFile1Handler = (value?: File) => {
    setRwlFile1(value);
  };

  // useEffect(() => {
  //   if (
  //     (fundGeneratedDisplay || fundGenerated) !==
  //     researchWorkLoad?.fundGenerated
  //   ) {
  //     setResearchWorkLoad({
  //       ...researchWorkLoad,
  //       fundGenerated: fundGeneratedDisplay || fundGenerated
  //     });
  //   }
  // }, [fundGenerated, fundGeneratedDisplay]);

  const researchWorkLoadHandler = () => {
    // setIsAddStudy(isAddStudy);

    // CVSU FUNDED
    if (!cvsuFunded1) {
      setCvsuFunded1({
        title: titleOfStudyCvsu,
        typeOfStudy: typeOfStudy,
        designationStudy: designationStudy!,
        file: rwlFile,
        points: studyCvsuPoints
      });
    } else if (!cvsuFunded2) {
      setCvsuFunded2({
        title: titleOfStudyCvsu,
        typeOfStudy: typeOfStudy,
        designationStudy: designationStudy!,
        file: rwlFile,
        points: studyCvsuPoints
      });
    } else if (!cvsuFunded3) {
      setCvsuFunded3({
        title: titleOfStudyCvsu,
        typeOfStudy: typeOfStudy,
        designationStudy: designationStudy!,
        file: rwlFile,
        points: studyCvsuPoints
      });
    } else if (!cvsuFunded4) {
      setCvsuFunded4({
        title: titleOfStudyCvsu,
        typeOfStudy: typeOfStudy,
        designationStudy: designationStudy!,
        file: rwlFile,
        points: studyCvsuPoints
      });
    } else if (!cvsuFunded5) {
      setCvsuFunded5({
        title: titleOfStudyCvsu,
        typeOfStudy: typeOfStudy,
        designationStudy: designationStudy!,
        file: rwlFile,
        points: studyCvsuPoints
      });
    }

    // EXTERNALLY FUNDED
    if (!externalFunded1) {
      setExternalFunded1({
        title: titleOfStudyExternally,
        fundGenerated: fundGenerated!,
        file: rwlFile1,
        points: studyExternallyPoints
      });
    } else if (!externalFunded2) {
      setExternalFunded2({
        title: titleOfStudyExternally,
        fundGenerated: fundGenerated!,
        file: rwlFile1,
        points: studyExternallyPoints
      });
    } else if (!externalFunded3) {
      setExternalFunded3({
        title: titleOfStudyExternally,
        fundGenerated: fundGenerated!,
        file: rwlFile1,
        points: studyExternallyPoints
      });
    } else if (!externalFunded4) {
      setExternalFunded4({
        title: titleOfStudyExternally,
        fundGenerated: fundGenerated!,
        file: rwlFile1,
        points: studyExternallyPoints
      });
    } else if (!externalFunded5) {
      setExternalFunded5({
        title: titleOfStudyExternally,
        fundGenerated: fundGenerated!,
        file: rwlFile1,
        points: studyExternallyPoints
      });
    }
  };

  useEffect(() => {
    if (!isAdding) {
      setResearchWorkLoad({
        ...researchWorkLoad,
        disseminatedResearch: [
          (study1?.filename || study1?.file!) && study1?.title!,
          (study2?.filename || study2?.file!) && study2?.title!,
          (study3?.filename || study3?.file!) && study3?.title!,
          (study4?.filename || study4?.file!) && study4?.title!
        ].filter(Boolean),
        disseminatedResearchFiles: [
          study1?.file!,
          study2?.file!,
          study3?.file!,
          study4?.file!
        ],
        cvsuFunded: [
          cvsuFunded1!,
          cvsuFunded2!,
          cvsuFunded3!,
          cvsuFunded4!,
          cvsuFunded5!
        ].filter(Boolean),
        externallyFunded: [
          externalFunded1!,
          externalFunded2!,
          externalFunded3!,
          externalFunded4!,
          externalFunded5!
        ].filter(Boolean),
        cvsuFundedFilenames: [
          cvsuFunded1?.file?.name!,
          cvsuFunded2?.file?.name!,
          cvsuFunded3?.file?.name!,
          cvsuFunded4?.file?.name!,
          cvsuFunded5?.file?.name!
        ].filter(Boolean),
        externallyFundedFilenames: [
          externalFunded1?.file?.name!,
          externalFunded2?.file?.name!,
          externalFunded3?.file?.name!,
          externalFunded4?.file?.name!,
          externalFunded5?.file?.name!
        ].filter(Boolean)
      });
      setIsSubmitting(true);
    }
    setIsAdding(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cvsuFunded1,
    cvsuFunded2,
    cvsuFunded3,
    cvsuFunded4,
    cvsuFunded5,
    externalFunded1,
    externalFunded2,
    externalFunded3,
    externalFunded4,
    externalFunded5
  ]);

  useEffect(() => {
    (async () => {
      if (isSubmitting) {
        // if (
        //   !!titleOfStudyCvsu.length &&
        //   fundingOfStudy &&
        //   typeOfStudy &&
        //   (designationStudy || designationStudyDisplay)
        // ) {
        //   let designationStudyPoints;

        //   if (
        //     designationStudy === "Program Leader/Co-Program Leader" ||
        //     designationStudyDisplay === "Program Leader/Co-Program Leader"
        //   ) {
        //     designationStudyPoints = 9;
        //   } else if (
        //     designationStudy === "Project Leader/Co-Project Leader" ||
        //     designationStudyDisplay === "Project Leader/Co-Project Leader"
        //   ) {
        //     designationStudyPoints = 6;
        //   } else {
        //     designationStudyPoints = 3;
        //   }
        //   researchWorkLoad!.rwlPoints =
        //     designationStudyPoints +
        //     study1Points +
        //     study2Points +
        //     study3Points +
        //     study4Points;

        //   const {
        //     teachingWorkloads,
        //     extensionWorkloads,
        //     researchWorkloads,
        //     strategicFunctionWorkloads
        //   } = await GetAllUserPendingWorkloads(user.email);
        //   actions.setHasPendingTeachingWorkload(
        //     !!teachingWorkloads.length && teachingWorkloads[0].isSubmitted
        //   );
        //   actions.setHasPendingExtensionWorkload(
        //     !!extensionWorkloads.length && extensionWorkloads[0].isSubmitted
        //   );
        //   actions.setHasPendingResearchWorkload(
        //     !!researchWorkloads.length && researchWorkloads[0].isSubmitted
        //   );
        //   actions.setHasPendingStrategicWorkload(
        //     !!strategicFunctionWorkloads.length &&
        //       strategicFunctionWorkloads[0].isSubmitted
        //   );

        //   clearStates();

        //   // if (isAddStudy) {
        //   //   clearStates();
        //   // } else if (!!!extensionWorkloads.length) {
        //   //   setIsTriggerSaveWorkloadHandler(true);
        //   //   setRedirectPage(REDIRECT.EWL);
        //   // } else if (!!!strategicFunctionWorkloads.length) {
        //   //   setRedirectPage(REDIRECT.SFW);
        //   //   setIsTriggerSaveWorkloadHandler(true);
        //   // } else {
        //   //   setRedirectPage(REDIRECT.WS);
        //   //   setIsTriggerSaveWorkloadHandler(true);
        //   // }
        // } else {
        //   // for external funded

        //   if (fundGenerated === "Above 1,000,000.00") {
        //     setStudyExternallyPoints(3);
        //   } else if (fundGenerated === "500,001.00 - 1,000,000.00") {
        //     setStudyExternallyPoints(2);
        //   } else {
        //     setStudyExternallyPoints(1);
        //   }
        //   researchWorkLoad!.rwlPoints = Number(
        //     (
        //       studyExternallyPoints +
        //       study1Points +
        //       study2Points +
        //       study3Points +
        //       study4Points
        //     ).toFixed(2)
        //   );

        researchWorkLoad!.rwlPoints = Number(
          (
            (cvsuFunded1?.points! ? cvsuFunded1?.points! : 0) +
            (cvsuFunded2?.points! ? cvsuFunded2?.points! : 0) +
            (cvsuFunded3?.points! ? cvsuFunded3?.points! : 0) +
            (cvsuFunded4?.points! ? cvsuFunded4?.points! : 0) +
            (cvsuFunded5?.points! ? cvsuFunded5?.points! : 0) +
            (externalFunded1?.points! ? externalFunded1?.points! : 0) +
            (externalFunded2?.points! ? externalFunded2?.points! : 0) +
            (externalFunded3?.points! ? externalFunded3?.points! : 0) +
            (externalFunded4?.points! ? externalFunded4?.points! : 0) +
            (externalFunded5?.points! ? externalFunded5?.points! : 0) +
            study1Points +
            study2Points +
            study3Points +
            study4Points
          ).toFixed(2)
        );

        if (researchWorkLoad) {
          await SaveResearchWorkload(researchWorkLoad, WORKLOAD_STATUS.SAVE);
        }

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

        clearStates();

        if (!!!extensionWorkloads.length) {
          navigate("/extension-workload", { replace: true });
        } else if (!!!strategicFunctionWorkloads.length) {
          navigate("/strategic-function-workload", { replace: true });
        } else {
          navigate("/workload-summary", { replace: true });
        }

        //   // if (isAddStudy) {
        //   //   clearStates();
        //   // } else if (!!!extensionWorkloads.length) {
        //   //   setRedirectPage(REDIRECT.EWL);
        //   //   setIsTriggerSaveWorkloadHandler(true);
        //   // } else if (!!!strategicFunctionWorkloads.length) {
        //   //   setRedirectPage(REDIRECT.SFW);
        //   //   setIsTriggerSaveWorkloadHandler(true);
        //   // } else {
        //   //   setRedirectPage(REDIRECT.WS);
        //   //   setIsTriggerSaveWorkloadHandler(true);
        //   // }
        // }
      }

      setIsSubmitting(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting]);

  const clearStates = () => {
    setResearchWorkLoad(undefined);
    setIsProfileOpen(false);
    setIsSubmitting(false);
    setTitleOfStudyCvsu("");
    setTitleOfStudyExternally("");
    setFundingOfStudy("");
    setFundDisplay("");
    setTypeOfStudy("");
    setDesignationStudy("");
    setDesignationStudyDisplay("");
    setRwlFile(undefined);
    setRwlFile1(undefined);
    setFundGenerated("");
    setFundGeneratedDisplay("");
    setSteps(1);
    setPoints(0);
    setStudy1(undefined);
    setStudy2(undefined);
    setStudy3(undefined);
    setStudy4(undefined);
    designationStudyPoints = 0;
    setFundGeneratedPoints(0);
    setStudy1Points(0);
    setStudy2Points(0);
    setStudy3Points(0);
    setStudy4Points(0);
  };

  const [study1, setStudy1] = useState<Designation>();
  const [study2, setStudy2] = useState<Designation>();
  const [study3, setStudy3] = useState<Designation>();
  const [study4, setStudy4] = useState<Designation>();

  const onSelectStudy1 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setStudy1({
        ...study1,
        title: value
      });
    }
  };

  const onStudy1FileSelect = (value?: File) => {
    setStudy1({
      ...study1,
      file: value
    });
  };

  const onSelectStudy2 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setStudy2({
        ...study2,
        title: value
      });
    }
  };

  const onStudy2FileSelect = (value?: File) => {
    setStudy2({
      ...study2,
      file: value
    });
  };

  const onSelectStudy3 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setStudy3({
        ...study3,
        title: value
      });
    }
  };

  const onStudy3FileSelect = (value?: File) => {
    setStudy3({
      ...study3,
      file: value
    });
  };

  const onSelectStudy4 = (value: string) => {
    if (value.length >= 0 && value !== "") {
      setStudy4({
        ...study4,
        title: value
      });
    }
  };

  const onStudy4FileSelect = (value?: File) => {
    setStudy4({
      ...study4,
      file: value
    });
  };

  let designationStudyPoints = 0;
  let generatedPoints = 0;

  const [study1Points, setStudy1Points] = useState(0);
  const [study2Points, setStudy2Points] = useState(0);
  const [study3Points, setStudy3Points] = useState(0);
  const [study4Points, setStudy4Points] = useState(0);

  useEffect(() => {
    if (
      designationStudy === "Program Leader/Co-Program Leader" &&
      typeOfStudy &&
      rwlFile &&
      !!titleOfStudyCvsu.length
    ) {
      designationStudyPoints = 9;
      setStudyCvsuPoints(9);
      return setPoints(designationStudyPoints);
    } else if (
      designationStudy === "Project Leader/Co-Project Leader" &&
      typeOfStudy &&
      rwlFile &&
      !!titleOfStudyCvsu.length
    ) {
      designationStudyPoints = 6;
      setStudyCvsuPoints(6);
      return setPoints(designationStudyPoints);
    } else if (
      designationStudy === "Study Leader/Co-Study Leader" &&
      typeOfStudy &&
      rwlFile &&
      !!titleOfStudyCvsu.length
    ) {
      designationStudyPoints = 3;
      setStudyCvsuPoints(3);
      return setPoints(designationStudyPoints);
    } else if (
      !designationStudy ||
      !typeOfStudy ||
      !rwlFile ||
      !!!titleOfStudyCvsu.length
    ) {
      designationStudyPoints = 0;
      setStudyCvsuPoints(0);
      return setPoints(designationStudyPoints);
    }
  }, [designationStudy, rwlFile, titleOfStudyCvsu]);

  useEffect(() => {
    // if (fundGenerated && rwlFile1) {
    //   setResearchWorkLoad({
    //     ...researchWorkLoad,
    //     fundGenerated,
    //     rwlFile1
    //   });
    // }
    if (
      fundGenerated === "Above 1,000,000.00" &&
      rwlFile1 &&
      !!titleOfStudyExternally.length
    ) {
      generatedPoints = 3;
      setStudyExternallyPoints(3);
      return setFundGeneratedPoints(generatedPoints);
    } else if (
      fundGenerated === "500,001.00 - 1,000,000.00" &&
      rwlFile1 &&
      !!titleOfStudyExternally.length
    ) {
      generatedPoints = 2;
      setStudyExternallyPoints(2);
      return setFundGeneratedPoints(generatedPoints);
    } else if (
      fundGenerated === "500,000.00 and below" &&
      rwlFile1 &&
      !!titleOfStudyExternally.length
    ) {
      generatedPoints = 1;
      setStudyExternallyPoints(1);
      return setFundGeneratedPoints(generatedPoints);
    } else {
      generatedPoints = 0;
      setStudyExternallyPoints(0);
      return setFundGeneratedPoints(generatedPoints);
    }
  }, [fundGenerated, rwlFile1, titleOfStudyExternally]);

  useEffect(() => {
    if (study1?.title === "International" && (study1.file || study1.filename)) {
      setStudy1Points(4);
    } else if (
      study1?.title === "National" &&
      (study1.file || study1.filename)
    ) {
      setStudy1Points(3);
    } else if (
      study1?.title === "Regional" &&
      (study1.file || study1.filename)
    ) {
      setStudy1Points(2);
    } else if (study1?.title === "Local" && (study1.file || study1.filename)) {
      setStudy1Points(1);
    } else {
      setStudy1Points(0);
    }

    if (study2?.title === "International" && (study2.file || study2.filename)) {
      setStudy2Points(4);
    } else if (
      study2?.title === "National" &&
      (study2.file || study2.filename)
    ) {
      setStudy2Points(3);
    } else if (
      study2?.title === "Regional" &&
      (study2.file || study2.filename)
    ) {
      setStudy2Points(2);
    } else if (study2?.title === "Local" && (study2.file || study2.filename)) {
      setStudy2Points(1);
    } else {
      setStudy2Points(0);
    }

    if (study3?.title === "International" && (study3.file || study3.filename)) {
      setStudy3Points(4);
    } else if (
      study3?.title === "National" &&
      (study3.file || study3.filename)
    ) {
      setStudy3Points(3);
    } else if (
      study3?.title === "Regional" &&
      (study3.file || study3.filename)
    ) {
      setStudy3Points(2);
    } else if (study3?.title === "Local" && (study3.file || study3.filename)) {
      setStudy3Points(1);
    } else {
      setStudy3Points(0);
    }

    if (study4?.title === "International" && (study4.file || study4.filename)) {
      setStudy4Points(4);
    } else if (
      study4?.title === "National" &&
      (study4.file || study4.filename)
    ) {
      setStudy4Points(3);
    } else if (
      study4?.title === "Regional" &&
      (study4.file || study4.filename)
    ) {
      setStudy4Points(2);
    } else if (study4?.title === "Local" && (study4.file || study4.filename)) {
      setStudy4Points(1);
    } else {
      setStudy4Points(0);
    }
  }, [study1, study2, study3, study4]);

  // useEffect(() => {
  //   setResearchWorkLoad({
  //     ...researchWorkLoad,
  //     typeOfStudy: undefined,
  //     designationStudy: undefined,
  //     fundGenerated: undefined,
  //     disseminatedResearch: undefined,
  //     disseminatedResearchFiles: undefined,
  //     rwlFile: undefined,
  //     rwlFilePath: undefined,
  //     rwlFile1: undefined,
  //     rwlFilePath1: undefined,
  //     disseminatedResearchFilesPath: undefined,
  //     rwlPoints: undefined,
  //     remarks: undefined,
  //     status: undefined
  //   });
  //   setPoints(0);
  //   setFundGeneratedPoints(0);
  // }, [researchWorkLoad?.fundingOfStudy]);

  useEffect(() => {
    (async () => {
      const {
        teachingWorkloads,
        extensionWorkloads,
        researchWorkloads,
        strategicFunctionWorkloads
      } = await GetAllUserPendingWorkloads(user.email);
      actions.setHasPendingTeachingWorkload(
        !!teachingWorkloads.length && teachingWorkloads[0].isSubmitted
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
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { data } = await getRwlSavedWorkload(user.id);
      setResearchWorkLoad(data);

      // CVSU FUNDED
      if (data.cvsuFunded) {
        for (let i = 0; i < data.cvsuFunded.length; i++) {
          if (i === 0) {
            setCvsuFunded1(data.cvsuFunded[i]);
          } else if (i === 1) {
            setCvsuFunded2(data.cvsuFunded[i]);
          } else if (i === 2) {
            setCvsuFunded3(data.cvsuFunded[i]);
          } else if (i === 3) {
            setCvsuFunded4(data.cvsuFunded[i]);
          } else if (i === 4) {
            setCvsuFunded5(data.cvsuFunded[i]);
          }
        }
      }
      // if (data[0]?.designationStudy === "Program Leader/Co-Program Leader") {
      //   designationStudyPoints = 9;
      //   setStudyPoints(9);
      // } else if (
      //   data[0]?.designationStudy === "Project Leader/Co-Project Leader"
      // ) {
      //   designationStudyPoints = 6;
      //   setStudyPoints(6);
      // } else if (data[0]?.designationStudy === "Study Leader/Co-Study Leader") {
      //   designationStudyPoints = 3;
      //   setStudyPoints(3);
      // }
      // setStudy1({
      //   title: data[0]?.disseminatedResearch?.[0] || "",
      //   filename: data[0]?.disseminatedResearchFilenames?.[0] || ""
      // });
      // setStudy2({
      //   title: data[0]?.disseminatedResearch?.[1] || "",
      //   filename: data[0]?.disseminatedResearchFilenames?.[1] || ""
      // });
      // setStudy3({
      //   title: data[0]?.disseminatedResearch?.[2] || "",
      //   filename: data[0]?.disseminatedResearchFilenames?.[2] || ""
      // });
      // setStudy4({
      //   title: data[0]?.disseminatedResearch?.[3] || "",
      //   filename: data[0]?.disseminatedResearchFilenames?.[3] || ""
      // });
      // if (data[0]?.disseminatedResearch?.[0] === "International") {
      //   setStudy1Points(4);
      // } else if (data[0]?.disseminatedResearch?.[0] === "National") {
      //   setStudy1Points(3);
      // } else if (data[0]?.disseminatedResearch?.[0] === "Regional") {
      //   setStudy1Points(2);
      // } else if (data[0]?.disseminatedResearch?.[0] === "Local") {
      //   setStudy1Points(1);
      // }

      // if (data[0]?.disseminatedResearch?.[1] === "International") {
      //   setStudy2Points(4);
      // } else if (data[0]?.disseminatedResearch?.[1] === "National") {
      //   setStudy2Points(3);
      // } else if (data[0]?.disseminatedResearch?.[1] === "Regional") {
      //   setStudy2Points(2);
      // } else if (data[0]?.disseminatedResearch?.[1] === "Local") {
      //   setStudy2Points(1);
      // }

      // if (data[0]?.disseminatedResearch?.[2] === "International") {
      //   setStudy3Points(4);
      // } else if (data[0]?.disseminatedResearch?.[2] === "National") {
      //   setStudy3Points(3);
      // } else if (data[0]?.disseminatedResearch?.[2] === "Regional") {
      //   setStudy3Points(2);
      // } else if (data[0]?.disseminatedResearch?.[2] === "Local") {
      //   setStudy3Points(1);
      // }

      // if (data[0]?.disseminatedResearch?.[3] === "International") {
      //   setStudy4Points(4);
      // } else if (data[0]?.disseminatedResearch?.[3] === "National") {
      //   setStudy4Points(3);
      // } else if (data[0]?.disseminatedResearch?.[3] === "Regional") {
      //   setStudy4Points(2);
      // } else if (data[0]?.disseminatedResearch?.[3] === "Local") {
      //   setStudy4Points(1);
      // }

      // EXTERNAL FUNDED
      // setFundGenerated(data[0]?.fundGenerated);
      // setFundGeneratedDisplay(data[0]?.fundGenerated);
      // if (
      //   data[0]?.fundGenerated === "Above 1,000,000.00" &&
      //   data[0]?.rwlFilename1
      // ) {
      //   generatedPoints = 3;
      //   setStudyPoints(3);
      // } else if (
      //   data[0]?.externallyFunded[0].fundGenerated === "500,001.00 - 1,000,000.00" &&
      //   data[0]?.rwlFilename1
      // ) {
      //   generatedPoints = 2;
      //   setStudyPoints(2);
      // } else if (
      //   data[0]?.fundGenerated === "500,000.00 and below" &&
      //   data[0]?.rwlFilename1
      // ) {
      //   generatedPoints = 1;
      //   setStudyPoints(1);
      // }

      // setPoints(Number(data[0]?.rwlPoints));
      if (data.externallyFunded) {
        for (let i = 0; i < data.externallyFunded.length; i++) {
          if (i === 0) {
            setExternalFunded1(data.externallyFunded[i]);
          } else if (i === 1) {
            setExternalFunded2(data.externallyFunded[i]);
          } else if (i === 2) {
            setExternalFunded3(data.externallyFunded[i]);
          } else if (i === 3) {
            setExternalFunded4(data.externallyFunded[i]);
          } else if (i === 4) {
            setExternalFunded5(data.externallyFunded[i]);
          }
        }
      }

      setIsLoading(false);
    })();
  }, [user.id]);

  const onRemoveRwlFile = () => {
    setRwlFile(undefined);
    // setResearchWorkLoad({
    //   ...researchWorkLoad,
    //   rwlFilename: undefined
    // });
  };

  const onRemoveRwl1File = () => {
    setRwlFile1(undefined);
    // setResearchWorkLoad({
    //   ...researchWorkLoad,
    //   rwlFilename1: undefined
    // });
  };

  const onRemoveStudy1File = () => {
    setStudy1({
      ...study1,
      file: undefined,
      filename: undefined
    });
  };

  const onRemoveStudy2File = () => {
    setStudy2({
      ...study2,
      file: undefined,
      filename: undefined
    });
  };

  const onRemoveStudy3File = () => {
    setStudy3({
      ...study3,
      file: undefined,
      filename: undefined
    });
  };

  const onRemoveStudy4File = () => {
    setStudy4({
      ...study4,
      file: undefined,
      filename: undefined
    });
  };

  useEffect(() => {
    // if (isTriggerSaveWorkloadHandler) {
    //   (async () => {
    //     await saveWorkloadHandler();
    //   })();
    //   setIsTriggerSaveWorkloadHandler(false);
    // switch (redirectPage) {
    //   case REDIRECT.EWL:
    //     return navigate("/extension-workload", { replace: true });
    //   case REDIRECT.SFW:
    //     return navigate("/strategic-function-workload", { replace: true });
    //   case REDIRECT.WS:
    //     return navigate("/workload-summary", { replace: true });
    //   default:
    //     break;
    // }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddCvsuStudy = () => {
    setIsAdding(true);
    if (!cvsuFunded1) {
      setCvsuFunded1({
        title: titleOfStudyCvsu,
        typeOfStudy: typeOfStudy,
        designationStudy: designationStudy!,
        file: rwlFile,
        points: studyCvsuPoints
      });
    } else if (cvsuFunded1) {
      setCvsuFunded2({
        title: titleOfStudyCvsu,
        typeOfStudy: typeOfStudy,
        designationStudy: designationStudy!,
        file: rwlFile,
        points: studyCvsuPoints
      });
    } else if (cvsuFunded2) {
      setCvsuFunded3({
        title: titleOfStudyCvsu,
        typeOfStudy: typeOfStudy,
        designationStudy: designationStudy!,
        file: rwlFile,
        points: studyCvsuPoints
      });
    } else if (cvsuFunded3) {
      setCvsuFunded4({
        title: titleOfStudyCvsu,
        typeOfStudy: typeOfStudy,
        designationStudy: designationStudy!,
        file: rwlFile,
        points: studyCvsuPoints
      });
    }

    setTitleOfStudyCvsu("");
    setTypeOfStudy("-----");
    setTypeOfStudyDisplay("-----");
    setDesignationStudy("-----");
    setDesignationStudyDisplay("-----");
    onRemoveRwlFile();
    setStudyCvsuPoints(0);
  };

  const onAddExternallyStudy = () => {
    if (!externalFunded1) {
      setExternalFunded1({
        title: titleOfStudyExternally,
        fundGenerated: fundGenerated!,
        file: rwlFile1,
        points: studyExternallyPoints
      });
    } else if (externalFunded1) {
      setExternalFunded2({
        title: titleOfStudyCvsu,
        fundGenerated: fundGenerated!,
        file: rwlFile1,
        points: studyExternallyPoints
      });
    } else if (externalFunded3) {
      setExternalFunded3({
        title: titleOfStudyCvsu,
        fundGenerated: fundGenerated!,
        file: rwlFile1,
        points: studyExternallyPoints
      });
    } else if (externalFunded4) {
      setExternalFunded4({
        title: titleOfStudyCvsu,
        fundGenerated: fundGenerated!,
        file: rwlFile1,
        points: studyExternallyPoints
      });
    }

    setTitleOfStudyExternally("");
    setFundDisplay("-----");
    setFundGenerated("-----");
    setFundGeneratedDisplay("-----");
    onRemoveRwl1File();
    setStudyExternallyPoints(0);
  };

  return (
    <MainContainer>
      <TopNav profileHandler={() => setIsProfileOpen(!isProfileOpen)} />
      <Menu />
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
          {/* {steps === 1 && rwl1 && (
            <Step1
              titleOfStudy={rwl1.titleOfStudy}
              titleOfStudyHandler={e => {
                setRwl1({
                  ...rwl1,
                  titleOfStudy: e
                });
              }}
              fundDisplay={rwl1.fundingOfStudy}
              fundingStudy={e => {
                if (e) {
                  setRwl1({
                    ...rwl1,
                    fundingOfStudy: e
                  });
                }
              }}
              researchWorkLoadHandler={researchWorkLoadHandler}
              fundingOfStudy={rwl1.fundingOfStudy}
              hasNext={!rwl2}
            />
          )}
          {steps === 1 && rwl2 && (
            <Step1
              titleOfStudy={rwl2.titleOfStudy}
              titleOfStudyHandler={e => {
                setRwl2({
                  ...rwl2,
                  titleOfStudy: e
                });
              }}
              fundDisplay={rwl2.fundingOfStudy}
              fundingStudy={e => {
                if (e) {
                  setRwl2({
                    ...rwl2,
                    fundingOfStudy: e
                  });
                }
              }}
              researchWorkLoadHandler={researchWorkLoadHandler}
              fundingOfStudy={rwl2.fundingOfStudy}
              hasNext={!rwl3}
            />
          )}
          {steps === 1 && rwl3 && (
            <Step1
              titleOfStudy={rwl3.titleOfStudy}
              titleOfStudyHandler={e => {
                setRwl3({
                  ...rwl3,
                  titleOfStudy: e
                });
              }}
              fundDisplay={rwl3.fundingOfStudy}
              fundingStudy={e => {
                if (e) {
                  setRwl3({
                    ...rwl3,
                    fundingOfStudy: e
                  });
                }
              }}
              researchWorkLoadHandler={researchWorkLoadHandler}
              fundingOfStudy={rwl3.fundingOfStudy}
              hasNext={!rwl4}
            />
          )}
          {steps === 1 && rwl4 && (
            <Step1
              titleOfStudy={rwl4.titleOfStudy}
              titleOfStudyHandler={e => {
                setRwl4({
                  ...rwl4,
                  titleOfStudy: e
                });
              }}
              fundDisplay={rwl4.fundingOfStudy}
              fundingStudy={e => {
                if (e) {
                  setRwl4({
                    ...rwl4,
                    fundingOfStudy: e
                  });
                }
              }}
              researchWorkLoadHandler={researchWorkLoadHandler}
              fundingOfStudy={rwl4.fundingOfStudy}
              hasNext={!rwl5}
            />
          )}
          {steps === 1 && rwl5 && (
            <Step1
              titleOfStudy={rwl5.titleOfStudy}
              titleOfStudyHandler={e => {
                setRwl5({
                  ...rwl5,
                  titleOfStudy: e
                });
              }}
              fundDisplay={rwl5.fundingOfStudy}
              fundingStudy={e => {
                if (e) {
                  setRwl5({
                    ...rwl5,
                    fundingOfStudy: e
                  });
                }
              }}
              researchWorkLoadHandler={researchWorkLoadHandler}
              fundingOfStudy={rwl5.fundingOfStudy}
              hasNext={true}
            />
          )}
          {
            steps === 1 && !rwl1 && (
              <Step1
            titleOfStudy={titleOfStudy}
           titleOfStudyHandler={titleOfStudyHandler}
             fundingStudy={fundingStudy}
              fundDisplay={fundDisplay}
              researchWorkLoadHandler={researchWorkLoadHandler}
              fundingOfStudy={fundingOfStudy}
              hasNext={true}
             />
            )
          } */}
          {cvsuFunded1 && <FundedCvsu cvsuFunded={cvsuFunded1} />}
          {cvsuFunded2 && <FundedCvsu cvsuFunded={cvsuFunded2} />}
          {cvsuFunded3 && <FundedCvsu cvsuFunded={cvsuFunded3} />}
          {cvsuFunded4 && <FundedCvsu cvsuFunded={cvsuFunded4} />}
          <ResearchWorkload1
            typeOfStudyHandler={typeOfStudyHandler}
            designationStudyHandler={designationStudyHandler}
            rwlFileHandler={rwlFileHandler}
            designationStudy={designationStudyDisplay}
            typeOfStudy={typeOfStudyDisplay}
            rwlFileName={rwlFile?.name}
            points={points}
            studyPoints={studyCvsuPoints}
            onRemoveRwlFile={onRemoveRwlFile}
            titleOfStudy={titleOfStudyCvsu}
            titleOfStudyHandler={titleOfStudyCvsuHandler}
            addStudyHandler={onAddCvsuStudy}
          />
          {/* )} */}
          {/* {steps === 3 && ( */}
          {externalFunded1 && (
            <FundedExternally externallyFunded={externalFunded1} />
          )}
          {externalFunded2 && (
            <FundedExternally externallyFunded={externalFunded2} />
          )}
          {externalFunded3 && (
            <FundedExternally externallyFunded={externalFunded3} />
          )}
          {externalFunded4 && (
            <FundedExternally externallyFunded={externalFunded4} />
          )}
          <ResearchWorkload2
            fundGeneratedHandler={fundGeneratedHandler}
            rwlFile1Handler={rwlFile1Handler}
            fundGeneratedDisplay={fundGenerated || fundGeneratedDisplay}
            rwlFileName1={rwlFile1?.name}
            studyPoints={studyExternallyPoints}
            onRemoveRwl1File={onRemoveRwl1File}
            titleOfStudy={titleOfStudyExternally}
            titleOfStudyHandler={titleOfStudyExternallyHandler}
            addStudyHandler={onAddExternallyStudy}
          />
          {/* // )} */}
          {/* {steps === 4 && ( */}
          <ResearchWorkload3
            researchWorkLoadHandler={researchWorkLoadHandler}
            isSubmitting={isSubmitting}
            onSelectStudy1={onSelectStudy1}
            study1={study1?.title}
            onStudy1FileSelect={onStudy1FileSelect}
            study1FileName={study1?.filename || study1?.file?.name}
            onSelectStudy2={onSelectStudy2}
            study2={study2?.title}
            onStudy2FileSelect={onStudy2FileSelect}
            study2FileName={study2?.filename || study2?.file?.name}
            onSelectStudy3={onSelectStudy3}
            study3={study3?.title}
            onStudy3FileSelect={onStudy3FileSelect}
            study3FileName={study3?.filename || study3?.file?.name}
            onSelectStudy4={onSelectStudy4}
            study4={study4?.title}
            onStudy4FileSelect={onStudy4FileSelect}
            study4FileName={study4?.filename || study4?.file?.name}
            points={points}
            study1Points={study1Points}
            study2Points={study2Points}
            study3Points={study3Points}
            study4Points={study4Points}
            fundGeneratedPoints={fundGeneratedPoints}
            studyPoints={studyPoints}
            onRemoveStudy1File={onRemoveStudy1File}
            onRemoveStudy2File={onRemoveStudy2File}
            onRemoveStudy3File={onRemoveStudy3File}
            onRemoveStudy4File={onRemoveStudy4File}
            canSubmit={
              !!cvsuFunded1?.points ||
              (!!titleOfStudyCvsu &&
                !!typeOfStudy &&
                !!designationStudy &&
                !!rwlFile) ||
              !!externalFunded1?.points ||
              (!!titleOfStudyExternally && !!fundGenerated && !!rwlFile1)
            }
          />
          {/* )} */}
          {steps === 1 && !isLoading && (
            <DisseminatedButtonContainer>
              <DisseminatedTextLink
                onClick={() => {
                  setResearchWorkLoad(undefined);
                  setSteps(4);
                }}
              >
                Disseminated research output in College or University In-House
                Review/Conferences
              </DisseminatedTextLink>
            </DisseminatedButtonContainer>
          )}
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
  width: 100%;
`;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 5px solid black;
  border-radius: 15px;
  margin: 120px auto;
  width: 50%;
`;

const Container = styled.div`
  padding: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 60%;
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
  width: auto;
  max-width: 300px;
`;

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 17px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
`;

const TextInput = styled.input`
  background-color: ${Colors.textFieldBackground};
  border-width: 1px;
  font-family: HurmeGeometricSans3;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 40px 20px 0px 0px;
`;

const FooterContainer = styled.div`
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  z-index: 1;
`;

const DisseminatedButtonContainer = styled.div`
  max-width: 300px;
  display: flex;
  align-self: end;
  margin-bottom: 30px;
`;

const DisseminatedTextLink = styled.span`
  font-size: 19px;
  font-weight: 600;
  line-height: 20px;
  font-family: HurmeGeometricSans3;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export default ResearchWorkload;
