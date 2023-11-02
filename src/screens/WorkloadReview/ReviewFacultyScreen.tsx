import { useContext, useEffect, useMemo, useState } from "react";
import { GetAllUserPendingWorkloads } from "../../lib/faculty-workload.hooks";
import { TeachingWorkLoadType } from "../../types/TeachingWorkload";
import { ExtensionWorkloadType } from "../../types/ExtensionWorkload";
import { ResearchWorkLoadType } from "../../types/ResearchWorkLoad";
import { StrategicFunctionType } from "../../types/StrategicFunction";
import styled from "styled-components";
import Colors from "../../constants/Colors";
import FormButton from "../../components/FormButton";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { submitTwlWorkload } from "../../lib/teaching-workload.hooks";
import { submitRwlWorkload } from "../../lib/rwl.hooks";
import { submitEwlWorkload } from "../../lib/ewl.hooks";
import { submitSfWorkload } from "../../lib/sfw.hooks";
import { Confirm } from "semantic-ui-react";
import { UserContext } from "../../App";
import { DROPDOWN_LISTS } from "../../constants/Strings";

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

  const [ovpaaTotalTwlPoints, setOvpaaTotalTwlPoints] = useState(0);
  const [ovpaaTotalRwlPoints, setOvpaaTotalRwlPoints] = useState(0);
  const [ovpaaTotalEwlPoints, setOvpaaTotalEwlPoints] = useState(0);
  const [ovpaaTotalSfPoints, setOvpaaTotalSfPoints] = useState(0);

  const [ovpaaRemarks, setOvpaaRemarks] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isConfirming, setIsConfirming] = useState(false);

  const { user, actions } = useContext(UserContext);

  const [isQualifyOverload, setIsQualifyOverload] = useState(false);

  useEffect(() => {
    if (!isSubmitting) {
      (async () => {
        setIsDataLoading(true);
        const {
          teachingWorkloads,
          extensionWorkloads,
          researchWorkloads,
          strategicFunctionWorkloads
        } = await GetAllUserPendingWorkloads(user.email);
        setAllTeachingWorkloads(teachingWorkloads);
        setAllExtensionWorkloads(extensionWorkloads);
        setAllResearchWorkloads(researchWorkloads);
        setAllStrategicFunctionWorkloads(strategicFunctionWorkloads);
        setIsDataLoading(false);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting]);

  useEffect(() => {
    if (
      user.academicRank === "Instructor I" ||
      user.academicRank === "Instructor II" ||
      user.academicRank === "Instructor III"
    ) {
      const isTwlPassed = ovpaaTotalTwlPoints
        ? ovpaaTotalTwlPoints >= 15
        : false;
      const isResearchPassed = ovpaaTotalRwlPoints
        ? ovpaaTotalRwlPoints >= 3
        : false;
      const isExtensionPassed = ovpaaTotalEwlPoints
        ? ovpaaTotalEwlPoints >= 3
        : false;
      setIsQualifyOverload(
        isTwlPassed && (isResearchPassed || isExtensionPassed)
      );
    } else if (
      user.academicRank === "Assistant Professor I" ||
      user.academicRank === "Assistant Professor II" ||
      user.academicRank === "Assistant Professor III" ||
      user.academicRank === "Assistant Professor IV"
    ) {
      const isTwlPassed = ovpaaTotalTwlPoints
        ? ovpaaTotalTwlPoints >= 12
        : false;
      const isResearchPassed = ovpaaTotalRwlPoints
        ? ovpaaTotalRwlPoints >= 3
        : false;
      const isExtensionPassed = ovpaaTotalEwlPoints
        ? ovpaaTotalEwlPoints >= 3
        : false;
      setIsQualifyOverload(
        isTwlPassed && isResearchPassed && isExtensionPassed
      );
    } else if (
      user.academicRank === "Associate Professor I" ||
      user.academicRank === "Associate Professor II" ||
      user.academicRank === "Associate Professor III" ||
      user.academicRank === "Associate Professor IV" ||
      user.academicRank === "Associate Professor V"
    ) {
      const isTwlPassed = ovpaaTotalTwlPoints
        ? ovpaaTotalTwlPoints >= 9
        : false;
      const isResearchPassed = ovpaaTotalRwlPoints
        ? ovpaaTotalRwlPoints >= 6
        : false;
      const isExtensionPassed = ovpaaTotalEwlPoints
        ? ovpaaTotalEwlPoints >= 3
        : false;
      setIsQualifyOverload(
        isTwlPassed && isResearchPassed && isExtensionPassed
      );
    } else if (
      user.academicRank === "Professor I" ||
      user.academicRank === "Professor II" ||
      user.academicRank === "Professor III" ||
      user.academicRank === "Professor IV" ||
      user.academicRank === "Professor V" ||
      user.academicRank === "Professor VI"
    ) {
      const isTwlPassed = ovpaaTotalTwlPoints
        ? ovpaaTotalTwlPoints >= 6
        : false;
      const isResearchPassed = ovpaaTotalRwlPoints
        ? ovpaaTotalRwlPoints >= 9
        : false;
      const isExtensionPassed = ovpaaTotalEwlPoints
        ? ovpaaTotalEwlPoints >= 3
        : false;
      setIsQualifyOverload(
        isTwlPassed && isResearchPassed && isExtensionPassed
      );
    }
  }, [
    ovpaaTotalEwlPoints,
    ovpaaTotalRwlPoints,
    ovpaaTotalTwlPoints,
    user.academicRank
  ]);

  useEffect(() => {
    if (allTeachingWorkloads?.length! > 0) {
      setOvpaaTotalTwlPoints(
        Number(allTeachingWorkloads?.[0].remarks?.points) || 0
      );
      if (allTeachingWorkloads?.[0].remarks?.remarks?.length! > 0)
        setOvpaaRemarks(allTeachingWorkloads?.[0].remarks?.remarks!);
    }
  }, [allTeachingWorkloads]);

  useEffect(() => {
    if (allResearchWorkloads?.length! > 0) {
      const total = allResearchWorkloads?.reduce((accumulator, object) => {
        return accumulator + Number(object.remarks?.points);
      }, 0);
      setOvpaaTotalRwlPoints(total || 0);
      if (allResearchWorkloads?.[0].remarks?.remarks?.length! > 0)
        setOvpaaRemarks(allResearchWorkloads?.[0].remarks?.remarks!);
    }
  }, [allResearchWorkloads]);

  useEffect(() => {
    if (allExtensionWorkloads?.length! > 0) {
      const total = allExtensionWorkloads?.reduce((accumulator, object) => {
        return accumulator + Number(object.remarks?.points);
      }, 0);
      setOvpaaTotalEwlPoints(total || 0);
      if (allExtensionWorkloads?.[0].remarks?.remarks?.length! > 0)
        setOvpaaRemarks(allExtensionWorkloads?.[0].remarks?.remarks!);
    }
  }, [allExtensionWorkloads]);

  useEffect(() => {
    if (allStrategicFunctionWorkloads?.length! > 0) {
      const total = allStrategicFunctionWorkloads?.reduce(
        (accumulator, object) => {
          return accumulator + Number(object.remarks?.points);
        },
        0
      );
      setOvpaaTotalSfPoints(total || 0);
      if (allStrategicFunctionWorkloads?.[0].remarks?.remarks?.length! > 0)
        setOvpaaRemarks(allStrategicFunctionWorkloads?.[0].remarks?.remarks!);
    }
  }, [allStrategicFunctionWorkloads]);

  let totalTwlPoints = 0;
  let totalEwlPoints = 0;
  let totalRwlPoints = 0;
  let totalSfPoints = 0;

  const onPrint = () => {
    window.print();
  };

  const onSubmitWorkloads = async () => {
    setIsSubmitting(true);
    try {
      if (!!allTeachingWorkloads?.length)
        await submitTwlWorkload(allTeachingWorkloads[0].id!);
      if (!!allResearchWorkloads?.length)
        await submitRwlWorkload(allResearchWorkloads[0].id!);
      if (!!allExtensionWorkloads?.length)
        await submitEwlWorkload(allExtensionWorkloads[0].id!);
      if (!!allStrategicFunctionWorkloads?.length)
        await submitSfWorkload(allStrategicFunctionWorkloads[0].id!);
      if (user) {
        const {
          teachingWorkloads,
          extensionWorkloads,
          researchWorkloads,
          strategicFunctionWorkloads
        } = await GetAllUserPendingWorkloads(user.email);
        actions.setHasPendingTeachingWorkload(
          !!teachingWorkloads.length && teachingWorkloads[0].isSubmitted
        );
        actions.setHasPendingExtensionWorkload(
          !!extensionWorkloads.length && extensionWorkloads[0].isSubmitted
        );
        actions.setHasPendingResearchWorkload(
          !!researchWorkloads.length && researchWorkloads[0].isSubmitted
        );
        actions.setHasPendingStrategicWorkload(
          !!strategicFunctionWorkloads.length &&
            strategicFunctionWorkloads[0].isSubmitted
        );
      }
      alert("You have successfully submitted your workload. Thank you.");
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  const totalPoints = useMemo(() => {
    const total =
      ovpaaTotalTwlPoints +
      ovpaaTotalEwlPoints +
      ovpaaTotalRwlPoints +
      ovpaaTotalSfPoints -
      25;
    return total;
  }, [
    ovpaaTotalEwlPoints,
    ovpaaTotalRwlPoints,
    ovpaaTotalSfPoints,
    ovpaaTotalTwlPoints
  ]);

  const totalOverload = useMemo(() => {
    const total =
      totalPoints >= 9.84 ? 9.84 * 165 * 18 : totalPoints * 165 * 18;
    return total;
  }, [totalPoints]);

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
          <Confirm
            open={isConfirming}
            onCancel={() => setIsConfirming(false)}
            onConfirm={() => {
              setIsConfirming(false);
              onSubmitWorkloads();
            }}
            content="Confirm submission?"
            size="large"
          />
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
                        {workload.numberOfPreparations && (
                          <ThinText>Number of Preparation:</ThinText>
                        )}
                        {workload.contactHours && (
                          <ThinText>Number of Contact Hours:</ThinText>
                        )}
                        {workload.totalNoOfStudents && (
                          <ThinText>Number of Students:</ThinText>
                        )}
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
                    <BoldText style={{ marginBottom: 20 }}>
                      Research Work Load (RWL)
                    </BoldText>
                    {workload.cvsuFunded.map(funded => (
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            borderBottom: "1px solid black"
                          }}
                        >
                          <ColumnContainer>
                            <BoldText style={{ marginBottom: 10 }}>
                              CvSU Funded Research
                            </BoldText>
                            <ThinText>Title of the Study:</ThinText>
                            <ThinText>Type of Study:</ThinText>
                            <ThinText>Designation in the Study:</ThinText>
                          </ColumnContainer>
                          <ColumnContainer>
                            <BoldText style={{ marginBottom: 10 }}>
                              &nbsp;
                            </BoldText>
                            <BoldText>{funded.title}</BoldText>
                            <BoldText>{funded.typeOfStudy}</BoldText>
                            <BoldText>{funded.designationStudy}</BoldText>
                          </ColumnContainer>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 25
                          }}
                        >
                          <ColumnContainer>
                            <BoldText>TOTAL:</BoldText>
                          </ColumnContainer>
                          <ColumnContainer>
                            <BoldText>{funded.points}</BoldText>
                          </ColumnContainer>
                        </div>
                      </>
                    ))}
                    {workload.externallyFunded.map(funded => (
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            borderBottom: "1px solid black"
                          }}
                        >
                          <ColumnContainer>
                            <BoldText style={{ marginBottom: 10 }}>
                              Externally Funded Research
                            </BoldText>
                            <ThinText>Title of the Study:</ThinText>
                            <ThinText>
                              Fund Generated per Semester (in peso):
                            </ThinText>
                          </ColumnContainer>
                          <ColumnContainer>
                            <BoldText style={{ marginBottom: 10 }}>
                              &nbsp;
                            </BoldText>
                            <BoldText>{funded.title}</BoldText>
                            <BoldText>{funded.fundGenerated}</BoldText>
                          </ColumnContainer>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 25
                          }}
                        >
                          <ColumnContainer>
                            <BoldText>TOTAL:</BoldText>
                          </ColumnContainer>
                          <ColumnContainer>
                            <BoldText>{funded.points}</BoldText>
                          </ColumnContainer>
                        </div>
                      </>
                    ))}
                    {!!workload.disseminatedResearch?.length && (
                      <>
                        {workload.disseminatedResearch.map(study => (
                          <>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                borderBottom: "1px solid black"
                              }}
                            >
                              <ColumnContainer>
                                <BoldText style={{ marginBottom: 10 }}>
                                  Disseminated Research
                                </BoldText>
                                <ThinText>Study:</ThinText>
                              </ColumnContainer>
                              <ColumnContainer>
                                <BoldText style={{ marginBottom: 10 }}>
                                  &nbsp;
                                </BoldText>
                                <BoldText>{study}</BoldText>
                              </ColumnContainer>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 25
                              }}
                            >
                              <ColumnContainer>
                                <BoldText>TOTAL:</BoldText>
                              </ColumnContainer>
                              <ColumnContainer>
                                <BoldText>
                                  {study ===
                                  DROPDOWN_LISTS.DISSEMINATED_RESEARCH_OUTPUT[1]
                                    ? 4
                                    : study ===
                                      DROPDOWN_LISTS
                                        .DISSEMINATED_RESEARCH_OUTPUT[2]
                                    ? 3
                                    : study ===
                                      DROPDOWN_LISTS
                                        .DISSEMINATED_RESEARCH_OUTPUT[3]
                                    ? 2
                                    : 1}
                                </BoldText>
                              </ColumnContainer>
                            </div>
                          </>
                        ))}
                      </>
                    )}
                  </>
                );
              })}
            </WorkloadDetailContainer>

            {/* EXTENSION WORKLOAD */}
            <WorkloadDetailContainer>
              {allExtensionWorkloads?.map((workload, index) => {
                totalEwlPoints = Number(
                  (+totalEwlPoints + +workload.ewlPoints!).toFixed(2)
                );
                return (
                  <div key={index}>
                    <BoldText>Extension Work Load (EWL)</BoldText>
                    <ColumnParentContainer>
                      <ParentLevelContainer>
                        <LevelContainer>
                          {!!workload.designationExtensionActivity?.length && (
                            <>
                              <ColumnContainer>
                                <ThinText>
                                  Designation in Extension Activity:
                                </ThinText>
                              </ColumnContainer>
                              <ColumnContainer>
                                {workload.designationExtensionActivity.map(
                                  designation => {
                                    return <BoldText>{designation}</BoldText>;
                                  }
                                )}
                              </ColumnContainer>
                            </>
                          )}
                        </LevelContainer>
                        <LevelContainer>
                          {workload.totalNumberHours && (
                            <>
                              <ColumnContainer>
                                <ThinText>
                                  Number of Hours rendered in Extension
                                  Activity:
                                </ThinText>
                              </ColumnContainer>
                              <ColumnContainer>
                                <BoldText>{workload.totalNumberHours}</BoldText>
                              </ColumnContainer>
                            </>
                          )}
                        </LevelContainer>
                        <LevelContainer>
                          {!!workload.resourcePerson?.length && (
                            <>
                              <ColumnContainer>
                                <ThinText>
                                  Resource Person in an Extension Activity:
                                </ThinText>
                              </ColumnContainer>
                              <ColumnContainer>
                                {workload.resourcePerson.map(resource => {
                                  return <BoldText>{resource}</BoldText>;
                                })}
                              </ColumnContainer>
                            </>
                          )}
                        </LevelContainer>
                      </ParentLevelContainer>
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
                  </div>
                );
              })}
            </WorkloadDetailContainer>
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
                          {workload.designationUniversityLevel?.length! > 0 && (
                            <>
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
                            </>
                          )}
                        </LevelContainer>
                        <LevelContainer>
                          {workload.designationCollegeCampusLevel?.length! >
                            0 && (
                            <>
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
                            </>
                          )}
                        </LevelContainer>

                        <LevelContainer>
                          {workload.designationDepartmentLevel?.length! > 0 && (
                            <>
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
                            </>
                          )}
                        </LevelContainer>
                        <LevelContainer>
                          {workload.designationAsSportTrainorAcademic && (
                            <>
                              <ColumnContainer style={{ maxWidth: 300 }}>
                                <ThinText>
                                  Designation as Sports/Socio-Cultural Coach or
                                  Trainor and Academic Organization Adviser:
                                </ThinText>
                              </ColumnContainer>
                              <ColumnContainer>
                                {workload.designationAsSportTrainorAcademic && (
                                  <BoldText>
                                    {workload.designationAsSportTrainorAcademic}
                                  </BoldText>
                                )}
                                {workload.designationAsSportTrainorAcademic1 && (
                                  <BoldText>
                                    {
                                      workload.designationAsSportTrainorAcademic1
                                    }
                                  </BoldText>
                                )}
                                {workload.designationAsSportTrainorAcademic2 && (
                                  <BoldText>
                                    {
                                      workload.designationAsSportTrainorAcademic2
                                    }
                                  </BoldText>
                                )}
                              </ColumnContainer>
                            </>
                          )}
                        </LevelContainer>
                        <LevelContainer>
                          {workload.designationAsMemberOfAdhoc && (
                            <>
                              <ColumnContainer>
                                <ThinText>
                                  Designation as Member of University-Wide AdHoc
                                  Committee:
                                </ThinText>
                              </ColumnContainer>
                              <ColumnContainer>
                                {workload.designationAsMemberOfAdhoc && (
                                  <BoldText>
                                    {workload.designationAsMemberOfAdhoc}
                                  </BoldText>
                                )}
                                {workload.designationAsMemberOfAdhoc1 && (
                                  <BoldText>
                                    {workload.designationAsMemberOfAdhoc1}
                                  </BoldText>
                                )}
                                {workload.designationAsMemberOfAdhoc2 && (
                                  <BoldText>
                                    {workload.designationAsMemberOfAdhoc2}
                                  </BoldText>
                                )}
                              </ColumnContainer>
                            </>
                          )}
                        </LevelContainer>
                        <LevelContainer>
                          {workload.academicAdvisees && (
                            <>
                              <ColumnContainer>
                                <ThinText>
                                  Designation as Academic Adviser:
                                </ThinText>
                              </ColumnContainer>
                              <ColumnContainer>
                                <BoldText>{workload.academicAdvisees}</BoldText>
                              </ColumnContainer>
                            </>
                          )}
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
              <BoldText style={{ fontSize: 20 }}>
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

                  <ThinText>{ovpaaRemarks}</ThinText>
                </RemarksContainer>
                <PointsContainer>
                  <BoldText>Total Teaching Workload Points: </BoldText>
                  <ThinText>{ovpaaTotalTwlPoints}</ThinText>
                </PointsContainer>
                <PointsContainer>
                  <BoldText>Total Research Workload Points: </BoldText>
                  <ThinText>{ovpaaTotalRwlPoints}</ThinText>
                </PointsContainer>
                <PointsContainer>
                  <BoldText>Total Extension Workload Points: </BoldText>
                  <ThinText>{ovpaaTotalEwlPoints}</ThinText>
                </PointsContainer>
                <PointsContainer style={{ marginBottom: 30 }}>
                  <BoldText>
                    Total Strategic Function Workload Points:{" "}
                  </BoldText>
                  <ThinText>{ovpaaTotalSfPoints}</ThinText>
                </PointsContainer>
                {ovpaaTotalTwlPoints ||
                ovpaaTotalRwlPoints ||
                ovpaaTotalEwlPoints ||
                ovpaaTotalSfPoints ? (
                  isQualifyOverload && totalPoints + 25 > 25 ? (
                    <BoldText style={{ color: "green" }}>
                      You’ve qualified for an overload pay amounting to{" "}
                      {totalOverload.toFixed(2)}.
                    </BoldText>
                  ) : (
                    <BoldText style={{ color: "red" }}>
                      You didn't qualify for an overload pay.
                    </BoldText>
                  )
                ) : null}
              </OvpaaContainerPointsRemarks>
            </ComputationContainer>
          </div>
          <ButtonContainer>
            <FormButton
              text="Print"
              onClicked={onPrint}
              disabled={isSubmitting}
            />
            {((!!allTeachingWorkloads?.length &&
              !allTeachingWorkloads[0].isSubmitted) ||
              (!!allResearchWorkloads?.length &&
                !allResearchWorkloads[0].isSubmitted) ||
              (!!allExtensionWorkloads?.length &&
                !allExtensionWorkloads[0].isSubmitted) ||
              (!!allStrategicFunctionWorkloads?.length &&
                !allStrategicFunctionWorkloads[0].isSubmitted)) && (
              <FormButton
                text="Submit"
                onClicked={() => setIsConfirming(true)}
                isSubmitting={isSubmitting || isDataLoading}
                disabled={isSubmitting}
              />
            )}
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
  font-family: HurmeGeometricSans3Bold;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
`;

const HeaderText = styled.span`
  font-family: HurmeGeometricSans3Bold;
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
