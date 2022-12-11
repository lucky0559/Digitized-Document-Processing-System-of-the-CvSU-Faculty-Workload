import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DropdownWithUpload from "../../../components/DropdownWithUpload";
import TextInputWithUpload from "../../../components/TextInputWithUpload";
import { DROPDOWN_LISTS } from "../../../constants/Strings";

type StrategicFunction1Props = {
  onSelect1: (value: string) => void;
  onSelect2: (value: string) => void;
  onSelect3: (value: string) => void;
  textInput4: (value: string) => void;
  designationUniversity?: string[];
  universityLevelInputDesignation: string;
  designationUniversity1: string;
  designationUniversity2: string;
  designationUniversity3: string;
};

function StrategicFunction1({
  onSelect1,
  onSelect2,
  onSelect3,
  textInput4,
  designationUniversity,
  universityLevelInputDesignation,
  designationUniversity1,
  designationUniversity2,
  designationUniversity3
}: StrategicFunction1Props) {
  return (
    <>
      <UniversityLevelContainer>
        <LevelLabel>Designation at the University Level</LevelLabel>
        <div>
          <DropdownWithUpload
            inputLabel="Designation 1"
            uploadLabel="Upload approved university designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_UNIVERSITY_LEVEL.filter(
              item =>
                ![
                  designationUniversity?.[1],
                  designationUniversity?.[2]
                ].includes(item)
            )}
            onSelect={onSelect1}
            val={designationUniversity?.[0]}
            selected={[
              designationUniversity1,
              designationUniversity2,
              designationUniversity1
            ]}
          />
          <DropdownWithUpload
            inputLabel="Designation 2"
            uploadLabel="Upload approved university designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_UNIVERSITY_LEVEL.filter(
              item =>
                ![
                  designationUniversity?.[0],
                  designationUniversity?.[2]
                ].includes(item)
            )}
            onSelect={onSelect2}
            val={designationUniversity?.[1]}
            selected={[
              designationUniversity1,
              designationUniversity2,
              designationUniversity1
            ]}
          />
          <DropdownWithUpload
            inputLabel="Designation 3"
            uploadLabel="Upload approved university designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_UNIVERSITY_LEVEL.filter(
              item =>
                ![
                  designationUniversity?.[0],
                  designationUniversity?.[1]
                ].includes(item)
            )}
            onSelect={onSelect3}
            val={designationUniversity?.[2]}
            selected={[
              designationUniversity1,
              designationUniversity2,
              designationUniversity1
            ]}
          />
          <TextInputWithUpload
            inputLabel="Other Designation"
            uploadLabel="Upload approved university designation here:"
            onChangeTextInput={textInput4}
            val={universityLevelInputDesignation}
          />
        </div>
      </UniversityLevelContainer>
      <CollegeCampusLevelContainer>
        <LevelLabel>Designation at the College/Campus Level</LevelLabel>
        <div>
          <DropdownWithUpload
            inputLabel="Designation 1"
            uploadLabel="Upload approved college designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_COLLEGE_CAMPUS_LEVEL}
            onSelect={onSelect1}
          />
          <DropdownWithUpload
            inputLabel="Designation 2"
            uploadLabel="Upload approved college designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_COLLEGE_CAMPUS_LEVEL}
            onSelect={onSelect1}
          />
          <DropdownWithUpload
            inputLabel="Designation 3"
            uploadLabel="Upload approved college designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_COLLEGE_CAMPUS_LEVEL}
            onSelect={onSelect1}
          />
          <DropdownWithUpload
            inputLabel="Other Designation"
            uploadLabel="Upload approved college designation here:"
            options={DROPDOWN_LISTS.DESIGNATION_COLLEGE_CAMPUS_LEVEL}
            onSelect={onSelect1}
          />
        </div>
      </CollegeCampusLevelContainer>
    </>
  );
}

const UniversityLevelContainer = styled.div`
  border: 2px solid black;
  width: 100%;
  height: auto;
  border-radius: 15px;
  padding: 15px;
  margin: 20px 0;
`;

const CollegeCampusLevelContainer = styled.div`
  border: 2px solid black;
  width: 100%;
  height: auto;
  border-radius: 15px;
  padding: 15px;
`;

const LevelLabel = styled.text`
  font-size: 20px;
  line-height: 18px;
  font-family: HurmeGeometricSans3SemiBold;
`;

export default StrategicFunction1;
