import React from "react";
import styled from "styled-components";
import DropdownWithUpload from "../../../components/DropdownWithUpload";
import TextInputWithUpload from "../../../components/TextInputWithUpload";
import { DROPDOWN_LISTS } from "../../../constants/Strings";

type StrategicFunction2Props = {
  onSelectDepartmentDesignation1: (value: string) => void;
  onSelectDepartmentDesignation2: (value: string) => void;
  onSelectDepartmentDesignation3: (value: string) => void;
  textInputDepartmentDesignation4: (value: string) => void;
  designationDepartment?: string[];
  departmentDesignation1: string;
  departmentDesignation2: string;
  departmentDesignation3: string;
  departmentLevelInputDesignation: string;
};

function StrategicFunction2({
  onSelectDepartmentDesignation1,
  onSelectDepartmentDesignation2,
  onSelectDepartmentDesignation3,
  textInputDepartmentDesignation4,
  designationDepartment,
  departmentDesignation1,
  departmentDesignation2,
  departmentDesignation3,
  departmentLevelInputDesignation
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
            val={designationDepartment?.[0]}
            selected={[departmentDesignation2, departmentDesignation3]}
          />
          <DropdownWithUpload
            inputLabel="Designation 2"
            uploadLabel="Upload approved department designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_DEPARTMENT_LEVEL}
            onSelect={onSelectDepartmentDesignation2}
            val={designationDepartment?.[1]}
            selected={[departmentDesignation1, departmentDesignation3]}
          />
          <DropdownWithUpload
            inputLabel="Designation 3"
            uploadLabel="Upload approved department designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_DEPARTMENT_LEVEL}
            onSelect={onSelectDepartmentDesignation3}
            val={designationDepartment?.[2]}
            selected={[departmentDesignation1, departmentDesignation2]}
          />
          <TextInputWithUpload
            inputLabel="Other Designation"
            uploadLabel="Upload approved department designation here:"
            onChangeTextInput={textInputDepartmentDesignation4}
            val={departmentLevelInputDesignation}
          />
        </div>
      </DepartmentLevelContainer>
      <DepartmentLevelContainer>
        <div>
          <DropdownWithUpload
            inputLabel="Designation as Sports/Socio-Cultural Coach or Trainor and Academic Organization Adviser"
            uploadLabel="Upload coach or adviser certificate here:"
            options={DROPDOWN_LISTS.DESIGNATION_SPORTS_SOCIO_TRAINOR_ACADEMIC}
            onSelect={() => {}}
          />
          <DropdownWithUpload
            inputLabel="Designation as Member of University-Wide AdHoc Committee"
            uploadLabel="Upload approved designation here:"
            options={DROPDOWN_LISTS.ACADEMIC_RANK}
            onSelect={() => {}}
          />
          <DropdownWithUpload
            inputLabel="Designation as Academic Adviser"
            uploadLabel="Upload list of advisees here:"
            options={DROPDOWN_LISTS.DESIGNATION_DEPARTMENT_LEVEL}
            onSelect={() => {}}
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
