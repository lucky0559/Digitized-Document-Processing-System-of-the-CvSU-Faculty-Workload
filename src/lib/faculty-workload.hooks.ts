import ReactS3Client from "react-aws-s3-typescript";
import axios from "../api/axios";
import {
  extensionActivityAwsConfig,
  extensionCertificateFileAwsConfig,
  extensionSummaryHoursAwsConfig,
  rwl1AwsConfig,
  rwl2AwsConfig,
  rwlAwsConfig,
  strategicApprovedCollegeCampusDesignationAwsConfig,
  strategicApprovedDepartmentDesignationAwsConfig,
  strategicMemberAdhocAwsConfig,
  strategicApprovedUniversityDesignationAwsConfig,
  strategicSportsTrainorAwsConfig,
  strategicListOfAdviseesAwsConfig,
  twlAwsConfig
} from "../constants/Defaults";
import { ExtensionWorkloadType } from "../types/ExtensionWorkload";
import { ResearchWorkLoadType } from "../types/ResearchWorkLoad";
import { StrategicFunctionType } from "../types/StrategicFunction";
import { TeachingWorkLoadType } from "../types/TeachingWorkload";
import { PointsAndRemarks } from "../screens/WorkloadReview/RemarksWorkload";
import { WORKLOAD_STATUS } from "../enums/workloadEnums";

export const SaveTeachingWorkload = async (
  teachingWorkload: TeachingWorkLoadType,
  workloadStatus: number
) => {
  const userId = localStorage.getItem("userId");
  const s3 = new ReactS3Client(twlAwsConfig);

  switch (workloadStatus) {
    case WORKLOAD_STATUS.SAVE:
      teachingWorkload.isSubmitted = false;
      break;
    case WORKLOAD_STATUS.SUBMITTED:
      teachingWorkload.isSubmitted = true;
      break;
    default:
      break;
  }

  if (
    (teachingWorkload.twlFile || teachingWorkload.filename) &&
    teachingWorkload.numberOfPreparations &&
    Number(teachingWorkload.numberOfPreparations) > 0 &&
    teachingWorkload.contactHours &&
    Number(teachingWorkload.contactHours) > 0 &&
    teachingWorkload.totalNoOfStudents &&
    Number(teachingWorkload.totalNoOfStudents) > 0
  ) {
    try {
      if (teachingWorkload.twlFile) {
        const res = await s3.uploadFile(teachingWorkload.twlFile);
        teachingWorkload.filename = teachingWorkload.twlFile.name;
        teachingWorkload.twlFilePath = res.location;
      }
      const { data } = await axios.post(
        `teaching-workload/${userId}/save`,
        teachingWorkload
      );
      return { data };
    } catch (exception) {
      console.log(exception);
    }
  }
};

