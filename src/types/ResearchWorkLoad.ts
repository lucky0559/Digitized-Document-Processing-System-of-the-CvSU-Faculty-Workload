import { PointsAndRemarks } from "../screens/WorkloadReview/RemarksWorkload";

export type ResearchWorkLoadType = {
  id?: string;
  titleOfStudy?: string;
  fundingOfStudy?: string;
  typeOfStudy?: string;
  designationStudy?: string;
  fundGenerated?: string;
  disseminatedResearch?: string[];
  disseminatedResearchFiles?: File[];
  disseminatedResearchFilenames?: string[];
  rwlFile?: File;
  rwlFilename?: string;
  rwlFilePath?: string;
  rwlFile1?: File;
  rwlFilename1?: string;
  rwlFilePath1?: string;
  disseminatedResearchFilesPath?: string[];
  rwlPoints?: number;
  remarks?: PointsAndRemarks;
  status?: string;
  isSubmitted?: boolean;
};
