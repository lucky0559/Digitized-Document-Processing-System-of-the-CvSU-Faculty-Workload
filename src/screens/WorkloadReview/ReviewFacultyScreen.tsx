import React, { useEffect, useState } from "react";
import { GetAllUserPendingWorkloads } from "../../lib/faculty-workload.hooks";
import { TeachingWorkLoadType } from "../../types/TeachingWorkload";
import { ExtensionWorkloadType } from "../../types/ExtensionWorkload";
import { ResearchWorkLoadType } from "../../types/ResearchWorkLoad";
import { StrategicFunctionType } from "../../types/StrategicFunction";
import styled from "styled-components";
import { GetUser } from "../../lib/user.hooks";
import { User } from "../../types/User";
import Colors from "../../constants/Colors";
import FormButton from "../../components/FormButton";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

type ReviewFacultyScreenProps = {
  userEmail?: string;
};

const ReviewFacultyScreen = ({ userEmail }: ReviewFacultyScreenProps) => {
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
      } = await GetAllUserPendingWorkloads(userEmail!);
      setAllTeachingWorkloads(teachingWorkloads);
      setAllExtensionWorkloads(extensionWorkloads);
      setAllResearchWorkloads(researchWorkloads);
      setAllStrategicFunctionWorkloads(strategicFunctionWorkloads);
      setIsDataLoading(false);
    })();
  }, []);

  let totalTwlPoints = 0;
  let totalEwlPoints = 0;
  let totalRwlPoints = 0;
  let totalSfPoints = 0;

  const onPrint = () => {
    // let printContents = document.getElementById("printable")?.innerHTML;
    // let originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents!;
    window.print();
    // document.body.innerHTML = originalContents;
  };

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
          <div id="printable">
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
              {allTeachingWorkloads?.map(workload => {
                totalTwlPoints = Number(
                  (+workload.totalTeachingWorkload! + +totalTwlPoints).toFixed(
                    2
                  )
                );

                return (
                  <>
                    <BoldText>Teaching Work Load (TWL)</BoldText>
                    <ColumnParentContainer>
                      <ColumnContainer>
                        <ThinText>Number of Preparation:</ThinText>
                        <ThinText>Number of Contact Hours:</ThinText>
                        <ThinText>Number of Students:</ThinText>
                      </ColumnContainer>
                      <ColumnContainer>
                        <BoldText>{workload.numberOfPreparations}</BoldText>
                        <BoldText>{workload.contactHours}</BoldText>
                        <BoldText>{workload.totalNoOfStudents}</BoldText>
                      </ColumnContainer>
                    </ColumnParentContainer>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 25
                      }}
                    >
                      <ColumnContainer style={{ paddingLeft: 90 }}>
                        <BoldText>TOTAL:</BoldText>
                      </ColumnContainer>
                      <ColumnContainer>
                        <BoldText>
                          {Number(workload.totalTeachingWorkload).toFixed(2)}
                        </BoldText>
                      </ColumnContainer>
                    </div>
                  </>
                );
              })}
            </WorkloadDetailContainer>

            {/* RESEARCH WORKLOAD */}
            <WorkloadDetailContainer>
              {allResearchWorkloads?.map(workload => {
                totalRwlPoints = Number(
                  (+totalRwlPoints + +workload.rwlPoints!).toFixed(2)
                );
                return (
                  <>
                    <BoldText>Research Work Load (RWL)</BoldText>
                    <ColumnParentContainer>
                      <ColumnContainer>
                        <ThinText>Title of the Study:</ThinText>
                        <ThinText>Funding of the Study:</ThinText>
                        <ThinText>Designation in the Study:</ThinText>
                        <ThinText>Status of the Study:</ThinText>
                      </ColumnContainer>
                      <ColumnContainer>
                        <BoldText>{workload.titleOfStudy}</BoldText>
                        <BoldText>{workload.fundingOfStudy}</BoldText>
                        <BoldText>{workload.designationStudy}</BoldText>
                        <BoldText style={{ textTransform: "capitalize" }}>
                          {workload.status}
                        </BoldText>
                      </ColumnContainer>
                    </ColumnParentContainer>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 25
                      }}
                    >
                      <ColumnContainer style={{ paddingLeft: 90 }}>
                        <BoldText>TOTAL:</BoldText>
                      </ColumnContainer>
                      <ColumnContainer>
                        <BoldText>{workload.rwlPoints}</BoldText>
                      </ColumnContainer>
                    </div>
                  </>
                );
              })}
            </WorkloadDetailContainer>

            {/* EXTENSION WORKLOAD */}
            <WorkloadDetailContainer>
              {allExtensionWorkloads?.map(workload => {
                totalEwlPoints = Number(
                  (+totalEwlPoints + +workload.ewlPoints!).toFixed(2)
                );
                return (
                  <>
                    <BoldText>Extension Work Load (EWL)</BoldText>
                    <ColumnParentContainer>
                      <ColumnContainer>
                        <ThinText>Designation in Extension Activity:</ThinText>
                        <ThinText>
                          Number of Hours rendered in Extension Activity:
                        </ThinText>
                        <ThinText>
                          Resource Person in an Extension Activity:
                        </ThinText>
                        <ThinText>
                          Resource Person in an Extension Activity:
                        </ThinText>
                      </ColumnContainer>
                      <ColumnContainer>
                        <BoldText>
                          {workload.designationExtensionActivity}
                        </BoldText>
                        <BoldText>{workload.totalNumberHours}</BoldText>
                        <BoldText>{workload.resourcePerson}</BoldText>
                        <BoldText>{workload.resourcePerson}</BoldText>
                      </ColumnContainer>
                    </ColumnParentContainer>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 25
                      }}
                    >
                      <ColumnContainer style={{ paddingLeft: 90 }}>
                        <BoldText>TOTAL:</BoldText>
                      </ColumnContainer>
                      <ColumnContainer>
                        <BoldText>
                          {Number(workload.ewlPoints).toFixed(2)}
                        </BoldText>
                      </ColumnContainer>
                    </div>
                  </>
                );
              })}
            </WorkloadDetailContainer>

            {/* STRATEGIC FUNCTION WORKLOAD */}
            <WorkloadDetailContainer>
              {allStrategicFunctionWorkloads?.map((workload, index) => {
                totalSfPoints = Number(
                  (+totalSfPoints + +workload.sfwPoints!).toFixed(2)
                );
                return (
                  <div key={index}>
                    <BoldText>Strategic Function Work Load (SF)</BoldText>
                    <ColumnParentContainer>
                      <ParentLevelContainer>
                        <LevelContainer>
                          <ColumnContainer>
                            <ThinText>University Level:</ThinText>
                          </ColumnContainer>
                          <ColumnContainer>
                            {workload.designationUniversityLevel?.map(
                              designationUniversityLevel => {
                                return (
                                  <BoldText>
                                    {designationUniversityLevel}
                                  </BoldText>
                                );
                              }
                            )}
                          </ColumnContainer>
                        </LevelContainer>
                        <LevelContainer>
                          <ColumnContainer>
                            <ThinText>College Level:</ThinText>
                          </ColumnContainer>
                          <ColumnContainer>
                            {workload.designationCollegeCampusLevel?.map(
                              designationCollegeCampusLevel => {
                                return (
                                  <BoldText>
                                    {designationCollegeCampusLevel}
                                  </BoldText>
                                );
                              }
                            )}
                          </ColumnContainer>
                        </LevelContainer>

                        <LevelContainer>
                          <ColumnContainer>
                            <ThinText>Department Level:</ThinText>
                          </ColumnContainer>
                          <ColumnContainer>
                            {workload.designationDepartmentLevel?.map(
                              designationDepartmentLevel => {
                                return (
                                  <BoldText>
                                    {designationDepartmentLevel}
                                  </BoldText>
                                );
                              }
                            )}
                          </ColumnContainer>
                        </LevelContainer>

                        <LevelContainer>
                          <ColumnContainer>
                            <ThinText>
                              Designation as Academic Adviser:
                            </ThinText>
                          </ColumnContainer>
                          <ColumnContainer>
                            <BoldText>{workload.academicAdvisees}</BoldText>
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
                        <BoldText>{workload.sfwPoints}</BoldText>
                      </ColumnContainer>
                    </div>
                  </div>
                );
              })}
            </WorkloadDetailContainer>
            <ComputationContainer>
              <BoldText style={{ marginBottom: 30 }}>
                TWL + RWL + EWL + SF = TOTAL EARNED CREDIT UNITS
              </BoldText>
              <BoldText>
                {totalTwlPoints} + {totalRwlPoints} + {totalEwlPoints} +{" "}
                {totalSfPoints} ={" "}
                {(
                  +totalTwlPoints +
                  +totalRwlPoints +
                  +totalEwlPoints +
                  +totalSfPoints
                ).toFixed(2)}
              </BoldText>
              <OvpaaContainerPointsRemarks>
                <RemarksContainer>
                  <BoldText>Remarks: </BoldText>
                  {allTeachingWorkloads?.map(workload => {
                    return <ThinText>{workload.remarks?.remarks}</ThinText>;
                  })}
                </RemarksContainer>
                <PointsContainer>
                  <BoldText>Total Teaching Workload Points: </BoldText>
                  {allTeachingWorkloads?.map(workload => {
                    return <ThinText>{workload.remarks?.points}</ThinText>;
                  })}
                </PointsContainer>
                <PointsContainer>
                  <BoldText>Total Research Workload Points: </BoldText>
                  {allResearchWorkloads?.map((workload, index) => {
                    let points = 0;

                    for (let i = 0; workload.remarks?.length! > i; i++) {
                      points = Number(workload.remarks?.[i].points) + points;
                    }
                    if (allResearchWorkloads.length === index + 1) {
                      return <ThinText>{points.toString()}</ThinText>;
                    }
                  })}
                </PointsContainer>

                <PointsContainer>
                  <BoldText>Total Extension Workload Points: </BoldText>
                  {allExtensionWorkloads?.map((workload, index) => {
                    let points = 0;

                    for (let i = 0; workload.remarks?.length! > i; i++) {
                      points = Number(workload.remarks?.[i].points) + points;
                    }
                    if (allExtensionWorkloads.length === index + 1) {
                      return <ThinText>{points.toString()}</ThinText>;
                    }
                  })}
                </PointsContainer>
                <PointsContainer>
                  <BoldText>
                    Total Strategic Function Workload Points:{" "}
                  </BoldText>
                  {allStrategicFunctionWorkloads?.map((workload, index) => {
                    let points = 0;

                    for (let i = 0; workload.remarks?.length! > i; i++) {
                      points = Number(workload.remarks?.[i].points) + points;
                    }
                    if (allStrategicFunctionWorkloads.length === index + 1) {
                      return <ThinText>{points.toString()}</ThinText>;
                    }
                  })}
                </PointsContainer>
              </OvpaaContainerPointsRemarks>
            </ComputationContainer>
          </div>
          <ButtonContainer>
            <FormButton text="Print" onClicked={onPrint} />
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
  width: 80%;
  @media print {
    width: 100%;
    margin-right: 200px;
  }
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
  @media print {
    display: none;
  }
`;

const OvpaaContainerPointsRemarks = styled.div`
  margin-top: 20px;
  border: 3px solid black;
  border-radius: 15px;
  padding: 20px;
`;

const RemarksContainer = styled.div``;

const PointsContainer = styled.div``;

export default ReviewFacultyScreen;
