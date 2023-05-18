import React from "react";
import styled from "styled-components";
import { DesignationWithTitleAndPoints } from "../screens/FacultyWorkload/StrategicFunction/StrategicFunction";
import UploadFileButton from "./UploadFileButton";

type TextInputWithTitlePointUploadProps = {
  inputLabel: string;
  uploadLabel: string;
  onChangeTextInputTitle: (value: string) => void;
  onChangeTextInputPoints: (value: string) => void;
  titleVal?: string;
  pointsVal?: string;
  fileHandler: (value?: File) => void;
  fileName?: string;
  pointsLabel?: string;
  textField?: boolean;
  customize?: boolean;
  customLabel?: string;
};

function TextInputWithTitlePointUpload({
  inputLabel,
  uploadLabel,
  titleVal,
  pointsVal,
  onChangeTextInputTitle,
  onChangeTextInputPoints,
  fileHandler,
  fileName,
  pointsLabel,
  textField,
  customize,
  customLabel
}: TextInputWithTitlePointUploadProps) {
  return (
    <Container>
      <InputContainer>
        <Label>{inputLabel}</Label>
        <div style={{ flexDirection: "column" }}>
          {customize ? (
            <>
              <Label style={{ marginLeft: 42 }}>{customLabel}</Label>
              <Input
                onChange={e => onChangeTextInputTitle(e.target.value)}
                value={pointsVal === "0" || !pointsVal ? "" : pointsVal}
                type="number"
                min={0}
              />
            </>
          ) : (
            <>
              <Label style={{ marginLeft: 42 }}>Title</Label>
              <Input
                onChange={e => onChangeTextInputTitle(e.target.value)}
                value={titleVal}
                type="text"
              />
            </>
          )}
        </div>
        <div style={{ flexDirection: "column" }}>
          <Label style={{ marginLeft: 42 }}>
            {pointsLabel ? pointsLabel : "Points"}
          </Label>
          {textField ? (
            <Input
              style={{ textAlign: "center" }}
              value={!pointsVal ? 0 : (Number(pointsVal) * 0.023).toFixed(2)}
              disabled={true}
            />
          ) : (
            <Input
              onChange={e => onChangeTextInputPoints(e.target.value)}
              value={pointsVal}
              type="number"
              min={0}
            />
          )}
        </div>
      </InputContainer>
      <UploadContainer>
        <Label>{uploadLabel}</Label>
        <UploadFileButton
          fileHandler={fileHandler}
          workloadFileName={fileName}
        />
      </UploadContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-top: 30px;
`;

const Label = styled.label`
  font-size: 17px;
  font-family: HurmeGeometricSans3;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  max-width: 260px;
`;

const InputContainer = styled.div`
  margin: 10px 20px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const UploadContainer = styled.div`
  margin: 30px 20px 10px 10px;
  display: flex;
`;

const Input = styled.input`
  margin-left: 42px;
`;

export default TextInputWithTitlePointUpload;
