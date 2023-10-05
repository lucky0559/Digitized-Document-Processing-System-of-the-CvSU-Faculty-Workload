import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../../components/Footer";
import Menu from "../../../components/Menu";
import ProfileTab from "../../../components/ProfileTab";
import ScreenTitle from "../../../components/ScreenTitle";
import TopNav from "../../../components/TopNav";
import Colors from "../../../constants/Colors";
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
import CvsuFundedLists from "./CvsuFundedLists";
import ExternallyFundedLists from "./ExternallyFundedLists";

type ResearchWorkLoadProps = {
  UseLogout: () => void;
};

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
  const [, setFundingOfStudy] = useState<string | undefined>("");
  const [, setFundDisplay] = useState<string | undefined>("");
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

  const [, setSteps] = useState(1);

  const [points, setPoints] = useState(0);

  const navigate = useNavigate();

  const [cvsuFundedInitialFilename1, setCvsuFundedInitialFilename1] =
    useState<string>();
  const [cvsuFundedInitialFilename2, setCvsuFundedInitialFilename2] =
    useState<string>();
  const [cvsuFundedInitialFilename3, setCvsuFundedInitialFilename3] =
    useState<string>();
  const [cvsuFundedInitialFilename4, setCvsuFundedInitialFilename4] =
    useState<string>();
  const [cvsuFundedInitialFilename5, setCvsuFundedInitialFilename5] =
    useState<string>();

  const [
    externallyFundedInitialFilename1,
    setExternallyFundedInitialFilename1
  ] = useState<string>();
  const [
    externallyFundedInitialFilename2,
    setExternallyFundedInitialFilename2
  ] = useState<string>();
  const [
    externallyFundedInitialFilename3,
    setExternallyFundedInitialFilename3
  ] = useState<string>();
  const [
    externallyFundedInitialFilename4,
    setExternallyFundedInitialFilename4
  ] = useState<string>();
  const [
    externallyFundedInitialFilename5,
    setExternallyFundedInitialFilename5
  ] = useState<string>();

  const [studyCvsuPoints, setStudyCvsuPoints] = useState(0);
  const [studyExternallyPoints, setStudyExternallyPoints] = useState(0);

  const [fundGeneratedPoints, setFundGeneratedPoints] = useState(0);

  const { user, actions } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const [isAdding, setIsAdding] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [isConfirming, setIsConfirming] = useState(false);

  const [isSetting, setIsSetting] = useState(false);

  const titleOfStudyCvsuHandler = (value: string) => {
    setTitleOfStudyCvsu(value);
  };

  const titleOfStudyExternallyHandler = (value: string) => {
    setTitleOfStudyExternally(value);
  };

  const designationStudyHandler = (value?: string) => {
    setDesignationStudy(value);
  };

  const typeOfStudyHandler = (value: string) => {
    setTypeOfStudy(value);
  };

  const rwlFileHandler = (value?: File) => {
    setRwlFile(value);
  };

  const fundGeneratedHandler = (value?: string) => {
    setFundGenerated(value);
  };

  const rwlFile1Handler = (value?: File) => {
    setRwlFile1(value);
  };

  const researchWorkLoadHandler = () => {
    // CVSU FUNDED
    if (!isEditing) {
      setIsSetting(true);
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
      setIsSetting(false);
    } else {
      onRwlSet();
    }
  };

  const onRwlSet = () => {
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
      ...((cvsuFunded1?.file ||
        cvsuFunded2?.file ||
        cvsuFunded3?.file ||
        cvsuFunded4?.file ||
        cvsuFunded5?.file) && {
        cvsuFundedFilenames: [
          cvsuFunded1?.file?.name! ||
            researchWorkLoad?.cvsuFundedFilenames?.[0]!,
          cvsuFunded2?.file?.name! ||
            researchWorkLoad?.cvsuFundedFilenames?.[1]!,
          cvsuFunded3?.file?.name! ||
            researchWorkLoad?.cvsuFundedFilenames?.[2]!,
          cvsuFunded4?.file?.name! ||
            researchWorkLoad?.cvsuFundedFilenames?.[3]!,
          cvsuFunded5?.file?.name! ||
            researchWorkLoad?.cvsuFundedFilenames?.[4]!
        ].filter(Boolean)
      }),
      ...((externalFunded1?.file ||
        externalFunded2?.file ||
        externalFunded3?.file ||
        externalFunded4?.file ||
        externalFunded5?.file) && {
        externallyFundedFilenames: [
          externalFunded1?.file?.name! ||
            researchWorkLoad?.externallyFundedFilenames?.[0]!,
          externalFunded2?.file?.name! ||
            researchWorkLoad?.externallyFundedFilenames?.[1]!,
          externalFunded3?.file?.name! ||
            researchWorkLoad?.externallyFundedFilenames?.[2]!,
          externalFunded4?.file?.name! ||
            researchWorkLoad?.externallyFundedFilenames?.[3]!,
          externalFunded5?.file?.name! ||
            researchWorkLoad?.externallyFundedFilenames?.[4]!
        ].filter(Boolean)
      })
    });
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!isAdding && !isEditing && !isSetting) {
      onRwlSet();
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
  }, [
    study1?.file,
    study1?.filename,
    study1?.title,
    study2?.file,
    study2?.filename,
    study2?.title,
    study3?.file,
    study3?.filename,
    study3?.title,
    study4?.file,
    study4?.filename,
    study4?.title
  ]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { data } = await getRwlSavedWorkload(user.id);
      setResearchWorkLoad(data);

      if (!!data.cvsuFunded || !!data.externallyFunded) setIsEditing(true);

      setCvsuFundedInitialFilename1(data.cvsuFundedFilenames?.[0]);
      setCvsuFundedInitialFilename2(data.cvsuFundedFilenames?.[1]);
      setCvsuFundedInitialFilename3(data.cvsuFundedFilenames?.[2]);
      setCvsuFundedInitialFilename4(data.cvsuFundedFilenames?.[3]);
      setCvsuFundedInitialFilename5(data.cvsuFundedFilenames?.[4]);

      setExternallyFundedInitialFilename1(data.externallyFundedFilenames?.[0]);
      setExternallyFundedInitialFilename2(data.externallyFundedFilenames?.[1]);
      setExternallyFundedInitialFilename3(data.externallyFundedFilenames?.[2]);
      setExternallyFundedInitialFilename4(data.externallyFundedFilenames?.[3]);
      setExternallyFundedInitialFilename5(data.externallyFundedFilenames?.[4]);

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
        setIsEditing(true);
      }

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

      if (
        data.disseminatedResearchFilenames?.[0] &&
        data.disseminatedResearch?.[0]
      ) {
        setStudy1({
          filename: data.disseminatedResearchFilenames[0],
          title: data.disseminatedResearch[0]
        });
      }
      if (
        data.disseminatedResearchFilenames?.[1] &&
        data.disseminatedResearch?.[1]
      ) {
        setStudy2({
          filename: data.disseminatedResearchFilenames[1],
          title: data.disseminatedResearch[1]
        });
      }
      if (
        data.disseminatedResearchFilenames?.[2] &&
        data.disseminatedResearch?.[2]
      ) {
        setStudy3({
          filename: data.disseminatedResearchFilenames[2],
          title: data.disseminatedResearch[2]
        });
      }
      if (
        data.disseminatedResearchFilenames?.[3] &&
        data.disseminatedResearch?.[3]
      ) {
        setStudy4({
          filename: data.disseminatedResearchFilenames[3],
          title: data.disseminatedResearch[3]
        });
      }

      setIsLoading(false);
    })();
  }, [user.id]);

  const onRemoveRwlFile = () => {
    setRwlFile(undefined);
  };

  const onRemoveRwl1File = () => {
    setRwlFile1(undefined);
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
    setIsAdding(true);
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

  const setIsConfirmingHandler = (v: boolean) => {
    setIsConfirming(v);
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
          {isEditing ? (
            <>
              {cvsuFunded1 && (
                <CvsuFundedLists
                  // FUNDED 1
                  typeOfStudyHandler1={e => {
                    if (e) {
                      setCvsuFunded1({
                        ...cvsuFunded1,
                        typeOfStudy: e
                      });
                    }
                  }}
                  designationStudyHandler1={e => {
                    if (e) {
                      setCvsuFunded1({
                        ...cvsuFunded1,
                        designationStudy: e,
                        points:
                          e === "Program Leader/Co-Program Leader" &&
                          cvsuFunded1.file &&
                          cvsuFunded1.title
                            ? 9
                            : e === "Project Leader/Co-Project Leader" &&
                              cvsuFunded1.file &&
                              cvsuFunded1.title
                            ? 6
                            : e === "Study Leader/Co-Study Leader" &&
                              cvsuFunded1.file &&
                              cvsuFunded1.title
                            ? 3
                            : 0
                      });
                    }
                  }}
                  rwlFileHandler1={e => {
                    if (e) {
                      setCvsuFunded1({
                        ...cvsuFunded1,
                        file: e
                      });
                    }
                  }}
                  designationStudy1={cvsuFunded1.designationStudy}
                  typeOfStudy1={cvsuFunded1.typeOfStudy}
                  rwlFileName1={
                    cvsuFunded1.file?.name || cvsuFundedInitialFilename1
                  }
                  points1={points}
                  studyPoints1={cvsuFunded1.points || 0}
                  onRemoveRwlFile1={() => {
                    setCvsuFunded1({
                      ...cvsuFunded1,
                      file: undefined
                    });
                    setCvsuFundedInitialFilename1(undefined);
                  }}
                  titleOfStudy1={cvsuFunded1.title}
                  titleOfStudyHandler1={e => {
                    setCvsuFunded1({
                      ...cvsuFunded1,
                      title: e,
                      points:
                        cvsuFunded1.designationStudy ===
                          "Program Leader/Co-Program Leader" &&
                        cvsuFunded1.file &&
                        e
                          ? 9
                          : cvsuFunded1.designationStudy ===
                              "Project Leader/Co-Project Leader" &&
                            cvsuFunded1.file &&
                            e
                          ? 6
                          : cvsuFunded1.designationStudy ===
                              "Study Leader/Co-Study Leader" &&
                            cvsuFunded1.file &&
                            e
                          ? 3
                          : 0
                    });
                  }}
                  // FUNDED 2
                  typeOfStudyHandler2={e => {
                    if (e) {
                      setCvsuFunded1({
                        ...cvsuFunded1,
                        typeOfStudy: e
                      });
                    }
                  }}
                  designationStudyHandler2={e => {
                    if (e) {
                      setCvsuFunded2({
                        ...cvsuFunded2!,
                        designationStudy: e,
                        points:
                          e === "Program Leader/Co-Program Leader" &&
                          cvsuFunded2?.file &&
                          cvsuFunded2.title
                            ? 9
                            : e === "Project Leader/Co-Project Leader" &&
                              cvsuFunded2?.file &&
                              cvsuFunded2.title
                            ? 6
                            : e === "Study Leader/Co-Study Leader" &&
                              cvsuFunded2?.file &&
                              cvsuFunded2.title
                            ? 3
                            : 0
                      });
                    }
                  }}
                  rwlFileHandler2={e => {
                    if (e) {
                      setCvsuFunded2({
                        ...cvsuFunded2!,
                        file: e
                      });
                    }
                  }}
                  designationStudy2={cvsuFunded2?.designationStudy}
                  typeOfStudy2={cvsuFunded2?.typeOfStudy}
                  rwlFileName2={
                    cvsuFunded2?.file?.name || cvsuFundedInitialFilename2
                  }
                  points2={points}
                  studyPoints2={cvsuFunded2?.points || 0}
                  onRemoveRwlFile2={() => {
                    setCvsuFunded2({
                      ...cvsuFunded2!,
                      file: undefined
                    });
                    setCvsuFundedInitialFilename2(undefined);
                  }}
                  titleOfStudy2={cvsuFunded2?.title || ""}
                  titleOfStudyHandler2={e =>
                    setCvsuFunded2({
                      ...cvsuFunded2!,
                      title: e,
                      points:
                        cvsuFunded2?.designationStudy ===
                          "Program Leader/Co-Program Leader" &&
                        cvsuFunded2.file &&
                        e
                          ? 9
                          : cvsuFunded2?.designationStudy ===
                              "Project Leader/Co-Project Leader" &&
                            cvsuFunded2.file &&
                            e
                          ? 6
                          : cvsuFunded2?.designationStudy ===
                              "Study Leader/Co-Study Leader" &&
                            cvsuFunded2.file &&
                            e
                          ? 3
                          : 0
                    })
                  }
                  // FUNDED 3
                  typeOfStudyHandler3={e => {
                    if (e) {
                      setCvsuFunded3({
                        ...cvsuFunded3!,
                        typeOfStudy: e
                      });
                    }
                  }}
                  designationStudyHandler3={e => {
                    if (e) {
                      setCvsuFunded3({
                        ...cvsuFunded3!,
                        designationStudy: e,
                        points:
                          e === "Program Leader/Co-Program Leader" &&
                          cvsuFunded3?.file &&
                          cvsuFunded3.title
                            ? 9
                            : e === "Project Leader/Co-Project Leader" &&
                              cvsuFunded3?.file &&
                              cvsuFunded3.title
                            ? 6
                            : e === "Study Leader/Co-Study Leader" &&
                              cvsuFunded3?.file &&
                              cvsuFunded3.title
                            ? 3
                            : 0
                      });
                    }
                  }}
                  rwlFileHandler3={e => {
                    if (e) {
                      setCvsuFunded3({
                        ...cvsuFunded3!,
                        file: e
                      });
                    }
                  }}
                  designationStudy3={cvsuFunded3?.designationStudy}
                  typeOfStudy3={cvsuFunded3?.typeOfStudy}
                  rwlFileName3={
                    cvsuFunded3?.file?.name || cvsuFundedInitialFilename3
                  }
                  points3={points}
                  studyPoints3={cvsuFunded3?.points || 0}
                  onRemoveRwlFile3={() => {
                    setCvsuFunded3({
                      ...cvsuFunded3!,
                      file: undefined
                    });
                    setCvsuFundedInitialFilename3(undefined);
                  }}
                  titleOfStudy3={cvsuFunded3?.title || ""}
                  titleOfStudyHandler3={e =>
                    setCvsuFunded3({
                      ...cvsuFunded3!,
                      title: e,
                      points:
                        cvsuFunded3?.designationStudy ===
                          "Program Leader/Co-Program Leader" &&
                        cvsuFunded3.file &&
                        e
                          ? 9
                          : cvsuFunded3?.designationStudy ===
                              "Project Leader/Co-Project Leader" &&
                            cvsuFunded3.file &&
                            e
                          ? 6
                          : cvsuFunded3?.designationStudy ===
                              "Study Leader/Co-Study Leader" &&
                            cvsuFunded3.file &&
                            e
                          ? 3
                          : 0
                    })
                  }
                  // FUNDED 4
                  typeOfStudyHandler4={e => {
                    if (e) {
                      setCvsuFunded4({
                        ...cvsuFunded4!,
                        typeOfStudy: e
                      });
                    }
                  }}
                  designationStudyHandler4={e => {
                    if (e) {
                      setCvsuFunded4({
                        ...cvsuFunded4!,
                        designationStudy: e,
                        points:
                          e === "Program Leader/Co-Program Leader" &&
                          cvsuFunded4?.file &&
                          cvsuFunded4.title
                            ? 9
                            : e === "Project Leader/Co-Project Leader" &&
                              cvsuFunded4?.file &&
                              cvsuFunded4.title
                            ? 6
                            : e === "Study Leader/Co-Study Leader" &&
                              cvsuFunded4?.file &&
                              cvsuFunded4.title
                            ? 3
                            : 0
                      });
                    }
                  }}
                  rwlFileHandler4={e => {
                    if (e) {
                      setCvsuFunded4({
                        ...cvsuFunded4!,
                        file: e
                      });
                    }
                  }}
                  designationStudy4={cvsuFunded4?.designationStudy}
                  typeOfStudy4={cvsuFunded4?.typeOfStudy}
                  rwlFileName4={
                    cvsuFunded4?.file?.name || cvsuFundedInitialFilename4
                  }
                  points4={points}
                  studyPoints4={cvsuFunded4?.points || 0}
                  onRemoveRwlFile4={() => {
                    setCvsuFunded4({
                      ...cvsuFunded4!,
                      file: undefined
                    });
                    setCvsuFundedInitialFilename4(undefined);
                  }}
                  titleOfStudy4={cvsuFunded4?.title || ""}
                  titleOfStudyHandler4={e =>
                    setCvsuFunded4({
                      ...cvsuFunded4!,
                      title: e,
                      points:
                        cvsuFunded4?.designationStudy ===
                          "Program Leader/Co-Program Leader" &&
                        cvsuFunded4.file &&
                        e
                          ? 9
                          : cvsuFunded4?.designationStudy ===
                              "Project Leader/Co-Project Leader" &&
                            cvsuFunded4.file &&
                            e
                          ? 6
                          : cvsuFunded4?.designationStudy ===
                              "Study Leader/Co-Study Leader" &&
                            cvsuFunded4.file &&
                            e
                          ? 3
                          : 0
                    })
                  }
                  // FUNDED 5
                  typeOfStudyHandler5={e => {
                    if (e) {
                      setCvsuFunded5({
                        ...cvsuFunded5!,
                        typeOfStudy: e
                      });
                    }
                  }}
                  designationStudyHandler5={e => {
                    if (e) {
                      setCvsuFunded5({
                        ...cvsuFunded5!,
                        designationStudy: e,
                        points:
                          e === "Program Leader/Co-Program Leader" &&
                          cvsuFunded5?.file &&
                          cvsuFunded5.title
                            ? 9
                            : e === "Project Leader/Co-Project Leader" &&
                              cvsuFunded5?.file &&
                              cvsuFunded5.title
                            ? 6
                            : e === "Study Leader/Co-Study Leader" &&
                              cvsuFunded5?.file &&
                              cvsuFunded5.title
                            ? 3
                            : 0
                      });
                    }
                  }}
                  rwlFileHandler5={e => {
                    if (e) {
                      setCvsuFunded5({
                        ...cvsuFunded5!,
                        file: e
                      });
                    }
                  }}
                  designationStudy5={cvsuFunded5?.designationStudy}
                  typeOfStudy5={cvsuFunded5?.typeOfStudy}
                  rwlFileName5={
                    cvsuFunded5?.file?.name || cvsuFundedInitialFilename5
                  }
                  points5={points}
                  studyPoints5={cvsuFunded5?.points || 0}
                  onRemoveRwlFile5={() => {
                    setCvsuFunded5({
                      ...cvsuFunded5!,
                      file: undefined
                    });
                    setCvsuFundedInitialFilename5(undefined);
                  }}
                  titleOfStudy5={cvsuFunded5?.title || ""}
                  titleOfStudyHandler5={e =>
                    setCvsuFunded5({
                      ...cvsuFunded5!,
                      title: e,
                      points:
                        cvsuFunded5?.designationStudy ===
                          "Program Leader/Co-Program Leader" &&
                        cvsuFunded5.file &&
                        e
                          ? 9
                          : cvsuFunded5?.designationStudy ===
                              "Project Leader/Co-Project Leader" &&
                            cvsuFunded5.file &&
                            e
                          ? 6
                          : cvsuFunded5?.designationStudy ===
                              "Study Leader/Co-Study Leader" &&
                            cvsuFunded5.file &&
                            e
                          ? 3
                          : 0
                    })
                  }
                  cvsuFunded1={cvsuFunded1}
                  cvsuFunded2={cvsuFunded2}
                  cvsuFunded3={cvsuFunded3}
                  cvsuFunded4={cvsuFunded4}
                  cvsuFunded5={cvsuFunded5}
                />
              )}
              {externalFunded1 && (
                <ExternallyFundedLists
                  // FUNDED 1
                  fundGeneratedHandler1={e => {
                    if (e) {
                      setExternalFunded1({
                        ...externalFunded1,
                        fundGenerated: e,
                        points:
                          e === "Above 1,000,000.00" &&
                          externalFunded1.file &&
                          externalFunded1.title
                            ? 3
                            : e === "500,001.00 - 1,000,000.00" &&
                              externalFunded1.file &&
                              externalFunded1.title
                            ? 2
                            : e === "500,000.00 and below" &&
                              externalFunded1.file &&
                              externalFunded1.title
                            ? 1
                            : 0
                      });
                    }
                  }}
                  rwlFile1Handler1={e => {
                    if (e) {
                      setExternalFunded1({
                        ...externalFunded1,
                        file: e
                      });
                    }
                  }}
                  fundGeneratedDisplay1={externalFunded1.fundGenerated}
                  rwlFileName11={externallyFundedInitialFilename1}
                  studyPoints1={externalFunded1.points || 0}
                  onRemoveRwl1File1={() => {
                    setExternalFunded1({
                      ...externalFunded1,
                      file: undefined
                    });
                    setExternallyFundedInitialFilename1(undefined);
                  }}
                  titleOfStudy1={externalFunded1.title}
                  titleOfStudyHandler1={e => {
                    setExternalFunded1({
                      ...externalFunded1,
                      title: e,
                      points:
                        externalFunded1.fundGenerated ===
                          "Above 1,000,000.00" &&
                        externalFunded1.file &&
                        e
                          ? 3
                          : externalFunded1.fundGenerated ===
                              "500,001.00 - 1,000,000.00" &&
                            externalFunded1.file &&
                            e
                          ? 2
                          : externalFunded1.fundGenerated ===
                              "500,000.00 and below" &&
                            externalFunded1.file &&
                            e
                          ? 1
                          : 0
                    });
                  }}
                  // FUNDED 2
                  fundGeneratedHandler2={e => {
                    if (e) {
                      setExternalFunded2({
                        ...externalFunded2!,
                        fundGenerated: e,
                        points:
                          e === "Above 1,000,000.00" &&
                          externalFunded2?.file &&
                          externalFunded2.title
                            ? 3
                            : e === "500,001.00 - 1,000,000.00" &&
                              externalFunded2?.file &&
                              externalFunded2.title
                            ? 2
                            : e === "500,000.00 and below" &&
                              externalFunded2?.file &&
                              externalFunded2.title
                            ? 1
                            : 0
                      });
                    }
                  }}
                  rwlFile1Handler2={e => {
                    if (e) {
                      setExternalFunded2({
                        ...externalFunded2!,
                        file: e
                      });
                    }
                  }}
                  fundGeneratedDisplay2={externalFunded2?.fundGenerated}
                  rwlFileName12={externallyFundedInitialFilename2}
                  studyPoints2={externalFunded2?.points || 0}
                  onRemoveRwl1File2={() => {
                    setExternalFunded2({
                      ...externalFunded2!,
                      file: undefined
                    });
                    setExternallyFundedInitialFilename2(undefined);
                  }}
                  titleOfStudy2={externalFunded2?.title || ""}
                  titleOfStudyHandler2={e => {
                    setExternalFunded2({
                      ...externalFunded2!,
                      title: e,
                      points:
                        externalFunded2?.fundGenerated ===
                          "Above 1,000,000.00" &&
                        externalFunded2.file &&
                        e
                          ? 3
                          : externalFunded2?.fundGenerated ===
                              "500,001.00 - 1,000,000.00" &&
                            externalFunded2.file &&
                            e
                          ? 2
                          : externalFunded2?.fundGenerated ===
                              "500,000.00 and below" &&
                            externalFunded2.file &&
                            e
                          ? 1
                          : 0
                    });
                  }}
                  // FUNDED 3
                  fundGeneratedHandler3={e => {
                    if (e) {
                      setExternalFunded3({
                        ...externalFunded3!,
                        fundGenerated: e,
                        points:
                          e === "Above 1,000,000.00" &&
                          externalFunded3?.file &&
                          externalFunded3.title
                            ? 3
                            : e === "500,001.00 - 1,000,000.00" &&
                              externalFunded3?.file &&
                              externalFunded3.title
                            ? 2
                            : e === "500,000.00 and below" &&
                              externalFunded3?.file &&
                              externalFunded3.title
                            ? 1
                            : 0
                      });
                    }
                  }}
                  rwlFile1Handler3={e => {
                    if (e) {
                      setExternalFunded3({
                        ...externalFunded3!,
                        file: e
                      });
                    }
                  }}
                  fundGeneratedDisplay3={externalFunded3?.fundGenerated}
                  rwlFileName13={externallyFundedInitialFilename3}
                  studyPoints3={externalFunded3?.points || 0}
                  onRemoveRwl1File3={() => {
                    setExternalFunded3({
                      ...externalFunded3!,
                      file: undefined
                    });
                    setExternallyFundedInitialFilename3(undefined);
                  }}
                  titleOfStudy3={externalFunded3?.title || ""}
                  titleOfStudyHandler3={e => {
                    setExternalFunded3({
                      ...externalFunded3!,
                      title: e,
                      points:
                        externalFunded3?.fundGenerated ===
                          "Above 1,000,000.00" &&
                        externalFunded3.file &&
                        e
                          ? 3
                          : externalFunded3?.fundGenerated ===
                              "500,001.00 - 1,000,000.00" &&
                            externalFunded3.file &&
                            e
                          ? 2
                          : externalFunded3?.fundGenerated ===
                              "500,000.00 and below" &&
                            externalFunded3.file &&
                            e
                          ? 1
                          : 0
                    });
                  }}
                  // FUNDED 4
                  fundGeneratedHandler4={e => {
                    if (e) {
                      setExternalFunded4({
                        ...externalFunded4!,
                        fundGenerated: e,
                        points:
                          e === "Above 1,000,000.00" &&
                          externalFunded4?.file &&
                          externalFunded4.title
                            ? 3
                            : e === "500,001.00 - 1,000,000.00" &&
                              externalFunded4?.file &&
                              externalFunded4.title
                            ? 2
                            : e === "500,000.00 and below" &&
                              externalFunded4?.file &&
                              externalFunded4.title
                            ? 1
                            : 0
                      });
                    }
                  }}
                  rwlFile1Handler4={e => {
                    if (e) {
                      setExternalFunded4({
                        ...externalFunded4!,
                        file: e
                      });
                    }
                  }}
                  fundGeneratedDisplay4={externalFunded4?.fundGenerated}
                  rwlFileName14={externallyFundedInitialFilename4}
                  studyPoints4={externalFunded4?.points || 0}
                  onRemoveRwl1File4={() => {
                    setExternalFunded4({
                      ...externalFunded4!,
                      file: undefined
                    });
                    setExternallyFundedInitialFilename4(undefined);
                  }}
                  titleOfStudy4={externalFunded4?.title || ""}
                  titleOfStudyHandler4={e => {
                    setExternalFunded4({
                      ...externalFunded4!,
                      title: e,
                      points:
                        externalFunded4?.fundGenerated ===
                          "Above 1,000,000.00" &&
                        externalFunded4.file &&
                        e
                          ? 3
                          : externalFunded4?.fundGenerated ===
                              "500,001.00 - 1,000,000.00" &&
                            externalFunded4.file &&
                            e
                          ? 2
                          : externalFunded4?.fundGenerated ===
                              "500,000.00 and below" &&
                            externalFunded4.file &&
                            e
                          ? 1
                          : 0
                    });
                  }}
                  // FUNDED 5
                  fundGeneratedHandler5={e => {
                    if (e) {
                      setExternalFunded5({
                        ...externalFunded5!,
                        fundGenerated: e,
                        points:
                          e === "Above 1,000,000.00" &&
                          externalFunded5?.file &&
                          externalFunded5.title
                            ? 3
                            : e === "500,001.00 - 1,000,000.00" &&
                              externalFunded5?.file &&
                              externalFunded5.title
                            ? 2
                            : e === "500,000.00 and below" &&
                              externalFunded5?.file &&
                              externalFunded5.title
                            ? 1
                            : 0
                      });
                    }
                  }}
                  rwlFile1Handler5={e => {
                    if (e) {
                      setExternalFunded5({
                        ...externalFunded5!,
                        file: e
                      });
                    }
                  }}
                  fundGeneratedDisplay5={externalFunded5?.fundGenerated}
                  rwlFileName15={externallyFundedInitialFilename5}
                  studyPoints5={externalFunded5?.points || 0}
                  onRemoveRwl1File5={() => {
                    setExternalFunded5({
                      ...externalFunded5!,
                      file: undefined
                    });
                    setExternallyFundedInitialFilename5(undefined);
                  }}
                  titleOfStudy5={externalFunded5?.title || ""}
                  titleOfStudyHandler5={e => {
                    setExternalFunded5({
                      ...externalFunded5!,
                      title: e,
                      points:
                        externalFunded5?.fundGenerated ===
                          "Above 1,000,000.00" &&
                        externalFunded5.file &&
                        e
                          ? 3
                          : externalFunded5?.fundGenerated ===
                              "500,001.00 - 1,000,000.00" &&
                            externalFunded5.file &&
                            e
                          ? 2
                          : externalFunded5?.fundGenerated ===
                              "500,000.00 and below" &&
                            externalFunded5.file &&
                            e
                          ? 1
                          : 0
                    });
                  }}
                  externalFunded1={externalFunded1}
                  externalFunded2={externalFunded2}
                  externalFunded3={externalFunded3}
                  externalFunded4={externalFunded4}
                  externalFunded5={externalFunded5}
                />
              )}
            </>
          ) : (
            <>
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
            </>
          )}
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
            studyPoints={
              (cvsuFunded1?.points || studyCvsuPoints || 0) +
              (cvsuFunded2?.points ||
                (cvsuFunded1?.points ? studyCvsuPoints : 0)) +
              (cvsuFunded3?.points ||
                (cvsuFunded2?.points ? studyCvsuPoints : 0)) +
              (cvsuFunded4?.points ||
                (cvsuFunded3?.points ? studyCvsuPoints : 0)) +
              (cvsuFunded5?.points ||
                (cvsuFunded4?.points ? studyCvsuPoints : 0)) +
              (externalFunded1?.points || studyExternallyPoints || 0) +
              (externalFunded2?.points ||
                (externalFunded1?.points ? studyExternallyPoints : 0)) +
              (externalFunded3?.points ||
                (externalFunded2?.points ? studyExternallyPoints : 0)) +
              (externalFunded4?.points ||
                (externalFunded3?.points ? studyExternallyPoints : 0)) +
              (externalFunded5?.points ||
                (externalFunded4?.points ? studyExternallyPoints : 0))
            }
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
            isConfirming={isConfirming}
            setIsConfirming={setIsConfirmingHandler}
          />
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

const FooterContainer = styled.div`
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  z-index: 1;
`;

export default ResearchWorkload;
