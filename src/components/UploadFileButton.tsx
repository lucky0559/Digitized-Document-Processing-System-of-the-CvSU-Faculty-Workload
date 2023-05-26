import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";

type fileHandlerProps = {
  fileHandler: (file?: File) => void;
  workloadFileName?: string;
};

const UploadFileButton = ({
  fileHandler,
  workloadFileName
}: fileHandlerProps) => {
  const [fileName, setFileName] = useState("");

  return (
    <>
      {!workloadFileName && !fileName ? (
        <Container>
          <ButtonText>
            <FileInput
              type="file"
              onChange={e => {
                fileHandler?.(e.target.files![0]);
                setFileName(e.target.files![0].name);
              }}
            />
            Upload
          </ButtonText>
        </Container>
      ) : (
        <FileName>
          {" "}
          {workloadFileName?.substring(0, 7) + "..." ||
            fileName.substring(0, 7) + "..."}{" "}
        </FileName>
      )}
    </>
  );
};

const Container = styled.div`
  margin-left: 10px;
  width: 118px;
  height: 23px;
  border-radius: 10px;
  background-color: ${Colors.textFieldBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ButtonText = styled.label`
  font-family: HurmeGeometricSans3;
  font-weight: 400;
  font-size: 15px;
  line-height: 15px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileInput = styled.input`
  display: none;
  width: 100%;
  height: 100%;
`;

const FileName = styled.text`
  font-family: HurmeGeometricSans3Bold;
  font-size: 15px;
  line-height: 15px;
  margin-left: 10px;
`;

export default UploadFileButton;