export const SaveResearchWorkload = async (
  researchWorkload: ResearchWorkLoadType,
  workloadStatus: number
) => {
  const userId = localStorage.getItem("userId");
  const rwlAwsConfigS3 = new ReactS3Client(rwlAwsConfig);
  const rwl1AwsConfigS3 = new ReactS3Client(rwl1AwsConfig);
  const rwl2AwsConfigS3 = new ReactS3Client(rwl2AwsConfig);

  switch (workloadStatus) {
    case WORKLOAD_STATUS.SAVE:
      researchWorkload.isSubmitted = false;
      break;
    case WORKLOAD_STATUS.SUBMITTED:
      researchWorkload.isSubmitted = true;
      break;
    default:
      break;
  }

  let disseminatedResearchFile1;
  let disseminatedResearchFile2;
  let disseminatedResearchFile3;
  let disseminatedResearchFile4;

  if (researchWorkload.fundingOfStudy === "CvSU Funded") {
    if (researchWorkload.rwlFile) {
      const file = await rwlAwsConfigS3.uploadFile(researchWorkload.rwlFile);
      researchWorkload.rwlFilename = researchWorkload.rwlFile.name;
      researchWorkload.rwlFilePath = file.location;
    }

    if (
      researchWorkload.disseminatedResearch?.length! > 0 &&
      researchWorkload.disseminatedResearchFiles?.[0]
    ) {
      disseminatedResearchFile1 = await rwl2AwsConfigS3.uploadFile(
        researchWorkload.disseminatedResearchFiles?.[0]
      );
      researchWorkload.disseminatedResearchFilenames = [
        researchWorkload.disseminatedResearchFiles?.[0].name
      ];
      researchWorkload.disseminatedResearchFilesPath = [
        disseminatedResearchFile1.location
      ];
    }

    if (
      researchWorkload.disseminatedResearch?.length! > 0 &&
      researchWorkload.disseminatedResearchFiles?.[1]
    ) {
      disseminatedResearchFile2 = await rwl2AwsConfigS3.uploadFile(
        researchWorkload.disseminatedResearchFiles?.[1]
      );
      researchWorkload.disseminatedResearchFilenames?.push(
        researchWorkload.disseminatedResearchFiles?.[1].name
      );
      researchWorkload.disseminatedResearchFilesPath?.push(
        disseminatedResearchFile2.location
      );
    }

    if (
      researchWorkload.disseminatedResearch?.length! > 0 &&
      researchWorkload.disseminatedResearchFiles?.[2]
    ) {
      disseminatedResearchFile3 = await rwl2AwsConfigS3.uploadFile(
        researchWorkload.disseminatedResearchFiles?.[2]
      );
      researchWorkload.disseminatedResearchFilenames?.push(
        researchWorkload.disseminatedResearchFiles?.[2].name
      );
      researchWorkload.disseminatedResearchFilesPath?.push(
        disseminatedResearchFile3.location
      );
    }

    if (
      researchWorkload.disseminatedResearch?.length! > 0 &&
      researchWorkload.disseminatedResearchFiles?.[3]
    ) {
      disseminatedResearchFile4 = await rwl2AwsConfigS3.uploadFile(
        researchWorkload.disseminatedResearchFiles?.[3]
      );
      researchWorkload.disseminatedResearchFilenames?.push(
        researchWorkload.disseminatedResearchFiles?.[3].name
      );
      researchWorkload.disseminatedResearchFilesPath?.push(
        disseminatedResearchFile4.location
      );
    }

    const { data } = await axios.post(
      `research-workload/${userId}/save`,
      researchWorkload
    );
    return { data };
  } else {
    if (researchWorkload.rwlFile1) {
      const file1 = await rwl1AwsConfigS3.uploadFile(researchWorkload.rwlFile1);
      researchWorkload.rwlFilename1 = researchWorkload.rwlFile1.name;
      researchWorkload.rwlFilePath1 = file1.location;
    }

    if (
      researchWorkload.disseminatedResearch?.length! > 0 &&
      researchWorkload.disseminatedResearchFiles?.[0]
    ) {
      disseminatedResearchFile1 = await rwl2AwsConfigS3.uploadFile(
        researchWorkload.disseminatedResearchFiles?.[0]
      );
      researchWorkload.disseminatedResearchFilenames = [
        researchWorkload.disseminatedResearchFiles?.[0].name
      ];
      researchWorkload.disseminatedResearchFilesPath = [
        disseminatedResearchFile1.location
      ];
    }

    if (
      researchWorkload.disseminatedResearch?.length! > 0 &&
      researchWorkload.disseminatedResearchFiles?.[1]
    ) {
      disseminatedResearchFile2 = await rwl2AwsConfigS3.uploadFile(
        researchWorkload.disseminatedResearchFiles?.[1]
      );
      researchWorkload.disseminatedResearchFilenames?.push(
        researchWorkload.disseminatedResearchFiles?.[1].name
      );
      researchWorkload.disseminatedResearchFilesPath?.push(
        disseminatedResearchFile2.location
      );
    }

    if (
      researchWorkload.disseminatedResearch?.length! > 0 &&
      researchWorkload.disseminatedResearchFiles?.[2]
    ) {
      disseminatedResearchFile3 = await rwl2AwsConfigS3.uploadFile(
        researchWorkload.disseminatedResearchFiles?.[2]
      );
      researchWorkload.disseminatedResearchFilenames?.push(
        researchWorkload.disseminatedResearchFiles?.[2].name
      );
      researchWorkload.disseminatedResearchFilesPath?.push(
        disseminatedResearchFile3.location
      );
    }

    if (
      researchWorkload.disseminatedResearch?.length! > 0 &&
      researchWorkload.disseminatedResearchFiles?.[3]
    ) {
      disseminatedResearchFile4 = await rwl2AwsConfigS3.uploadFile(
        researchWorkload.disseminatedResearchFiles?.[3]
      );
      researchWorkload.disseminatedResearchFilenames?.push(
        researchWorkload.disseminatedResearchFiles?.[3].name
      );
      researchWorkload.disseminatedResearchFilesPath?.push(
        disseminatedResearchFile4.location
      );
    }

    const { data } = await axios.post(
      `research-workload/${userId}/save`,
      researchWorkload
    );
    return { data };
  }
};

