import React from "react";
import styled from "styled-components";
import { DesignationWithTitleAndPoints } from "../screens/FacultyWorkload/StrategicFunction/StrategicFunction";
import UploadFileButton from "./UploadFileButton";

type TextInputWithTitlePointUploadProps = {
  inputLabel?: string;
  uploadLabel?: string;
  onChangeTextInputTitle: (value: string) => void;
  titleVal?: string;
  pointsVal?: string;
  fileHandler: (value?: File) => void;
  fileName?: string;
  pointsLabel?: string;
  textField?: boolean;
  customize?: boolean;
  customLabel?: string;
  universityWidePoints?: string;
};

function TextInputWithTitlePointUpload({
  inputLabel,
  uploadLabel,
  titleVal,
  pointsVal,
  onChangeTextInputTitle,
  fileHandler,
  fileName,
  pointsLabel,
  textField,
  customize,
  customLabel,
  universityWidePoints
}: TextInputWithTitlePointUploadProps) {
  return (
    <Container textField={textField}>
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
                style={{ border: "1px solid black" }}
              />
            </>
          )}
        </div>
        <div style={{ flexDirection: "column" }}>
          <Label style={{ marginLeft: 42 }}>
            {pointsLabel ? pointsLabel : ""}
          </Label>
          {textField && (
            <Input
              style={{ textAlign: "center" }}
              value={
                !pointsVal || !fileName
                  ? 0
                  : (Number(pointsVal) * 0.023).toFixed(2)
              }
              disabled={true}
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
      {!textField && (
        <PointsContainer>
          <PointsText style={{ fontWeight: "bold", marginRight: 5 }}>
            Points:{" "}
          </PointsText>
          <PointsText>
            {universityWidePoints ? universityWidePoints : "0"}
          </PointsText>
        </PointsContainer>
      )}
    </Container>
  );
}

const Container = styled.div<{ textField?: boolean }>`
  display: flex;
  align-items: center;
  padding-top: 30px;
  padding-left: ${p => (p.textField ? 0 : "15%")};
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

const PointsContainer = styled.div`
  display: flex;
  width: 30%;
  padding-top: 30px;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 60px;
`;

const PointsText = styled.span`
  font-weight: 400;
  font-size: 17px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
`;

export default TextInputWithTitlePointUpload;
