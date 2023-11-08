import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Colors from "../../constants/Colors";
import { User } from "../../types/User";
import { TeachingWorkLoadType } from "../../types/TeachingWorkload";
import { getAllPendingWorkloadByIdAndCurrentProcessRole } from "../../lib/faculty-workload.hooks";
import { ResearchWorkLoadType } from "../../types/ResearchWorkLoad";
import { ExtensionWorkloadType } from "../../types/ExtensionWorkload";
import { StrategicFunctionType } from "../../types/StrategicFunction";
import { UserContext } from "../../App";
import { DROPDOWN_LISTS } from "../../constants/Strings";

type WorkloadProps = {
  user: User;
  setRemarks: (value: string) => void;
  setTwlPointsRemarks: (value?: PointsAndRemarks[]) => void;
  setRwlPointsRemarks: (value: PointsAndRemarks[]) => void;
  setEwlPointsRemarks: (value: PointsAndRemarks[]) => void;
  setSfPointsRemarks: (value: PointsAndRemarks[]) => void;
  rwlPointsRemarks?: PointsAndRemarks[];
};

export type PointsAndRemarks = {
  key: string;
  points: string;
  remarks?: string;
};
function RemarksWorkload({
  user,
  setRemarks,
  setTwlPointsRemarks,
  setRwlPointsRemarks,
  setEwlPointsRemarks,
  setSfPointsRemarks
}: WorkloadProps) {
  const [teachingWorkloads, setTeachingWorkloads] =
    useState<TeachingWorkLoadType[]>();
  const [researchWorkloads, setResearchWorkloads] =
    useState<ResearchWorkLoadType[]>();
  const [extensionWorkloads, setExtensionWorkloads] =
    useState<ExtensionWorkloadType[]>();
  const [strategicFunctionWorkloads, setStrategicFunctionWorkloads] =
    useState<StrategicFunctionType[]>();

  const [isDataLoading, setIsDataLoading] = useState(true);

  const { user: userContext } = useContext(UserContext);

  const [twlPointsRemarksSetter, setTwlPointsRemarksSetter] = useState<
    PointsAndRemarks[]
  >([
    {
      key: "",
      points: "0"
    }
  ]);
  const [rwlPointsRemarksSetter, setRwlPointsRemarksSetter] = useState<
    PointsAndRemarks[]
  >([
    {
      key: "",
      points: "0"
    }
  ]);
  const [ewlPointsRemarksSetter, setEwlPointsRemarksSetter] = useState<
    PointsAndRemarks[]
  >([
    {
      key: "",
      points: "0"
    }
  ]);
  const [sfwPointsRemarksSetter, setSfwPointsRemarksSetter] = useState<
    PointsAndRemarks[]
  >([
    {
      key: "",
      points: "0"
    }
  ]);

  const [twlPointsRemarksInitial, setTwlPointsRemarksInitial] =
    useState<PointsAndRemarks[]>();
  const [rwlPointsRemarksInitial, setRwlPointsRemarksInitial] =
    useState<PointsAndRemarks[]>();
  const [ewlPointsRemarksInitial, setEwlPointsRemarksInitial] =
    useState<PointsAndRemarks[]>();
  const [sfPointsRemarksInitial, setSfPointsRemarksInitial] =
    useState<PointsAndRemarks[]>();

  useEffect(() => {
    (async () => {
      if (userContext.role !== null) {
        const {
          teachingWorkloads,
          researchWorkloads,
          extensionWorkloads,
          strategicFunctionWorkloads
        } = await getAllPendingWorkloadByIdAndCurrentProcessRole(
          user.id!,
          userContext.role
        );
        setTeachingWorkloads(teachingWorkloads);
        setResearchWorkloads(researchWorkloads);
        setExtensionWorkloads(extensionWorkloads);
        setStrategicFunctionWorkloads(strategicFunctionWorkloads);
        setIsDataLoading(false);
      }
    })();
  }, [user.id, userContext.role]);

  useEffect(() => {
    let mock = twlPointsRemarksSetter;
    for (let a = 0; a < twlPointsRemarksInitial?.length!; a++) {
      const index = twlPointsRemarksSetter.findIndex(
        x => x.key === twlPointsRemarksInitial?.[a].key
      );
      mock[index].points = twlPointsRemarksInitial?.[a].points || "0";
    }

    setTwlPointsRemarks(mock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twlPointsRemarksInitial]);

  useEffect(() => {
    let mock = rwlPointsRemarksSetter;
    for (let a = 0; a < rwlPointsRemarksInitial?.length!; a++) {
      const index = rwlPointsRemarksSetter.findIndex(
        x => x.key === rwlPointsRemarksInitial?.[a].key
      );
      mock[index].points = rwlPointsRemarksInitial?.[a].points || "0";
    }

    setRwlPointsRemarks(mock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rwlPointsRemarksInitial]);

  useEffect(() => {
    let mock = ewlPointsRemarksSetter;
    for (let a = 0; a < ewlPointsRemarksInitial?.length!; a++) {
      const index = ewlPointsRemarksSetter.findIndex(
        x => x.key === ewlPointsRemarksInitial?.[a].key
      );
      mock[index].points = ewlPointsRemarksInitial?.[a].points || "0";
    }

    setEwlPointsRemarks(mock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ewlPointsRemarksInitial]);

  useEffect(() => {
    let mock = sfwPointsRemarksSetter;
    for (let a = 0; a < sfPointsRemarksInitial?.length!; a++) {
      const index = sfwPointsRemarksSetter.findIndex(
        x => x.key === sfPointsRemarksInitial?.[a].key
      );
      mock[index].points = sfPointsRemarksInitial?.[a].points || "0";
    }

    setSfPointsRemarks(mock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sfPointsRemarksInitial]);

  useEffect(() => {
    setTwlPointsRemarks(twlPointsRemarksSetter);
  }, [twlPointsRemarksSetter, setTwlPointsRemarks]);

  useEffect(() => {
    setRwlPointsRemarks(rwlPointsRemarksSetter);
  }, [rwlPointsRemarksSetter, setRwlPointsRemarks]);

  useEffect(() => {
    setEwlPointsRemarks(ewlPointsRemarksSetter);
  }, [ewlPointsRemarksSetter, setEwlPointsRemarks]);

  useEffect(() => {
    setSfPointsRemarks(sfwPointsRemarksSetter);
  }, [sfwPointsRemarksSetter, setSfPointsRemarks]);

  return (
    <Container>
      {isDataLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
          }}
        >
          <LoadingSpinner color={Colors.primary} />
        </div>
      )}
      <WorkloadHeaderContainer
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        {userContext.role === "OVPAA" && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <WorkloadHeaderText>Evaluated Workload(OVPAA)</WorkloadHeaderText>
            <div
              style={{
                display: "flex",
                alignSelf: "end",
                marginRight: 50
              }}
            >
              <WorkloadHeaderText style={{ marginRight: 103 }}>
                Points
              </WorkloadHeaderText>
            </div>
          </div>
        )}
      </WorkloadHeaderContainer>
      {isDataLoading && !teachingWorkloads ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
          }}
        >
          <LoadingSpinner color={Colors.primary} />
        </div>
      ) : (
        teachingWorkloads?.map(workload => {
          const deanPoints = workload.deanPoints?.find(item => {
            return item.key === workload.twlFilePath;
          });
          let points =
            userContext.role === "Dean"
              ? workload.totalTeachingWorkload?.toString()
              : deanPoints?.points || "0";

          const hasData = twlPointsRemarksSetter.filter(
            item => item.key === workload.twlFilePath
          );

          if (!!!hasData.length) {
            const data: PointsAndRemarks[] = [
              {
                key: workload.twlFilePath!,
                points: points || "0"
              }
            ];
            const merge = [...twlPointsRemarksSetter, ...data];
            setTwlPointsRemarksSetter(merge);
          }

          return (
            <>
              <WorkloadHeaderText>Teaching Workload</WorkloadHeaderText>
              <ColumnParentContainer>
                <ParentLevelContainer>
                  {workload.numberOfPreparations && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>Number of Preparation:</ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        <BoldText>{workload.numberOfPreparations}</BoldText>
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.contactHours && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>Number of Contact Hours:</ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        <BoldText>{workload.contactHours}</BoldText>
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.totalNoOfStudents && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>Number of Students:</ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        <BoldText>{workload.totalNoOfStudents}</BoldText>
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.twlFilePath && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>Class Schedule Attachment:</ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        {workload.twlFilePath && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between"
                            }}
                          >
                            <a
                              href={workload.twlFilePath}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                alignItems: "flex-start",
                                display: "flex"
                              }}
                            >
                              <ThinText
                                style={{
                                  color: "white",
                                  fontSize: 12,
                                  backgroundColor: Colors.buttonPrimary,
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                  cursor: "pointer"
                                }}
                                onClick={() => {}}
                              >
                                Attachment
                              </ThinText>
                            </a>
                            {(userContext.role === "OVPAA" ||
                              userContext.role === "Dean") && (
                              <div
                                style={{
                                  width: 170,
                                  display: "flex",
                                  marginRight: 15
                                }}
                              >
                                <InputPoints
                                  type="number"
                                  min={0}
                                  onChange={e => {
                                    points = e.target.value;
                                    if (
                                      Number(points) > 0 ||
                                      Number(e.target.value) > 0
                                    ) {
                                      const hasData =
                                        twlPointsRemarksInitial?.filter(
                                          item =>
                                            item.key === workload.twlFilePath
                                        );
                                      if (hasData) {
                                        const filtered =
                                          twlPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !== workload.twlFilePath
                                          );
                                        setTwlPointsRemarksInitial(filtered);
                                        if (Number(points) > 0) {
                                          setTwlPointsRemarksInitial([
                                            ...filtered!,
                                            {
                                              key: workload.twlFilePath!,
                                              points: points || "0"
                                            }
                                          ]);
                                        }
                                      } else {
                                        setTwlPointsRemarksInitial([
                                          {
                                            key: workload.twlFilePath!,
                                            points: points || "0"
                                          }
                                        ]);
                                      }
                                    } else {
                                      setTwlPointsRemarksInitial(
                                        twlPointsRemarksInitial?.filter(
                                          item =>
                                            item.key !== workload.twlFilePath
                                        )
                                      );
                                    }
                                  }}
                                  defaultValue={points}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                </ParentLevelContainer>
              </ColumnParentContainer>
            </>
          );
        })
      )}

      {isDataLoading && !researchWorkloads ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
          }}
        >
          <LoadingSpinner color={Colors.primary} />
        </div>
      ) : (
        researchWorkloads?.map(workload => {
          let indexDeanPoints = 0;

          return (
            <>
              <WorkloadHeaderContainer>
                <WorkloadHeaderText>Research Workload</WorkloadHeaderText>
              </WorkloadHeaderContainer>
              <ColumnParentContainer
                style={{ display: "flex", flexDirection: "column" }}
              >
                <ColumnContainer style={{ display: "flex", flex: 1 }}>
                  {workload.cvsuFunded &&
                    workload.cvsuFunded.map((funded, index) => {
                      const item = workload.deanPoints?.find(item => {
                        return (
                          item.key === workload.cvsuFundedFilePath?.[index]
                        );
                      });

                      const conditionDeanPoints = !!workload.deanPoints?.length
                        ? item?.points
                        : "0";

                      let points =
                        conditionDeanPoints === "0"
                          ? funded.points.toString()
                          : conditionDeanPoints;
                      indexDeanPoints += 1;

                      const hasData = rwlPointsRemarksSetter.filter(
                        item =>
                          item.key === workload.cvsuFundedFilePath?.[index]
                      );
                      if (!!!hasData.length) {
                        const data: PointsAndRemarks[] = [
                          {
                            key: workload.cvsuFundedFilePath?.[index]!,
                            points: points?.toString() || "0"
                          }
                        ];
                        const merge = [...rwlPointsRemarksSetter, ...data];
                        setRwlPointsRemarksSetter(merge);
                      }
                      return (
                        <div
                          style={{ display: "flex", flexDirection: "row" }}
                          key={funded.filePath}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginRight: 15,
                              flex: 0.5
                            }}
                          >
                            <BoldText style={{ marginBottom: 10 }}>
                              CvSU Funded Research
                            </BoldText>
                            <ThinText>Title of the Study:</ThinText>
                            <ThinText>Type of the Study:</ThinText>
                            <ThinText>Designation in the Study:</ThinText>
                            <ThinText
                              style={{ maxWidth: 350, marginBottom: 10 }}
                            >
                              Proposal(for Approved Proposal) or Progress
                              Report(for On-Going Study) Attachment:
                            </ThinText>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              flex: 1,
                              marginLeft: 5
                            }}
                          >
                            <BoldText style={{ marginBottom: 10 }}>
                              &nbsp;
                            </BoldText>
                            <BoldText>{funded.title}</BoldText>
                            <BoldText>{funded.typeOfStudy}</BoldText>
                            <BoldText>{funded.designationStudy}</BoldText>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between"
                              }}
                            >
                              <a
                                href={workload.cvsuFundedFilePath?.[index]}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  textDecoration: "none",
                                  alignItems: "flex-start",
                                  display: "flex"
                                }}
                              >
                                <ThinText
                                  style={{
                                    color: "white",
                                    fontSize: 12,
                                    backgroundColor: Colors.buttonPrimary,
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    cursor: "pointer"
                                  }}
                                  onClick={() => {}}
                                >
                                  Attachment
                                </ThinText>
                              </a>
                              {(userContext.role === "OVPAA" ||
                                userContext.role === "Dean") && (
                                <div
                                  style={{
                                    width: 170,
                                    display: "flex",
                                    marginRight: 15
                                  }}
                                >
                                  <InputPoints
                                    type="number"
                                    min={0}
                                    onChange={e => {
                                      points = e.target.value;
                                      if (
                                        Number(points) > 0 ||
                                        Number(e.target.value) > 0
                                      ) {
                                        const hasData =
                                          rwlPointsRemarksInitial?.filter(
                                            item =>
                                              item.key ===
                                              workload.cvsuFundedFilePath?.[
                                                index
                                              ]
                                          );
                                        if (hasData) {
                                          const filtered =
                                            rwlPointsRemarksInitial?.filter(
                                              item =>
                                                item.key !==
                                                workload.cvsuFundedFilePath?.[
                                                  index
                                                ]
                                            );
                                          setRwlPointsRemarksInitial(filtered);
                                          if (
                                            Number(points) > 0 ||
                                            Number(e.target.value)
                                          ) {
                                            setRwlPointsRemarksInitial([
                                              ...filtered!,
                                              {
                                                key: workload
                                                  .cvsuFundedFilePath?.[index]!,
                                                points: points
                                              }
                                            ]);
                                          }
                                        } else {
                                          setRwlPointsRemarksInitial([
                                            {
                                              key: workload
                                                .cvsuFundedFilePath?.[index]!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      } else {
                                        setRwlPointsRemarksInitial(
                                          rwlPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !==
                                              workload.cvsuFundedFilePath?.[
                                                index
                                              ]
                                          )
                                        );
                                      }
                                    }}
                                    defaultValue={points}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {workload.externallyFunded &&
                    workload.externallyFunded.map((funded, index) => {
                      const item = workload.deanPoints?.find(item => {
                        return (
                          item.key ===
                          workload.externallyFundedFilePath?.[index]
                        );
                      });

                      const conditionDeanPoints = !!workload.deanPoints?.length
                        ? item?.points
                        : "0";

                      let points =
                        conditionDeanPoints === "0"
                          ? funded.points.toString()
                          : conditionDeanPoints;
                      indexDeanPoints += 1;

                      const hasData = rwlPointsRemarksSetter.filter(
                        item =>
                          item.key ===
                          workload.externallyFundedFilePath?.[index]
                      );
                      if (!!!hasData.length) {
                        const data: PointsAndRemarks[] = [
                          {
                            key: workload.externallyFundedFilePath?.[index]!,
                            points: points?.toString() || "0"
                          }
                        ];
                        const merge = [...rwlPointsRemarksSetter, ...data];
                        setRwlPointsRemarksSetter(merge);
                      }
                      return (
                        <div
                          style={{ display: "flex", flexDirection: "row" }}
                          key={funded.filePath}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginRight: 15,
                              flex: 0.5
                            }}
                          >
                            <BoldText style={{ marginBottom: 10 }}>
                              Externally Funded Research
                            </BoldText>
                            <ThinText>Title of the Study:</ThinText>
                            <ThinText>
                              Fund Generated per Semester (in peso):
                            </ThinText>
                            <ThinText
                              style={{ maxWidth: 350, marginBottom: 10 }}
                            >
                              Proposal(for Approved Externally Funded Proposal)
                              or Progress Report(for On-Going Externally Funded
                              Study) Attachment:
                            </ThinText>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: 5,
                              flex: 1
                            }}
                          >
                            <BoldText style={{ marginBottom: 10 }}>
                              &nbsp;
                            </BoldText>
                            <BoldText>{funded.title}</BoldText>
                            <BoldText>{funded.fundGenerated}</BoldText>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between"
                              }}
                            >
                              <a
                                href={
                                  workload.externallyFundedFilePath?.[index]
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  textDecoration: "none",
                                  alignItems: "flex-start",
                                  display: "flex"
                                }}
                              >
                                <ThinText
                                  style={{
                                    color: "white",
                                    fontSize: 12,
                                    backgroundColor: Colors.buttonPrimary,
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    cursor: "pointer"
                                  }}
                                  onClick={() => {}}
                                >
                                  Attachment
                                </ThinText>
                              </a>
                              {(userContext.role === "OVPAA" ||
                                userContext.role === "Dean") && (
                                <div
                                  style={{
                                    width: 170,
                                    display: "flex",
                                    marginRight: 15
                                  }}
                                >
                                  <InputPoints
                                    type="number"
                                    min={0}
                                    onChange={e => {
                                      points = e.target.value;
                                      if (
                                        Number(points) > 0 ||
                                        Number(e.target.value) > 0
                                      ) {
                                        const hasData =
                                          rwlPointsRemarksInitial?.filter(
                                            item =>
                                              item.key ===
                                              workload
                                                .externallyFundedFilePath?.[
                                                index
                                              ]
                                          );
                                        if (hasData) {
                                          const filtered =
                                            rwlPointsRemarksInitial?.filter(
                                              item =>
                                                item.key !==
                                                workload
                                                  .externallyFundedFilePath?.[
                                                  index
                                                ]
                                            );
                                          setRwlPointsRemarksInitial(filtered);
                                          if (Number(points) > 0) {
                                            setRwlPointsRemarksInitial([
                                              ...filtered!,
                                              {
                                                key: workload
                                                  .externallyFundedFilePath?.[
                                                  index
                                                ]!,
                                                points: points
                                              }
                                            ]);
                                          }
                                        } else {
                                          setRwlPointsRemarksInitial([
                                            {
                                              key: workload
                                                .externallyFundedFilePath?.[
                                                index
                                              ]!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      }
                                    }}
                                    defaultValue={points}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </ColumnContainer>
                {workload.disseminatedResearchFilesPath && (
                  <LevelContainer>
                    <ColumnContainer style={{ display: "flex", flex: 1 }}>
                      <ThinText>Certificate of Presentation:</ThinText>
                    </ColumnContainer>
                    <ColumnContainer style={{ display: "flex", flex: 2 }}>
                      {workload.disseminatedResearchFilesPath &&
                        workload.disseminatedResearchFilesPath.map(
                          (attachment, index) => {
                            const deanPoints = workload.deanPoints?.find(
                              item => {
                                return item.key === attachment;
                              }
                            );
                            const conditionPoint =
                              index === 0 && userContext.role === "Dean"
                                ? workload.disseminated1Points?.toString() || ""
                                : index === 1 && userContext.role === "Dean"
                                ? workload.disseminated2Points?.toString() || ""
                                : index === 2 && userContext.role === "Dean"
                                ? workload.disseminated3Points?.toString() || ""
                                : workload.disseminated4Points?.toString() ||
                                  "";
                            const conditionDeanPoints = deanPoints
                              ? deanPoints.points
                              : "0";

                            let points =
                              conditionDeanPoints === "0"
                                ? conditionPoint
                                : conditionDeanPoints;
                            indexDeanPoints += 1;

                            const hasData = rwlPointsRemarksSetter.filter(
                              item => item.key === attachment
                            );
                            if (!!!hasData.length) {
                              const data: PointsAndRemarks[] = [
                                {
                                  key: attachment,
                                  points: points?.toString() || "0"
                                }
                              ];
                              const merge = [
                                ...rwlPointsRemarksSetter,
                                ...data
                              ];
                              setRwlPointsRemarksSetter(merge);
                            }
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  width: "100%",
                                  justifyContent: "space-between"
                                }}
                                key={attachment}
                              >
                                <a
                                  href={attachment}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    textDecoration: "none",
                                    alignItems: "flex-start",
                                    display: "flex"
                                  }}
                                >
                                  <ThinText
                                    style={{
                                      color: "white",
                                      fontSize: 12,
                                      backgroundColor: Colors.buttonPrimary,
                                      paddingLeft: 5,
                                      paddingRight: 5,
                                      cursor: "pointer"
                                    }}
                                    onClick={() => {}}
                                  >
                                    Attachment
                                  </ThinText>
                                </a>
                                {(userContext.role === "OVPAA" ||
                                  userContext.role === "Dean") && (
                                  <div
                                    style={{
                                      width: 170,
                                      display: "flex",
                                      marginRight: 15
                                    }}
                                  >
                                    <InputPoints
                                      type="number"
                                      min={0}
                                      onChange={e => {
                                        points = e.target.value;
                                        if (
                                          Number(points) > 0 ||
                                          Number(e.target.value) > 0
                                        ) {
                                          const hasData =
                                            rwlPointsRemarksInitial?.filter(
                                              item => item.key === attachment
                                            );
                                          if (hasData) {
                                            const filtered =
                                              rwlPointsRemarksInitial?.filter(
                                                item => item.key !== attachment
                                              );
                                            setRwlPointsRemarksInitial(
                                              filtered
                                            );
                                            if (Number(points) > 0) {
                                              setRwlPointsRemarksInitial([
                                                ...filtered!,
                                                {
                                                  key: attachment,
                                                  points: points
                                                }
                                              ]);
                                            }
                                          } else {
                                            setRwlPointsRemarksInitial([
                                              {
                                                key: attachment,
                                                points: points
                                              }
                                            ]);
                                          }
                                        }
                                      }}
                                      defaultValue={points}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          }
                        )}
                    </ColumnContainer>
                  </LevelContainer>
                )}
              </ColumnParentContainer>
            </>
          );
        })
      )}

      {isDataLoading && !extensionWorkloads ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
          }}
        >
          <LoadingSpinner color={Colors.primary} />
        </div>
      ) : (
        extensionWorkloads?.map(workload => {
          let points = workload.ewlPoints?.toString();
          const extensionActivityDeanPoints = workload.deanPoints?.find(
            item => {
              return item.key === workload.extensionActivityFilePath;
            }
          );
          const summaryOfHoursDeanPoints = workload.deanPoints?.find(item => {
            return item.key === workload.summaryOfHoursFilePath;
          });
          const extensionActivityPoints = extensionActivityDeanPoints?.points
            ? extensionActivityDeanPoints?.points
            : workload.designationPoints;

          let summaryOfHoursPoints = summaryOfHoursDeanPoints?.points
            ? summaryOfHoursDeanPoints?.points
            : workload.hoursRenderedPoints;

          const hasDataExtensionActivity = ewlPointsRemarksSetter.filter(
            item => item.key === workload.extensionActivityFilePath
          );
          if (!!!hasDataExtensionActivity.length) {
            const data: PointsAndRemarks[] = [
              {
                key: workload.extensionActivityFilePath!,
                points: extensionActivityPoints?.toString() || "0"
              }
            ];
            const merge = [...ewlPointsRemarksSetter, ...data];
            setEwlPointsRemarksSetter(merge);
          }

          const hasDataSummaryOfHours = ewlPointsRemarksSetter.filter(
            item => item.key === workload.summaryOfHoursFilePath
          );
          if (!!!hasDataSummaryOfHours.length) {
            const data: PointsAndRemarks[] = [
              {
                key: workload.summaryOfHoursFilePath!,
                points: summaryOfHoursPoints?.toString() || "0"
              }
            ];
            const merge = [...ewlPointsRemarksSetter, ...data];
            setEwlPointsRemarksSetter(merge);
          }

          const resourcePersonAllPoints = [
            workload.resourcePerson1Points,
            workload.resourcePerson2Points,
            workload.resourcePerson3Points
          ];

          return (
            <>
              <WorkloadHeaderContainer>
                <WorkloadHeaderText>Extension Workload</WorkloadHeaderText>
              </WorkloadHeaderContainer>
              <ColumnParentContainer>
                <ParentLevelContainer>
                  {workload.designationExtensionActivity && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>Designation in Extension Activity:</ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        {workload.designationExtensionActivity.map(
                          designation => {
                            return (
                              <BoldText
                                key={
                                  designation +
                                  Math.floor(Math.random()).toString()
                                }
                              >
                                {workload.designationExtensionActivity}
                              </BoldText>
                            );
                          }
                        )}
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.totalNumberHours && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>
                          Number of Hours rendered in Extension Activity:
                        </ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        <BoldText>{workload.totalNumberHours}</BoldText>
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.resourcePerson && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>
                          Resource Person in an Extension Activity:
                        </ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        {workload.resourcePerson.map(resource => {
                          return (
                            <BoldText
                              key={
                                resource + Math.floor(Math.random()).toString()
                              }
                            >
                              {workload.resourcePerson}
                            </BoldText>
                          );
                        })}
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.extensionActivityFilePath && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText style={{ maxWidth: 350 }}>
                          Extension Activity Accomplishment Report Attachment:
                        </ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        {workload.extensionActivityFilePath && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between"
                            }}
                          >
                            <a
                              href={workload.extensionActivityFilePath}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                alignItems: "flex-start",
                                display: "flex"
                              }}
                            >
                              <ThinText
                                style={{
                                  color: "white",
                                  fontSize: 12,
                                  backgroundColor: Colors.buttonPrimary,
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                  cursor: "pointer"
                                }}
                                onClick={() => {}}
                              >
                                Attachment
                              </ThinText>
                            </a>
                            {(userContext.role === "OVPAA" ||
                              userContext.role === "Dean") && (
                              <div
                                style={{
                                  width: 170,
                                  display: "flex",
                                  marginRight: 15
                                }}
                              >
                                <InputPoints
                                  type="number"
                                  min={0}
                                  onChange={e => {
                                    points = e.target.value;
                                    if (
                                      Number(points) > 0 ||
                                      Number(e.target.value) > 0
                                    ) {
                                      const hasData =
                                        ewlPointsRemarksInitial?.filter(
                                          item =>
                                            item.key ===
                                            workload.extensionActivityFilePath
                                        );
                                      if (hasData) {
                                        const filtered =
                                          ewlPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !==
                                              workload.extensionActivityFilePath
                                          );
                                        setEwlPointsRemarksInitial(filtered);
                                        if (Number(points) > 0) {
                                          setEwlPointsRemarksInitial([
                                            ...filtered!,
                                            {
                                              key: workload.extensionActivityFilePath!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      } else {
                                        setEwlPointsRemarksInitial([
                                          {
                                            key: workload.extensionActivityFilePath!,
                                            points: points
                                          }
                                        ]);
                                      }
                                    } else {
                                      setEwlPointsRemarksInitial(
                                        ewlPointsRemarksInitial?.filter(
                                          item =>
                                            item.key !==
                                            workload.extensionActivityFilePath
                                        )
                                      );
                                    }
                                  }}
                                  defaultValue={extensionActivityPoints}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.certificateFilePath && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>
                          Certificate of Presentation Attachment:
                        </ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        {workload.certificateFilePath?.map(
                          (filePath, index) => {
                            const resourcePersonDeanPoints =
                              workload.deanPoints?.find(item => {
                                return item.key === filePath;
                              });

                            const hasDataResourcePerson =
                              ewlPointsRemarksSetter.filter(
                                item => item.key === filePath
                              );
                            if (!!!hasDataResourcePerson.length) {
                              const data: PointsAndRemarks[] = [
                                {
                                  key: filePath,
                                  points:
                                    resourcePersonDeanPoints?.points?.toString() ||
                                    resourcePersonAllPoints[
                                      index
                                    ]?.toString() ||
                                    "0"
                                }
                              ];
                              const merge = [
                                ...ewlPointsRemarksSetter,
                                ...data
                              ];
                              setEwlPointsRemarksSetter(merge);
                            }

                            return (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  width: "100%",
                                  justifyContent: "space-between"
                                }}
                                key={filePath}
                              >
                                <a
                                  href={filePath}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    textDecoration: "none",
                                    alignItems: "flex-start",
                                    display: "flex"
                                  }}
                                >
                                  <ThinText
                                    style={{
                                      color: "white",
                                      fontSize: 12,
                                      backgroundColor: Colors.buttonPrimary,
                                      paddingLeft: 5,
                                      paddingRight: 5,
                                      cursor: "pointer"
                                    }}
                                    onClick={() => {}}
                                  >
                                    Attachment
                                  </ThinText>
                                </a>
                                {(userContext.role === "OVPAA" ||
                                  userContext.role === "Dean") && (
                                  <div
                                    style={{
                                      width: 170,
                                      display: "flex",
                                      marginRight: 15
                                    }}
                                  >
                                    <InputPoints
                                      type="number"
                                      min={0}
                                      onChange={e => {
                                        points = e.target.value;
                                        if (
                                          Number(points) > 0 ||
                                          Number(e.target.value) > 0
                                        ) {
                                          const hasData =
                                            ewlPointsRemarksInitial?.filter(
                                              item => item.key === filePath
                                            );
                                          if (hasData) {
                                            const filtered =
                                              ewlPointsRemarksInitial?.filter(
                                                item => item.key !== filePath
                                              );
                                            setEwlPointsRemarksInitial(
                                              filtered
                                            );
                                            if (Number(points) > 0) {
                                              setEwlPointsRemarksInitial([
                                                ...filtered!,
                                                {
                                                  key: filePath,
                                                  points: points
                                                }
                                              ]);
                                            }
                                          } else {
                                            setEwlPointsRemarksInitial([
                                              {
                                                key: filePath,
                                                points: points
                                              }
                                            ]);
                                          }
                                        } else {
                                          setEwlPointsRemarksInitial(
                                            ewlPointsRemarksInitial?.filter(
                                              item => item.key !== filePath
                                            )
                                          );
                                        }
                                      }}
                                      defaultValue={
                                        resourcePersonDeanPoints?.points
                                          ? resourcePersonDeanPoints?.points
                                          : index === 0
                                          ? workload.resourcePerson1Points
                                          : index === 1
                                          ? workload.resourcePerson2Points
                                          : workload.resourcePerson3Points
                                      }
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          }
                        )}
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.summaryOfHoursFilePath && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText style={{ maxWidth: 350 }}>
                          Summary of hours rendered in extension activities
                          Attachment:
                        </ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        {workload.summaryOfHoursFilePath && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between"
                            }}
                          >
                            <a
                              href={workload.summaryOfHoursFilePath}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                alignItems: "flex-start",
                                display: "flex"
                              }}
                            >
                              <ThinText
                                style={{
                                  color: "white",
                                  fontSize: 12,
                                  backgroundColor: Colors.buttonPrimary,
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                  cursor: "pointer"
                                }}
                                onClick={() => {}}
                              >
                                Attachment
                              </ThinText>
                            </a>
                            {(userContext.role === "OVPAA" ||
                              userContext.role === "Dean") && (
                              <div
                                style={{
                                  width: 170,
                                  display: "flex",
                                  marginRight: 15
                                }}
                              >
                                <InputPoints
                                  type="number"
                                  min={0}
                                  onChange={e => {
                                    points = e.target.value;
                                    if (Number(points) > 0) {
                                      const hasData =
                                        ewlPointsRemarksInitial?.filter(
                                          item =>
                                            item.key ===
                                            workload.summaryOfHoursFilePath
                                        );
                                      if (hasData) {
                                        const filtered =
                                          ewlPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !==
                                              workload.summaryOfHoursFilePath
                                          );
                                        setEwlPointsRemarksInitial(filtered);
                                        if (Number(points) > 0) {
                                          setEwlPointsRemarksInitial([
                                            ...filtered!,
                                            {
                                              key: workload.summaryOfHoursFilePath!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      } else {
                                        setEwlPointsRemarksInitial([
                                          {
                                            key: workload.summaryOfHoursFilePath!,
                                            points: points
                                          }
                                        ]);
                                      }
                                    } else {
                                      setEwlPointsRemarksInitial(
                                        ewlPointsRemarksInitial?.filter(
                                          item =>
                                            item.key !==
                                            workload.summaryOfHoursFilePath
                                        )
                                      );
                                    }
                                  }}
                                  defaultValue={summaryOfHoursPoints}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                </ParentLevelContainer>
              </ColumnParentContainer>
            </>
          );
        })
      )}

      {isDataLoading && !strategicFunctionWorkloads ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
          }}
        >
          <LoadingSpinner color={Colors.primary} />
        </div>
      ) : (
        strategicFunctionWorkloads?.map(workload => {
          let points = "";
          const sports1DeanPoints = workload.deanPoints?.find(item => {
            return (
              item.key === workload.designationAsSportTrainorAcademicFilePath
            );
          });
          const sports2DeanPoints = workload.deanPoints?.find(item => {
            return (
              item.key === workload.designationAsSportTrainorAcademicFilePath1
            );
          });
          const sports3DeanPoints = workload.deanPoints?.find(item => {
            return (
              item.key === workload.designationAsSportTrainorAcademicFilePath2
            );
          });
          let sports1Points =
            workload.designationAsSportTrainorAcademic ===
            DROPDOWN_LISTS.DESIGNATION_SPORTS_TRAINOR[1]
              ? "5"
              : workload.designationAsSportTrainorAcademic ===
                DROPDOWN_LISTS.DESIGNATION_SPORTS_TRAINOR[0]
              ? "3"
              : "0";
          let sports2Points =
            workload.designationAsSportTrainorAcademic1 ===
            DROPDOWN_LISTS.DESIGNATION_SPORTS_TRAINOR[1]
              ? "5"
              : workload.designationAsSportTrainorAcademic1 ===
                DROPDOWN_LISTS.DESIGNATION_SPORTS_TRAINOR[0]
              ? "3"
              : "0";
          let sports3Points =
            workload.designationAsSportTrainorAcademic2 ===
            DROPDOWN_LISTS.DESIGNATION_SPORTS_TRAINOR[1]
              ? "5"
              : workload.designationAsSportTrainorAcademic2 ===
                DROPDOWN_LISTS.DESIGNATION_SPORTS_TRAINOR[0]
              ? "3"
              : "0";
          const adhocDeanPoints1 = workload.deanPoints?.find(item => {
            return item.key === workload.designationAsMemberOfAdhocFilePath;
          });
          const adhocDeanPoints2 = workload.deanPoints?.find(item => {
            return item.key === workload.designationAsMemberOfAdhocFilePath1;
          });
          const adhocDeanPoints3 = workload.deanPoints?.find(item => {
            return item.key === workload.designationAsMemberOfAdhocFilePath2;
          });
          let adhocPoints1 = "0.05";
          let adhocPoints2 = "0.05";
          let adhocPoints3 = "0.05";
          const academicDeanPoints = workload.deanPoints?.find(item => {
            return item.key === workload.academicAdviseesFilePath;
          });
          let academicPoints = (
            Number(workload.academicAdvisees) * 0.023
          ).toString();

          const hasDataSports1 = sfwPointsRemarksSetter.filter(
            item =>
              item.key === workload.designationAsSportTrainorAcademicFilePath
          );
          if (!!!hasDataSports1.length) {
            const data: PointsAndRemarks[] = [
              {
                key: workload.designationAsSportTrainorAcademicFilePath!,
                points: sports1DeanPoints?.points || sports1Points
              }
            ];
            const merge = [...sfwPointsRemarksSetter, ...data];
            setSfwPointsRemarksSetter(merge);
          }
          const hasDataSports2 = sfwPointsRemarksSetter.filter(
            item =>
              item.key === workload.designationAsSportTrainorAcademicFilePath1
          );
          if (!!!hasDataSports2.length) {
            const data: PointsAndRemarks[] = [
              {
                key: workload.designationAsSportTrainorAcademicFilePath1!,
                points: sports2DeanPoints?.points || sports2Points
              }
            ];
            const merge = [...sfwPointsRemarksSetter, ...data];
            setSfwPointsRemarksSetter(merge);
          }
          const hasDataSports3 = sfwPointsRemarksSetter.filter(
            item =>
              item.key === workload.designationAsSportTrainorAcademicFilePath2
          );
          if (!!!hasDataSports3.length) {
            const data: PointsAndRemarks[] = [
              {
                key: workload.designationAsSportTrainorAcademicFilePath2!,
                points: sports3DeanPoints?.points || sports3Points
              }
            ];
            const merge = [...sfwPointsRemarksSetter, ...data];
            setSfwPointsRemarksSetter(merge);
          }

          const hasDataAdhoc1 = sfwPointsRemarksSetter.filter(
            item => item.key === workload.designationAsMemberOfAdhocFilePath
          );
          if (!!!hasDataAdhoc1.length) {
            const data: PointsAndRemarks[] = [
              {
                key: workload.designationAsMemberOfAdhocFilePath!,
                points: adhocDeanPoints1?.points || adhocPoints1
              }
            ];
            const merge = [...sfwPointsRemarksSetter, ...data];
            setSfwPointsRemarksSetter(merge);
          }
          const hasDataAdhoc2 = sfwPointsRemarksSetter.filter(
            item => item.key === workload.designationAsMemberOfAdhocFilePath1
          );
          if (!!!hasDataAdhoc2.length) {
            const data: PointsAndRemarks[] = [
              {
                key: workload.designationAsMemberOfAdhocFilePath1!,
                points: adhocDeanPoints2?.points || adhocPoints2
              }
            ];
            const merge = [...sfwPointsRemarksSetter, ...data];
            setSfwPointsRemarksSetter(merge);
          }
          const hasDataAdhoc3 = sfwPointsRemarksSetter.filter(
            item => item.key === workload.designationAsMemberOfAdhocFilePath2
          );
          if (!!!hasDataAdhoc3.length) {
            const data: PointsAndRemarks[] = [
              {
                key: workload.designationAsMemberOfAdhocFilePath2!,
                points: adhocDeanPoints3?.points || adhocPoints3
              }
            ];
            const merge = [...sfwPointsRemarksSetter, ...data];
            setSfwPointsRemarksSetter(merge);
          }

          const hasDataAcademic = sfwPointsRemarksSetter.filter(
            item => item.key === workload.academicAdviseesFilePath
          );
          if (!!!hasDataAcademic.length) {
            const data: PointsAndRemarks[] = [
              {
                key: workload.academicAdviseesFilePath!,
                points: academicDeanPoints?.points || academicPoints
              }
            ];
            const merge = [...sfwPointsRemarksSetter, ...data];
            setSfwPointsRemarksSetter(merge);
          }

          return (
            <>
              <WorkloadHeaderContainer>
                <WorkloadHeaderText>Strategic Function</WorkloadHeaderText>
              </WorkloadHeaderContainer>
              <ColumnParentContainer>
                <ParentLevelContainer>
                  {workload.designationUniversityLevel?.length! > 0 && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>University Level:</ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        {workload.designationUniversityLevel?.map(
                          designationUniversityLevel => {
                            return (
                              <BoldText
                                key={
                                  designationUniversityLevel +
                                  Math.floor(Math.random()).toString()
                                }
                              >
                                {designationUniversityLevel}
                              </BoldText>
                            );
                          }
                        )}
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.designationCollegeCampusLevel?.length! > 0 && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>College Level:</ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        {workload.designationCollegeCampusLevel?.map(
                          designationCollegeCampusLevel => {
                            return (
                              <BoldText
                                key={
                                  designationCollegeCampusLevel +
                                  Math.floor(Math.random()).toString()
                                }
                              >
                                {designationCollegeCampusLevel}
                              </BoldText>
                            );
                          }
                        )}
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.designationDepartmentLevel?.length! > 0 && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>Department Level:</ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        {workload.designationDepartmentLevel?.map(
                          designationDepartmentLevel => {
                            return (
                              <BoldText
                                key={
                                  designationDepartmentLevel +
                                  Math.floor(Math.random()).toString()
                                }
                              >
                                {designationDepartmentLevel}
                              </BoldText>
                            );
                          }
                        )}
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.academicAdvisees && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>Designation as Academic Adviser:</ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        <BoldText>{workload.academicAdvisees}</BoldText>
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.approvedUniversityDesignationFilePath &&
                    workload.approvedUniversityDesignationFilePath.length >
                      0 && (
                      <LevelContainer>
                        <ColumnContainer style={{ display: "flex", flex: 1 }}>
                          <ThinText>
                            Designation at the University Level Attachment/s:
                          </ThinText>
                        </ColumnContainer>
                        <ColumnContainer style={{ display: "flex", flex: 2 }}>
                          {workload.approvedUniversityDesignationFilePath &&
                            workload.approvedUniversityDesignationFilePath.map(
                              path => {
                                const deanPoints = workload.deanPoints?.find(
                                  item => {
                                    return item.key === path;
                                  }
                                );
                                let points = deanPoints?.points
                                  ? deanPoints.points
                                  : "18";

                                const hasData = sfwPointsRemarksSetter.filter(
                                  item => item.key === path
                                );
                                if (!!!hasData.length) {
                                  const data: PointsAndRemarks[] = [
                                    {
                                      key: path!,
                                      points: points || "0"
                                    }
                                  ];
                                  const merge = [
                                    ...sfwPointsRemarksSetter,
                                    ...data
                                  ];
                                  setSfwPointsRemarksSetter(merge);
                                }

                                return (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      width: "100%",
                                      justifyContent: "space-between"
                                    }}
                                    key={path}
                                  >
                                    <a
                                      href={path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        textDecoration: "none",
                                        alignItems: "flex-start",
                                        display: "flex"
                                      }}
                                    >
                                      <ThinText
                                        style={{
                                          color: "white",
                                          fontSize: 12,
                                          backgroundColor: Colors.buttonPrimary,
                                          paddingLeft: 5,
                                          paddingRight: 5,
                                          cursor: "pointer"
                                        }}
                                        onClick={() => {}}
                                      >
                                        Attachment
                                      </ThinText>
                                    </a>
                                    {(userContext.role === "OVPAA" ||
                                      userContext.role === "Dean") && (
                                      <div
                                        style={{
                                          width: 170,
                                          display: "flex",
                                          marginRight: 15
                                        }}
                                      >
                                        <InputPoints
                                          type="number"
                                          min={0}
                                          onChange={e => {
                                            points = e.target.value;
                                            if (
                                              Number(points) > 0 ||
                                              Number(e.target.value) > 0
                                            ) {
                                              const hasData =
                                                sfPointsRemarksInitial?.filter(
                                                  item => item.key === path
                                                );
                                              if (hasData) {
                                                const filtered =
                                                  sfPointsRemarksInitial?.filter(
                                                    item => item.key !== path
                                                  );
                                                setSfPointsRemarksInitial(
                                                  filtered
                                                );
                                                if (Number(points) > 0) {
                                                  setSfPointsRemarksInitial([
                                                    ...filtered!,
                                                    {
                                                      key: path,
                                                      points: points
                                                    }
                                                  ]);
                                                }
                                              } else {
                                                setSfPointsRemarksInitial([
                                                  {
                                                    key: path,
                                                    points: points
                                                  }
                                                ]);
                                              }
                                            } else {
                                              setSfPointsRemarksInitial(
                                                sfPointsRemarksInitial?.filter(
                                                  item => item.key !== path
                                                )
                                              );
                                            }
                                          }}
                                          defaultValue={points}
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            )}
                        </ColumnContainer>
                      </LevelContainer>
                    )}

                  {workload.approvedCollegeCampusDesignationFilePath &&
                    workload.approvedCollegeCampusDesignationFilePath.length >
                      0 && (
                      <LevelContainer>
                        <ColumnContainer style={{ display: "flex", flex: 1 }}>
                          <ThinText>
                            Designation at the College/Campus Level
                            Attachment/s:
                          </ThinText>
                        </ColumnContainer>
                        <ColumnContainer style={{ display: "flex", flex: 2 }}>
                          {workload.approvedCollegeCampusDesignationFilePath &&
                            workload.approvedCollegeCampusDesignationFilePath.map(
                              path => {
                                const deanPoints = workload.deanPoints?.find(
                                  item => {
                                    return item.key === path;
                                  }
                                );
                                let points = deanPoints?.points
                                  ? deanPoints.points
                                  : "15";

                                const hasData = sfwPointsRemarksSetter.filter(
                                  item => item.key === path
                                );
                                if (!!!hasData.length) {
                                  const data: PointsAndRemarks[] = [
                                    {
                                      key: path!,
                                      points: points || "0"
                                    }
                                  ];
                                  const merge = [
                                    ...sfwPointsRemarksSetter,
                                    ...data
                                  ];
                                  setSfwPointsRemarksSetter(merge);
                                }

                                return (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      width: "100%",
                                      justifyContent: "space-between"
                                    }}
                                    key={path}
                                  >
                                    <a
                                      href={path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        textDecoration: "none",
                                        alignItems: "flex-start",
                                        display: "flex"
                                      }}
                                    >
                                      <ThinText
                                        style={{
                                          color: "white",
                                          fontSize: 12,
                                          backgroundColor: Colors.buttonPrimary,
                                          paddingLeft: 5,
                                          paddingRight: 5,
                                          cursor: "pointer"
                                        }}
                                        onClick={() => {}}
                                      >
                                        Attachment
                                      </ThinText>
                                    </a>
                                    {(userContext.role === "OVPAA" ||
                                      userContext.role === "Dean") && (
                                      <div
                                        style={{
                                          width: 170,
                                          display: "flex",
                                          marginRight: 15
                                        }}
                                      >
                                        <InputPoints
                                          type="number"
                                          min={0}
                                          onChange={e => {
                                            points = e.target.value;
                                            if (
                                              Number(points) > 0 ||
                                              Number(e.target.value) > 0
                                            ) {
                                              const hasData =
                                                sfPointsRemarksInitial?.filter(
                                                  item => item.key === path
                                                );
                                              if (hasData) {
                                                const filtered =
                                                  sfPointsRemarksInitial?.filter(
                                                    item => item.key !== path
                                                  );
                                                setSfPointsRemarksInitial(
                                                  filtered
                                                );
                                                if (Number(points) > 0) {
                                                  setSfPointsRemarksInitial([
                                                    ...filtered!,
                                                    {
                                                      key: path,
                                                      points: points
                                                    }
                                                  ]);
                                                }
                                              } else {
                                                setSfPointsRemarksInitial([
                                                  {
                                                    key: path,
                                                    points: points
                                                  }
                                                ]);
                                              }
                                            } else {
                                              setSfPointsRemarksInitial(
                                                sfPointsRemarksInitial?.filter(
                                                  item => item.key !== path
                                                )
                                              );
                                            }
                                          }}
                                          defaultValue={points}
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            )}
                        </ColumnContainer>
                      </LevelContainer>
                    )}

                  {workload.approvedDepartmentDesignationFilePath &&
                    workload.approvedDepartmentDesignationFilePath.length >
                      0 && (
                      <LevelContainer>
                        <ColumnContainer style={{ display: "flex", flex: 1 }}>
                          <ThinText>
                            Designation at the Department Level Attachment/s:
                          </ThinText>
                        </ColumnContainer>
                        <ColumnContainer style={{ display: "flex", flex: 2 }}>
                          {workload.approvedDepartmentDesignationFilePath &&
                            workload.approvedDepartmentDesignationFilePath.map(
                              path => {
                                const deanPoints = workload.deanPoints?.find(
                                  item => {
                                    return item.key === path;
                                  }
                                );
                                let points = deanPoints?.points
                                  ? deanPoints.points
                                  : "12";

                                const hasData = sfwPointsRemarksSetter.filter(
                                  item => item.key === path
                                );
                                if (!!!hasData.length) {
                                  const data: PointsAndRemarks[] = [
                                    {
                                      key: path!,
                                      points: points || "0"
                                    }
                                  ];
                                  const merge = [
                                    ...sfwPointsRemarksSetter,
                                    ...data
                                  ];
                                  setSfwPointsRemarksSetter(merge);
                                }

                                return (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      width: "100%",
                                      justifyContent: "space-between"
                                    }}
                                    key={path}
                                  >
                                    <a
                                      href={path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        textDecoration: "none",
                                        alignItems: "flex-start",
                                        display: "flex"
                                      }}
                                    >
                                      <ThinText
                                        style={{
                                          color: "white",
                                          fontSize: 12,
                                          backgroundColor: Colors.buttonPrimary,
                                          paddingLeft: 5,
                                          paddingRight: 5,
                                          cursor: "pointer"
                                        }}
                                        onClick={() => {}}
                                      >
                                        Attachment
                                      </ThinText>
                                    </a>
                                    {(userContext.role === "OVPAA" ||
                                      userContext.role === "Dean") && (
                                      <div
                                        style={{
                                          width: 170,
                                          display: "flex",
                                          marginRight: 15
                                        }}
                                      >
                                        <InputPoints
                                          type="number"
                                          min={0}
                                          onChange={e => {
                                            points = e.target.value;
                                            if (
                                              Number(points) > 0 ||
                                              Number(e.target.value) > 0
                                            ) {
                                              const hasData =
                                                sfPointsRemarksInitial?.filter(
                                                  item => item.key === path
                                                );
                                              if (hasData) {
                                                const filtered =
                                                  sfPointsRemarksInitial?.filter(
                                                    item => item.key !== path
                                                  );
                                                setSfPointsRemarksInitial(
                                                  filtered
                                                );
                                                if (Number(points) > 0) {
                                                  setSfPointsRemarksInitial([
                                                    ...filtered!,
                                                    {
                                                      key: path,
                                                      points: points
                                                    }
                                                  ]);
                                                }
                                              } else {
                                                setSfPointsRemarksInitial([
                                                  {
                                                    key: path,
                                                    points: points
                                                  }
                                                ]);
                                              }
                                            } else {
                                              setSfPointsRemarksInitial(
                                                sfPointsRemarksInitial?.filter(
                                                  item => item.key !== path
                                                )
                                              );
                                            }
                                          }}
                                          defaultValue={points}
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            )}
                        </ColumnContainer>
                      </LevelContainer>
                    )}

                  {workload.designationAsSportTrainorAcademicFilePath && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>
                          Designation as Sports/Socio-Cultural Coach or Trainor
                          and Academic Organization Adviser Attachment/s:
                        </ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        {workload.designationAsSportTrainorAcademicFilePath && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between"
                            }}
                          >
                            <a
                              href={
                                workload.designationAsSportTrainorAcademicFilePath
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                alignItems: "flex-start",
                                display: "flex"
                              }}
                            >
                              <ThinText
                                style={{
                                  color: "white",
                                  fontSize: 12,
                                  backgroundColor: Colors.buttonPrimary,
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                  cursor: "pointer"
                                }}
                                onClick={() => {}}
                              >
                                Attachment
                              </ThinText>
                            </a>
                            {(userContext.role === "OVPAA" ||
                              userContext.role === "Dean") && (
                              <div
                                style={{
                                  width: 170,
                                  display: "flex",
                                  marginRight: 15
                                }}
                              >
                                <InputPoints
                                  type="number"
                                  min={0}
                                  onChange={e => {
                                    points = e.target.value;
                                    if (
                                      Number(points) > 0 ||
                                      Number(e.target.value) > 0
                                    ) {
                                      const hasData =
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key ===
                                            workload.designationAsSportTrainorAcademicFilePath
                                        );
                                      if (hasData) {
                                        const filtered =
                                          sfPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !==
                                              workload.designationAsSportTrainorAcademicFilePath
                                          );
                                        setSfPointsRemarksInitial(filtered);
                                        if (Number(points) > 0) {
                                          setSfPointsRemarksInitial([
                                            ...filtered!,
                                            {
                                              key: workload.designationAsSportTrainorAcademicFilePath!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      } else {
                                        setSfPointsRemarksInitial([
                                          {
                                            key: workload.designationAsSportTrainorAcademicFilePath!,
                                            points: points
                                          }
                                        ]);
                                      }
                                    } else {
                                      setSfPointsRemarksInitial(
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key !==
                                            workload.designationAsSportTrainorAcademicFilePath
                                        )
                                      );
                                    }
                                  }}
                                  defaultValue={
                                    sports1DeanPoints?.points
                                      ? sports1DeanPoints.points
                                      : sports1Points
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )}
                        {workload.designationAsSportTrainorAcademicFilePath1 && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between"
                            }}
                          >
                            <a
                              href={
                                workload.designationAsSportTrainorAcademicFilePath1
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                alignItems: "flex-start",
                                display: "flex"
                              }}
                            >
                              <ThinText
                                style={{
                                  color: "white",
                                  fontSize: 12,
                                  backgroundColor: Colors.buttonPrimary,
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                  cursor: "pointer"
                                }}
                                onClick={() => {}}
                              >
                                Attachment
                              </ThinText>
                            </a>
                            {(userContext.role === "OVPAA" ||
                              userContext.role === "Dean") && (
                              <div
                                style={{
                                  width: 170,
                                  display: "flex",
                                  marginRight: 15
                                }}
                              >
                                <InputPoints
                                  type="number"
                                  min={0}
                                  onChange={e => {
                                    points = e.target.value;
                                    if (
                                      Number(points) > 0 ||
                                      Number(e.target.value) > 0
                                    ) {
                                      const hasData =
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key ===
                                            workload.designationAsSportTrainorAcademicFilePath1
                                        );
                                      if (hasData) {
                                        const filtered =
                                          sfPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !==
                                              workload.designationAsSportTrainorAcademicFilePath1
                                          );
                                        setSfPointsRemarksInitial(filtered);
                                        if (Number(points) > 0) {
                                          setSfPointsRemarksInitial([
                                            ...filtered!,
                                            {
                                              key: workload.designationAsSportTrainorAcademicFilePath1!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      } else {
                                        setSfPointsRemarksInitial([
                                          {
                                            key: workload.designationAsSportTrainorAcademicFilePath1!,
                                            points: points
                                          }
                                        ]);
                                      }
                                    } else {
                                      setSfPointsRemarksInitial(
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key !==
                                            workload.designationAsSportTrainorAcademicFilePath1
                                        )
                                      );
                                    }
                                  }}
                                  defaultValue={
                                    sports2DeanPoints?.points
                                      ? sports2DeanPoints.points
                                      : sports2Points
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )}
                        {workload.designationAsSportTrainorAcademicFilePath2 && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between"
                            }}
                          >
                            <a
                              href={
                                workload.designationAsSportTrainorAcademicFilePath2
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                alignItems: "flex-start",
                                display: "flex"
                              }}
                            >
                              <ThinText
                                style={{
                                  color: "white",
                                  fontSize: 12,
                                  backgroundColor: Colors.buttonPrimary,
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                  cursor: "pointer"
                                }}
                                onClick={() => {}}
                              >
                                Attachment
                              </ThinText>
                            </a>
                            {(userContext.role === "OVPAA" ||
                              userContext.role === "Dean") && (
                              <div
                                style={{
                                  width: 170,
                                  display: "flex",
                                  marginRight: 15
                                }}
                              >
                                <InputPoints
                                  type="number"
                                  min={0}
                                  onChange={e => {
                                    points = e.target.value;
                                    if (Number(points) > 0) {
                                      const hasData =
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key ===
                                            workload.designationAsSportTrainorAcademicFilePath2
                                        );
                                      if (hasData) {
                                        const filtered =
                                          sfPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !==
                                              workload.designationAsSportTrainorAcademicFilePath2
                                          );
                                        setSfPointsRemarksInitial(filtered);
                                        if (Number(points) > 0) {
                                          setSfPointsRemarksInitial([
                                            ...filtered!,
                                            {
                                              key: workload.designationAsSportTrainorAcademicFilePath2!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      } else {
                                        setSfPointsRemarksInitial([
                                          {
                                            key: workload.designationAsSportTrainorAcademicFilePath2!,
                                            points: points
                                          }
                                        ]);
                                      }
                                    } else {
                                      setSfPointsRemarksInitial(
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key !==
                                            workload.designationAsSportTrainorAcademicFilePath2
                                        )
                                      );
                                    }
                                  }}
                                  defaultValue={
                                    sports3DeanPoints?.points
                                      ? sports3DeanPoints.points
                                      : sports3Points
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.designationAsMemberOfAdhocFilePath && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>
                          Designation as Member of University-Wide AdHoc
                          Committee Attachment/s:
                        </ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        {workload.designationAsMemberOfAdhocFilePath && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between"
                            }}
                          >
                            <a
                              href={workload.designationAsMemberOfAdhocFilePath}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                alignItems: "flex-start",
                                display: "flex"
                              }}
                            >
                              <ThinText
                                style={{
                                  color: "white",
                                  fontSize: 12,
                                  backgroundColor: Colors.buttonPrimary,
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                  cursor: "pointer"
                                }}
                                onClick={() => {}}
                              >
                                Attachment
                              </ThinText>
                            </a>
                            {(userContext.role === "OVPAA" ||
                              userContext.role === "Dean") && (
                              <div
                                style={{
                                  width: 170,
                                  display: "flex",
                                  marginRight: 15
                                }}
                              >
                                <InputPoints
                                  type="number"
                                  min={0}
                                  onChange={e => {
                                    points = e.target.value;
                                    if (Number(points) > 0) {
                                      const hasData =
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key ===
                                            workload.designationAsMemberOfAdhocFilePath
                                        );
                                      if (hasData) {
                                        const filtered =
                                          sfPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !==
                                              workload.designationAsMemberOfAdhocFilePath
                                          );
                                        setSfPointsRemarksInitial(filtered);
                                        if (Number(points) > 0) {
                                          setSfPointsRemarksInitial([
                                            ...filtered!,
                                            {
                                              key: workload.designationAsMemberOfAdhocFilePath!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      } else {
                                        setSfPointsRemarksInitial([
                                          {
                                            key: workload.designationAsMemberOfAdhocFilePath!,
                                            points: points
                                          }
                                        ]);
                                      }
                                    } else {
                                      setSfPointsRemarksInitial(
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key !==
                                            workload.designationAsMemberOfAdhocFilePath
                                        )
                                      );
                                    }
                                  }}
                                  defaultValue={
                                    adhocDeanPoints1?.points
                                      ? adhocDeanPoints1.points
                                      : adhocPoints1
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )}
                        {workload.designationAsMemberOfAdhocFilePath1 && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between"
                            }}
                          >
                            <a
                              href={
                                workload.designationAsMemberOfAdhocFilePath1
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                alignItems: "flex-start",
                                display: "flex"
                              }}
                            >
                              <ThinText
                                style={{
                                  color: "white",
                                  fontSize: 12,
                                  backgroundColor: Colors.buttonPrimary,
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                  cursor: "pointer"
                                }}
                                onClick={() => {}}
                              >
                                Attachment
                              </ThinText>
                            </a>
                            {(userContext.role === "OVPAA" ||
                              userContext.role === "Dean") && (
                              <div
                                style={{
                                  width: 170,
                                  display: "flex",
                                  marginRight: 15
                                }}
                              >
                                <InputPoints
                                  type="number"
                                  min={0}
                                  onChange={e => {
                                    points = e.target.value;
                                    if (Number(points) > 0) {
                                      const hasData =
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key ===
                                            workload.designationAsMemberOfAdhocFilePath1
                                        );
                                      if (hasData) {
                                        const filtered =
                                          sfPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !==
                                              workload.designationAsMemberOfAdhocFilePath1
                                          );
                                        setSfPointsRemarksInitial(filtered);
                                        if (Number(points) > 0) {
                                          setSfPointsRemarksInitial([
                                            ...filtered!,
                                            {
                                              key: workload.designationAsMemberOfAdhocFilePath1!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      } else {
                                        setSfPointsRemarksInitial([
                                          {
                                            key: workload.designationAsMemberOfAdhocFilePath1!,
                                            points: points
                                          }
                                        ]);
                                      }
                                    } else {
                                      setSfPointsRemarksInitial(
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key !==
                                            workload.designationAsMemberOfAdhocFilePath1
                                        )
                                      );
                                    }
                                  }}
                                  defaultValue={
                                    adhocDeanPoints2?.points
                                      ? adhocDeanPoints2.points
                                      : adhocPoints2
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )}
                        {workload.designationAsMemberOfAdhocFilePath2 && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between"
                            }}
                          >
                            <a
                              href={
                                workload.designationAsMemberOfAdhocFilePath2
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                alignItems: "flex-start",
                                display: "flex"
                              }}
                            >
                              <ThinText
                                style={{
                                  color: "white",
                                  fontSize: 12,
                                  backgroundColor: Colors.buttonPrimary,
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                  cursor: "pointer"
                                }}
                                onClick={() => {}}
                              >
                                Attachment
                              </ThinText>
                            </a>
                            {(userContext.role === "OVPAA" ||
                              userContext.role === "Dean") && (
                              <div
                                style={{
                                  width: 170,
                                  display: "flex",
                                  marginRight: 15
                                }}
                              >
                                <InputPoints
                                  type="number"
                                  min={0}
                                  onChange={e => {
                                    points = e.target.value;
                                    if (Number(points) > 0) {
                                      const hasData =
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key ===
                                            workload.designationAsMemberOfAdhocFilePath2
                                        );
                                      if (hasData) {
                                        const filtered =
                                          sfPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !==
                                              workload.designationAsMemberOfAdhocFilePath2
                                          );
                                        setSfPointsRemarksInitial(filtered);
                                        if (Number(points) > 0) {
                                          setSfPointsRemarksInitial([
                                            ...filtered!,
                                            {
                                              key: workload.designationAsMemberOfAdhocFilePath2!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      } else {
                                        setSfPointsRemarksInitial([
                                          {
                                            key: workload.designationAsMemberOfAdhocFilePath2!,
                                            points: points
                                          }
                                        ]);
                                      }
                                    } else {
                                      setSfPointsRemarksInitial(
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key !==
                                            workload.designationAsMemberOfAdhocFilePath2
                                        )
                                      );
                                    }
                                  }}
                                  defaultValue={
                                    adhocDeanPoints3?.points
                                      ? adhocDeanPoints3.points
                                      : adhocPoints3
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.academicAdviseesFilePath && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>
                          Designation as Academic Adviser Attachment/s:
                        </ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        {workload.academicAdviseesFilePath && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between"
                            }}
                          >
                            <a
                              href={workload.academicAdviseesFilePath}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                alignItems: "flex-start",
                                display: "flex"
                              }}
                            >
                              <ThinText
                                style={{
                                  color: "white",
                                  fontSize: 12,
                                  backgroundColor: Colors.buttonPrimary,
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                  cursor: "pointer"
                                }}
                                onClick={() => {}}
                              >
                                Attachment
                              </ThinText>
                            </a>
                            {(userContext.role === "OVPAA" ||
                              userContext.role === "Dean") && (
                              <div
                                style={{
                                  width: 170,
                                  display: "flex",
                                  marginRight: 15
                                }}
                              >
                                <InputPoints
                                  type="number"
                                  min={0}
                                  onChange={e => {
                                    points = e.target.value;
                                    if (Number(points) > 0) {
                                      const hasData =
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key ===
                                            workload.academicAdviseesFilePath
                                        );
                                      if (hasData) {
                                        const filtered =
                                          sfPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !==
                                              workload.academicAdviseesFilePath
                                          );
                                        setSfPointsRemarksInitial(filtered);
                                        if (Number(points) > 0) {
                                          setSfPointsRemarksInitial([
                                            ...filtered!,
                                            {
                                              key: workload.academicAdviseesFilePath!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      } else {
                                        setSfPointsRemarksInitial([
                                          {
                                            key: workload.academicAdviseesFilePath!,
                                            points: points
                                          }
                                        ]);
                                      }
                                    } else {
                                      setSfPointsRemarksInitial(
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key !==
                                            workload.academicAdviseesFilePath
                                        )
                                      );
                                    }
                                  }}
                                  defaultValue={
                                    academicDeanPoints?.points
                                      ? academicDeanPoints.points
                                      : academicPoints
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                </ParentLevelContainer>
              </ColumnParentContainer>
            </>
          );
        })
      )}
      {(teachingWorkloads ||
        researchWorkloads ||
        extensionWorkloads ||
        strategicFunctionWorkloads) && (
        <div style={{ display: "flex", marginLeft: 20, marginTop: 20 }}>
          <BoldText>Remarks: </BoldText>
          <Remarks onChange={e => setRemarks(e.target.value)} />
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  border: 2px solid black;
  height: auto;
  border-radius: 15px;
  padding: 15px;
  padding: 20px 0;
  margin: 10px;
`;

const WorkloadHeaderText = styled.span`
  font-family: HurmeGeometricSans3;
  font-weight: bold;
  font-size: 18px;
  line-height: 15px;
  margin: 20px;
`;

const ThinText = styled.span`
  font-family: HurmeGeometricSans3;
  font-size: 15px;
  line-height: 15px;
  padding: 8px;
`;

const BoldText = styled.span`
  font-family: HurmeGeometricSans3;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  padding: 8px;
`;

const WorkloadHeaderContainer = styled.div`
  width: 100%;
  padding-top: 10px;
`;

const ColumnParentContainer = styled.div`
  margin-left: 35px;
  border-bottom: 1px solid black;
`;

const ColumnContainer = styled.div`
  flex-direction: column;
  display: flex;
  padding: 10px;
`;

const LevelContainer = styled.div`
  display: flex;
`;

const ParentLevelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputPoints = styled.input`
  width: 60px;
  border: 1px solid black;
`;

const Remarks = styled.textarea`
  margin-left: 5px;
  border: 1px solid black;
`;

export default RemarksWorkload;
