import React from "react";
import styled from "styled-components";
import DropdownWithUpload from "../../../components/DropdownWithUpload";
import TextInputWithTitlePointUpload from "../../../components/TextInputWithTitlePointsUpload";
import TextInputWithUpload from "../../../components/TextInputWithUpload";
import { DROPDOWN_LISTS } from "../../../constants/Strings";
import { DesignationWithTitleAndPoints } from "./StrategicFunction";

type StrategicFunction2Props = {
  onSelectDepartmentDesignation1: (value: string) => void;
  onSelectDepartmentDesignation2: (value: string) => void;
  onSelectDepartmentDesignation3: (value: string) => void;
  textInputDepartmentDesignation4: (value: string) => void;
  departmentLevelInputDesignation: string;
  displayDesignationDepartment1: string | undefined;
  displayDesignationDepartment2: string | undefined;
  displayDesignationDepartment3: string | undefined;
  departmentLevelFileName1?: string;
  departmentLevelFileName2?: string;
  departmentLevelFileName3?: string;
  customDepartmentFileName?: string;
  onFileDepartmentLevelSelect1: (file?: File) => void;
  onFileDepartmentLevelSelect2: (file?: File) => void;
  onFileDepartmentLevelSelect3: (file?: File) => void;
  onFileCustomDepartmentLevelSelect: (file?: File) => void;
  onTextInputSportsSocioDesignationTitle: (value: string) => void;
  onTextInputSportsSocioDesignationPoints: (value: string) => void;
  sportsSocioTitle?: string;
  sportsSocioPoints?: string;
  fileHandlerSportsSocio: (value?: File) => void;
  fileNameSportsSocio?: string;
  onTextInputMemberUniversityWideDesignationTitle: (value: string) => void;
  onTextInputMemberUniversityWideDesignationPoints: (value: string) => void;
  memberUniversityTitle?: string;
  memberUniversityPoints?: string;
  fileHandlerMemberUniversity: (value?: File) => void;
  fileNameMemberUniversity?: string;
  onTextInputAcademicAdviserDesignationTitle: (value: string) => void;
  onTextInputAcademicAdviserDesignationPoints: (value: string) => void;
  academicAdviserTitle?: string;
  academicAdviserPoints?: string;
  fileHandlerAcademicAdviser: (value?: File) => void;
  fileNameAcademicAdviser?: string;
};

