export const Default = {
  MINIMUM_PASSWORD_LENGTH: 8,
  ACCESS_TOKEN_STORAGE_KEY: "api/access_token",
  REFRESH_TOKEN_STORAGE_KEY: "api/refresh_token",
  // API_URL: "https://digitized-document-processing-system-of-the-cvsu-c8nie5gk8.vercel.app/"
  API_URL: "http://localhost:3000/"
};

const AWS_CONFIG = {
  ACCESS_KEY_ID: "AKIARXPIJAABWWF427VJ",
  SECRET_ACCESS_KEY: "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"
};

export const twlAwsConfig = {
  bucketName: "teaching-workload",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const rwlAwsConfig = {
  bucketName: "research-workload",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const rwl1AwsConfig = {
  bucketName: "research-workload1",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const rwl2AwsConfig = {
  bucketName: "research-workload2",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const extensionActivityAwsConfig = {
  bucketName: "extension-activity",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const extensionCertificateFileAwsConfig = {
  bucketName: "extension-certificate-file",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const extensionSummaryHoursAwsConfig = {
  bucketName: "extension-summary-hours",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const strategicApprovedUniversityDesignationAwsConfig = {
  bucketName: "approved-university-designation",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const strategicApprovedCollegeCampusDesignationAwsConfig = {
  bucketName: "approved-college-campus-designation",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const strategicApprovedDepartmentDesignationAwsConfig = {
  bucketName: "approved-department-designation",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const strategicCoachAdviserCertificateAwsConfig = {
  bucketName: "strategic-coach-adviser-certificate",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const strategicApprovedDesignationAwsConfig = {
  bucketName: "strategic-approved-designation",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const strategicListOfAdviseesAwsConfig = {
  bucketName: "strategic-advisees-lists",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const eSignatureAwsConfig = {
  bucketName: "user-e-signature",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};
