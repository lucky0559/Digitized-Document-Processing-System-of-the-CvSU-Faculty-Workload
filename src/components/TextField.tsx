import { ErrorMessage, Field } from "formik";
import React from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";

type TextFieldProps = {
  type: string;
  name: string;
  label: string;
};

export default function TextField({ type, name, label }: TextFieldProps) {
  return (
    <TextFieldContainer>
      <Label>{label}</Label>
      <TextFieldStyle type={type} name={name} />
      <ErrorMessageStyle name={name} component="div" />
    </TextFieldContainer>
  );
}

const TextFieldStyle = styled(Field)`
  width: 180px;
  background-color: ${Colors.textFieldBackground};
  border-width: 1px;
`;

const ErrorMessageStyle = styled(ErrorMessage)`
  font-size: 12px;
`;

const TextFieldContainer = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 15px;
`;

const Label = styled.label`
  font-size: 12px;
  font-family: HurmeGeometricSans3;
  align-self: flex-start;
`;