function StrategicFunction2({
  onSelectDepartmentDesignation1,
  onSelectDepartmentDesignation2,
  onSelectDepartmentDesignation3,
  textInputDepartmentDesignation4,
  departmentLevelInputDesignation,
  displayDesignationDepartment1,
  displayDesignationDepartment2,
  displayDesignationDepartment3,
  departmentLevelFileName1,
  departmentLevelFileName2,
  departmentLevelFileName3,
  customDepartmentFileName,
  onFileDepartmentLevelSelect1,
  onFileDepartmentLevelSelect2,
  onFileDepartmentLevelSelect3,
  onFileCustomDepartmentLevelSelect,
  onTextInputSportsSocioDesignationTitle,
  onTextInputSportsSocioDesignationPoints,
  sportsSocioTitle,
  sportsSocioPoints,
  fileHandlerSportsSocio,
  fileNameSportsSocio,
  onTextInputMemberUniversityWideDesignationTitle,
  onTextInputMemberUniversityWideDesignationPoints,
  memberUniversityTitle,
  memberUniversityPoints,
  fileHandlerMemberUniversity,
  fileNameMemberUniversity,
  onTextInputAcademicAdviserDesignationTitle,
  onTextInputAcademicAdviserDesignationPoints,
  academicAdviserTitle,
  academicAdviserPoints,
  fileHandlerAcademicAdviser,
  fileNameAcademicAdviser
}: StrategicFunction2Props) {
  return (
    <>
      <DepartmentLevelContainer>
        <LevelLabel>Designation at the Department Level</LevelLabel>
        <div>
          <DropdownWithUpload
            inputLabel="Designation 1"
            uploadLabel="Upload approved department designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_DEPARTMENT_LEVEL}
            onSelect={onSelectDepartmentDesignation1}
            val={displayDesignationDepartment1}
            selected={[
              displayDesignationDepartment2!,
              displayDesignationDepartment3!
            ]}
            onFileSelect={onFileDepartmentLevelSelect1}
            fileName={departmentLevelFileName1}
          />
          <DropdownWithUpload
            inputLabel="Designation 2"
            uploadLabel="Upload approved department designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_DEPARTMENT_LEVEL}
            onSelect={onSelectDepartmentDesignation2}
            val={displayDesignationDepartment2}
            selected={[
              displayDesignationDepartment1!,
              displayDesignationDepartment3!
            ]}
            onFileSelect={onFileDepartmentLevelSelect2}
            fileName={departmentLevelFileName2}
          />
          <DropdownWithUpload
            inputLabel="Designation 3"
            uploadLabel="Upload approved department designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_DEPARTMENT_LEVEL}
            onSelect={onSelectDepartmentDesignation3}
            val={displayDesignationDepartment3}
            selected={[
              displayDesignationDepartment1!,
              displayDesignationDepartment2!
            ]}
            onFileSelect={onFileDepartmentLevelSelect3}
            fileName={departmentLevelFileName3}
          />
          <TextInputWithUpload
            inputLabel="Other Designation"
            uploadLabel="Upload approved department designation here:"
            onChangeTextInput={textInputDepartmentDesignation4}
            val={departmentLevelInputDesignation}
            onFileSelect={onFileCustomDepartmentLevelSelect}
            fileName={customDepartmentFileName}
          />
        </div>
      </DepartmentLevelContainer>
      <DepartmentLevelContainer>
        <div>
          <TextInputWithTitlePointUpload
            inputLabel="Designation as Sports/Socio-Cultural Coach or Trainor and Academic Organization Adviser"
            uploadLabel="Upload coach or adviser certificate here:"
            onChangeTextInputTitle={onTextInputSportsSocioDesignationTitle}
            onChangeTextInputPoints={onTextInputSportsSocioDesignationPoints}
            titleVal={sportsSocioTitle}
            pointsVal={sportsSocioPoints}
            fileHandler={fileHandlerSportsSocio}
            fileName={fileNameSportsSocio}
          />
          <TextInputWithTitlePointUpload
            inputLabel="Designation as Member of University-Wide AdHoc Committee"
            uploadLabel="Upload approved designation here:"
            onChangeTextInputTitle={
              onTextInputMemberUniversityWideDesignationTitle
            }
            onChangeTextInputPoints={
              onTextInputMemberUniversityWideDesignationPoints
            }
            titleVal={memberUniversityTitle}
            pointsVal={memberUniversityPoints}
            fileHandler={fileHandlerMemberUniversity}
            fileName={fileNameMemberUniversity}
          />
          <TextInputWithTitlePointUpload
            inputLabel="Designation as Academic Adviser"
            uploadLabel="Upload list of advisees here:"
            onChangeTextInputTitle={onTextInputAcademicAdviserDesignationTitle}
            onChangeTextInputPoints={
              onTextInputAcademicAdviserDesignationPoints
            }
            titleVal={academicAdviserTitle}
            pointsVal={academicAdviserPoints}
            fileHandler={fileHandlerAcademicAdviser}
            fileName={fileNameAcademicAdviser}
          />
        </div>
      </DepartmentLevelContainer>
    </>
  );
}

const DepartmentLevelContainer = styled.div`
  border: 2px solid black;
  width: 100%;
  height: auto;
  border-radius: 15px;
  padding: 15px;
  margin: 20px 0;
`;

const LevelLabel = styled.text`
  font-size: 20px;
  line-height: 18px;
  font-family: HurmeGeometricSans3SemiBold;
`;

export default StrategicFunction2;
