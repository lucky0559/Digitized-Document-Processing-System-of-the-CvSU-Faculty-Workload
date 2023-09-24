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
  setTwlPointsRemarks: (value?: PointsAndRemarks) => void;
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
    setRwlPointsRemarks(rwlPointsRemarksInitial!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rwlPointsRemarksInitial]);

  useEffect(() => {
    setEwlPointsRemarks(ewlPointsRemarksInitial!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ewlPointsRemarksInitial]);

  useEffect(() => {
    setSfPointsRemarks(sfPointsRemarksInitial!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sfPointsRemarksInitial]);

  useEffect(() => {
    if (!!teachingWorkloads?.length) {
      setTwlPointsRemarks({
        key: teachingWorkloads?.[0].id || "",
        points: teachingWorkloads?.[0].totalTeachingWorkload?.toString() || ""
      });
    }
  }, [setTwlPointsRemarks, teachingWorkloads]);

  useEffect(() => {
    if (!!researchWorkloads?.length) {
      setRwlPointsRemarks([
        {
          key: researchWorkloads?.[0].cvsuFundedFilePath?.[0] || "",
          points: researchWorkloads?.[0].rwlPoints?.toString() || ""
        }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRwlPointsRemarks, researchWorkloads]);

  useEffect(() => {
    if (!!extensionWorkloads?.length) {
      setEwlPointsRemarks([
        {
          key: extensionWorkloads?.[0].extensionActivityFilePath || "",
          points: extensionWorkloads?.[0].ewlPoints?.toString() || ""
        }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setEwlPointsRemarks, extensionWorkloads]);

  useEffect(() => {
    if (!!strategicFunctionWorkloads?.length) {
      setSfPointsRemarks([
        {
          key:
            strategicFunctionWorkloads?.[0]
              .approvedUniversityDesignationFilePath?.[0] || "",
          points: strategicFunctionWorkloads?.[0].sfwPoints?.toString() || ""
        }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSfPointsRemarks, strategicFunctionWorkloads]);

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
          let points = workload.totalTeachingWorkload?.toString();
          return (
            <>
              <WorkloadHeaderText>Teaching Workload</WorkloadHeaderText>
              <ColumnParentContainer>
                <ColumnContainer style={{ display: "flex", flex: 1 }}>
                  <ThinText>Number of Preparation:</ThinText>
                  <ThinText>Number of Contact Hours:</ThinText>
                  <ThinText>Number of Students:</ThinText>
                  {workload.twlFilePath && (
                    <ThinText>Class Schedule Attachment:</ThinText>
                  )}
                </ColumnContainer>
                <ColumnContainer style={{ display: "flex", flex: 2 }}>
                  <BoldText>{workload.numberOfPreparations}</BoldText>
                  <BoldText>{workload.contactHours}</BoldText>
                  <BoldText>{workload.totalNoOfStudents}</BoldText>
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
                      {userContext.role === "OVPAA" && (
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
                              if (Number(points) > 0) {
                                workload.remarks = {
                                  key: workload.id!,
                                  points: e.target.value
                                };
                                if (Number(workload.remarks.points) > 0) {
                                  setTwlPointsRemarks(workload.remarks);
                                } else {
                                  setTwlPointsRemarks(undefined);
                                }
                              } else {
                                workload.remarks = {
                                  key: workload.id!,
                                  points: ""
                                };
                              }
                            }}
                            defaultValue={points}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </ColumnContainer>
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
          let points = "";

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
                      let points = funded.points.toString();
                      return (
                        <div
                          style={{ display: "flex", flexDirection: "row" }}
                          key={funded.filePath}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginRight: 15
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
                              marginLeft: 15
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
                              {userContext.role === "OVPAA" && (
                                <div
                                  style={{
                                    display: "flex",
                                    marginLeft: 290
                                  }}
                                >
                                  <InputPoints
                                    type="number"
                                    min={0}
                                    onChange={e => {
                                      points = e.target.value;
                                      if (Number(points) > 0) {
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
                                          if (Number(points) > 0) {
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
                      let points = funded.points.toString();
                      return (
                        <div
                          style={{ display: "flex", flexDirection: "row" }}
                          key={funded.filePath}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginRight: 15
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
                              marginLeft: 15
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
                              {userContext.role === "OVPAA" && (
                                <div
                                  style={{
                                    display: "flex",
                                    marginLeft: 290
                                  }}
                                >
                                  <InputPoints
                                    type="number"
                                    min={0}
                                    onChange={e => {
                                      points = e.target.value;
                                      if (Number(points) > 0) {
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
                  {workload.disseminatedResearchFilesPath && (
                    <BoldText>Certificate of Presentation:</BoldText>
                  )}
                </ColumnContainer>
                <ColumnContainer style={{ display: "flex", flex: 1 }}>
                  {workload.disseminatedResearchFilesPath &&
                    workload.disseminatedResearchFilesPath.map(attachment => {
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
                          {userContext.role === "OVPAA" && (
                            <div
                              style={{
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
                                      rwlPointsRemarksInitial?.filter(
                                        item => item.key === attachment
                                      );
                                    if (hasData) {
                                      const filtered =
                                        rwlPointsRemarksInitial?.filter(
                                          item => item.key !== attachment
                                        );
                                      setRwlPointsRemarksInitial(filtered);
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
                    })}
                </ColumnContainer>
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
          return (
            <>
              <WorkloadHeaderContainer>
                <WorkloadHeaderText>Extension Workload</WorkloadHeaderText>
              </WorkloadHeaderContainer>
              <ColumnParentContainer>
                <ColumnContainer style={{ display: "flex", flex: 1 }}>
                  <ThinText>Designation in Extension Activity:</ThinText>
                  <ThinText>
                    Number of Hours rendered in Extension Activity:
                  </ThinText>
                  <ThinText>Resource Person in an Extension Activity:</ThinText>
                  <ThinText>Resource Person in an Extension Activity:</ThinText>
                  {workload.extensionActivityFilePath && (
                    <ThinText style={{ maxWidth: 350 }}>
                      Extension Activity Accomplishment Report Attachment:
                    </ThinText>
                  )}
                  {workload.certificateFilePath && (
                    <ThinText>Certificate of Presentation Attachment</ThinText>
                  )}
                  {workload.summaryOfHoursFilePath && (
                    <ThinText style={{ maxWidth: 350 }}>
                      Summary of hours rendered in extension activities
                      Attachment:
                    </ThinText>
                  )}
                </ColumnContainer>
                <ColumnContainer style={{ display: "flex", flex: 2 }}>
                  <BoldText>{workload.designationExtensionActivity}</BoldText>
                  <BoldText>{workload.totalNumberHours}</BoldText>
                  <BoldText>{workload.resourcePerson}</BoldText>
                  <BoldText>{workload.resourcePerson}</BoldText>
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
                      {userContext.role === "OVPAA" && (
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
                                const hasData = ewlPointsRemarksInitial?.filter(
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
                            defaultValue={workload.hoursRenderedPoints}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {workload.certificateFilePath?.map((filePath, index) => {
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
                        {userContext.role === "OVPAA" && (
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
                                      item => item.key === filePath
                                    );
                                  if (hasData) {
                                    const filtered =
                                      ewlPointsRemarksInitial?.filter(
                                        item => item.key !== filePath
                                      );
                                    setEwlPointsRemarksInitial(filtered);
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
                                index === 0
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
                  })}
                  {/* {workload.summaryOfHoursFilePath && (
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
                      {userContext.role === "OVPAA" && (
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
                                const hasData = ewlPointsRemarksInitial?.filter(
                                  item =>
                                    item.key === workload.summaryOfHoursFilePath
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
                            defaultValue={workload.hoursRenderedPoints}
                          />
                        </div>
                      )}
                    </div>
                  )} */}
                </ColumnContainer>
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
          let adhocPoints1 = "0.05";
          let adhocPoints2 = "0.05";
          let adhocPoints3 = "0.05";
          let academicPoints = (
            Number(workload.academicAdvisees) * 0.023
          ).toString();
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
                                let points = "18";
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
                                    {userContext.role === "OVPAA" && (
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
                                let points = "15";
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
                                    {userContext.role === "OVPAA" && (
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
                                let points = "12";
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
                                    {userContext.role === "OVPAA" && (
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
                            {userContext.role === "OVPAA" && (
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
                                  defaultValue={sports1Points}
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
                            {userContext.role === "OVPAA" && (
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
                                  defaultValue={sports2Points}
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
                            {userContext.role === "OVPAA" && (
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
                                  defaultValue={sports3Points}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </ColumnContainer>
                    </LevelContainer>
                  )}
                  {workload.memberAdhocFilePath && (
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>
                          Designation as Member of University-Wide AdHoc
                          Committee Attachment/s:
                        </ThinText>
                      </ColumnContainer>
                      <ColumnContainer style={{ display: "flex", flex: 2 }}>
                        {workload.memberAdhocFilePath && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between"
                            }}
                          >
                            <a
                              href={workload.memberAdhocFilePath}
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
                            {userContext.role === "OVPAA" && (
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
                                            workload.memberAdhocFilePath
                                        );
                                      if (hasData) {
                                        const filtered =
                                          sfPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !==
                                              workload.memberAdhocFilePath
                                          );
                                        setSfPointsRemarksInitial(filtered);
                                        if (Number(points) > 0) {
                                          setSfPointsRemarksInitial([
                                            ...filtered!,
                                            {
                                              key: workload.memberAdhocFilePath!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      } else {
                                        setSfPointsRemarksInitial([
                                          {
                                            key: workload.memberAdhocFilePath!,
                                            points: points
                                          }
                                        ]);
                                      }
                                    } else {
                                      setSfPointsRemarksInitial(
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key !==
                                            workload.memberAdhocFilePath
                                        )
                                      );
                                    }
                                  }}
                                  defaultValue={adhocPoints1}
                                />
                              </div>
                            )}
                          </div>
                        )}
                        {workload.memberAdhocFilePath1 && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between"
                            }}
                          >
                            <a
                              href={workload.memberAdhocFilePath1}
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
                            {userContext.role === "OVPAA" && (
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
                                            workload.memberAdhocFilePath1
                                        );
                                      if (hasData) {
                                        const filtered =
                                          sfPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !==
                                              workload.memberAdhocFilePath1
                                          );
                                        setSfPointsRemarksInitial(filtered);
                                        if (Number(points) > 0) {
                                          setSfPointsRemarksInitial([
                                            ...filtered!,
                                            {
                                              key: workload.memberAdhocFilePath1!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      } else {
                                        setSfPointsRemarksInitial([
                                          {
                                            key: workload.memberAdhocFilePath1!,
                                            points: points
                                          }
                                        ]);
                                      }
                                    } else {
                                      setSfPointsRemarksInitial(
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key !==
                                            workload.memberAdhocFilePath1
                                        )
                                      );
                                    }
                                  }}
                                  defaultValue={adhocPoints2}
                                />
                              </div>
                            )}
                          </div>
                        )}
                        {workload.memberAdhocFilePath2 && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "space-between"
                            }}
                          >
                            <a
                              href={workload.memberAdhocFilePath2}
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
                            {userContext.role === "OVPAA" && (
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
                                            workload.memberAdhocFilePath2
                                        );
                                      if (hasData) {
                                        const filtered =
                                          sfPointsRemarksInitial?.filter(
                                            item =>
                                              item.key !==
                                              workload.memberAdhocFilePath2
                                          );
                                        setSfPointsRemarksInitial(filtered);
                                        if (Number(points) > 0) {
                                          setSfPointsRemarksInitial([
                                            ...filtered!,
                                            {
                                              key: workload.memberAdhocFilePath2!,
                                              points: points
                                            }
                                          ]);
                                        }
                                      } else {
                                        setSfPointsRemarksInitial([
                                          {
                                            key: workload.memberAdhocFilePath2!,
                                            points: points
                                          }
                                        ]);
                                      }
                                    } else {
                                      setSfPointsRemarksInitial(
                                        sfPointsRemarksInitial?.filter(
                                          item =>
                                            item.key !==
                                            workload.memberAdhocFilePath2
                                        )
                                      );
                                    }
                                  }}
                                  defaultValue={adhocPoints3}
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
                            {userContext.role === "OVPAA" && (
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
                                  defaultValue={academicPoints}
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
  display: flex;
  flex-direction: row;
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
`;

const Remarks = styled.textarea`
  margin-left: 5px;
`;

export default RemarksWorkload;
