import { PointsAndRemarks } from "../screens/WorkloadReview/RemarksWorkload";

export type TeachingWorkLoadType = {
  id?: string;
  numberOfPreparations?: string;
  contactHours?: string;
  totalNoOfStudents?: string;
  twlFile?: File;
  twlFilePath?: string;
  totalTeachingWorkload?: number;
  remarks?: PointsAndRemarks;
  isSubmitted?: boolean;
};
