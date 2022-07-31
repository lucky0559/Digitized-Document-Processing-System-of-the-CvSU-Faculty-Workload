import React from "react";
import styled from "styled-components";
import CVSU_LOGO from "../assets/cvsu_logo/cvsu_logo.png";
import Colors from "../constants/Colors";
import "../index.css";

export default function TopNav() {
  return (
    <Container>
      <TopNavLeftContent>
        <CvsuLogo src={CVSU_LOGO} />
        <TopNavTitleText>
          Digitized Document Processing System of the CvSU Faculty Workload
        </TopNavTitleText>
      </TopNavLeftContent>
      <TopNavRightContent>
        <ButtonContainer>
          <ButtonText isActive={true}>Login</ButtonText>
        </ButtonContainer>
        <ButtonContainer>
          <ButtonText isActive={false}>Register</ButtonText>
        </ButtonContainer>
      </TopNavRightContent>
    </Container>
  );
}

const Container = styled.div`
  background: #3d5a80;
  width: 100%;
  height: 54px;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;

const TopNavLeftContent = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  display: flex;
  padding-left: 12px;
`;

const CvsuLogo = styled.img`
  width: 55px;
  height: 45px;
`;

const TopNavTitleText = styled.h5`
  margin-left: 20px;
  color: ${Colors.primary};
  font-family: HurmeGeometricSans3Bold;
`;

const TopNavRightContent = styled.div`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  display: flex;
  margin-right: 80px;
  width: 200px;
`;

const ButtonContainer = styled.div`
  cursor: pointer;
`;

const ButtonText = styled.h3<{ isActive: boolean }>`
  font-family: HurmeGeometricSans3SemiBold;
  color: ${p => (p.isActive ? Colors.active : Colors.white)};
`;
