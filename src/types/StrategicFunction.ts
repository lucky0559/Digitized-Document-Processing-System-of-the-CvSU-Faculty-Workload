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
  designationAsMemberOfAdhoc?: string;
  designationAsMemberOfAdhocFile?: File;
  designationAsMemberOfAdhocPoints?: number;
  designationAsMemberOfAdhocFilePath?: string;
  memberAdhocFilePath?: string;
  academicAdvisees?: string;
  academicAdviseesFile?: File;
  academicAdviseesPoints?: number;
  academicAdviseesFilePath?: string;
  sfwPoints?: number;
  remarks?: string;
};
