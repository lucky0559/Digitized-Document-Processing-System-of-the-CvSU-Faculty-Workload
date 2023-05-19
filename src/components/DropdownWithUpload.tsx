import React from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import UploadFileButton from "./UploadFileButton";

type DropdownWithUploadProps = {
  inputLabel: string;
  options: string[];
  uploadLabel?: string;
  onSelect: (value: string) => void;
  onFileSelect: (file?: File) => void;
  val?: string;
  selected?: string[];
  fileName?: string;
};

function DropdownWithUpload({
  inputLabel,
  uploadLabel,
  options,
  val,
  selected,
  fileName,
  onSelect,
  onFileSelect
}: DropdownWithUploadProps) {
  return (
    <Container>
      <InputContainer>
        <Label>{inputLabel}</Label>
        <Dropdown
          option={options}
          onSelect={onSelect}
          val={val}
          selected={selected}
        />
      </InputContainer>
      <UploadContainer>
        <Label>{uploadLabel}</Label>
        <UploadFileButton
          fileHandler={onFileSelect}
          workloadFileName={fileName}
        />
      </UploadContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
`;

const Label = styled.label`
  font-size: 17px;
  font-family: HurmeGeometricSans3;
  text-overflow: ellipsis;
  width: 250px;
  display: block;
  overflow: hidden;
  text-align: center;
`;

const InputContainer = styled.div`
  margin: 10px 20px 10px 10px;
  display: flex;
  align-self: flex-end;
`;

const UploadContainer = styled.div`
  margin: 10px 20px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default DropdownWithUpload;
