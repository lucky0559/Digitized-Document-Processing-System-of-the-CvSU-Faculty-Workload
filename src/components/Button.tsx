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
  spinnerColor?: string;
  disable?: boolean;
};

export default function Button({
  text,
  color,
  onClick,
  type,
  isSubmitting,
  borderColor,
  textColor,
  hoverOpacity,
  spinnerColor,
  disable
}: ButtonProps) {
  return (
    <ButtonContainer
      color={color}
      onClick={onClick}
      type={type}
      borderColor={borderColor}
      hoverOpacity={hoverOpacity}
      disabled={disable}
    >
      {isSubmitting ? (
        <LoadingSpinner color={spinnerColor} />
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
  disabled?: boolean;
}>`
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  background-color: ${p => p.color};
  width: 200px;
  height: 37px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: ${p => (p.disabled ? "auto" : "pointer")};
  margin: 10px;
  transition: ${p => (p.disabled ? "opacity 0.2s ease-in-out" : null)};
  border: none;
  &:hover {
    opacity: ${p => (p.hoverOpacity ? p.hoverOpacity : "0.9")};
  }
  border: 3px solid ${p => (p.borderColor ? p.borderColor : "transparent")};
`;

const ButtonText = styled.span<{ textColor?: string; disabled?: boolean }>`
  color: ${p => (p.textColor ? p.textColor : Colors.white)};
  font-size: 23px;
  font-family: HurmeGeometricSans3;
  font-weight: 600;
`;
