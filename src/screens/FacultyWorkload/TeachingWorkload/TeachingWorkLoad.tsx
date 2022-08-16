import React from "react";
import styled from "styled-components";
import ScreenTitle from "../../../components/ScreenTitle";
import TopNav from "../../../components/TopNav";

const TeachingWorkLoad = () => {
  return (
    <Container>
      <TopNav />
      <BodyContainer>
        <ScreenTitle title="Faculty Workload" />
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div``;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default TeachingWorkLoad;
