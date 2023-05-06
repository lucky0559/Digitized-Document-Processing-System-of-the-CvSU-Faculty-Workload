import React, { useEffect, useState } from "react";
import { GetAllUserPendingWorkloads } from "../../lib/faculty-workload.hooks";
import { TeachingWorkLoadType } from "../../types/TeachingWorkload";
import { ExtensionWorkloadType } from "../../types/ExtensionWorkload";
import { ResearchWorkLoadType } from "../../types/ResearchWorkLoad";
import { StrategicFunctionType } from "../../types/StrategicFunction";
import styled from "styled-components";
import { GetUser } from "../../lib/user.hooks";
import { User } from "../../types/User";
import Button from "../../components/Button";
import Colors from "../../constants/Colors";
import FormButton from "../../components/FormButton";
import { LoadingSpinner } from "../../components/LoadingSpinner";

type ReviewFacultyScreenProps = {
  userEmail: string;
  onCloseReviewScreen: () => void;
};

const ReviewFacultyScreen = ({
  userEmail,
  onCloseReviewScreen
}: ReviewFacultyScreenProps) => {
  const [allTeachingWorkloads, setAllTeachingWorkloads] =
    useState<TeachingWorkLoadType[]>();
  const [allExtensionWorkloads, setAllExtensionWorkloads] =
    useState<ExtensionWorkloadType[]>();
  const [allResearchWorkloads, setAllResearchWorkloads] =
    useState<ResearchWorkLoadType[]>();
  const [allStrategicFunctionWorkloads, setAllStrategicFunctionWorkloads] =
    useState<StrategicFunctionType[]>();

  const [isDataLoading, setIsDataLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      const user = await GetUser(userId!);
      setUser(user);
      const {
        teachingWorkloads,
        extensionWorkloads,
        researchWorkloads,
        strategicFunctionWorkloads
      } = await GetAllUserPendingWorkloads(userEmail);
      setAllTeachingWorkloads(teachingWorkloads);
      setAllExtensionWorkloads(extensionWorkloads);
      setAllResearchWorkloads(researchWorkloads);
      setAllStrategicFunctionWorkloads(strategicFunctionWorkloads);
      setIsDataLoading(false);
    })();
  }, []);

  return (
    <>
      {!allTeachingWorkloads &&
      !allExtensionWorkloads &&
      !allResearchWorkloads &&
      !allStrategicFunctionWorkloads ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <LoadingSpinner color={Colors.primary} />
        </div>
      ) : (
        <Container>
          <HeaderText>{user?.firstName + " " + user?.surname}</HeaderText>
          <UserInfoContainer>
            <ColumnContainer>
              <ThinText>College:</ThinText>
              <ThinText>Department:</ThinText>
              <ThinText>Academic Rank:</ThinText>
            </ColumnContainer>
            <ColumnContainer>
              <BoldText>{user?.campus}</BoldText>
              <BoldText>{user?.department}</BoldText>
              <BoldText>{user?.academicRank}</BoldText>
            </ColumnContainer>
          </UserInfoContainer>

          {/* TEACHING WORKLOAD */}
          <WorkloadDetailContainer>
            <BoldText>Teaching Work Load (TWL)</BoldText>
            <ColumnParentContainer>
              <ColumnContainer>
                <ThinText>Number of Preparation:</ThinText>
                <ThinText>Number of Contact Hours:</ThinText>
                <ThinText>Number of Students:</ThinText>
              </ColumnContainer>
              <ColumnContainer>
                <BoldText>
                  {allTeachingWorkloads?.[0].numberOfPreparations}
                </BoldText>
                <BoldText>{allTeachingWorkloads?.[0].contactHours}</BoldText>
                <BoldText>
                  {allTeachingWorkloads?.[0].totalNoOfStudents}
                </BoldText>
              </ColumnContainer>
            </ColumnParentContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <ColumnContainer style={{ paddingLeft: 90 }}>
                <BoldText>TOTAL:</BoldText>
              </ColumnContainer>
              <ColumnContainer>
                <BoldText>
                  {Number(
                    allTeachingWorkloads?.[0].totalTeachingWorkload
                  ).toFixed(2)}
                </BoldText>
              </ColumnContainer>
            </div>
          </WorkloadDetailContainer>

          {/* RESEARCH WORKLOAD */}
          <WorkloadDetailContainer>
            <BoldText>Research Work Load (RWL)</BoldText>
            <ColumnParentContainer>
              <ColumnContainer>
                <ThinText>Title of the Study:</ThinText>
                <ThinText>Funding of the Study:</ThinText>
                <ThinText>Designation in the Study:</ThinText>
                <ThinText>Status of the Study:</ThinText>
              </ColumnContainer>
              <ColumnContainer>
                <BoldText>{allResearchWorkloads?.[0].titleOfStudy}</BoldText>
                <BoldText>{allResearchWorkloads?.[0].fundingOfStudy}</BoldText>
                <BoldText>
                  {allResearchWorkloads?.[0].designationStudy}
                </BoldText>
                <BoldText>No status in database</BoldText>
              </ColumnContainer>
            </ColumnParentContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <ColumnContainer style={{ paddingLeft: 90 }}>
                <BoldText>TOTAL:</BoldText>
              </ColumnContainer>
              <ColumnContainer>
                <BoldText>{allResearchWorkloads?.[0].rwlPoints}</BoldText>
              </ColumnContainer>
            </div>
          </WorkloadDetailContainer>

          {/* EXTENSION WORKLOAD */}
          <WorkloadDetailContainer>
            <BoldText>Extension Work Load (EWL)</BoldText>
            <ColumnParentContainer>
              <ColumnContainer>
                <ThinText>Designation in Extension Activity:</ThinText>
                <ThinText>
                  Number of Hours rendered in Extension Activity:
                </ThinText>
                <ThinText>Resource Person in an Extension Activity:</ThinText>
                <ThinText>Resource Person in an Extension Activity:</ThinText>
              </ColumnContainer>
              <ColumnContainer>
                <BoldText>
                  {allExtensionWorkloads?.[0].designationExtensionActivity}
                </BoldText>
                <BoldText>
                  {allExtensionWorkloads?.[0].totalNumberHours}
                </BoldText>
                <BoldText>{allExtensionWorkloads?.[0].resourcePerson}</BoldText>
                <BoldText>{allExtensionWorkloads?.[0].resourcePerson}</BoldText>
              </ColumnContainer>
            </ColumnParentContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <ColumnContainer style={{ paddingLeft: 90 }}>
                <BoldText>TOTAL:</BoldText>
              </ColumnContainer>
              <ColumnContainer>
                <BoldText>{allExtensionWorkloads?.[0].ewlPoints}</BoldText>
              </ColumnContainer>
            </div>
          </WorkloadDetailContainer>

          {/* STRATEGIC FUNCTION WORKLOAD */}
          <WorkloadDetailContainer>
            <BoldText>Strategic Function Work Load (SF)</BoldText>
            <ColumnParentContainer>
              <ParentLevelContainer>
                <LevelContainer>
                  <ColumnContainer>
                    <ThinText>University Level:</ThinText>
                  </ColumnContainer>
                  <ColumnContainer>
                    <BoldText>
                      {
                        allStrategicFunctionWorkloads?.[0]
                          .designationUniversityLevel?.[0]
                      }
                    </BoldText>
                    <BoldText>
                      {
                        allStrategicFunctionWorkloads?.[0]
                          .designationUniversityLevel?.[1]
                      }
                    </BoldText>
                    <BoldText>
                      {
                        allStrategicFunctionWorkloads?.[0]
                          .designationUniversityLevel?.[2]
                      }
                    </BoldText>
                    <BoldText>
                      {
                        allStrategicFunctionWorkloads?.[0]
                          .designationUniversityLevel?.[3]
                      }
                    </BoldText>
                  </ColumnContainer>
                </LevelContainer>
                <LevelContainer>
                  <ColumnContainer>
                    <ThinText>College Level:</ThinText>
                  </ColumnContainer>
                  <ColumnContainer>
                    <BoldText>
                      {
                        allStrategicFunctionWorkloads?.[0]
                          .designationCollegeCampusLevel?.[0]
                      }
                    </BoldText>
                    <BoldText>
                      {
                        allStrategicFunctionWorkloads?.[0]
                          .designationCollegeCampusLevel?.[1]
                      }
                    </BoldText>
                    <BoldText>
                      {
                        allStrategicFunctionWorkloads?.[0]
                          .designationCollegeCampusLevel?.[2]
                      }
                    </BoldText>
                    <BoldText>
                      {
                        allStrategicFunctionWorkloads?.[0]
                          .designationCollegeCampusLevel?.[3]
                      }
                    </BoldText>
                  </ColumnContainer>
                </LevelContainer>

                <LevelContainer>
                  <ColumnContainer>
                    <ThinText>Department Level:</ThinText>
                  </ColumnContainer>
                  <ColumnContainer>
                    <BoldText>
                      {
                        allStrategicFunctionWorkloads?.[0]
                          .designationDepartmentLevel?.[0]
                      }
                    </BoldText>
                    <BoldText>
                      {
                        allStrategicFunctionWorkloads?.[0]
                          .designationDepartmentLevel?.[1]
                      }
                    </BoldText>
                    <BoldText>
                      {
                        allStrategicFunctionWorkloads?.[0]
                          .designationDepartmentLevel?.[2]
                      }
                    </BoldText>
                    <BoldText>
                      {
                        allStrategicFunctionWorkloads?.[0]
                          .designationDepartmentLevel?.[3]
                      }
                    </BoldText>
                  </ColumnContainer>
                </LevelContainer>

                <LevelContainer>
                  <ColumnContainer>
                    <ThinText>Designation as Academic Adviser:</ThinText>
                  </ColumnContainer>
                  <ColumnContainer>
                    <BoldText>
                      {allStrategicFunctionWorkloads?.[0].academicAdvisees}
                    </BoldText>
                  </ColumnContainer>
                </LevelContainer>
              </ParentLevelContainer>
            </ColumnParentContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <ColumnContainer style={{ paddingLeft: 90 }}>
                <BoldText>TOTAL:</BoldText>
              </ColumnContainer>
              <ColumnContainer>
                <BoldText>
                  {allStrategicFunctionWorkloads?.[0].sfwPoints}
                </BoldText>
              </ColumnContainer>
            </div>
          </WorkloadDetailContainer>
          <ComputationContainer>
            <BoldText>
              TWL + RWL + EWL + SF = TOTAL EARNED CREDIT UNITS
            </BoldText>
            <BoldText>
              TWL + RWL + EWL + SF = TOTAL EARNED CREDIT UNITS
            </BoldText>
          </ComputationContainer>
          <ButtonContainer>
            <FormButton text="Print" />
            <GroupButtonContainer>
              <FormButton text="Back" onClicked={onCloseReviewScreen} />
              <FormButton text="Submit" />
            </GroupButtonContainer>
          </ButtonContainer>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 5px solid black;
  border-radius: 15px;
  margin: 10px auto;
  padding: 20px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin-top: 25px;
`;

const ColumnContainer = styled.div`
  flex-direction: column;
  display: flex;
  padding: 10px;
`;

const ThinText = styled.span`
  font-family: HurmeGeometricSans3;
  font-size: 15px;
  line-height: 15px;
`;
const BoldText = styled.span`
  font-family: HurmeGeometricSans3;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
`;

const HeaderText = styled.span`
  font-family: HurmeGeometricSans3;
  font-weight: bold;
  font-size: 20px;
  line-height: 15px;
  text-transform: uppercase;
`;

const WorkloadDetailContainer = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  padding: 10px;
`;

const ColumnParentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 35px;
  border-bottom: 1px solid black;
`;

const LevelContainer = styled.div`
  display: flex;
`;

const ParentLevelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ComputationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  padding: 10px;
  margin-top: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
`;

const GroupButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
`;

export default ReviewFacultyScreen;
