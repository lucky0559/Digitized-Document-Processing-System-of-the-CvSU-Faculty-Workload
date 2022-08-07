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
    </Container>
  );
}

const Container = styled.div`
  background: ${Colors.primary};
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

const TopNavTitleText = styled.text`
  font-size: 12px;
  margin-left: 20px;
  color: ${Colors.primaryHeaderText};
  font-family: HurmeGeometricSans3Bold;
  font-weight: 700;
`;