export const SaveExtensionWorkload = async (
  extensionWorkload: ExtensionWorkloadType,
  workloadStatus: number
) => {
  const userId = localStorage.getItem("userId");
  const extensionActivityS3 = new ReactS3Client(extensionActivityAwsConfig);
  const extensionCertificateFileS3 = new ReactS3Client(
    extensionCertificateFileAwsConfig
  );
  const extensionSummaryHoursS3 = new ReactS3Client(
    extensionSummaryHoursAwsConfig
  );

  switch (workloadStatus) {
    case WORKLOAD_STATUS.SAVE:
      extensionWorkload.isSubmitted = false;
      break;
    case WORKLOAD_STATUS.SUBMITTED:
      extensionWorkload.isSubmitted = true;
      break;
    default:
      break;
  }

  if (
    (extensionWorkload.certificateFile ||
      extensionWorkload.certificateFilenames) &&
    (extensionWorkload.extensionActivityFile ||
      extensionWorkload.extensionActivityFilename) &&
    (extensionWorkload.summaryOfHoursFile ||
      extensionWorkload.summaryOfHoursFilename)
  ) {
    try {
      let certificateFile;
      let certificateFilename = "";
      let certificateFile1;
      let certificateFilename1 = "";
      let certificateFile2;
      let certificateFilename2 = "";

      if (extensionWorkload.certificateFile?.[0]) {
        certificateFile = await extensionActivityS3.uploadFile(
          extensionWorkload.certificateFile[0]
        );
        certificateFilename = extensionWorkload.certificateFile[0].name;
      }
      if (extensionWorkload.certificateFile?.[1]) {
        certificateFile1 = await extensionActivityS3.uploadFile(
          extensionWorkload.certificateFile[1]
        );
        certificateFilename1 = extensionWorkload.certificateFile[1].name;
      }
      if (extensionWorkload.certificateFile?.[2]) {
        certificateFile2 = await extensionActivityS3.uploadFile(
          extensionWorkload.certificateFile[2]
        );
        certificateFilename2 = extensionWorkload.certificateFile[2].name;
      }
      if (extensionWorkload.extensionActivityFile) {
        const extensionActivityFile =
          await extensionCertificateFileS3.uploadFile(
            extensionWorkload.extensionActivityFile
          );
        extensionWorkload.extensionActivityFilename =
          extensionWorkload.extensionActivityFile.name;
        extensionWorkload.extensionActivityFilePath =
          extensionActivityFile.location;
        extensionWorkload.extensionActivityFilename =
          extensionWorkload.extensionActivityFile.name;
      }

      if (extensionWorkload.summaryOfHoursFile) {
        const summaryOfHoursFile = await extensionSummaryHoursS3.uploadFile(
          extensionWorkload.summaryOfHoursFile
        );
        extensionWorkload.summaryOfHoursFilename =
          extensionWorkload.summaryOfHoursFile.name;
        extensionWorkload.summaryOfHoursFilePath = summaryOfHoursFile.location;
        extensionWorkload.summaryOfHoursFilename =
          extensionWorkload.summaryOfHoursFile.name;
      }

      extensionWorkload.certificateFilePath = [
        certificateFile
          ? certificateFile?.location!
          : extensionWorkload.certificateFilePath?.[0]!,
        certificateFile1
          ? certificateFile1?.location!
          : extensionWorkload.certificateFilePath?.[1]!,
        certificateFile2
          ? certificateFile2?.location!
          : extensionWorkload.certificateFilePath?.[2]!
      ].filter(Boolean);

      if (!!extensionWorkload.certificateFile?.length) {
        extensionWorkload.certificateFilenames = [
          certificateFilename
            ? certificateFilename!
            : extensionWorkload.certificateFilenames?.[0]!,
          certificateFilename1
            ? certificateFilename1!
            : extensionWorkload.certificateFilenames?.[1]!,
          certificateFilename2
            ? certificateFilename2!
            : extensionWorkload.certificateFilenames?.[2]!
        ].filter(Boolean);
      }

      const { data } = await axios.post(
        `extension-workload/${userId}/save`,
        extensionWorkload
      );
      return { data };
    } catch (exception) {
      console.log(exception);
    }
  }
};

