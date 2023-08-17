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
  onTextInputMemberUniversityWideDesignationTitle2: (value: string) => void;
  onTextInputMemberUniversityWideDesignationPoints1: (value: string) => void;
  memberUniversityTitle1?: string;
  memberUniversityTitle2?: string;
  memberUniversityPoints1?: string;
  memberUniversityPoints2?: string;
  fileHandlerMemberUniversity1: (value?: File) => void;
  fileHandlerMemberUniversity2: (value?: File) => void;
  fileNameMemberUniversity1?: string;
  fileNameMemberUniversity2?: string;
  onTextInputAcademicAdviserDesignationTitle: (value: string) => void;
  onTextInputAcademicAdviserDesignationPoints?: (value: string) => void;
  academicAdviserTitle?: string;
  academicAdviserPoints?: string;
  fileHandlerAcademicAdviser: (value?: File) => void;
  fileNameAcademicAdviser?: string;
  onTextInputSportsSocioDesignationTitle2: (value: string) => void;
  sportsSocioTitle2?: string;
  sportsSocioPoints2?: string;
  fileHandlerSportsSocio2: (value?: File) => void;
  fileNameSportsSocio2?: string;
  universityWidePoints?: string;
  universityWidePoints1?: string;
  universityWidePoints2?: string;
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
  onTextInputSportsSocioDesignationTitle2,
  sportsSocioTitle2,
  sportsSocioPoints2,
  fileHandlerSportsSocio2,
  fileNameSportsSocio2,
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
  fileNameAcademicAdviser,
  universityWidePoints,
  universityWidePoints1,
  universityWidePoints2,
  onTextInputMemberUniversityWideDesignationTitle2,
  memberUniversityTitle2,
  memberUniversityPoints2,
  fileHandlerMemberUniversity2,
  fileNameMemberUniversity2
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
            onChangeTextInput={textInputDepartmentDesignation4}
            val={departmentLevelInputDesignation}
            onFileSelect={onFileCustomDepartmentLevelSelect}
            fileName={customDepartmentFileName}
          />
        </div>
      </DepartmentLevelContainer>
      <DepartmentLevelContainer>
        <div>
          <SportsSocioTitleText style={{ textAlign: "center" }}>
            Designation as Sports/Socio-Cultural Coach or Trainor and Academic
            Organization Adviser
          </SportsSocioTitleText>
        </div>
        <div>
          <DropdownUploadContainer>
            <DropdownWithUpload
              options={DROPDOWN_LISTS.DESIGNATION_SPORTS_TRAINOR}
              onSelect={onTextInputSportsSocioDesignationTitle}
              val={sportsSocioTitle}
              onFileSelect={fileHandlerSportsSocio}
              fileName={fileNameSportsSocio}
            />
            <PointsContainer>
              <PointsText style={{ fontWeight: "bold", marginRight: 5 }}>
                Points:{" "}
              </PointsText>
              <PointsText>
                {sportsSocioPoints ? sportsSocioPoints : "0"}
              </PointsText>
            </PointsContainer>
          </DropdownUploadContainer>
          <DropdownUploadContainer>
            <DropdownWithUpload
              options={DROPDOWN_LISTS.DESIGNATION_SPORTS_TRAINOR}
              onSelect={onTextInputSportsSocioDesignationTitle1}
              val={sportsSocioTitle1}
              onFileSelect={fileHandlerSportsSocio1}
              fileName={fileNameSportsSocio1}
            />
            <PointsContainer>
              <PointsText style={{ fontWeight: "bold", marginRight: 5 }}>
                Points:{" "}
              </PointsText>
              <PointsText>
                {sportsSocioPoints1 ? sportsSocioPoints1 : "0"}
              </PointsText>
            </PointsContainer>
          </DropdownUploadContainer>
          <DropdownUploadContainer>
            <DropdownWithUpload
              options={DROPDOWN_LISTS.DESIGNATION_SPORTS_TRAINOR}
              onSelect={onTextInputSportsSocioDesignationTitle2}
              val={sportsSocioTitle2}
              onFileSelect={fileHandlerSportsSocio2}
              fileName={fileNameSportsSocio2}
            />
            <PointsContainer>
              <PointsText style={{ fontWeight: "bold", marginRight: 5 }}>
                Points:{" "}
              </PointsText>
              <PointsText>
                {sportsSocioPoints2 ? sportsSocioPoints2 : "0"}
              </PointsText>
            </PointsContainer>
          </DropdownUploadContainer>
          <div style={{ marginTop: 40 }}>
            <SportsSocioTitleText style={{ textAlign: "center" }}>
              Designation as Member of University-Wide AdHoc Committee
            </SportsSocioTitleText>
          </div>
          <TextInputWithTitlePointUpload
            universityWidePoints={universityWidePoints}
            onChangeTextInputTitle={
              onTextInputMemberUniversityWideDesignationTitle
            }
            titleVal={memberUniversityTitle}
            pointsVal={memberUniversityPoints}
            fileHandler={fileHandlerMemberUniversity}
            fileName={fileNameMemberUniversity}
          />
          <TextInputWithTitlePointUpload
            universityWidePoints={universityWidePoints1}
            onChangeTextInputTitle={
              onTextInputMemberUniversityWideDesignationTitle1
            }
            titleVal={memberUniversityTitle1}
            pointsVal={memberUniversityPoints1}
            fileHandler={fileHandlerMemberUniversity1}
            fileName={fileNameMemberUniversity1}
          />
          <TextInputWithTitlePointUpload
            universityWidePoints={universityWidePoints2}
            onChangeTextInputTitle={
              onTextInputMemberUniversityWideDesignationTitle2
            }
            titleVal={memberUniversityTitle2}
            pointsVal={memberUniversityPoints2}
            fileHandler={fileHandlerMemberUniversity2}
            fileName={fileNameMemberUniversity2}
          />
          <TextInputWithTitlePointUpload
            inputLabel="Designation as Academic Adviser"
            uploadLabel="Upload list of advisees here:"
            onChangeTextInputTitle={onTextInputAcademicAdviserDesignationTitle}
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

const LevelLabel = styled.span`
  font-size: 20px;
  line-height: 18px;
  font-family: HurmeGeometricSans3SemiBold;
`;

const PointsContainer = styled.div`
  display: flex;
  width: 30%;
  padding-top: 30px;
  align-items: center;
`;

const DropdownUploadContainer = styled.div`
  display: flex;
`;

const PointsText = styled.span`
  font-weight: 400;
  font-size: 17px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
`;

const SportsSocioTitleText = styled.span`
  font-weight: 400;
  font-size: 17px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
`;

export default StrategicFunction2;
