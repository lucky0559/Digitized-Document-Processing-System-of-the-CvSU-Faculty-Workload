import React, { useEffect, useState } from "react";
import styled from "styled-components";
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

  const teachingWorkLoadHandler = (values?: TeachingWorkLoadProps) => {
    setTeachingWorkLoad(values);
  };

  useEffect(() => {
    console.log(teachingWorkLoad);
  }, [teachingWorkLoad]);

  // const menuHandler = () => {

  // }

  return (
    <Container>
      <TopNav menuHandler={() => setIsMenuOpen(!isMenuOpen)} />
      {isMenuOpen && <Menu />}
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

const MenuContainer = styled.div``;

export default FacultyWorkloadScreen;