export const SaveStrategicFunctionWorkload = async (
  strategicFunctionWorkload?: StrategicFunctionType
) => {
  const userId = localStorage.getItem("userId");
  const approvedUniversityDesignationS3 = new ReactS3Client(
    strategicApprovedUniversityDesignationAwsConfig
  );
  const approvedCollegeCampusDesignationS3 = new ReactS3Client(
    strategicApprovedCollegeCampusDesignationAwsConfig
  );
  const approvedDepartmentDesignationS3 = new ReactS3Client(
    strategicApprovedDepartmentDesignationAwsConfig
  );
  const strategicSportsTrainorS3 = new ReactS3Client(
    strategicSportsTrainorAwsConfig
  );
  const memberAdhocS3 = new ReactS3Client(strategicMemberAdhocAwsConfig);
  const listAdviseesS3 = new ReactS3Client(strategicListOfAdviseesAwsConfig);

  if (
    strategicFunctionWorkload?.designationUniversityLevel?.length! > 0 ||
    strategicFunctionWorkload?.designationCollegeCampusLevel?.length! > 0 ||
    strategicFunctionWorkload?.designationDepartmentLevel?.length! > 0 ||
    strategicFunctionWorkload?.designationAsSportTrainorAcademic ||
    strategicFunctionWorkload?.designationAsSportTrainorAcademic1 ||
    strategicFunctionWorkload?.designationAsSportTrainorAcademic2 ||
    strategicFunctionWorkload?.designationAsMemberOfAdhoc ||
    strategicFunctionWorkload?.designationAsMemberOfAdhoc1 ||
    strategicFunctionWorkload?.designationAsMemberOfAdhoc2 ||
    strategicFunctionWorkload?.academicAdvisees
  ) {
    let approvedUniversityDesignationFile1;
    let approvedUniversityDesignationFile2;
    let approvedUniversityDesignationFile3;
    let approvedUniversityDesignationFile4;
    let approvedCollegeCampusDesignationFile1;
    let approvedCollegeCampusDesignationFile2;
    let approvedCollegeCampusDesignationFile3;
    let approvedCollegeCampusDesignationFile4;
    let approvedDepartmentDesignationFile1;
    let approvedDepartmentDesignationFile2;
    let approvedDepartmentDesignationFile3;
    let approvedDepartmentDesignationFile4;

    let sportsTrainorAcademicFile;
    let sportsTrainorAcademicFile1;
    let sportsTrainorAcademicFile2;

    let memberAdhocFile;
    let memberAdhocFile1;
    let memberAdhocFile2;

    let academicAdviseesFile;

    let numberOfUniversity = 0;
    let numberOfCollegeCampus = 0;
    let numberOfDepartmentLevel = 0;
    let sportsTrainorPoints = 0;
    let memberOfAdhocPoints = 0;
    let academicAdviseesPoints = 0;

    strategicFunctionWorkload!.sfwPoints = 0;

    try {
      // UNIVERSITY
      if (
        strategicFunctionWorkload?.designationUniversityLevel?.length! > 0 &&
        strategicFunctionWorkload?.designationUniversityLevelFiles?.[0]
      ) {
        approvedUniversityDesignationFile1 =
          await approvedUniversityDesignationS3.uploadFile(
            strategicFunctionWorkload?.designationUniversityLevelFiles[0]
          );
        strategicFunctionWorkload.approvedUniversityDesignationFilePath = [
          approvedUniversityDesignationFile1?.location
        ];
        numberOfUniversity++;
      }
      if (
        strategicFunctionWorkload?.designationUniversityLevel?.length! > 0 &&
        strategicFunctionWorkload?.designationUniversityLevelFiles?.[1]
      ) {
        approvedUniversityDesignationFile2 =
          await approvedUniversityDesignationS3.uploadFile(
            strategicFunctionWorkload.designationUniversityLevelFiles[1]
          );
        strategicFunctionWorkload.approvedUniversityDesignationFilePath?.push(
          approvedUniversityDesignationFile2?.location
        );
        numberOfUniversity++;
      }
      if (
        strategicFunctionWorkload?.designationUniversityLevel?.length! > 0 &&
        strategicFunctionWorkload?.designationUniversityLevelFiles?.[2]
      ) {
        approvedUniversityDesignationFile3 =
          await approvedUniversityDesignationS3.uploadFile(
            strategicFunctionWorkload.designationUniversityLevelFiles[2]
          );
        strategicFunctionWorkload.approvedUniversityDesignationFilePath?.push(
          approvedUniversityDesignationFile3?.location
        );
        numberOfUniversity++;
      }
      if (
        strategicFunctionWorkload?.designationUniversityLevel?.length! > 0 &&
        strategicFunctionWorkload?.designationUniversityLevelFiles?.[3]
      ) {
        approvedUniversityDesignationFile4 =
          await approvedUniversityDesignationS3.uploadFile(
            strategicFunctionWorkload.designationUniversityLevelFiles[3]
          );
        strategicFunctionWorkload.approvedUniversityDesignationFilePath?.push(
          approvedUniversityDesignationFile4?.location
        );
        numberOfUniversity++;
      }
      // COLLEGE CAMPUS
      if (
        strategicFunctionWorkload?.designationCollegeCampusLevel?.length! > 0 &&
        strategicFunctionWorkload?.designationCollegeCampusLevelFiles?.[0]
      ) {
        approvedCollegeCampusDesignationFile1 =
          await approvedCollegeCampusDesignationS3.uploadFile(
            strategicFunctionWorkload?.designationCollegeCampusLevelFiles[0]
          );
        strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath = [
          approvedCollegeCampusDesignationFile1?.location
        ];
        numberOfCollegeCampus++;
      }
      if (
        strategicFunctionWorkload?.designationCollegeCampusLevel?.length! > 0 &&
        strategicFunctionWorkload?.designationCollegeCampusLevelFiles?.[1]
      ) {
        approvedCollegeCampusDesignationFile2 =
          await approvedCollegeCampusDesignationS3.uploadFile(
            strategicFunctionWorkload.designationCollegeCampusLevelFiles[1]
          );
        strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath?.push(
          approvedCollegeCampusDesignationFile2?.location
        );
        numberOfCollegeCampus++;
      }
      if (
        strategicFunctionWorkload?.designationCollegeCampusLevel?.length! > 0 &&
        strategicFunctionWorkload?.designationCollegeCampusLevelFiles?.[2]
      ) {
        approvedCollegeCampusDesignationFile3 =
          await approvedCollegeCampusDesignationS3.uploadFile(
            strategicFunctionWorkload.designationCollegeCampusLevelFiles[2]
          );
        strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath?.push(
          approvedCollegeCampusDesignationFile3?.location
        );
        numberOfCollegeCampus++;
      }
      if (
        strategicFunctionWorkload?.designationCollegeCampusLevel?.length! > 0 &&
        strategicFunctionWorkload?.designationCollegeCampusLevelFiles?.[3]
      ) {
        approvedCollegeCampusDesignationFile4 =
          await approvedCollegeCampusDesignationS3.uploadFile(
            strategicFunctionWorkload.designationCollegeCampusLevelFiles[3]
          );
        strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath?.push(
          approvedCollegeCampusDesignationFile4?.location
        );
        numberOfCollegeCampus++;
      }

      // DEPARTMENT
      if (
        strategicFunctionWorkload?.designationDepartmentLevel?.length! > 0 &&
        strategicFunctionWorkload?.designationDepartmentLevelFiles?.[0]
      ) {
        approvedDepartmentDesignationFile1 =
          await approvedDepartmentDesignationS3.uploadFile(
            strategicFunctionWorkload?.designationDepartmentLevelFiles[0]
          );
        strategicFunctionWorkload.approvedDepartmentDesignationFilePath = [
          approvedDepartmentDesignationFile1?.location
        ];
        numberOfDepartmentLevel++;
      }
      if (
        strategicFunctionWorkload?.designationDepartmentLevel?.length! > 0 &&
        strategicFunctionWorkload?.designationDepartmentLevelFiles?.[1]
      ) {
        approvedDepartmentDesignationFile2 =
          await approvedDepartmentDesignationS3.uploadFile(
            strategicFunctionWorkload.designationDepartmentLevelFiles[1]
          );
        strategicFunctionWorkload.approvedDepartmentDesignationFilePath?.push(
          approvedDepartmentDesignationFile2?.location
        );
        numberOfDepartmentLevel++;
      }
      if (
        strategicFunctionWorkload?.designationDepartmentLevel?.length! > 0 &&
        strategicFunctionWorkload?.designationDepartmentLevelFiles?.[2]
      ) {
        approvedDepartmentDesignationFile3 =
          await approvedDepartmentDesignationS3.uploadFile(
            strategicFunctionWorkload.designationDepartmentLevelFiles[2]
          );
        strategicFunctionWorkload.approvedDepartmentDesignationFilePath?.push(
          approvedDepartmentDesignationFile3?.location
        );
        numberOfDepartmentLevel++;
      }
      if (
        strategicFunctionWorkload?.designationDepartmentLevel?.length! > 0 &&
        strategicFunctionWorkload?.designationDepartmentLevelFiles?.[3]
      ) {
        approvedDepartmentDesignationFile4 =
          await approvedDepartmentDesignationS3.uploadFile(
            strategicFunctionWorkload.designationDepartmentLevelFiles[3]
          );
        strategicFunctionWorkload.approvedDepartmentDesignationFilePath?.push(
          approvedDepartmentDesignationFile4?.location
        );
        numberOfDepartmentLevel++;
      }

      // SPORTS TRAINOR ACADEMIC
      if (
        strategicFunctionWorkload?.designationAsSportTrainorAcademic?.length! >
          0 &&
        strategicFunctionWorkload?.designationAsSportTrainorAcademicFile &&
        strategicFunctionWorkload?.designationAsSportTrainorAcademicPoints &&
        strategicFunctionWorkload?.designationAsSportTrainorAcademicPoints > 0
      ) {
        sportsTrainorAcademicFile = await strategicSportsTrainorS3.uploadFile(
          strategicFunctionWorkload?.designationAsSportTrainorAcademicFile!
        );
        strategicFunctionWorkload.designationAsSportTrainorAcademicFilePath =
          sportsTrainorAcademicFile?.location;
        sportsTrainorPoints =
          sportsTrainorPoints +
          strategicFunctionWorkload?.designationAsSportTrainorAcademicPoints!;
      }

      // SPORTS TRAINOR ACADEMIC1
      if (
        strategicFunctionWorkload?.designationAsSportTrainorAcademic1?.length! >
          0 &&
        strategicFunctionWorkload?.designationAsSportTrainorAcademicFile1 &&
        strategicFunctionWorkload?.designationAsSportTrainorAcademicPoints1 &&
        strategicFunctionWorkload?.designationAsSportTrainorAcademicPoints1 > 0
      ) {
        sportsTrainorAcademicFile1 = await strategicSportsTrainorS3.uploadFile(
          strategicFunctionWorkload?.designationAsSportTrainorAcademicFile1!
        );
        strategicFunctionWorkload.designationAsSportTrainorAcademicFilePath1 =
          sportsTrainorAcademicFile1?.location;
        sportsTrainorPoints =
          sportsTrainorPoints +
          strategicFunctionWorkload?.designationAsSportTrainorAcademicPoints1!;
      }

      // SPORTS TRAINOR ACADEMIC2
      if (
        strategicFunctionWorkload?.designationAsSportTrainorAcademic2?.length! >
          0 &&
        strategicFunctionWorkload?.designationAsSportTrainorAcademicFile2 &&
        strategicFunctionWorkload?.designationAsSportTrainorAcademicPoints2 &&
        strategicFunctionWorkload?.designationAsSportTrainorAcademicPoints2 > 0
      ) {
        sportsTrainorAcademicFile2 = await strategicSportsTrainorS3.uploadFile(
          strategicFunctionWorkload?.designationAsSportTrainorAcademicFile2!
        );
        strategicFunctionWorkload.designationAsSportTrainorAcademicFilePath2 =
          sportsTrainorAcademicFile2?.location;
        sportsTrainorPoints =
          sportsTrainorPoints +
          strategicFunctionWorkload?.designationAsSportTrainorAcademicPoints2!;
      }

      // MEMBER OF ADHOC
      if (
        strategicFunctionWorkload?.designationAsMemberOfAdhoc?.length! > 0 &&
        strategicFunctionWorkload?.designationAsMemberOfAdhocFile &&
        strategicFunctionWorkload?.designationAsMemberOfAdhocPoints &&
        strategicFunctionWorkload?.designationAsMemberOfAdhocPoints! > 0
      ) {
        memberAdhocFile = await memberAdhocS3.uploadFile(
          strategicFunctionWorkload?.designationAsMemberOfAdhocFile
        );
        strategicFunctionWorkload.designationAsMemberOfAdhocFilePath =
          memberAdhocFile?.location;
        memberOfAdhocPoints =
          memberOfAdhocPoints +
          strategicFunctionWorkload.designationAsMemberOfAdhocPoints;
      }

      // MEMBER OF ADHOC1
      if (
        strategicFunctionWorkload?.designationAsMemberOfAdhoc1?.length! > 0 &&
        strategicFunctionWorkload?.designationAsMemberOfAdhocFile1 &&
        strategicFunctionWorkload?.designationAsMemberOfAdhocPoints1 &&
        strategicFunctionWorkload?.designationAsMemberOfAdhocPoints1! > 0
      ) {
        memberAdhocFile1 = await memberAdhocS3.uploadFile(
          strategicFunctionWorkload?.designationAsMemberOfAdhocFile1
        );
        strategicFunctionWorkload.designationAsMemberOfAdhocFilePath1 =
          memberAdhocFile1?.location;
        memberOfAdhocPoints =
          memberOfAdhocPoints +
          strategicFunctionWorkload.designationAsMemberOfAdhocPoints1;
      }

      // MEMBER OF ADHOC2
      if (
        strategicFunctionWorkload?.designationAsMemberOfAdhoc2?.length! > 0 &&
        strategicFunctionWorkload?.designationAsMemberOfAdhocFile2 &&
        strategicFunctionWorkload?.designationAsMemberOfAdhocPoints2 &&
        strategicFunctionWorkload?.designationAsMemberOfAdhocPoints2! > 0
      ) {
        memberAdhocFile2 = await memberAdhocS3.uploadFile(
          strategicFunctionWorkload?.designationAsMemberOfAdhocFile2
        );
        strategicFunctionWorkload.designationAsMemberOfAdhocFilePath2 =
          memberAdhocFile2?.location;
        memberOfAdhocPoints =
          memberOfAdhocPoints +
          strategicFunctionWorkload.designationAsMemberOfAdhocPoints2;
      }

      // ACADEMIC ADVISEES
      if (
        strategicFunctionWorkload?.academicAdvisees?.length! > 0 &&
        strategicFunctionWorkload?.academicAdviseesFile &&
        strategicFunctionWorkload?.academicAdviseesPoints &&
        strategicFunctionWorkload?.academicAdviseesPoints! > 0
      ) {
        academicAdviseesFile = await listAdviseesS3.uploadFile(
          strategicFunctionWorkload?.academicAdviseesFile
        );
        strategicFunctionWorkload.academicAdviseesFilePath =
          academicAdviseesFile?.location;
        academicAdviseesPoints =
          academicAdviseesPoints +
          strategicFunctionWorkload.academicAdviseesPoints;
      }

      numberOfUniversity = numberOfUniversity * 18;
      numberOfCollegeCampus = numberOfCollegeCampus * 15;
      numberOfDepartmentLevel = numberOfDepartmentLevel * 12;

      strategicFunctionWorkload!.sfwPoints =
        numberOfUniversity +
        numberOfCollegeCampus +
        numberOfDepartmentLevel +
        sportsTrainorPoints +
        sportsTrainorPoints +
        memberOfAdhocPoints +
        academicAdviseesPoints;

      const { data } = await axios.post(
        `strategic-function-workload/${userId}/save`,
        strategicFunctionWorkload
      );
      return { data };
    } catch (exception) {
      console.log(exception);
    }
  }
};

