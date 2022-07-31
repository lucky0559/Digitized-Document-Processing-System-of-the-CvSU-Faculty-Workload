import React from "react";
import styled from "styled-components";
import Colors from "../../constants/Colors";
import CvsuDroneShot from "../../assets/cvsu_logo/cvsu_droneShot.jpg";

export default function LoginScreen() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <Container width={width} height={height}>
      <Header>
        <CvsuDroneShotImg src={CvsuDroneShot} />
      </Header>
      Login
    </Container>
  );
}

const Container = styled.div<{ width: number; height: number }>`
  border: 1px solid ${Colors.black};
  margin-top: 100px;
  width: ${p => p.width / 3}px;
  height: ${p => p.height / 2}px;
  align-self: center;
  border-radius: 15px;
`;

const Header = styled.div``;

const CvsuDroneShotImg = styled.img`
  width: 100%;
  border-radius: 15px 15px 0px 0px;
  height: 130px;
`;
