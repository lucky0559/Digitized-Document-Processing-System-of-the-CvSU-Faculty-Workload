import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CheckboxWorkload from "../../components/CheckboxWorkload";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Colors from "../../constants/Colors";
import { User } from "../../types/User";
import { TeachingWorkLoadType } from "../../types/TeachingWorkload";
import {
  GetAllUserPendingWorkloads,
  getAllPendingWorkloadByIdAndCurrentProcessRole
} from "../../lib/faculty-workload.hooks";
import { RoleType } from "../../constants/Strings";
import { ResearchWorkLoadType } from "../../types/ResearchWorkLoad";
import { ExtensionWorkloadType } from "../../types/ExtensionWorkload";
import { StrategicFunctionType } from "../../types/StrategicFunction";

type WorkloadProps = {
  user: User;
};
function RemarksWorkload({ user }: WorkloadProps) {
  const [teachingWorkloads, setTeachingWorkloads] =
    useState<TeachingWorkLoadType[]>();
  const [researchWorkloads, setResearchWorkloads] =
    useState<ResearchWorkLoadType[]>();
  const [extensionWorkloads, setExtensionWorkloads] =
    useState<ExtensionWorkloadType[]>();
  const [strategicFunctionWorkloads, setStrategicFunctionWorkloads] =
    useState<StrategicFunctionType[]>();

  const userRole = localStorage.getItem("role");

  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (userRole !== null) {
        const {
          teachingWorkloads,
          researchWorkloads,
          extensionWorkloads,
          strategicFunctionWorkloads
        } = await getAllPendingWorkloadByIdAndCurrentProcessRole(
          user.id!,
          userRole
        );
        setTeachingWorkloads(teachingWorkloads);
        setResearchWorkloads(researchWorkloads);
        setExtensionWorkloads(extensionWorkloads);
        setStrategicFunctionWorkloads(strategicFunctionWorkloads);
        setIsDataLoading(false);
      }
    })();
  }, []);

  return (
    <Container>
      <WorkloadHeaderContainer
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <WorkloadHeaderText>Teaching Workload</WorkloadHeaderText>
        <div style={{ marginRight: 50 }}>
          <WorkloadHeaderText>Evaluated Workload(OVPAA)</WorkloadHeaderText>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <WorkloadHeaderText>Points</WorkloadHeaderText>
            <WorkloadHeaderText>Remarks</WorkloadHeaderText>
          </div>
        </div>
      </WorkloadHeaderContainer>
      {isDataLoading && !teachingWorkloads
        ? null
        : teachingWorkloads?.map(workload => {
            return (
              <>
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
                        <div
                          style={{
                            width: 277,
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: 15
                          }}
                        >
                          <InputPoints type="number" min={0} />
                          <InputRemarks />
                        </div>
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
          })}
      <WorkloadHeaderContainer>
        <WorkloadHeaderText>Research Workload</WorkloadHeaderText>
      </WorkloadHeaderContainer>
      {isDataLoading && !researchWorkloads
        ? null
        : researchWorkloads?.map(workload => {
            return (
              <>
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
                        <div
                          style={{
                            width: 277,
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: 15
                          }}
                        >
                          <InputPoints type="number" min={0} />
                          <InputRemarks />
                        </div>
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
                            <div
                              style={{
                                width: 277,
                                display: "flex",
                                justifyContent: "space-between",
                                marginRight: 15
                              }}
                            >
                              <InputPoints type="number" min={0} />
                              <InputRemarks />
                            </div>
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
                        <div
                          style={{
                            width: 277,
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: 15
                          }}
                        >
                          <InputPoints type="number" min={0} />
                          <InputRemarks />
                        </div>
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
          })}
      <WorkloadHeaderContainer>
        <WorkloadHeaderText>Extension Workload</WorkloadHeaderText>
      </WorkloadHeaderContainer>
      {isDataLoading && !extensionWorkloads
        ? null
        : extensionWorkloads?.map(workload => {
            return (
              <>
                <ColumnParentContainer>
                  <ColumnContainer style={{ display: "flex", flex: 1 }}>
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
                    {workload.extensionActivityFilePath && (
                      <ThinText style={{ maxWidth: 350 }}>
                        Extension Activity Accomplishment Report Attachment:
                      </ThinText>
                    )}
                    {workload.certificateFilePath && (
                      <ThinText>
                        Certificate of Presentation Attachment
                      </ThinText>
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
                        <div
                          style={{
                            width: 277,
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: 15
                          }}
                        >
                          <InputPoints type="number" min={0} />
                          <InputRemarks />
                        </div>
                      </div>
                    )}
                    {workload.certificateFilePath && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "space-between"
                        }}
                      >
                        <a
                          href={workload.certificateFilePath}
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
                        <div
                          style={{
                            width: 277,
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: 15
                          }}
                        >
                          <InputPoints type="number" min={0} />
                          <InputRemarks />
                        </div>
                      </div>
                    )}
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
                        <div
                          style={{
                            width: 277,
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: 15
                          }}
                        >
                          <InputPoints type="number" min={0} />
                          <InputRemarks />
                        </div>
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
          })}
      <WorkloadHeaderContainer>
        <WorkloadHeaderText>Strategic Function</WorkloadHeaderText>
      </WorkloadHeaderContainer>
      {isDataLoading && !strategicFunctionWorkloads
        ? null
        : strategicFunctionWorkloads?.map(workload => {
            return (
              <>
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
                              <BoldText>
                                {designationCollegeCampusLevel}
                              </BoldText>
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
                        <BoldText>{workload.academicAdvisees1}</BoldText>
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
                                  <div
                                    style={{
                                      width: 277,
                                      display: "flex",
                                      justifyContent: "space-between",
                                      marginRight: 15
                                    }}
                                  >
                                    <InputPoints type="number" min={0} />
                                    <InputRemarks />
                                  </div>
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
                                  <div
                                    style={{
                                      width: 277,
                                      display: "flex",
                                      justifyContent: "space-between",
                                      marginRight: 15
                                    }}
                                  >
                                    <InputPoints type="number" min={0} />
                                    <InputRemarks />
                                  </div>
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
                                  <div
                                    style={{
                                      width: 277,
                                      display: "flex",
                                      justifyContent: "space-between",
                                      marginRight: 15
                                    }}
                                  >
                                    <InputPoints type="number" min={0} />
                                    <InputRemarks />
                                  </div>
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
                            <div
                              style={{
                                width: 277,
                                display: "flex",
                                justifyContent: "space-between",
                                marginRight: 15
                              }}
                            >
                              <InputPoints type="number" min={0} />
                              <InputRemarks />
                            </div>
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
                            <div
                              style={{
                                width: 277,
                                display: "flex",
                                justifyContent: "space-between",
                                marginRight: 15
                              }}
                            >
                              <InputPoints type="number" min={0} />
                              <InputRemarks />
                            </div>
                          </div>
                        )}
                      </ColumnContainer>
                    </LevelContainer>
                    <LevelContainer>
                      <ColumnContainer style={{ display: "flex", flex: 1 }}>
                        <ThinText>
                          Designation as Member of University-Wide AdHoc
                          Committee Attachment/s:
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
                            <div
                              style={{
                                width: 277,
                                display: "flex",
                                justifyContent: "space-between",
                                marginRight: 15
                              }}
                            >
                              <InputPoints type="number" min={0} />
                              <InputRemarks />
                            </div>
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
                            <div
                              style={{
                                width: 277,
                                display: "flex",
                                justifyContent: "space-between",
                                marginRight: 15
                              }}
                            >
                              <InputPoints type="number" min={0} />
                              <InputRemarks />
                            </div>
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
                            <div
                              style={{
                                width: 277,
                                display: "flex",
                                justifyContent: "space-between",
                                marginRight: 15
                              }}
                            >
                              <InputPoints type="number" min={0} />
                              <InputRemarks />
                            </div>
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
          })}
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

const ButtonViewAttachment = styled.div`
  background-color: ${Colors.buttonPrimary};
  padding: 0;
  margin: 0;
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

export default RemarksWorkload;