export const GetAllPendingTeachingWorkloadDC = async (userId: string) => {
  const { data } = await axios.get(
    `teaching-workload/${userId}/all-pending-teaching-workload-dc`
  );

  return { data };
};

export const GetAllPendingTeachingWorkloadDean = async (userId: string) => {
  const { data } = await axios.get(
    `teaching-workload/${userId}/all-pending-teaching-workload-dean`
  );

  return { data };
};

export const GetAllPendingTeachingWorkloadOVPAA = async () => {
  const { data } = await axios.get(
    "teaching-workload/all-pending-teaching-workload-ovpaa"
  );

  return { data };
};

export const GetAllPendingResearchWorkloadDC = async (userId: string) => {
  const { data } = await axios.get(
    `research-workload/${userId}/all-pending-research-workload-dc`
  );

  return { data };
};

export const GetAllPendingResearchWorkloadDean = async (userId: string) => {
  const { data } = await axios.get(
    `research-workload/${userId}/all-pending-research-workload-dean`
  );

  return { data };
};

export const GetAllPendingResearchWorkloadOVPAA = async () => {
  const { data } = await axios.get(
    "research-workload/all-pending-research-workload-OVPAA"
  );

  return { data };
};

export const GetAllPendingExtensionWorkloadDC = async (userId: string) => {
  const { data } = await axios.get(
    `extension-workload/${userId}/all-pending-extension-workload-dc`
  );

  return { data };
};

