import { PointsAndRemarks } from "../screens/WorkloadReview/RemarksWorkload";

export type ExtensionWorkloadType = {
  id?: string;
  designationExtensionActivity?: string[];
  extensionActivityFile?: File;
  extensionActivityFilePath?: string;
  resourcePerson?: string[];
  certificateFile?: File[];
  certificateFilePath?: string[];
  totalNumberHours?: string;
  summaryOfHoursFile?: File;
  summaryOfHoursFilePath?: string;
  ewlPoints?: number;
  remarks?: PointsAndRemarks[];
};
