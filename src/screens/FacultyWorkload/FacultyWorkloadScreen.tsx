import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormButton from "../../components/FormButton";
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

  const teachingWorkLoadHandler = (values?: TeachingWorkLoadProps) => {
    setTeachingWorkLoad(values);
  };

  useEffect(() => {
    console.log(teachingWorkLoad);
  }, [teachingWorkLoad]);

  return (
    <Container>
      <TopNav />
      <BodyContainer>
        <ScreenTitle title="Faculty Workload" />
        <TeachingWorkLoad teachingWorkLoadHandler={teachingWorkLoadHandler} />
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
