import { PointsAndRemarks } from "../screens/WorkloadReview/RemarksWorkload";

export type ExtensionWorkloadType = {
  id?: string;
  designationExtensionActivity?: string[];
  extensionActivityFile?: File;
  extensionActivityFilename?: string;
  extensionActivityFilePath?: string;
  resourcePerson?: string[];
  certificateFile?: File[];
  certificateFilenames?: string[];
  certificateFilePath?: string[];
  totalNumberHours?: string;
  summaryOfHoursFile?: File;
  summaryOfHoursFilename?: string;
  summaryOfHoursFilePath?: string;
  ewlPoints?: number;
  remarks?: PointsAndRemarks;
  isSubmitted?: boolean;
  hoursRenderedPoints?: number;
  designationPoints?: number;
  resourcePerson1Points?: number;
  resourcePerson2Points?: number;
  resourcePerson3Points?: number;
  deanPoints?: PointsAndRemarks[];
};
