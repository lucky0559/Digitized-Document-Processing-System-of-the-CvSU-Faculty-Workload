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
  rwlFile?: File;
  rwlFilePath?: string;
  rwlFile1?: File;
  rwlFilePath1?: string;
  disseminatedResearchFilesPath?: string[];
  rwlPoints?: number;
  remarks?: PointsAndRemarks[];
  status?: string;
};
