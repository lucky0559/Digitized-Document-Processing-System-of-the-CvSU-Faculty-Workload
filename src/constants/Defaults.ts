export const Default = {
  MINIMUM_PASSWORD_LENGTH: 8,
  ACCESS_TOKEN_STORAGE_KEY: "api/access_token",
  REFRESH_TOKEN_STORAGE_KEY: "api/refresh_token",
  // API_URL:
  //   "https://digitized-document-processing-system-of-the-cvsu-c8nie5gk8.vercel.app/"
  API_URL: "http://localhost:3000/"
};

const AWS_CONFIG = {
  ACCESS_KEY_ID: "AKIARXPIJAABRUOS45FB",
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

export const strategicSportsTrainorAwsConfig = {
  bucketName: "strategic-sports-trainor",
  region: "ap-southeast-1",
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
};

export const strategicMemberAdhocAwsConfig = {
  bucketName: "strategic-member-adhoc",
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
