import React from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import UploadFileButton from "./UploadFileButton";

type DropdownWithUploadProps = {
  inputLabel: string;
  options: string[];
  uploadLabel: string;
  onSelect: (value: string) => void;
  val?: string;
};

function DropdownWithUpload({
  inputLabel,
  uploadLabel,
  options,
  val,
  onSelect
}: DropdownWithUploadProps) {
  return (
    <Container>
      <InputContainer>
        <Label>{inputLabel}</Label>
        <Dropdown option={options} onSelect={onSelect} val={val} />
      </InputContainer>
      <UploadContainer>
        <Label>{uploadLabel}</Label>
        <UploadFileButton fileHandler={() => {}} workloadFileName={""} />
      </UploadContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Label = styled.label`
  font-size: 17px;
  font-family: HurmeGeometricSans3;
  text-overflow: ellipsis;
  width: 250px;
  display: block;
  overflow: hidden;
`;

const InputContainer = styled.div`
  margin: 10px 20px 10px 10px;
  display: flex;
`;

const UploadContainer = styled.div`
  margin: 10px 20px 10px 10px;
  display: flex;
`;

export default DropdownWithUpload;
