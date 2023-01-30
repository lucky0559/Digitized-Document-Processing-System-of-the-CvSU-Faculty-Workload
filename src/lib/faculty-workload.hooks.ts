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
  strategicFunctionWorkload: StrategicFunctionType
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
    strategicFunctionWorkload.approvedUniversityDesignationFile &&
    strategicFunctionWorkload.designationUniversityLevel &&
    strategicFunctionWorkload.approvedCollegeCampusDesignationFile &&
    strategicFunctionWorkload.approvedDepartmentDesignationFile &&
    strategicFunctionWorkload.coachAdviserCertificateFile &&
    strategicFunctionWorkload.approvedDesignationFile &&
    strategicFunctionWorkload.listOfAdviseesFile
  ) {
    let approvedUniversityDesignationFile1;
    let approvedUniversityDesignationFile2;
    let approvedUniversityDesignationFile3;
    let approvedCollegeCampusDesignationFile1;
    let approvedCollegeCampusDesignationFile2;
    let approvedCollegeCampusDesignationFile3;
    let approvedDepartmentDesignationFile1;
    let approvedDepartmentDesignationFile2;
    let approvedDepartmentDesignationFile3;
    try {
      // UNIVERSITY
      if (strategicFunctionWorkload.approvedUniversityDesignationFile[0]) {
        approvedUniversityDesignationFile1 =
          await approvedUniversityDesignationS3.uploadFile(
            strategicFunctionWorkload.approvedUniversityDesignationFile[0]
          );
        strategicFunctionWorkload.approvedUniversityDesignationFilePath =
          approvedUniversityDesignationFile1?.location;
      }
      if (strategicFunctionWorkload.approvedUniversityDesignationFile[1]) {
        approvedUniversityDesignationFile2 =
          await approvedUniversityDesignationS3.uploadFile(
            strategicFunctionWorkload.approvedUniversityDesignationFile[1]
          );
        strategicFunctionWorkload.approvedUniversityDesignationFilePath =
          approvedUniversityDesignationFile2?.location;
      }
      if (strategicFunctionWorkload.approvedUniversityDesignationFile[2]) {
        approvedUniversityDesignationFile3 =
          await approvedUniversityDesignationS3.uploadFile(
            strategicFunctionWorkload.approvedUniversityDesignationFile[2]
          );
        strategicFunctionWorkload.approvedUniversityDesignationFilePath =
          approvedUniversityDesignationFile3?.location;
      }
      // COLLEGE CAMPUS
      if (strategicFunctionWorkload.approvedCollegeCampusDesignationFile[0]) {
        approvedCollegeCampusDesignationFile1 =
          await approvedCollegeCampusDesignationS3.uploadFile(
            strategicFunctionWorkload.approvedCollegeCampusDesignationFile[0]
          );
        strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath =
          approvedCollegeCampusDesignationFile1.location;
      }
      if (strategicFunctionWorkload.approvedCollegeCampusDesignationFile[1]) {
        approvedCollegeCampusDesignationFile2 =
          await approvedCollegeCampusDesignationS3.uploadFile(
            strategicFunctionWorkload.approvedCollegeCampusDesignationFile[1]
          );
        strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath =
          approvedCollegeCampusDesignationFile2.location;
      }
      if (strategicFunctionWorkload.approvedCollegeCampusDesignationFile[2]) {
        approvedCollegeCampusDesignationFile3 =
          await approvedCollegeCampusDesignationS3.uploadFile(
            strategicFunctionWorkload.approvedCollegeCampusDesignationFile[2]
          );
        strategicFunctionWorkload.approvedCollegeCampusDesignationFilePath =
          approvedCollegeCampusDesignationFile3.location;
      }
      // DEPARTMENT
      if (strategicFunctionWorkload.approvedDepartmentDesignationFile[0]) {
        approvedDepartmentDesignationFile1 =
          await approvedDepartmentDesignationS3.uploadFile(
            strategicFunctionWorkload.approvedDepartmentDesignationFile[0]
          );
        strategicFunctionWorkload.approvedDepartmentDesignationFilePath =
          approvedDepartmentDesignationFile1.location;
      }

      const coachAdviserCertificateFile =
        await coachAdviserCertificateS3.uploadFile(
          strategicFunctionWorkload.coachAdviserCertificateFile
        );
      const listAdviseesFile = await listAdviseesS3.uploadFile(
        strategicFunctionWorkload.listOfAdviseesFile
      );
      const approvedDesignationFile = await approvedDesignationS3.uploadFile(
        strategicFunctionWorkload.approvedDesignationFile
      );

      strategicFunctionWorkload.coachAdviserCertificateFilePath =
        coachAdviserCertificateFile.location;
      strategicFunctionWorkload.approvedDesignationFilePath =
        approvedDesignationFile.location;
      strategicFunctionWorkload.listOfAdviseesFilePath =
        listAdviseesFile.location;
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
