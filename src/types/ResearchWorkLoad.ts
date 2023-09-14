import { PointsAndRemarks } from "../screens/WorkloadReview/RemarksWorkload";
import { CvsuFunded, ExternallyFunded } from "./Fund";

export type ResearchWorkLoadType = {
  id?: string;
  cvsuFunded: CvsuFunded[];
  cvsuFundedFilenames?: string[];
  cvsuFundedFilePath?: string[];
  externallyFunded: ExternallyFunded[];
  externallyFundedFilenames?: string[];
  externallyFundedFilePath?: string[];
  disseminatedResearch?: string[];
  disseminatedResearchFiles?: File[];
  disseminatedResearchFilenames?: string[];
  disseminatedResearchFilesPath?: string[];
  rwlPoints?: number;
  remarks?: PointsAndRemarks;
  status?: string;
  isSubmitted?: boolean;
};
