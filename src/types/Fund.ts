type CvsuFunded = {
  title: string;
  typeOfStudy: string;
  designationStudy: string;
  file?: File;
  filename?: string;
  filePath?: string;
  points: number;
};

type ExternallyFunded = {
  title: string;
  fundGenerated: string;
  file?: File;
  filename?: string;
  filePath?: string;
  points: number;
};

export type { CvsuFunded, ExternallyFunded };
