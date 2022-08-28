import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Menu from "../../components/Menu";
import ScreenTitle from "../../components/ScreenTitle";
import TopNav from "../../components/TopNav";
import TeachingWorkLoad from "./TeachingWorkload/TeachingWorkLoad";

export type TeachingWorkLoadProps = {
  numberOfPreparations?: string;
  contactHours?: string;
  totalNoOfHours?: string;
  twlFile?: File;
};

const FacultyWorkloadScreen = () => {
  const [teachingWorkLoad, setTeachingWorkLoad] =
    useState<TeachingWorkLoadProps>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [steps, setSteps] = useState(1);

  const teachingWorkLoadHandler = (values?: TeachingWorkLoadProps) => {
    setTeachingWorkLoad(values);
    setSteps(steps + 1);
  };

  return (
    <Container>
      <TopNav menuHandler={() => setIsMenuOpen(!isMenuOpen)} />
      <Menu isMenuOpen={isMenuOpen} />
      <BodyContainer>
        <ScreenTitle title="Faculty Workload" />
        {steps === 1 && (
          <TeachingWorkLoad teachingWorkLoadHandler={teachingWorkLoadHandler} />
        )}
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div``;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default FacultyWorkloadScreen;
