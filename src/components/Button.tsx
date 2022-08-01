import React from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";

type ButtonProps = {
  text: string;
  color: string;
};

export default function Button({ text, color }: ButtonProps) {
  return (
    <ButtonContainer color={color}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div<{ color: string }>`
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
