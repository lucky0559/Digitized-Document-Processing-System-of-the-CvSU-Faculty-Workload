import React, { useState, useEffect, useContext } from "react";
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

type WorkloadProps = {
  user: User;
  setRemarks: (value: string) => void;
  setTwlPointsRemarks: (value?: PointsAndRemarks) => void;
  setRwlPointsRemarks: (value: PointsAndRemarks[]) => void;
  setEwlPointsRemarks: (value: PointsAndRemarks[]) => void;
  setSfPointsRemarks: (value: PointsAndRemarks[]) => void;
};

export type PointsAndRemarks = {
  key: string;
  points: string;
  remarks: string;
};
function RemarksWorkload({ user, setRemarks, setTwlPointsRemarks, setRwlPointsRemarks, setEwlPointsRemarks, setSfPointsRemarks }: WorkloadProps) {
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
              <WorkloadHeaderText>Remarks</WorkloadHeaderText>
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
          let points = "";
          let remarks = "";
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
                            width: 277,
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: 15
                          }}
                        >
                          <InputPoints
                            type="number"
                            min={0}
                            onChange={e => {
                              points = e.target.value;
                              if (Number(points) > 0 && remarks.length > 0) {
                                workload.remarks = {
                                  key: workload.id!,
                                  points: points,
                                  remarks: remarks
                                };
                                setTwlPointsRemarks(workload.remarks)
                              } else {
                                workload.remarks = {
                                  key: "",
                                  points: "",
                                  remarks: ""
                                };
                                setTwlPointsRemarks(undefined)
                              }
                              console.log(workload.remarks);
                            }}
                          />
                          <InputRemarks
                            onChange={e => {
                              remarks = e.target.value;
                              if (Number(points) > 0 && remarks.length > 0) {
                                workload.remarks = {
                                  key: workload.id!,
                                  points: points,
                                  remarks: remarks
                                };
                                setTwlPointsRemarks(workload.remarks)
                              } else {
                                workload.remarks = {
                                  key: "",
                                  points: "",
                                  remarks: ""
                                };
                                setTwlPointsRemarks(undefined)
                              }
                              console.log(workload.remarks);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </ColumnContainer>
              </ColumnParentContainer>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
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
          let remarks = "";
          return (
            <>
              <WorkloadHeaderContainer>
                <WorkloadHeaderText>Research Workload</WorkloadHeaderText>
              </WorkloadHeaderContainer>
              <ColumnParentContainer>
                <ColumnContainer style={{ display: "flex", flex: 1 }}>
                  <ThinText>Title of the Study:</ThinText>
                  <ThinText>Funding of the Study:</ThinText>
                  <ThinText>Designation in the Study:</ThinText>
                  <ThinText>Status of the Study:</ThinText>
                  {workload.rwlFilePath && (
                    <ThinText style={{ maxWidth: 350 }}>
                      Proposal(for Approved Proposal) or Progress Report(for
                      On-Going Study) Attachment:
                    </ThinText>
                  )}
                  {workload.disseminatedResearchFilesPath && (
                    <ThinText>Certificate of Presentation:</ThinText>
                  )}
                  {workload.rwlFilePath1 && (
                    <ThinText style={{ maxWidth: 350 }}>
                      Proposal(for Approved Externally Funded Proposal) or
                      Progress Report(for On-Going Externally Funded Study)
                      Attachment:
                    </ThinText>
                  )}
                </ColumnContainer>
                <ColumnContainer style={{ display: "flex", flex: 2 }}>
                  <BoldText>{workload.titleOfStudy}</BoldText>
                  <BoldText>{workload.fundingOfStudy}</BoldText>
                  <BoldText>{workload.designationStudy}</BoldText>
                  <BoldText style={{ textTransform: "capitalize" }}>
                    {workload.status}
                  </BoldText>
                  {workload.rwlFilePath && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between"
                      }}
                    >
                      <a
                        href={workload.rwlFilePath}
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
                            width: 277,
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: 15
                          }}
                        >
                          <InputPoints
                            type="number"
                            min={0}
                            onChange={e => {
                              points = e.target.value;
                              if (Number(points) > 0 && remarks.length > 0) {
                                const hasData = workload.remarks?.filter(
                                  item => item.key === workload.id
                                );
                                if (hasData) {
                                  const filtered = workload.remarks?.filter(
                                    item => item.key !== workload.id
                                  );
                                  workload.remarks = filtered;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    workload.remarks?.push({
                                      key: workload.id!,
                                      points: points,
                                      remarks: remarks
                                    });
                                    setRwlPointsRemarks(workload.remarks!)
                                  }
                                } else {
                                  workload.remarks?.push({
                                    key: workload.id!,
                                    points: points,
                                    remarks: remarks
                                  });
                                  setRwlPointsRemarks(workload.remarks!)
                                }
                              } else {
                                workload.remarks = workload.remarks?.filter(
                                  item => item.key !== workload.id
                                );
                                setRwlPointsRemarks(workload.remarks!)
                              }
                              console.log(workload.remarks);
                            }}
                          />
                          <InputRemarks
                            onChange={e => {
                              remarks = e.target.value;
                              if (Number(points) > 0 && remarks.length > 0) {
                                const hasData = workload.remarks?.filter(
                                  item => item.key === workload.id
                                );
                                if (hasData) {
                                  const filtered = workload.remarks?.filter(
                                    item => item.key !== workload.id
                                  );
                                  workload.remarks = filtered;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    workload.remarks?.push({
                                      key: workload.id!,
                                      points: points,
                                      remarks: remarks
                                    });
                                    setRwlPointsRemarks(workload.remarks!)
                                  }
                                } else {
                                  workload.remarks?.push({
                                    key: workload.id!,
                                    points: points,
                                    remarks: remarks
                                  });
                                  setRwlPointsRemarks(workload.remarks!)
                                }
                              } else {
                                workload.remarks = workload.remarks?.filter(
                                  item => item.key !== workload.id
                                );
                                setRwlPointsRemarks(workload.remarks!)
                              }
                              console.log(workload.remarks);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
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
                                width: 277,
                                display: "flex",
                                justifyContent: "space-between",
                                marginRight: 15
                              }}
                            >
                              <InputPoints
                                type="number"
                                min={0}
                                onChange={e => {
                                  points = e.target.value;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    const hasData = workload.remarks?.filter(
                                      item => item.key === workload.id
                                    );
                                    if (hasData) {
                                      const filtered = workload.remarks?.filter(
                                        item => item.key !== workload.id
                                      );
                                      workload.remarks = filtered;
                                      if (
                                        Number(points) > 0 &&
                                        remarks.length > 0
                                      ) {
                                        workload.remarks?.push({
                                          key: workload.id!,
                                          points: points,
                                          remarks: remarks
                                        });
                                        setRwlPointsRemarks(workload.remarks!)
                                      }
                                    } else {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setRwlPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                    setRwlPointsRemarks(workload.remarks!)
                                  }
                                  console.log(workload.remarks);
                                }}
                              />
                              <InputRemarks
                                onChange={e => {
                                  remarks = e.target.value;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    const hasData = workload.remarks?.filter(
                                      item => item.key === workload.id
                                    );
                                    if (hasData) {
                                      const filtered = workload.remarks?.filter(
                                        item => item.key !== workload.id
                                      );
                                      workload.remarks = filtered;
                                      if (
                                        Number(points) > 0 &&
                                        remarks.length > 0
                                      ) {
                                        workload.remarks?.push({
                                          key: workload.id!,
                                          points: points,
                                          remarks: remarks
                                        });
                                        setRwlPointsRemarks(workload.remarks!)
                                      }
                                    } else {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setRwlPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                    setRwlPointsRemarks(workload.remarks!)
                                  }
                                  console.log(workload.remarks);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  {workload.rwlFilePath1 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between"
                      }}
                    >
                      <a
                        href={workload.rwlFilePath1}
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
                            width: 277,
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: 15
                          }}
                        >
                          <InputPoints
                            type="number"
                            min={0}
                            onChange={e => {
                              points = e.target.value;
                              if (Number(points) > 0 && remarks.length > 0) {
                                const hasData = workload.remarks?.filter(
                                  item => item.key === workload.id
                                );
                                if (hasData) {
                                  const filtered = workload.remarks?.filter(
                                    item => item.key !== workload.id
                                  );
                                  workload.remarks = filtered;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    workload.remarks?.push({
                                      key: workload.id!,
                                      points: points,
                                      remarks: remarks
                                    });
                                    setRwlPointsRemarks(workload.remarks!)
                                  }
                                } else {
                                  workload.remarks?.push({
                                    key: workload.id!,
                                    points: points,
                                    remarks: remarks
                                  });
                                  setRwlPointsRemarks(workload.remarks!)
                                }
                              } else {
                                workload.remarks = workload.remarks?.filter(
                                  item => item.key !== workload.id
                                );
                                setRwlPointsRemarks(workload.remarks!)
                              }
                              console.log(workload.remarks);
                            }}
                          />
                          <InputRemarks
                            onChange={e => {
                              remarks = e.target.value;
                              if (Number(points) > 0 && remarks.length > 0) {
                                const hasData = workload.remarks?.filter(
                                  item => item.key === workload.id
                                );
                                if (hasData) {
                                  const filtered = workload.remarks?.filter(
                                    item => item.key !== workload.id
                                  );
                                  workload.remarks = filtered;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    workload.remarks?.push({
                                      key: workload.id!,
                                      points: points,
                                      remarks: remarks
                                    });
                                    setRwlPointsRemarks(workload.remarks!)
                                  }
                                } else {
                                  workload.remarks?.push({
                                    key: workload.id!,
                                    points: points,
                                    remarks: remarks
                                  });
                                  setRwlPointsRemarks(workload.remarks!)
                                }
                              } else {
                                workload.remarks = workload.remarks?.filter(
                                  item => item.key !== workload.id
                                );
                                setRwlPointsRemarks(workload.remarks!)
                              }
                              console.log(workload.remarks);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </ColumnContainer>
              </ColumnParentContainer>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
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
          let points = "";
          let remarks = "";
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
                            width: 277,
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: 15
                          }}
                        >
                          <InputPoints
                            type="number"
                            min={0}
                            onChange={e => {
                              points = e.target.value;
                              if (Number(points) > 0 && remarks.length > 0) {
                                const hasData = workload.remarks?.filter(
                                  item => item.key === workload.id
                                );
                                if (hasData) {
                                  const filtered = workload.remarks?.filter(
                                    item => item.key !== workload.id
                                  );
                                  workload.remarks = filtered;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    workload.remarks?.push({
                                      key: workload.id!,
                                      points: points,
                                      remarks: remarks
                                    });
                                    setEwlPointsRemarks(workload.remarks!)
                                  }
                                } else {
                                  workload.remarks?.push({
                                    key: workload.id!,
                                    points: points,
                                    remarks: remarks
                                  });
                                  setEwlPointsRemarks(workload.remarks!)
                                }
                              } else {
                                workload.remarks = workload.remarks?.filter(
                                  item => item.key !== workload.id
                                );
                                setEwlPointsRemarks(workload.remarks!)
                              }
                              console.log(workload.remarks);
                            }}
                          />
                          <InputRemarks
                            onChange={e => {
                              remarks = e.target.value;
                              if (Number(points) > 0 && remarks.length > 0) {
                                const hasData = workload.remarks?.filter(
                                  item => item.key === workload.id
                                );
                                if (hasData) {
                                  const filtered = workload.remarks?.filter(
                                    item => item.key !== workload.id
                                  );
                                  workload.remarks = filtered;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    workload.remarks?.push({
                                      key: workload.id!,
                                      points: points,
                                      remarks: remarks
                                    });
                                    setEwlPointsRemarks(workload.remarks!)
                                  }
                                } else {
                                  workload.remarks?.push({
                                    key: workload.id!,
                                    points: points,
                                    remarks: remarks
                                  });
                                  setEwlPointsRemarks(workload.remarks!)
                                }
                              } else {
                                workload.remarks = workload.remarks?.filter(
                                  item => item.key !== workload.id
                                );
                                setEwlPointsRemarks(workload.remarks!)
                              }
                              console.log(workload.remarks);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {workload.certificateFilePath?.map(filePath => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "space-between"
                        }}
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
                              width: 277,
                              display: "flex",
                              justifyContent: "space-between",
                              marginRight: 15
                            }}
                          >
                            <InputPoints
                              type="number"
                              min={0}
                              onChange={e => {
                                points = e.target.value;
                                if (Number(points) > 0 && remarks.length > 0) {
                                  const hasData = workload.remarks?.filter(
                                    item => item.key === workload.id
                                  );
                                  if (hasData) {
                                    const filtered = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                    workload.remarks = filtered;
                                    if (
                                      Number(points) > 0 &&
                                      remarks.length > 0
                                    ) {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setEwlPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks?.push({
                                      key: workload.id!,
                                      points: points,
                                      remarks: remarks
                                    });
                                    setEwlPointsRemarks(workload.remarks!)
                                  }
                                } else {
                                  workload.remarks = workload.remarks?.filter(
                                    item => item.key !== workload.id
                                  );
                                  setEwlPointsRemarks(workload.remarks!)
                                }
                                console.log(workload.remarks);
                              }}
                            />
                            <InputRemarks
                              onChange={e => {
                                remarks = e.target.value;
                                if (Number(points) > 0 && remarks.length > 0) {
                                  const hasData = workload.remarks?.filter(
                                    item => item.key === workload.id
                                  );
                                  if (hasData) {
                                    const filtered = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                    workload.remarks = filtered;
                                    if (
                                      Number(points) > 0 &&
                                      remarks.length > 0
                                    ) {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setEwlPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks?.push({
                                      key: workload.id!,
                                      points: points,
                                      remarks: remarks
                                    });
                                    setEwlPointsRemarks(workload.remarks!)
                                  }
                                } else {
                                  workload.remarks = workload.remarks?.filter(
                                    item => item.key !== workload.id
                                  );

                                  setEwlPointsRemarks(workload.remarks!)
                                }
                                console.log(workload.remarks);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                      {userContext.role === "OVPAA" && (
                        <div
                          style={{
                            width: 277,
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: 15
                          }}
                        >
                          <InputPoints
                            type="number"
                            min={0}
                            onChange={e => {
                              points = e.target.value;
                              if (Number(points) > 0 && remarks.length > 0) {
                                const hasData = workload.remarks?.filter(
                                  item => item.key === workload.id
                                );
                                if (hasData) {
                                  const filtered = workload.remarks?.filter(
                                    item => item.key !== workload.id
                                  );
                                  workload.remarks = filtered;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    workload.remarks?.push({
                                      key: workload.id!,
                                      points: points,
                                      remarks: remarks
                                    });
                                    setEwlPointsRemarks(workload.remarks!)
                                  }
                                } else {
                                  workload.remarks?.push({
                                    key: workload.id!,
                                    points: points,
                                    remarks: remarks
                                  });
                                  setEwlPointsRemarks(workload.remarks!)
                                }
                              } else {
                                workload.remarks = workload.remarks?.filter(
                                  item => item.key !== workload.id
                                );
                                setEwlPointsRemarks(workload.remarks!)
                              }
                              console.log(workload.remarks);
                            }}
                          />
                          <InputRemarks
                            onChange={e => {
                              remarks = e.target.value;
                              if (Number(points) > 0 && remarks.length > 0) {
                                const hasData = workload.remarks?.filter(
                                  item => item.key === workload.id
                                );
                                if (hasData) {
                                  const filtered = workload.remarks?.filter(
                                    item => item.key !== workload.id
                                  );
                                  workload.remarks = filtered;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    workload.remarks?.push({
                                      key: workload.id!,
                                      points: points,
                                      remarks: remarks
                                    });
                                    setEwlPointsRemarks(workload.remarks!)
                                  }
                                } else {
                                  workload.remarks?.push({
                                    key: workload.id!,
                                    points: points,
                                    remarks: remarks
                                  });
                                  setEwlPointsRemarks(workload.remarks!)
                                }
                              } else {
                                workload.remarks = workload.remarks?.filter(
                                  item => item.key !== workload.id
                                );
                                setEwlPointsRemarks(workload.remarks!)
                              }
                              console.log(workload.remarks);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </ColumnContainer>
              </ColumnParentContainer>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 25
                }}
              >
                <ColumnContainer style={{ paddingLeft: 90 }}>
                  <BoldText>TOTAL:</BoldText>
                </ColumnContainer>
                <ColumnContainer>
                  <BoldText>{Number(workload.ewlPoints).toFixed(2)}</BoldText>
                </ColumnContainer>
              </div>
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
          let remarks = "";
          return (
            <>
              <WorkloadHeaderContainer>
                <WorkloadHeaderText>Strategic Function</WorkloadHeaderText>
              </WorkloadHeaderContainer>
              <ColumnParentContainer>
                <ParentLevelContainer>
                  <LevelContainer>
                    <ColumnContainer style={{ display: "flex", flex: 1 }}>
                      <ThinText>University Level:</ThinText>
                    </ColumnContainer>
                    <ColumnContainer style={{ display: "flex", flex: 2 }}>
                      {workload.designationUniversityLevel?.map(
                        designationUniversityLevel => {
                          return (
                            <BoldText>{designationUniversityLevel}</BoldText>
                          );
                        }
                      )}
                    </ColumnContainer>
                  </LevelContainer>
                  <LevelContainer>
                    <ColumnContainer style={{ display: "flex", flex: 1 }}>
                      <ThinText>College Level:</ThinText>
                    </ColumnContainer>
                    <ColumnContainer style={{ display: "flex", flex: 2 }}>
                      {workload.designationCollegeCampusLevel?.map(
                        designationCollegeCampusLevel => {
                          return (
                            <BoldText>{designationCollegeCampusLevel}</BoldText>
                          );
                        }
                      )}
                    </ColumnContainer>
                  </LevelContainer>

                  <LevelContainer>
                    <ColumnContainer style={{ display: "flex", flex: 1 }}>
                      <ThinText>Department Level:</ThinText>
                    </ColumnContainer>
                    <ColumnContainer style={{ display: "flex", flex: 2 }}>
                      {workload.designationDepartmentLevel?.map(
                        designationDepartmentLevel => {
                          return (
                            <BoldText>{designationDepartmentLevel}</BoldText>
                          );
                        }
                      )}
                    </ColumnContainer>
                  </LevelContainer>

                  <LevelContainer>
                    <ColumnContainer style={{ display: "flex", flex: 1 }}>
                      <ThinText>Designation as Academic Adviser:</ThinText>
                    </ColumnContainer>
                    <ColumnContainer style={{ display: "flex", flex: 2 }}>
                      <BoldText>{workload.academicAdvisees}</BoldText>
                    </ColumnContainer>
                  </LevelContainer>
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
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  width: "100%",
                                  justifyContent: "space-between"
                                }}
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
                                      width: 277,
                                      display: "flex",
                                      justifyContent: "space-between",
                                      marginRight: 15
                                    }}
                                  >
                                    <InputPoints
                                      type="number"
                                      min={0}
                                      onChange={e => {
                                        points = e.target.value;
                                        if (
                                          Number(points) > 0 &&
                                          remarks.length > 0
                                        ) {
                                          const hasData =
                                            workload.remarks?.filter(
                                              item => item.key === workload.id
                                            );
                                          if (hasData) {
                                            const filtered =
                                              workload.remarks?.filter(
                                                item => item.key !== workload.id
                                              );
                                            workload.remarks = filtered;
                                            if (
                                              Number(points) > 0 &&
                                              remarks.length > 0
                                            ) {
                                              workload.remarks?.push({
                                                key: workload.id!,
                                                points: points,
                                                remarks: remarks
                                              });
                                              setSfPointsRemarks(workload.remarks!)
                                            }
                                          } else {
                                            workload.remarks?.push({
                                              key: workload.id!,
                                              points: points,
                                              remarks: remarks
                                            });
                                            setSfPointsRemarks(workload.remarks!)
                                          }
                                        } else {
                                          workload.remarks =
                                            workload.remarks?.filter(
                                              item => item.key !== workload.id
                                            );
                                            setSfPointsRemarks(workload.remarks!)
                                        }
                                        console.log(workload.remarks);
                                      }}
                                    />
                                    <InputRemarks
                                      onChange={e => {
                                        remarks = e.target.value;
                                        if (
                                          Number(points) > 0 &&
                                          remarks.length > 0
                                        ) {
                                          const hasData =
                                            workload.remarks?.filter(
                                              item => item.key === workload.id
                                            );
                                          if (hasData) {
                                            const filtered =
                                              workload.remarks?.filter(
                                                item => item.key !== workload.id
                                              );
                                            workload.remarks = filtered;
                                            if (
                                              Number(points) > 0 &&
                                              remarks.length > 0
                                            ) {
                                              workload.remarks?.push({
                                                key: workload.id!,
                                                points: points,
                                                remarks: remarks
                                              });
                                              setSfPointsRemarks(workload.remarks!)
                                            }
                                          } else {
                                            workload.remarks?.push({
                                              key: workload.id!,
                                              points: points,
                                              remarks: remarks
                                            });
                                            setSfPointsRemarks(workload.remarks!)
                                          }
                                        } else {
                                          workload.remarks =
                                            workload.remarks?.filter(
                                              item => item.key !== workload.id
                                            );
                                            setSfPointsRemarks(workload.remarks!)
                                        }
                                        console.log(workload.remarks);
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          }
                        )}
                    </ColumnContainer>
                  </LevelContainer>
                  <LevelContainer>
                    <ColumnContainer style={{ display: "flex", flex: 1 }}>
                      <ThinText>
                        Designation at the College/Campus Level Attachment/s:
                      </ThinText>
                    </ColumnContainer>
                    <ColumnContainer style={{ display: "flex", flex: 2 }}>
                      {workload.approvedCollegeCampusDesignationFilePath &&
                        workload.approvedCollegeCampusDesignationFilePath.map(
                          path => {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  width: "100%",
                                  justifyContent: "space-between"
                                }}
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
                                      width: 277,
                                      display: "flex",
                                      justifyContent: "space-between",
                                      marginRight: 15
                                    }}
                                  >
                                    <InputPoints
                                      type="number"
                                      min={0}
                                      onChange={e => {
                                        points = e.target.value;
                                        if (
                                          Number(points) > 0 &&
                                          remarks.length > 0
                                        ) {
                                          const hasData =
                                            workload.remarks?.filter(
                                              item => item.key === workload.id
                                            );
                                          if (hasData) {
                                            const filtered =
                                              workload.remarks?.filter(
                                                item => item.key !== workload.id
                                              );
                                            workload.remarks = filtered;
                                            if (
                                              Number(points) > 0 &&
                                              remarks.length > 0
                                            ) {
                                              workload.remarks?.push({
                                                key: workload.id!,
                                                points: points,
                                                remarks: remarks
                                              });
                                              setSfPointsRemarks(workload.remarks!)
                                            }
                                          } else {
                                            workload.remarks?.push({
                                              key: workload.id!,
                                              points: points,
                                              remarks: remarks
                                            });
                                            setSfPointsRemarks(workload.remarks!)
                                          }
                                        } else {
                                          workload.remarks =
                                            workload.remarks?.filter(
                                              item => item.key !== workload.id
                                            );
                                            setSfPointsRemarks(workload.remarks!)
                                        }
                                        console.log(workload.remarks);
                                      }}
                                    />
                                    <InputRemarks
                                      onChange={e => {
                                        remarks = e.target.value;
                                        if (
                                          Number(points) > 0 &&
                                          remarks.length > 0
                                        ) {
                                          const hasData =
                                            workload.remarks?.filter(
                                              item => item.key === workload.id
                                            );
                                          if (hasData) {
                                            const filtered =
                                              workload.remarks?.filter(
                                                item => item.key !== workload.id
                                              );
                                            workload.remarks = filtered;
                                            if (
                                              Number(points) > 0 &&
                                              remarks.length > 0
                                            ) {
                                              workload.remarks?.push({
                                                key: workload.id!,
                                                points: points,
                                                remarks: remarks
                                              });
                                              setSfPointsRemarks(workload.remarks!)
                                            }
                                          } else {
                                            workload.remarks?.push({
                                              key: workload.id!,
                                              points: points,
                                              remarks: remarks
                                            });
                                            setSfPointsRemarks(workload.remarks!)
                                          }
                                        } else {
                                          workload.remarks =
                                            workload.remarks?.filter(
                                              item => item.key !== workload.id
                                            );
                                            setSfPointsRemarks(workload.remarks!)
                                        }
                                        console.log(workload.remarks);
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          }
                        )}
                    </ColumnContainer>
                  </LevelContainer>
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
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  width: "100%",
                                  justifyContent: "space-between"
                                }}
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
                                      width: 277,
                                      display: "flex",
                                      justifyContent: "space-between",
                                      marginRight: 15
                                    }}
                                  >
                                    <InputPoints
                                      type="number"
                                      min={0}
                                      onChange={e => {
                                        points = e.target.value;
                                        if (
                                          Number(points) > 0 &&
                                          remarks.length > 0
                                        ) {
                                          const hasData =
                                            workload.remarks?.filter(
                                              item => item.key === workload.id
                                            );
                                          if (hasData) {
                                            const filtered =
                                              workload.remarks?.filter(
                                                item => item.key !== workload.id
                                              );
                                            workload.remarks = filtered;
                                            if (
                                              Number(points) > 0 &&
                                              remarks.length > 0
                                            ) {
                                              workload.remarks?.push({
                                                key: workload.id!,
                                                points: points,
                                                remarks: remarks
                                              });
                                              setSfPointsRemarks(workload.remarks!)
                                            }
                                          } else {
                                            workload.remarks?.push({
                                              key: workload.id!,
                                              points: points,
                                              remarks: remarks
                                            });
                                            setSfPointsRemarks(workload.remarks!)
                                          }
                                        } else {
                                          workload.remarks =
                                            workload.remarks?.filter(
                                              item => item.key !== workload.id
                                            );
                                            setSfPointsRemarks(workload.remarks!)
                                        }
                                        console.log(workload.remarks);
                                      }}
                                    />
                                    <InputRemarks
                                      onChange={e => {
                                        remarks = e.target.value;
                                        if (
                                          Number(points) > 0 &&
                                          remarks.length > 0
                                        ) {
                                          const hasData =
                                            workload.remarks?.filter(
                                              item => item.key === workload.id
                                            );
                                          if (hasData) {
                                            const filtered =
                                              workload.remarks?.filter(
                                                item => item.key !== workload.id
                                              );
                                            workload.remarks = filtered;
                                            if (
                                              Number(points) > 0 &&
                                              remarks.length > 0
                                            ) {
                                              workload.remarks?.push({
                                                key: workload.id!,
                                                points: points,
                                                remarks: remarks
                                              });
                                              setSfPointsRemarks(workload.remarks!)
                                            }
                                          } else {
                                            workload.remarks?.push({
                                              key: workload.id!,
                                              points: points,
                                              remarks: remarks
                                            });
                                            setSfPointsRemarks(workload.remarks!)
                                          }
                                        } else {
                                          workload.remarks =
                                            workload.remarks?.filter(
                                              item => item.key !== workload.id
                                            );
                                            setSfPointsRemarks(workload.remarks!)
                                        }
                                        console.log(workload.remarks);
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          }
                        )}
                    </ColumnContainer>
                  </LevelContainer>
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
                                width: 277,
                                display: "flex",
                                justifyContent: "space-between",
                                marginRight: 15
                              }}
                            >
                              <InputPoints
                                type="number"
                                min={0}
                                onChange={e => {
                                  points = e.target.value;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    const hasData = workload.remarks?.filter(
                                      item => item.key === workload.id
                                    );
                                    if (hasData) {
                                      const filtered = workload.remarks?.filter(
                                        item => item.key !== workload.id
                                      );
                                      workload.remarks = filtered;
                                      if (
                                        Number(points) > 0 &&
                                        remarks.length > 0
                                      ) {
                                        workload.remarks?.push({
                                          key: workload.id!,
                                          points: points,
                                          remarks: remarks
                                        });
                                        setSfPointsRemarks(workload.remarks!)
                                      }
                                    } else {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setSfPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                    setSfPointsRemarks(workload.remarks!)
                                  }
                                  console.log(workload.remarks);
                                }}
                              />
                              <InputRemarks
                                onChange={e => {
                                  remarks = e.target.value;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    const hasData = workload.remarks?.filter(
                                      item => item.key === workload.id
                                    );
                                    if (hasData) {
                                      const filtered = workload.remarks?.filter(
                                        item => item.key !== workload.id
                                      );
                                      workload.remarks = filtered;
                                      if (
                                        Number(points) > 0 &&
                                        remarks.length > 0
                                      ) {
                                        workload.remarks?.push({
                                          key: workload.id!,
                                          points: points,
                                          remarks: remarks
                                        });
                                        setSfPointsRemarks(workload.remarks!)
                                      }
                                    } else {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setSfPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                    setSfPointsRemarks(workload.remarks!)
                                  }
                                  console.log(workload.remarks);
                                }}
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
                                width: 277,
                                display: "flex",
                                justifyContent: "space-between",
                                marginRight: 15
                              }}
                            >
                              <InputPoints
                                type="number"
                                min={0}
                                onChange={e => {
                                  points = e.target.value;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    const hasData = workload.remarks?.filter(
                                      item => item.key === workload.id
                                    );
                                    if (hasData) {
                                      const filtered = workload.remarks?.filter(
                                        item => item.key !== workload.id
                                      );
                                      workload.remarks = filtered;
                                      if (
                                        Number(points) > 0 &&
                                        remarks.length > 0
                                      ) {
                                        workload.remarks?.push({
                                          key: workload.id!,
                                          points: points,
                                          remarks: remarks
                                        });
                                        setSfPointsRemarks(workload.remarks!)
                                      }
                                    } else {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setSfPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                  }
                                  console.log(workload.remarks);
                                }}
                              />
                              <InputRemarks
                                onChange={e => {
                                  remarks = e.target.value;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    const hasData = workload.remarks?.filter(
                                      item => item.key === workload.id
                                    );
                                    if (hasData) {
                                      const filtered = workload.remarks?.filter(
                                        item => item.key !== workload.id
                                      );
                                      workload.remarks = filtered;
                                      if (
                                        Number(points) > 0 &&
                                        remarks.length > 0
                                      ) {
                                        workload.remarks?.push({
                                          key: workload.id!,
                                          points: points,
                                          remarks: remarks
                                        });
                                        setSfPointsRemarks(workload.remarks!)
                                      }
                                    } else {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setSfPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                    setSfPointsRemarks(workload.remarks!)
                                  }
                                  console.log(workload.remarks);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </ColumnContainer>
                  </LevelContainer>
                  <LevelContainer>
                    <ColumnContainer style={{ display: "flex", flex: 1 }}>
                      <ThinText>
                        Designation as Member of University-Wide AdHoc Committee
                        Attachment/s:
                      </ThinText>
                    </ColumnContainer>
                    <ColumnContainer style={{ display: "flex", flex: 2 }}>
                      {workload.designationAsMemberOfAdhoc && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between"
                          }}
                        >
                          <a
                            href={workload.designationAsMemberOfAdhoc}
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
                                width: 277,
                                display: "flex",
                                justifyContent: "space-between",
                                marginRight: 15
                              }}
                            >
                              <InputPoints
                                type="number"
                                min={0}
                                onChange={e => {
                                  points = e.target.value;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    const hasData = workload.remarks?.filter(
                                      item => item.key === workload.id
                                    );
                                    if (hasData) {
                                      const filtered = workload.remarks?.filter(
                                        item => item.key !== workload.id
                                      );
                                      workload.remarks = filtered;
                                      if (
                                        Number(points) > 0 &&
                                        remarks.length > 0
                                      ) {
                                        workload.remarks?.push({
                                          key: workload.id!,
                                          points: points,
                                          remarks: remarks
                                        });
                                        setSfPointsRemarks(workload.remarks!)
                                      }
                                    } else {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setSfPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                    setSfPointsRemarks(workload.remarks!)
                                  }
                                  console.log(workload.remarks);
                                }}
                              />
                              <InputRemarks
                                onChange={e => {
                                  remarks = e.target.value;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    const hasData = workload.remarks?.filter(
                                      item => item.key === workload.id
                                    );
                                    if (hasData) {
                                      const filtered = workload.remarks?.filter(
                                        item => item.key !== workload.id
                                      );
                                      workload.remarks = filtered;
                                      if (
                                        Number(points) > 0 &&
                                        remarks.length > 0
                                      ) {
                                        workload.remarks?.push({
                                          key: workload.id!,
                                          points: points,
                                          remarks: remarks
                                        });
                                        setSfPointsRemarks(workload.remarks!)
                                      }
                                    } else {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setSfPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                    setSfPointsRemarks(workload.remarks!)
                                  }
                                  console.log(workload.remarks);
                                }}
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
                                width: 277,
                                display: "flex",
                                justifyContent: "space-between",
                                marginRight: 15
                              }}
                            >
                              <InputPoints
                                type="number"
                                min={0}
                                onChange={e => {
                                  points = e.target.value;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    const hasData = workload.remarks?.filter(
                                      item => item.key === workload.id
                                    );
                                    if (hasData) {
                                      const filtered = workload.remarks?.filter(
                                        item => item.key !== workload.id
                                      );
                                      workload.remarks = filtered;
                                      if (
                                        Number(points) > 0 &&
                                        remarks.length > 0
                                      ) {
                                        workload.remarks?.push({
                                          key: workload.id!,
                                          points: points,
                                          remarks: remarks
                                        });
                                        setSfPointsRemarks(workload.remarks!)
                                      }
                                    } else {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setSfPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                    setSfPointsRemarks(workload.remarks!)
                                  }
                                  console.log(workload.remarks);
                                }}
                              />
                              <InputRemarks
                                onChange={e => {
                                  remarks = e.target.value;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    const hasData = workload.remarks?.filter(
                                      item => item.key === workload.id
                                    );
                                    if (hasData) {
                                      const filtered = workload.remarks?.filter(
                                        item => item.key !== workload.id
                                      );
                                      workload.remarks = filtered;
                                      if (
                                        Number(points) > 0 &&
                                        remarks.length > 0
                                      ) {
                                        workload.remarks?.push({
                                          key: workload.id!,
                                          points: points,
                                          remarks: remarks
                                        });
                                        setSfPointsRemarks(workload.remarks!)
                                      }
                                    } else {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setSfPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                    setSfPointsRemarks(workload.remarks!)
                                  }
                                  console.log(workload.remarks);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </ColumnContainer>
                  </LevelContainer>
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
                                width: 277,
                                display: "flex",
                                justifyContent: "space-between",
                                marginRight: 15
                              }}
                            >
                              <InputPoints
                                type="number"
                                min={0}
                                onChange={e => {
                                  points = e.target.value;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    const hasData = workload.remarks?.filter(
                                      item => item.key === workload.id
                                    );
                                    if (hasData) {
                                      const filtered = workload.remarks?.filter(
                                        item => item.key !== workload.id
                                      );
                                      workload.remarks = filtered;
                                      if (
                                        Number(points) > 0 &&
                                        remarks.length > 0
                                      ) {
                                        workload.remarks?.push({
                                          key: workload.id!,
                                          points: points,
                                          remarks: remarks
                                        });
                                        setSfPointsRemarks(workload.remarks!)
                                      }
                                    } else {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setSfPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                    setSfPointsRemarks(workload.remarks!)
                                  }
                                  console.log(workload.remarks);
                                }}
                              />
                              <InputRemarks
                                onChange={e => {
                                  remarks = e.target.value;
                                  if (
                                    Number(points) > 0 &&
                                    remarks.length > 0
                                  ) {
                                    const hasData = workload.remarks?.filter(
                                      item => item.key === workload.id
                                    );
                                    if (hasData) {
                                      const filtered = workload.remarks?.filter(
                                        item => item.key !== workload.id
                                      );
                                      workload.remarks = filtered;
                                      if (
                                        Number(points) > 0 &&
                                        remarks.length > 0
                                      ) {
                                        workload.remarks?.push({
                                          key: workload.id!,
                                          points: points,
                                          remarks: remarks
                                        });
                                        setSfPointsRemarks(workload.remarks!)
                                      }
                                    } else {
                                      workload.remarks?.push({
                                        key: workload.id!,
                                        points: points,
                                        remarks: remarks
                                      });
                                      setSfPointsRemarks(workload.remarks!)
                                    }
                                  } else {
                                    workload.remarks = workload.remarks?.filter(
                                      item => item.key !== workload.id
                                    );
                                    setSfPointsRemarks(workload.remarks!)
                                  }
                                  console.log(workload.remarks);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </ColumnContainer>
                  </LevelContainer>
                </ParentLevelContainer>
              </ColumnParentContainer>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <ColumnContainer style={{ paddingLeft: 90 }}>
                  <BoldText>TOTAL:</BoldText>
                </ColumnContainer>
                <ColumnContainer>
                  <BoldText>{workload.sfwPoints}</BoldText>
                </ColumnContainer>
              </div>
            </>
          );
        })
      )}
      {(teachingWorkloads ||
        researchWorkloads ||
        extensionWorkloads ||
        strategicFunctionWorkloads) && (
        <div style={{ display: "flex", marginLeft: 20 }}>
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
  padding: 2px;
`;

const BoldText = styled.span`
  font-family: HurmeGeometricSans3;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  padding: 2px;
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
  width: 40px;
`;

const InputRemarks = styled.input`
  width: 150px,
  margin-left: 50px
`;

const Remarks = styled.textarea`
  margin-left: 5px;
`;

export default RemarksWorkload;
