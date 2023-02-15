import {
  Designation,
  DesignationWithPoints
} from "../screens/FacultyWorkload/StrategicFunction/StrategicFunction";

export type StrategicFunctionType = {
  designationUniversityLevel?: Designation[];
  approvedUniversityDesignationFilePath1?: string;
  approvedUniversityDesignationFilePath2?: string;
  approvedUniversityDesignationFilePath3?: string;
  approvedUniversityDesignationFilePath4?: string;
  designationCollegeCampusLevel?: Designation[];
  approvedCollegeCampusDesignationFilePath1?: string;
  approvedCollegeCampusDesignationFilePath2?: string;
  approvedCollegeCampusDesignationFilePath3?: string;
  approvedCollegeCampusDesignationFilePath4?: string;
  designationDepartmentLevel?: Designation[];
  approvedDepartmentDesignationFilePath1?: string;
  approvedDepartmentDesignationFilePath2?: string;
  approvedDepartmentDesignationFilePath3?: string;
  approvedDepartmentDesignationFilePath4?: string;
  designationAsSportTrainorAcademic?: DesignationWithPoints;
  sportsTrainorAcademicFilePath?: string;
  designationAsMemberOfAdhoc?: DesignationWithPoints;
  memberAdhocFilePath?: string;
  academicAdvisees?: DesignationWithPoints;
  academicAdviseesFilePath?: string;
  sfwPoints?: number;
  remarks?: string;
};
