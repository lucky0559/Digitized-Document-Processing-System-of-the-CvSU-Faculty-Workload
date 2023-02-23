import React from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";

export default function Footer() {
  return (
    <Container>
      <FooterTextContainer>
        <FooterText>
          Office of the Vice President for Academic Affairs
        </FooterText>
        <FooterText>ovpaa@cvsu.edu.ph</FooterText>
        <FooterText>046-862-0806</FooterText>
      </FooterTextContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: ${Colors.primary};
  height: 95px;
`;

const FooterTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const FooterText = styled.text`
  color: ${Colors.white};
  font-size: 15px;
  font-family: HurmeGeometricSans3SemiBold;
`;
