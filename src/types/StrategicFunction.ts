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
  designationAsSportTrainorAcademic?: DesignationWithPoints;
  sportsTrainorAcademicFilePath?: string;
  designationAsMemberOfAdhoc?: DesignationWithPoints;
  memberAdhocFilePath?: string;
  academicAdvisees?: DesignationWithPoints;
  academicAdviseesFilePath?: string;
  sfwPoints?: number;
  remarks?: string;
};
