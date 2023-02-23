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
  strategicApprovedDesignationAwsConfig,
  strategicApprovedUniversityDesignationAwsConfig,
  strategicCoachAdviserCertificateAwsConfig,
  strategicListOfAdviseesAwsConfig,
  twlAwsConfig
} from "../constants/Defaults";
import { ExtensionWorkloadType } from "../types/ExtensionWorkload";
import { ResearchWorkLoadType } from "../types/ResearchWorkLoad";
import { StrategicFunctionType } from "../types/StrategicFunction";
import { TeachingWorkLoadType } from "../types/TeachingWorkload";

export const SaveTeachingWorkload = async (
  teachingWorkload: TeachingWorkLoadType
) => {
  const userId = localStorage.getItem("userId");
  const s3 = new ReactS3Client(twlAwsConfig);

  if (teachingWorkload.twlFile) {
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

  if (researchWorkload.rwlFile1 && researchWorkload.rwlFile2) {
    try {
      const file1 = await rwl1AwsConfigS3.uploadFile(researchWorkload.rwlFile1);
      const file2 = await rwl2AwsConfigS3.uploadFile(researchWorkload.rwlFile2);

      researchWorkload.rwlFilePath1 = file1.location;
      researchWorkload.rwlFilePath2 = file2.location;
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
      const certificateFile = await extensionActivityS3.uploadFile(
        extensionWorkload.certificateFile
      );
      const extensionActivityFile = await extensionCertificateFileS3.uploadFile(
        extensionWorkload.extensionActivityFile
      );
      const summaryOfHoursFile = await extensionSummaryHoursS3.uploadFile(
        extensionWorkload.summaryOfHoursFile
      );
      extensionWorkload.certificateFilePath = certificateFile.location;
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
  const coachAdviserCertificateS3 = new ReactS3Client(
    strategicCoachAdviserCertificateAwsConfig
  );
  const approvedDesignationS3 = new ReactS3Client(
    strategicApprovedDesignationAwsConfig
  );
  const listAdviseesS3 = new ReactS3Client(strategicListOfAdviseesAwsConfig);

  if (
    strategicFunctionWorkload?.designationUniversityLevel?.length! > 0 &&
    strategicFunctionWorkload?.designationCollegeCampusLevel?.length! > 0 &&
    strategicFunctionWorkload?.designationDepartmentLevel?.length! > 0 &&
    strategicFunctionWorkload?.designationAsSportTrainorAcademic &&
    strategicFunctionWorkload?.designationAsMemberOfAdhoc &&
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

    let memberAdhocFile;

    let academicAdviseesFile;

    try {
      // UNIVERSITY
      if (strategicFunctionWorkload.designationUniversityLevel?.[0].file) {
        approvedUniversityDesignationFile1 =
          await approvedUniversityDesignationS3.uploadFile(
            strategicFunctionWorkload.designationUniversityLevel[0].file
          );
        strategicFunctionWorkload.approvedUniversityDesignationFilePath1 =
          approvedUniversityDesignationFile1?.location;
      }
      if (strategicFunctionWorkload.designationUniversityLevel?.[1].file) {
        approvedUniversityDesignationFile2 =
          await approvedUniversityDesignationS3.uploadFile(
            strategicFunctionWorkload.designationUniversityLevel[1].file
          );
        strategicFunctionWorkload.approvedUniversityDesignationFilePath2 =
          approvedUniversityDesignationFile2?.location;
      }
      if (strategicFunctionWorkload.designationUniversityLevel?.[2].file) {
        approvedUniversityDesignationFile3 =
          await approvedUniversityDesignationS3.uploadFile(
            strategicFunctionWorkload.designationUniversityLevel[2].file
          );
        strategicFunctionWorkload.approvedUniversityDesignationFilePath3 =
          approvedUniversityDesignationFile3?.location;
      }
      if (strategicFunctionWorkload.designationUniversityLevel?.[3].file) {
        approvedUniversityDesignationFile4 =
          await approvedUniversityDesignationS3.uploadFile(
            strategicFunctionWorkload.designationUniversityLevel[3].file
          );
        strategicFunctionWorkload.approvedUniversityDesignationFilePath4 =
          approvedUniversityDesignationFile4?.location;
      }
      // COLLEGE CAMPUS
      if (strategicFunctionWorkload.designationCollegeCampusLevel?.[0].file) {
        approvedCollegeCampusDesignationFile1 =
          await approvedCollegeCampusDesignationS3.uploadFile(
            strategicFunctionWorkload.designationCollegeCampusLevel[0].file
          );
        strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath1 =
          approvedCollegeCampusDesignationFile1.location;
      }
      if (strategicFunctionWorkload.designationCollegeCampusLevel?.[1].file) {
        approvedCollegeCampusDesignationFile2 =
          await approvedCollegeCampusDesignationS3.uploadFile(
            strategicFunctionWorkload.designationCollegeCampusLevel?.[1].file
          );
        strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath2 =
          approvedCollegeCampusDesignationFile2.location;
      }
      if (strategicFunctionWorkload.designationCollegeCampusLevel?.[2].file) {
        approvedCollegeCampusDesignationFile3 =
          await approvedCollegeCampusDesignationS3.uploadFile(
            strategicFunctionWorkload.designationCollegeCampusLevel?.[2].file
          );
        strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath3 =
          approvedCollegeCampusDesignationFile3.location;
      }
      if (strategicFunctionWorkload.designationCollegeCampusLevel?.[3].file) {
        approvedCollegeCampusDesignationFile4 =
          await approvedCollegeCampusDesignationS3.uploadFile(
            strategicFunctionWorkload.designationCollegeCampusLevel?.[3].file
          );
        strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath4 =
          approvedCollegeCampusDesignationFile4.location;
      }
      // DEPARTMENT
      if (strategicFunctionWorkload.designationDepartmentLevel?.[0].file) {
        approvedDepartmentDesignationFile1 =
          await approvedDepartmentDesignationS3.uploadFile(
            strategicFunctionWorkload.designationDepartmentLevel?.[0].file
          );
        strategicFunctionWorkload.approvedDepartmentDesignationFilePath1 =
          approvedDepartmentDesignationFile1.location;
      }
      if (strategicFunctionWorkload.designationDepartmentLevel?.[1].file) {
        approvedDepartmentDesignationFile2 =
          await approvedDepartmentDesignationS3.uploadFile(
            strategicFunctionWorkload.designationDepartmentLevel?.[1].file
          );
        strategicFunctionWorkload.approvedDepartmentDesignationFilePath2 =
          approvedDepartmentDesignationFile2.location;
      }
      if (strategicFunctionWorkload.designationDepartmentLevel?.[2].file) {
        approvedDepartmentDesignationFile3 =
          await approvedDepartmentDesignationS3.uploadFile(
            strategicFunctionWorkload.designationDepartmentLevel?.[2].file
          );
        strategicFunctionWorkload.approvedDepartmentDesignationFilePath3 =
          approvedDepartmentDesignationFile3.location;
      }
      if (strategicFunctionWorkload.designationDepartmentLevel?.[3].file) {
        approvedDepartmentDesignationFile4 =
          await approvedDepartmentDesignationS3.uploadFile(
            strategicFunctionWorkload.designationDepartmentLevel?.[3].file
          );
        strategicFunctionWorkload.approvedDepartmentDesignationFilePath4 =
          approvedDepartmentDesignationFile4.location;
      }

      if (strategicFunctionWorkload.designationAsSportTrainorAcademic.file) {
        sportsTrainorAcademicFile = await coachAdviserCertificateS3.uploadFile(
          strategicFunctionWorkload.designationAsSportTrainorAcademic.file
        );
      }

      if (strategicFunctionWorkload.designationAsMemberOfAdhoc.file) {
        memberAdhocFile = await listAdviseesS3.uploadFile(
          strategicFunctionWorkload.designationAsMemberOfAdhoc.file
        );
      }

      if (strategicFunctionWorkload.academicAdvisees?.file) {
        academicAdviseesFile = await listAdviseesS3.uploadFile(
          strategicFunctionWorkload.academicAdvisees.file
        );
      }

      strategicFunctionWorkload.sportsTrainorAcademicFilePath =
        sportsTrainorAcademicFile?.location;

      strategicFunctionWorkload.memberAdhocFilePath = memberAdhocFile?.location;
      strategicFunctionWorkload.academicAdviseesFilePath =
        academicAdviseesFile?.location;
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
