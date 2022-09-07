import React from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";
import { LoadingSpinner } from "./LoadingSpinner";

type FormButtonProps = {
  text: string;
  onClicked?: () => void;
  isSubmitting?: boolean;
};

const FormButton = ({ text, isSubmitting, onClicked }: FormButtonProps) => {
  return (
    <Container onClick={() => onClicked && onClicked()}>
      {isSubmitting ? (
        <LoadingSpinner color={Colors.primary} />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid ${Colors.primary};
  border-radius: 10px;
  width: 128px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
`;

const ButtonText = styled.text`
  color: ${Colors.primary};
  font-size: 20px;
  font-family: HurmeGeometricSans3;
  font-weight: 600;
`;

export default FormButton;