export const GetAllPendingExtensionWorkloadDean = async (userId: string) => {
  const { data } = await axios.get(
    `extension-workload/${userId}/all-pending-extension-workload-dean`
  );

  return { data };
};

export const GetAllPendingExtensionWorkloadOVPAA = async () => {
  const { data } = await axios.get(
    "extension-workload/all-pending-extension-workload-ovpaa"
  );

  return { data };
};

export const GetAllPendingStrategicWorkloadDC = async (userId: string) => {
  const { data } = await axios.get(
    `strategic-function-workload/${userId}/all-pending-strategic-workload-dc`
  );

  return { data };
};

export const GetAllPendingStrategicWorkloadDean = async (userId: string) => {
  const { data } = await axios.get(
    `strategic-function-workload/${userId}/all-pending-strategic-workload-dean`
  );

  return { data };
};

export const GetAllPendingStrategicWorkloadOVPAA = async () => {
  const { data } = await axios.get(
    "strategic-function-workload/all-pending-strategic-workload-ovpaa"
  );

  return { data };
};

export const ApproveTeachingWorkload = async (workloadId?: string) => {
  const { data } = await axios.patch(
    `teaching-workload/${workloadId}/approve-workload`
  );

  return { data };
};

export const OVPAAApproveTeachingWorkload = async (
  remarks: PointsAndRemarks
) => {
  const { data } = await axios.patch(
    `teaching-workload/ovpaa-approve-workload`,
    remarks
  );

  return { data };
};

