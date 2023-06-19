import {
  Designation,
  DesignationWithPoints
} from "../screens/FacultyWorkload/StrategicFunction/StrategicFunction";
import { PointsAndRemarks } from "../screens/WorkloadReview/RemarksWorkload";

export type StrategicFunctionType = {
  id?: string;
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
  designationAsSportTrainorAcademic2?: string;
  designationAsSportTrainorAcademicFile2?: File;
  designationAsSportTrainorAcademicPoints2?: number;
  designationAsSportTrainorAcademicFilePath2?: string;
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
  designationAsMemberOfAdhoc2?: string;
  designationAsMemberOfAdhocFile2?: File;
  designationAsMemberOfAdhocPoints2?: number;
  designationAsMemberOfAdhocFilePath2?: string;
  memberAdhocFilePath2?: string;
  academicAdvisees?: string;
  academicAdviseesFile?: File;
  academicAdviseesPoints?: number;
  academicAdviseesFilePath?: string;
  sfwPoints?: number;
  remarks?: PointsAndRemarks[];
};
