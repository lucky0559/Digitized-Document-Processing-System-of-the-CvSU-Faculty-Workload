import React from "react";
import styled from "styled-components";

type ScreenTitleProps = {
  title: string;
};

const ScreenTitle = ({ title }: ScreenTitleProps) => {
  return (
    <Container>
      <TitleText>{title}</TitleText>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
`;

const TitleText = styled.h1`
  font-size: 35px;
  font-weight: 700;
  font-family: HurmeGeometricSans3;
  line-height: 41px;
`;

export default ScreenTitle;
