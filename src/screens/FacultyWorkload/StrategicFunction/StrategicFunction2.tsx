import React from "react";
import styled from "styled-components";
import DropdownWithUpload from "../../../components/DropdownWithUpload";
import TextInputWithUpload from "../../../components/TextInputWithUpload";
import { DROPDOWN_LISTS } from "../../../constants/Strings";

type StrategicFunction2Props = {};

function StrategicFunction2({}: StrategicFunction2Props) {
  return (
    <>
      <DepartmentLevelContainer>
        <LevelLabel>Designation at the Department Level</LevelLabel>
        <div>
          <DropdownWithUpload
            inputLabel="Designation 1"
            uploadLabel="Upload approved department designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_DEPARTMENT_LEVEL}
            onSelect={() => {}}
          />
          <DropdownWithUpload
            inputLabel="Designation 2"
            uploadLabel="Upload approved department designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_DEPARTMENT_LEVEL}
            onSelect={() => {}}
          />
          <DropdownWithUpload
            inputLabel="Designation 3"
            uploadLabel="Upload approved department designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_DEPARTMENT_LEVEL}
            onSelect={() => {}}
          />
          <TextInputWithUpload
            inputLabel="Other Designation"
            uploadLabel="Upload approved department designation here:"
            onChangeTextInput={() => {}}
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
          {/* <DropdownWithUpload
            inputLabel="Designation as Member of University-Wide AdHoc Committee"
            uploadLabel="Upload approved designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_}
          />
          <DropdownWithUpload
            inputLabel="Designation as Academic Adviser"
            uploadLabel="Upload list of advisees here:"
            options={DROPDOWN_LISTS.DESIGNATION_DEPARTMENT_LEVEL}
          /> */}
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
