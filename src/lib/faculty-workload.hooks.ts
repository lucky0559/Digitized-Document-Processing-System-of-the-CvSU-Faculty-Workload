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
import { PointsAndRemarks } from '../screens/WorkloadReview/RemarksWorkload';

export const SaveTeachingWorkload = async (
  teachingWorkload: TeachingWorkLoadType
) => {
  const userId = localStorage.getItem("userId");
  const s3 = new ReactS3Client(twlAwsConfig);

  if (
    teachingWorkload.twlFile &&
    teachingWorkload.numberOfPreparations &&
    Number(teachingWorkload.numberOfPreparations) > 0 &&
    teachingWorkload.contactHours &&
    Number(teachingWorkload.contactHours) > 0 &&
    teachingWorkload.totalNoOfStudents &&
    Number(teachingWorkload.totalNoOfStudents) > 0
  ) {
    try {
      const res = await s3.uploadFile(teachingWorkload.twlFile);
      teachingWorkload.twlFilePath = res.location;
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
  researchWorkload: ResearchWorkLoadType
) => {
  const userId = localStorage.getItem("userId");
  const rwlAwsConfigS3 = new ReactS3Client(rwlAwsConfig);
  const rwl1AwsConfigS3 = new ReactS3Client(rwl1AwsConfig);
  const rwl2AwsConfigS3 = new ReactS3Client(rwl2AwsConfig);

  let disseminatedResearchFile1;
  let disseminatedResearchFile2;
  let disseminatedResearchFile3;
  let disseminatedResearchFile4;

  if (researchWorkload.rwlFile) {
    try {
      const file = await rwlAwsConfigS3.uploadFile(researchWorkload.rwlFile);
      researchWorkload.rwlFilePath = file.location;

      const { data } = await axios.post(
        `research-workload/${userId}/save`,
        researchWorkload
      );
      return { data };
    } catch (exception) {
      console.log(exception);
    }
  }

  if (researchWorkload.rwlFile1) {
    try {
      const file1 = await rwl1AwsConfigS3.uploadFile(researchWorkload.rwlFile1);

      if (
        researchWorkload.disseminatedResearch?.length! > 0 &&
        researchWorkload.disseminatedResearchFiles?.[0]
      ) {
        disseminatedResearchFile1 = await rwl2AwsConfigS3.uploadFile(
          researchWorkload.disseminatedResearchFiles?.[0]
        );
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
        researchWorkload.disseminatedResearchFilesPath?.push(
          disseminatedResearchFile4.location
        );
      }

      researchWorkload.rwlFilePath1 = file1.location;
      const { data } = await axios.post(
        `research-workload/${userId}/save`,
        researchWorkload
      );
      return { data };
    } catch (exception) {
      console.log(exception);
    }
  }
};

export const SaveExtensionWorkload = async (
  extensionWorkload: ExtensionWorkloadType
) => {
  const userId = localStorage.getItem("userId");
  const extensionActivityS3 = new ReactS3Client(extensionActivityAwsConfig);
  const extensionCertificateFileS3 = new ReactS3Client(
    extensionCertificateFileAwsConfig
  );
  const extensionSummaryHoursS3 = new ReactS3Client(
    extensionSummaryHoursAwsConfig
  );

  if (
    extensionWorkload.certificateFile &&
    extensionWorkload.extensionActivityFile &&
    extensionWorkload.summaryOfHoursFile
  ) {
    try {
      let certificateFile;
      let certificateFile1;
      let certificateFile2;
      if (extensionWorkload.certificateFile[0]) {
        certificateFile = await extensionActivityS3.uploadFile(
          extensionWorkload.certificateFile[0]
        );
      }
      if (extensionWorkload.certificateFile[1]) {
        certificateFile1 = await extensionActivityS3.uploadFile(
          extensionWorkload.certificateFile[1]
        );
      }
      if (extensionWorkload.certificateFile[2]) {
        certificateFile2 = await extensionActivityS3.uploadFile(
          extensionWorkload.certificateFile[2]
        );
      }

      const extensionActivityFile = await extensionCertificateFileS3.uploadFile(
        extensionWorkload.extensionActivityFile
      );
      const summaryOfHoursFile = await extensionSummaryHoursS3.uploadFile(
        extensionWorkload.summaryOfHoursFile
      );
      extensionWorkload.certificateFilePath = [
        certificateFile?.location!,
        certificateFile1?.location!,
        certificateFile2?.location!
      ].filter(Boolean);
      extensionWorkload.extensionActivityFilePath =
        extensionActivityFile.location;
      extensionWorkload.summaryOfHoursFilePath = summaryOfHoursFile.location;
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

      // if (strategicFunctionWorkload.designationCollegeCampusLevel?.[0].file) {
      //   approvedCollegeCampusDesignationFile1 =
      //     await approvedCollegeCampusDesignationS3.uploadFile(
      //       strategicFunctionWorkload.designationCollegeCampusLevel[0].file
      //     );
      //   strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath1 =
      //     approvedCollegeCampusDesignationFile1.location;
      // }
      // if (strategicFunctionWorkload.designationCollegeCampusLevel?.[1].file) {
      //   approvedCollegeCampusDesignationFile2 =
      //     await approvedCollegeCampusDesignationS3.uploadFile(
      //       strategicFunctionWorkload.designationCollegeCampusLevel?.[1].file
      //     );
      //   strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath2 =
      //     approvedCollegeCampusDesignationFile2.location;
      // }
      // if (strategicFunctionWorkload.designationCollegeCampusLevel?.[2].file) {
      //   approvedCollegeCampusDesignationFile3 =
      //     await approvedCollegeCampusDesignationS3.uploadFile(
      //       strategicFunctionWorkload.designationCollegeCampusLevel?.[2].file
      //     );
      //   strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath3 =
      //     approvedCollegeCampusDesignationFile3.location;
      // }
      // if (strategicFunctionWorkload.designationCollegeCampusLevel?.[3].file) {
      //   approvedCollegeCampusDesignationFile4 =
      //     await approvedCollegeCampusDesignationS3.uploadFile(
      //       strategicFunctionWorkload.designationCollegeCampusLevel?.[3].file
      //     );
      //   strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath4 =
      //     approvedCollegeCampusDesignationFile4.location;
      // }
      // // DEPARTMENT
      // if (strategicFunctionWorkload.designationDepartmentLevel?.[0].file) {
      //   approvedDepartmentDesignationFile1 =
      //     await approvedDepartmentDesignationS3.uploadFile(
      //       strategicFunctionWorkload.designationDepartmentLevel?.[0].file
      //     );
      //   strategicFunctionWorkload.approvedDepartmentDesignationFilePath1 =
      //     approvedDepartmentDesignationFile1.location;
      // }
      // if (strategicFunctionWorkload.designationDepartmentLevel?.[1].file) {
      //   approvedDepartmentDesignationFile2 =
      //     await approvedDepartmentDesignationS3.uploadFile(
      //       strategicFunctionWorkload.designationDepartmentLevel?.[1].file
      //     );
      //   strategicFunctionWorkload.approvedDepartmentDesignationFilePath2 =
      //     approvedDepartmentDesignationFile2.location;
      // }
      // if (strategicFunctionWorkload.designationDepartmentLevel?.[2].file) {
      //   approvedDepartmentDesignationFile3 =
      //     await approvedDepartmentDesignationS3.uploadFile(
      //       strategicFunctionWorkload.designationDepartmentLevel?.[2].file
      //     );
      //   strategicFunctionWorkload.approvedDepartmentDesignationFilePath3 =
      //     approvedDepartmentDesignationFile3.location;
      // }
      // if (strategicFunctionWorkload.designationDepartmentLevel?.[3].file) {
      //   approvedDepartmentDesignationFile4 =
      //     await approvedDepartmentDesignationS3.uploadFile(
      //       strategicFunctionWorkload.designationDepartmentLevel?.[3].file
      //     );
      //   strategicFunctionWorkload.approvedDepartmentDesignationFilePath4 =
      //     approvedDepartmentDesignationFile4.location;
      // }

      // if (strategicFunctionWorkload.designationAsSportTrainorAcademic.file) {
      //   sportsTrainorAcademicFile = await coachAdviserCertificateS3.uploadFile(
      //     strategicFunctionWorkload.designationAsSportTrainorAcademic.file
      //   );
      // }

      // if (strategicFunctionWorkload.designationAsMemberOfAdhoc.file) {
      //   memberAdhocFile = await listAdviseesS3.uploadFile(
      //     strategicFunctionWorkload.designationAsMemberOfAdhoc.file
      //   );
      // }

      // if (strategicFunctionWorkload.academicAdvisees?.file) {
      //   academicAdviseesFile = await listAdviseesS3.uploadFile(
      //     strategicFunctionWorkload.academicAdvisees.file
      //   );
      // }

      // strategicFunctionWorkload.sportsTrainorAcademicFilePath =
      //   sportsTrainorAcademicFile?.location;

      // strategicFunctionWorkload.memberAdhocFilePath = memberAdhocFile?.location;
      // strategicFunctionWorkload.academicAdviseesFilePath =
      //   academicAdviseesFile?.location;

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

export const GetAllPendingTeachingWorkloadDC = async () => {
  const { data } = await axios.get(
    "teaching-workload/all-pending-teaching-workload-dc"
  );

  return { data };
};

export const GetAllPendingTeachingWorkloadDean = async () => {
  const { data } = await axios.get(
    "teaching-workload/all-pending-teaching-workload-dean"
  );

  return { data };
};

export const GetAllPendingTeachingWorkloadOVPAA = async () => {
  const { data } = await axios.get(
    "teaching-workload/all-pending-teaching-workload-ovpaa"
  );

  return { data };
};

export const GetAllPendingResearchWorkloadDC = async () => {
  const { data } = await axios.get(
    "research-workload/all-pending-research-workload-dc"
  );

  return { data };
};

export const GetAllPendingResearchWorkloadDean = async () => {
  const { data } = await axios.get(
    "research-workload/all-pending-research-workload-dean"
  );

  return { data };
};

export const GetAllPendingResearchWorkloadOVPAA = async () => {
  const { data } = await axios.get(
    "research-workload/all-pending-research-workload-OVPAA"
  );

  return { data };
};

export const GetAllPendingExtensionWorkloadDC = async () => {
  const { data } = await axios.get(
    "extension-workload/all-pending-extension-workload-dc"
  );

  return { data };
};

export const GetAllPendingExtensionWorkloadDean = async () => {
  const { data } = await axios.get(
    "extension-workload/all-pending-extension-workload-dean"
  );

  return { data };
};

export const GetAllPendingExtensionWorkloadOVPAA = async () => {
  const { data } = await axios.get(
    "extension-workload/all-pending-extension-workload-ovpaa"
  );

  return { data };
};

export const GetAllPendingStrategicWorkloadDC = async () => {
  const { data } = await axios.get(
    "strategic-function-workload/all-pending-strategic-workload-dc"
  );

  return { data };
};

export const GetAllPendingStrategicWorkloadDean = async () => {
  const { data } = await axios.get(
    "strategic-function-workload/all-pending-strategic-workload-dean"
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

export const OVPAAApproveTeachingWorkload = async (remarks: PointsAndRemarks) => {
  const { data } = await axios.patch(
    `teaching-workload/${remarks}/ovpaa-approve-workload`
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
