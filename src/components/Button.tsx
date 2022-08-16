import React from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";
import { LoadingSpinner } from "./LoadingSpinner";

type ButtonProps = {
  text: string;
  color: string;
  onClick?: () => void;
  type: "submit" | "button" | "reset";
  isSubmitting?: boolean;
};

export default function Button({
  text,
  color,
  onClick,
  type,
  isSubmitting
}: ButtonProps) {
  return (
    <ButtonContainer
      color={color}
      onClick={() => onClick && onClick()}
      type={type}
    >
      {isSubmitting ? <LoadingSpinner /> : <ButtonText>{text}</ButtonText>}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button<{ color: string }>`
  background-color: ${p => p.color};
  width: 200px;
  height: 37px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  margin: 10px;
  transition: opacity 0.2s ease-in-out;
  border: none;
  &:hover {
    opacity: 0.9;
  }
`;

const ButtonText = styled.text`
  color: ${Colors.white};
  font-size: 20px;
  font-family: HurmeGeometricSans3;
  font-weight: 600;
`;
