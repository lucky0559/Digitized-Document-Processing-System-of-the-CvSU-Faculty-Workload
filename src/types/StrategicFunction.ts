import {
  Designation,
  DesignationWithPoints
} from "../screens/FacultyWorkload/StrategicFunction/StrategicFunction";

export type StrategicFunctionType = {
  designationUniversityLevel?: string[];
  designationUniversityLevelFiles?: File[];
  approvedUniversityDesignationFilePath?: string[];
  designationCollegeCampusLevel?: string[];
  designationCollegeCampusLevelFiles?: File[];
  approvedCollegeCampusDesignationFilePath?: string[];
  designationDepartmentLevel?: string[];
  designationDepartmentLevelFiles?: File[];
  approvedDepartmentDesignationFilePath?: string[];
  designationAsSportTrainorAcademic?: string;
  designationAsSportTrainorAcademicFile?: File;
  designationAsSportTrainorAcademicPoints?: number;
  designationAsSportTrainorAcademicFilePath?: string;
  designationAsSportTrainorAcademic1?: string;
  designationAsSportTrainorAcademicFile1?: File;
  designationAsSportTrainorAcademicPoints1?: number;
  designationAsSportTrainorAcademicFilePath1?: string;
  designationAsMemberOfAdhoc?: string;
  designationAsMemberOfAdhocFile?: File;
  designationAsMemberOfAdhocPoints?: number;
  designationAsMemberOfAdhocFilePath?: string;
  memberAdhocFilePath?: string;
  designationAsMemberOfAdhoc1?: string;
  designationAsMemberOfAdhocFile1?: File;
  designationAsMemberOfAdhocPoints1?: number;
  designationAsMemberOfAdhocFilePath1?: string;
  memberAdhocFilePath1?: string;
  academicAdvisees?: string;
  academicAdviseesFile?: File;
  academicAdviseesPoints?: number;
  academicAdviseesFilePath?: string;
  academicAdvisees1?: string;
  academicAdviseesFile1?: File;
  academicAdviseesPoints1?: number;
  academicAdviseesFilePath1?: string;
  sfwPoints?: number;
  remarks?: string;
};