export const OVPAAApproveResearchWorkload = async (
  remarks: PointsAndRemarks
) => {
  const { data } = await axios.patch(
    `research-workload/ovpaa-approve-workload`,
    remarks
  );

  return { data };
};

export const OVPAAApproveExtensionWorkload = async (
  remarks: PointsAndRemarks
) => {
  const { data } = await axios.patch(
    `extension-workload/ovpaa-approve-workload`,
    remarks
  );

  return { data };
};

export const OVPAAApproveStrategicFunctionWorkload = async (
  remarks: PointsAndRemarks
) => {
  const { data } = await axios.patch(
    `strategic-function-workload/ovpaa-approve-workload`,
    remarks
  );

  return { data };
};

export const ApproveExtensionWorkload = async (workloadId?: string) => {
  const { data } = await axios.patch(
    `extension-workload/${workloadId}/approve-workload`
  );

  return { data };
};

export const ApproveResearchWorkload = async (workloadId?: string) => {
  const { data } = await axios.patch(
    `research-workload/${workloadId}/approve-workload`
  );

  return { data };
};

export const ApproveStrategicFunctionWorkload = async (workloadId?: string) => {
  const { data } = await axios.patch(
    `strategic-function-workload/${workloadId}/approve-workload`
  );

  return { data };
};

