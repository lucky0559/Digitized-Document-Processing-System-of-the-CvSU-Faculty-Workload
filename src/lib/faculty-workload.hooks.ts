import ReactS3Client from "react-aws-s3-typescript";
import axios from "../api/axios";
import {
  extensionActivityAwsConfig,
  extensionCertificateFileAwsConfig,
  extensionSummaryHoursAwsConfig,
  rwl1AwsConfig,
  rwl2AwsConfig,
  rwlAwsConfig,
  twlAwsConfig
} from "../constants/Defaults";
import { ExtensionWorkloadType } from "../types/ExtensionWorkload";
import { ResearchWorkLoadType } from "../types/ResearchWorkLoad";
import { TeachingWorkLoadType } from "../types/TeachingWorkload";

export const SaveTeachingWorkload = async (
  teachingWorkload: TeachingWorkLoadType
) => {
  const userId = "123";
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
  const userId = "123";
  const rwlAwsConfigS3 = new ReactS3Client(rwlAwsConfig);
  const rwl1AwsConfigS3 = new ReactS3Client(rwl1AwsConfig);
  const rwl2AwsConfigS3 = new ReactS3Client(rwl2AwsConfig);

  if (
    researchWorkload.rwlFile &&
    researchWorkload.rwlFile1 &&
    researchWorkload.rwlFile2
  ) {
    try {
      const file = await rwlAwsConfigS3.uploadFile(researchWorkload.rwlFile);
      const file1 = await rwl1AwsConfigS3.uploadFile(researchWorkload.rwlFile1);
      const file2 = await rwl2AwsConfigS3.uploadFile(researchWorkload.rwlFile2);
      researchWorkload.rwlFilePath = file.location;
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
  const userId = "123";
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
