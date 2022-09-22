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
  borderColor?: string;
  textColor?: string;
  hoverOpacity?: string;
};

export default function Button({
  text,
  color,
  onClick,
  type,
  isSubmitting,
  borderColor,
  textColor,
  hoverOpacity
}: ButtonProps) {
  return (
    <ButtonContainer
      color={color}
      onClick={onClick}
      type={type}
      borderColor={borderColor}
      hoverOpacity={hoverOpacity}
    >
      {isSubmitting ? (
        <LoadingSpinner />
      ) : (
        <ButtonText textColor={textColor}>{text}</ButtonText>
      )}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button<{
  color: string;
  borderColor?: string;
  hoverOpacity?: string;
}>`
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
    opacity: ${p => (p.hoverOpacity ? p.hoverOpacity : "0.9")};
  }
  border: 3px solid ${p => (p.borderColor ? p.borderColor : "transparent")};
`;

const ButtonText = styled.text<{ textColor?: string }>`
  color: ${p => (p.textColor ? p.textColor : Colors.white)};
  font-size: 20px;
  font-family: HurmeGeometricSans3;
  font-weight: 600;
`;
