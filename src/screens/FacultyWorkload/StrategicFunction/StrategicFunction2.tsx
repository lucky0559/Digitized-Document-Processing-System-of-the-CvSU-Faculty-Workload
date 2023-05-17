import React from "react";
import styled from "styled-components";
import DropdownWithUpload from "../../../components/DropdownWithUpload";
import TextInputWithTitlePointUpload from "../../../components/TextInputWithTitlePointsUpload";
import TextInputWithUpload from "../../../components/TextInputWithUpload";
import { DROPDOWN_LISTS } from "../../../constants/Strings";

type StrategicFunction2Props = {
  onSelectDepartmentDesignation1: (value: string) => void;
  onSelectDepartmentDesignation2: (value: string) => void;
  onSelectDepartmentDesignation3: (value: string) => void;
  textInputDepartmentDesignation4: (value: string) => void;
  departmentLevelInputDesignation: string | undefined;
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
  onTextInputSportsSocioDesignationTitle1: (value: string) => void;
  onTextInputSportsSocioDesignationPoints1: (value: string) => void;
  sportsSocioTitle1?: string;
  sportsSocioPoints1?: string;
  fileHandlerSportsSocio1: (value?: File) => void;
  fileNameSportsSocio1?: string;
  onTextInputMemberUniversityWideDesignationTitle: (value: string) => void;
  onTextInputMemberUniversityWideDesignationPoints: (value: string) => void;
  memberUniversityTitle?: string;
  memberUniversityPoints?: string;
  fileHandlerMemberUniversity: (value?: File) => void;
  fileNameMemberUniversity?: string;
  onTextInputMemberUniversityWideDesignationTitle1: (value: string) => void;
  onTextInputMemberUniversityWideDesignationPoints1: (value: string) => void;
  memberUniversityTitle1?: string;
  memberUniversityPoints1?: string;
  fileHandlerMemberUniversity1: (value?: File) => void;
  fileNameMemberUniversity1?: string;
  onTextInputAcademicAdviserDesignationTitle: (value: string) => void;
  onTextInputAcademicAdviserDesignationPoints?: (value: string) => void;
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
  onTextInputSportsSocioDesignationTitle1,
  onTextInputSportsSocioDesignationPoints1,
  sportsSocioTitle1,
  sportsSocioPoints1,
  fileHandlerSportsSocio1,
  fileNameSportsSocio1,
  onTextInputMemberUniversityWideDesignationTitle,
  onTextInputMemberUniversityWideDesignationPoints,
  memberUniversityTitle,
  memberUniversityPoints,
  fileHandlerMemberUniversity,
  fileNameMemberUniversity,
  onTextInputMemberUniversityWideDesignationTitle1,
  onTextInputMemberUniversityWideDesignationPoints1,
  memberUniversityTitle1,
  memberUniversityPoints1,
  fileHandlerMemberUniversity1,
  fileNameMemberUniversity1,
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
            inputLabel="Designation as Sports/Socio-Cultural Coach or Trainor and Academic Organization Adviser"
            uploadLabel="Upload coach or adviser certificate here:"
            onChangeTextInputTitle={onTextInputSportsSocioDesignationTitle1}
            onChangeTextInputPoints={onTextInputSportsSocioDesignationPoints1}
            titleVal={sportsSocioTitle1}
            pointsVal={sportsSocioPoints1}
            fileHandler={fileHandlerSportsSocio1}
            fileName={fileNameSportsSocio1}
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
            inputLabel="Designation as Member of University-Wide AdHoc Committee"
            uploadLabel="Upload approved designation here:"
            onChangeTextInputTitle={
              onTextInputMemberUniversityWideDesignationTitle1
            }
            onChangeTextInputPoints={
              onTextInputMemberUniversityWideDesignationPoints1
            }
            titleVal={memberUniversityTitle1}
            pointsVal={memberUniversityPoints1}
            fileHandler={fileHandlerMemberUniversity1}
            fileName={fileNameMemberUniversity1}
          />
          <TextInputWithTitlePointUpload
            inputLabel="Designation as Academic Adviser"
            uploadLabel="Upload list of advisees here:"
            onChangeTextInputTitle={onTextInputAcademicAdviserDesignationTitle}
            onChangeTextInputPoints={() => {}}
            titleVal={academicAdviserTitle}
            pointsVal={academicAdviserPoints}
            fileHandler={fileHandlerAcademicAdviser}
            fileName={fileNameAcademicAdviser}
            pointsLabel="0.023 per Advisee"
            textField={true}
            customize={true}
            customLabel="Number of Advisee"
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
