import React, { useState } from "react";
import styled from "styled-components";
import { User } from "../../types/User";
import Colors from "../../constants/Colors";
import Workload from "./Workload";
import FormButton from "../../components/FormButton";

export type OvpaaWorkloads = {
  CAFENR?: User[];
  CAS?: User[];
  CCJ?: User[];
  CED?: User[];
  CEIT?: User[];
  CEMDS?: User[];
  CON?: User[];
  CSPEAR?: User[];
  CVMBS?: User[];
  "Bacoor Campus"?: User[];
  "Carmona Campus"?: User[];
  "Cavite City Campus"?: User[];
  "Gen. Trias Campus"?: User[];
  "Imus Campus"?: User[];
  "Silang Campus"?: User[];
  "Tanza Campus"?: User[];
  "Trece Campus"?: User[];
};

type OvpaaWorkloadReviewProps = {
  teachingWorkload?: OvpaaWorkloads;
  researchWorkload?: OvpaaWorkloads;
  extensionWorkload?: OvpaaWorkloads;
  allStrategicWorkload?: OvpaaWorkloads;
  isDataLoading: boolean;
  setIsDataLoading: (value: boolean) => void;
};

const OvpaaWorkloadReview = ({
  teachingWorkload,
  researchWorkload,
  extensionWorkload,
  allStrategicWorkload,
  isDataLoading,
  setIsDataLoading
}: OvpaaWorkloadReviewProps) => {
  const [isWorkloadListReviewing, setIsWorkloadListReviewing] = useState(false);
  const [isWorkloadBackButtonShow, setIsWorkloadBackButtonShow] =
    useState(false);

  const [teachingWorkloads, setTeachingWorkloads] = useState<User[]>();
  const [researchWorkloads, setResearchWorkloads] = useState<User[]>();
  const [extensionWorkloads, setExtensionWorkloads] = useState<User[]>();
  const [strategicWorkloads, setStrategicWorkloads] = useState<User[]>();

  return (
    <Container isWorkloadListReviewing={isWorkloadListReviewing}>
      {isWorkloadListReviewing ? (
        <SubContainer>
          <Workload
            teachingWorkload={teachingWorkloads}
            researchWorkload={researchWorkloads}
            extensionWorkload={extensionWorkloads}
            allStrategicWorkload={strategicWorkloads}
            isDataLoading={isDataLoading}
            setIsDataLoading={setIsDataLoading}
            isWorkloadListReviewing={isWorkloadListReviewing}
            setIsWorkloadBackButtonShow={setIsWorkloadBackButtonShow}
          />
          {isWorkloadBackButtonShow && (
            <FormButton
              text="Back"
              onClicked={() => setIsWorkloadListReviewing(false)}
            />
          )}
        </SubContainer>
      ) : (
        <>
          <SubContainer>
            <ListHeaderText>List of Colleges</ListHeaderText>
            <CollegesCampusesContainer>
              {(teachingWorkload?.CAFENR?.length! > 0 ||
                researchWorkload?.CAFENR?.length! > 0 ||
                extensionWorkload?.CAFENR?.length! > 0 ||
                allStrategicWorkload?.CAFENR?.length! > 0) && (
                <>
                  <Label>CAFENR</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.CAFENR);
                      setResearchWorkloads(researchWorkload?.CAFENR);
                      setExtensionWorkloads(extensionWorkload?.CAFENR);
                      setStrategicWorkloads(allStrategicWorkload?.CAFENR);
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.CAS?.length! > 0 ||
                researchWorkload?.CAS?.length! > 0 ||
                extensionWorkload?.CAS?.length! > 0 ||
                allStrategicWorkload?.CAS?.length! > 0) && (
                <>
                  <Label>CAS</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.CAS);
                      setResearchWorkloads(researchWorkload?.CAS);
                      setExtensionWorkloads(extensionWorkload?.CAS);
                      setStrategicWorkloads(allStrategicWorkload?.CAS);
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.CCJ?.length! > 0 ||
                researchWorkload?.CCJ?.length! > 0 ||
                extensionWorkload?.CCJ?.length! > 0 ||
                allStrategicWorkload?.CCJ?.length! > 0) && (
                <>
                  <Label>CCJ</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.CCJ);
                      setResearchWorkloads(researchWorkload?.CCJ);
                      setExtensionWorkloads(extensionWorkload?.CCJ);
                      setStrategicWorkloads(allStrategicWorkload?.CCJ);
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.CED?.length! > 0 ||
                researchWorkload?.CED?.length! > 0 ||
                extensionWorkload?.CED?.length! > 0 ||
                allStrategicWorkload?.CED?.length! > 0) && (
                <>
                  <Label>CED</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.CED);
                      setResearchWorkloads(researchWorkload?.CED);
                      setExtensionWorkloads(extensionWorkload?.CED);
                      setStrategicWorkloads(allStrategicWorkload?.CED);
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.CEIT?.length! > 0 ||
                researchWorkload?.CEIT?.length! > 0 ||
                extensionWorkload?.CEIT?.length! > 0 ||
                allStrategicWorkload?.CEIT?.length! > 0) && (
                <>
                  <Label>CEIT</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.CEIT);
                      setResearchWorkloads(researchWorkload?.CEIT);
                      setExtensionWorkloads(extensionWorkload?.CEIT);
                      setStrategicWorkloads(allStrategicWorkload?.CEIT);
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.CEMDS?.length! > 0 ||
                researchWorkload?.CEMDS?.length! > 0 ||
                extensionWorkload?.CEMDS?.length! > 0 ||
                allStrategicWorkload?.CEMDS?.length! > 0) && (
                <>
                  <Label>CEMDS</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.CEMDS);
                      setResearchWorkloads(researchWorkload?.CEMDS);
                      setExtensionWorkloads(extensionWorkload?.CEMDS);
                      setStrategicWorkloads(allStrategicWorkload?.CEMDS);
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.CON?.length! > 0 ||
                researchWorkload?.CON?.length! > 0 ||
                extensionWorkload?.CON?.length! > 0 ||
                allStrategicWorkload?.CON?.length! > 0) && (
                <>
                  <Label>CON</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.CON);
                      setResearchWorkloads(researchWorkload?.CON);
                      setExtensionWorkloads(extensionWorkload?.CON);
                      setStrategicWorkloads(allStrategicWorkload?.CON);
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.CSPEAR?.length! > 0 ||
                researchWorkload?.CSPEAR?.length! > 0 ||
                extensionWorkload?.CSPEAR?.length! > 0 ||
                allStrategicWorkload?.CSPEAR?.length! > 0) && (
                <>
                  <Label>CSPEAR</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.CSPEAR);
                      setResearchWorkloads(researchWorkload?.CSPEAR);
                      setExtensionWorkloads(extensionWorkload?.CSPEAR);
                      setStrategicWorkloads(allStrategicWorkload?.CSPEAR);
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.CVMBS?.length! > 0 ||
                researchWorkload?.CVMBS?.length! > 0 ||
                extensionWorkload?.CVMBS?.length! > 0 ||
                allStrategicWorkload?.CVMBS?.length! > 0) && (
                <>
                  <Label>CVMBS</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.CVMBS);
                      setResearchWorkloads(researchWorkload?.CVMBS);
                      setExtensionWorkloads(extensionWorkload?.CVMBS);
                      setStrategicWorkloads(allStrategicWorkload?.CVMBS);
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
            </CollegesCampusesContainer>
          </SubContainer>
          <SubContainer>
            <ListHeaderText>List of Campuses</ListHeaderText>
            <CollegesCampusesContainer>
              {(teachingWorkload?.["Bacoor Campus"]?.length! > 0 ||
                researchWorkload?.["Bacoor Campus"]?.length! > 0 ||
                extensionWorkload?.["Bacoor Campus"]?.length! > 0 ||
                allStrategicWorkload?.["Bacoor Campus"]?.length! > 0) && (
                <>
                  <Label>Bacoor Campus</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.["Bacoor Campus"]);
                      setResearchWorkloads(researchWorkload?.["Bacoor Campus"]);
                      setExtensionWorkloads(
                        extensionWorkload?.["Bacoor Campus"]
                      );
                      setStrategicWorkloads(
                        allStrategicWorkload?.["Bacoor Campus"]
                      );
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.["Carmona Campus"]?.length! > 0 ||
                researchWorkload?.["Carmona Campus"]?.length! > 0 ||
                extensionWorkload?.["Carmona Campus"]?.length! > 0 ||
                allStrategicWorkload?.["Carmona Campus"]?.length! > 0) && (
                <>
                  <Label>Carmona Campus</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(
                        teachingWorkload?.["Carmona Campus"]
                      );
                      setResearchWorkloads(
                        researchWorkload?.["Carmona Campus"]
                      );
                      setExtensionWorkloads(
                        extensionWorkload?.["Carmona Campus"]
                      );
                      setStrategicWorkloads(
                        allStrategicWorkload?.["Carmona Campus"]
                      );
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.["Cavite City Campus"]?.length! > 0 ||
                researchWorkload?.["Cavite City Campus"]?.length! > 0 ||
                extensionWorkload?.["Cavite City Campus"]?.length! > 0 ||
                allStrategicWorkload?.["Cavite City Campus"]?.length! > 0) && (
                <>
                  <Label>Cavite City Campus</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(
                        teachingWorkload?.["Cavite City Campus"]
                      );
                      setResearchWorkloads(
                        researchWorkload?.["Cavite City Campus"]
                      );
                      setExtensionWorkloads(
                        extensionWorkload?.["Cavite City Campus"]
                      );
                      setStrategicWorkloads(
                        allStrategicWorkload?.["Cavite City Campus"]
                      );
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.["Gen. Trias Campus"]?.length! > 0 ||
                researchWorkload?.["Gen. Trias Campus"]?.length! > 0 ||
                extensionWorkload?.["Gen. Trias Campus"]?.length! > 0 ||
                allStrategicWorkload?.["Gen. Trias Campus"]?.length! > 0) && (
                <>
                  <Label>Gen. Trias Campus</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(
                        teachingWorkload?.["Gen. Trias Campus"]
                      );
                      setResearchWorkloads(
                        researchWorkload?.["Gen. Trias Campus"]
                      );
                      setExtensionWorkloads(
                        extensionWorkload?.["Gen. Trias Campus"]
                      );
                      setStrategicWorkloads(
                        allStrategicWorkload?.["Gen. Trias Campus"]
                      );
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.["Imus Campus"]?.length! > 0 ||
                researchWorkload?.["Imus Campus"]?.length! > 0 ||
                extensionWorkload?.["Imus Campus"]?.length! > 0 ||
                allStrategicWorkload?.["Imus Campus"]?.length! > 0) && (
                <>
                  <Label>Imus Campus</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.["Imus Campus"]);
                      setResearchWorkloads(researchWorkload?.["Imus Campus"]);
                      setExtensionWorkloads(extensionWorkload?.["Imus Campus"]);
                      setStrategicWorkloads(
                        allStrategicWorkload?.["Imus Campus"]
                      );
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.["Silang Campus"]?.length! > 0 ||
                researchWorkload?.["Silang Campus"]?.length! > 0 ||
                extensionWorkload?.["Silang Campus"]?.length! > 0 ||
                allStrategicWorkload?.["Silang Campus"]?.length! > 0) && (
                <>
                  <Label>Silang Campus</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.["Silang Campus"]);
                      setResearchWorkloads(researchWorkload?.["Silang Campus"]);
                      setExtensionWorkloads(
                        extensionWorkload?.["Silang Campus"]
                      );
                      setStrategicWorkloads(
                        allStrategicWorkload?.["Silang Campus"]
                      );
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.["Tanza Campus"]?.length! > 0 ||
                researchWorkload?.["Tanza Campus"]?.length! > 0 ||
                extensionWorkload?.["Tanza Campus"]?.length! > 0 ||
                allStrategicWorkload?.["Tanza Campus"]?.length! > 0) && (
                <>
                  <Label>Tanza Campus</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.["Tanza Campus"]);
                      setResearchWorkloads(researchWorkload?.["Tanza Campus"]);
                      setExtensionWorkloads(
                        extensionWorkload?.["Tanza Campus"]
                      );
                      setStrategicWorkloads(
                        allStrategicWorkload?.["Tanza Campus"]
                      );
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
              {(teachingWorkload?.["Trece Campus"]?.length! > 0 ||
                researchWorkload?.["Trece Campus"]?.length! > 0 ||
                extensionWorkload?.["Trece Campus"]?.length! > 0 ||
                allStrategicWorkload?.["Trece Campus"]?.length! > 0) && (
                <>
                  <Label>Trece Campus</Label>
                  <Button
                    onClick={() => {
                      setTeachingWorkloads(teachingWorkload?.["Trece Campus"]);
                      setResearchWorkloads(researchWorkload?.["Trece Campus"]);
                      setExtensionWorkloads(
                        extensionWorkload?.["Trece Campus"]
                      );
                      setStrategicWorkloads(
                        allStrategicWorkload?.["Trece Campus"]
                      );
                      setIsWorkloadListReviewing(true);
                      setIsWorkloadBackButtonShow(true);
                    }}
                  >
                    <ButtonText>Review</ButtonText>
                  </Button>
                </>
              )}
            </CollegesCampusesContainer>
          </SubContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div<{ isWorkloadListReviewing: boolean }>`
  display: flex;
  width: 100%;
  border: ${p => (p.isWorkloadListReviewing ? null : "2px solid black")};
  height: auto;
  border-radius: 15px;
  padding: 15px;
  margin: 20px 0;
  margin-left: 20px;
  margin-right: 20px;
`;

const SubContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ListHeaderText = styled.span`
  margin-bottom: 30px;
  font-family: HurmeGeometricSans3;
  font-weight: 400;
  font-size: 17px;
  line-height: 15px;
  font-weight: bold;
`;

const CollegesCampusesContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  font-family: HurmeGeometricSans3;
  font-weight: 400;
  font-size: 15px;
  line-height: 15px;
`;

const Button = styled.div`
  margin-left: 25px;
  width: 118px;
  height: 23px;
  border-radius: 10px;
  background-color: ${Colors.textFieldBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ButtonText = styled.label`
  font-family: HurmeGeometricSans3;
  font-weight: 400;
  font-size: 15px;
  line-height: 15px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default OvpaaWorkloadReview;