export const SendRemarks = async (
  currentProcessRole?: string,
  userId?: string,
  remarks?: string
) => {
  const { data } = await axios.post(
    `user/${currentProcessRole}/${userId}/${remarks}/send-remarks`
  );

  return { data };
};

export const ExtensionRemarksWorkload = async (
  workloadId?: string,
  remarks?: string
) => {
  const { data } = await axios.patch(
    `extension-workload/${workloadId}/${remarks}/remarks-workload`
  );

  return { data };
};

export const ResearchRemarksWorkload = async (
  workloadId?: string,
  remarks?: string
) => {
  const { data } = await axios.patch(
    `research-workload/${workloadId}/${remarks}/remarks-workload`
  );

  return { data };
};

export const StrategicRemarksWorkload = async (
  workloadId?: string,
  remarks?: string
) => {
  const { data } = await axios.patch(
    `strategic-function-workload/${workloadId}/${remarks}/remarks-workload`
  );

  return { data };
};

export const TeachingRemarksWorkload = async (
  workloadId?: string,
  remarks?: string
) => {
  const { data } = await axios.patch(
    `teaching-workload/${workloadId}/${remarks}/remarks-workload`
  );

  return { data };
};

export const GetExtensionWorkloadRemarksFaculty = async (userId: string) => {
  const { data } = await axios.get(
    `extension-workload/${userId}/workload-remarks`
  );

  return { data };
};

export const GetResearchWorkloadRemarksFaculty = async (userId: string) => {
  const { data } = await axios.get(
    `research-workload/${userId}/workload-remarks`
  );

  return { data };
};

export const GetStrategicWorkloadRemarksFaculty = async (userId: string) => {
  const { data } = await axios.get(
    `strategic-function-workload/${userId}/workload-remarks`
  );

  return { data };
};

export const GetTeachingWorkloadRemarksFaculty = async (userId: string) => {
  const { data } = await axios.get(
    `teaching-workload/${userId}/workload-remarks`
  );

  return { data };
};

export const GetTotalWorkloadPoints = async () => {
  const { data } = await axios.get(`extension-workload/workloads-approved`);

  return { data };
};

export const GetAllUserPendingWorkloads = async (email: string) => {
  const { data: teachingWorkloads } = await axios.get(
    `teaching-workload/${email}/all-pending-workloads`
  );

  const { data: extensionWorkloads } = await axios.get(
    `extension-workload/${email}/all-pending-workloads`
  );

  const { data: researchWorkloads } = await axios.get(
    `research-workload/${email}/all-pending-workloads`
  );

  const { data: strategicFunctionWorkloads } = await axios.get(
    `strategic-function-workload/${email}/all-pending-workloads`
  );

  return {
    teachingWorkloads,
    extensionWorkloads,
    researchWorkloads,
    strategicFunctionWorkloads
  };
};

export const getAllPendingWorkloadByIdAndCurrentProcessRole = async (
  userId: string,
  currentProcessRole: string
) => {
  const { data: teachingWorkloads } = await axios.get(
    `teaching-workload/${userId}/${currentProcessRole}/all-pending-by-process-role`
  );

  const { data: researchWorkloads } = await axios.get(
    `research-workload/${userId}/${currentProcessRole}/all-pending-by-process-role`
  );

  const { data: extensionWorkloads } = await axios.get(
    `extension-workload/${userId}/${currentProcessRole}/all-pending-by-process-role`
  );

  const { data: strategicFunctionWorkloads } = await axios.get(
    `strategic-function-workload/${userId}/${currentProcessRole}/all-pending-by-process-role`
  );

  return {
    teachingWorkloads,
    researchWorkloads,
    extensionWorkloads,
    strategicFunctionWorkloads
  };
};
