import React from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";
import { LoadingSpinner } from "./LoadingSpinner";

type FormButtonProps = {
  text: string;
  onClicked?: () => void;
  isSubmitting?: boolean;
  disabled?: boolean;
};

const FormButton = ({
  text,
  isSubmitting,
  onClicked,
  disabled
}: FormButtonProps) => {
  return (
    <Container
      disabled={disabled}
      onClick={disabled ? () => {} : () => onClicked && onClicked()}
    >
      {isSubmitting ? (
        <LoadingSpinner color={Colors.primary} />
      ) : (
        <ButtonText disabled={disabled}>{text}</ButtonText>
      )}
    </Container>
  );
};

const Container = styled.div<{ disabled?: boolean }>`
  border: 1px solid ${Colors.primary};
  border-radius: 10px;
  width: 128px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${p => (p.disabled ? "auto" : "pointer")};
  transition: opacity 0.2s ease-in-out;
  opacity: ${p => (p.disabled ? 0.7 : 1)}
  &:hover {
    opacity: 0.7;
  }
`;

const ButtonText = styled.text<{ disabled?: boolean }>`
  color: ${Colors.primary};
  font-size: 23px;
  font-family: HurmeGeometricSans3;
  font-weight: 600;
  opacity: ${p => (p.disabled ? 0.7 : 1)};
`;

export default FormButton;
