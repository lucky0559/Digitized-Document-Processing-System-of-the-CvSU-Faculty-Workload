import React from "react";
import styled from "styled-components";
import CheckboxWorkload from "../../components/CheckboxWorkload";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Colors from "../../constants/Colors";
import { User } from "../../types/User";

type WorkloadProps = {
  teachingWorkload?: User[];
  researchWorkload?: User[];
  extensionWorkload?: User[];
  allStrategicWorkload?: User[];
  isDataLoading: boolean;
};
function RemarksWorkload({
  teachingWorkload,
  researchWorkload,
  extensionWorkload,
  allStrategicWorkload,
  isDataLoading
}: WorkloadProps) {
  return (
    <Container>
      <Table>
        <tr>
          <ThStyle>Name</ThStyle>
          <ThStyle>Academic Rank</ThStyle>
          <ThStyle>Workload Type</ThStyle>
          <ThStyle>Remarks</ThStyle>
          <ThStyle>Status</ThStyle>
        </tr>
        {isDataLoading && (
          <div
            style={{
              position: "absolute",
              marginLeft: "27%",
              marginTop: "10%"
            }}
          >
            <LoadingSpinner color={Colors.primary} />
          </div>
        )}

        {!isDataLoading &&
          teachingWorkload?.map((item, index) => {
            return (
              <tr>
                <TdStyle>
                  <TdText key={index}>{item.firstName}</TdText>
                </TdStyle>
                <TdStyle>
                  <TdText key={index}>{item.academicRank}</TdText>
                </TdStyle>
                <TdStyle>
                  <TdText key={index}>Teaching Workload</TdText>
                </TdStyle>
                <TdStyle>
                  {/* <CheckboxWorkload
                    twlFilePath={item.twlFilePath}
                    workloadId={item.workloadId}
                    workloadType="Teaching Workload"
                  /> */}
                  <TdText>This is teaching remarks</TdText>
                </TdStyle>
                <TdStyle>
                  <TdText key={index}>{item.status?.toUpperCase()}</TdText>
                </TdStyle>
              </tr>
            );
          })}
        {!isDataLoading &&
          researchWorkload?.map((item, index) => {
            return (
              <tr>
                <TdStyle>
                  <TdText key={index}>{item.firstName}</TdText>
                </TdStyle>
                <TdStyle>
                  <TdText key={index}>{item.academicRank}</TdText>
                </TdStyle>
                <TdStyle>
                  <TdText key={index}>Research Workload</TdText>
                </TdStyle>
                <TdStyle>
                  {/* <CheckboxWorkload
                    rwlFilePath={item.rwlFilePath}
                    rwlFilePath1={item.rwlFilePath1}
                    rwlFilePath2={item.rwlFilePath2}
                    workloadType="Research Workload"
                    workloadId={item.workloadId}
                    remarksText={item.remarks}
                  /> */}
                  <TdText>This is research remarks</TdText>
                </TdStyle>
                <TdStyle>
                  <TdText key={index}>{item.status?.toUpperCase()}</TdText>
                </TdStyle>
              </tr>
            );
          })}
        {!isDataLoading &&
          extensionWorkload?.map((item, index) => {
            return (
              <tr>
                <TdStyle>
                  <TdText key={index}>{item.firstName}</TdText>
                </TdStyle>
                <TdStyle>
                  <TdText key={index}>{item.academicRank}</TdText>
                </TdStyle>
                <TdStyle>
                  <TdText key={index}>Extension Workload</TdText>
                </TdStyle>
                <TdStyle>
                  {/* <CheckboxWorkload
                    extensionActivityFilePath={item.extensionActivityFilePath}
                    certificateFilePath={item.certificateFilePath}
                    summaryOfHoursFilePath={item.summaryOfHoursFilePath}
                    workloadType="Extension Workload"
                    workloadId={item.workloadId}
                    remarksText={item.remarks}
                  /> */}
                  <TdText>This is extension remarks</TdText>
                </TdStyle>
                <TdStyle>
                  <TdText key={index}>{item.status?.toUpperCase()}</TdText>
                </TdStyle>
              </tr>
            );
          })}
        {!isDataLoading &&
          allStrategicWorkload?.map((item, index) => {
            return (
              <tr>
                <TdStyle>
                  <TdText key={index}>{item.firstName}</TdText>
                </TdStyle>
                <TdStyle>
                  <TdText key={index}>{item.academicRank}</TdText>
                </TdStyle>
                <TdStyle>
                  <TdText key={index}>Strategic Function Workload</TdText>
                </TdStyle>
                <TdStyle>
                  {/* <CheckboxWorkload
                    approvedUniversityDesignationFilePath={
                      item.approvedUniversityDesignationFilePath
                    }
                    approvedCollegeCampusDesignationFilePath={
                      item.approvedCollegeCampusDesignationFilePath
                    }
                    approvedDepartmentDesignationFilePath={
                      item.approvedDepartmentDesignationFilePath
                    }
                    coachAdviserCertificateFilePath={
                      item.coachAdviserCertificateFilePath
                    }
                    approvedDesignationFilePath={
                      item.approvedDesignationFilePath
                    }
                    listOfAdviseesFilePath={item.listOfAdviseesFilePath}
                    workloadType="Strategic Function Workload"
                    workloadId={item.workloadId}
                    remarksText={item.remarks}
                  /> */}
                  <TdText>This is strategic remarks</TdText>
                </TdStyle>
                <TdStyle>
                  <TdText key={index}>{item.status?.toUpperCase()}</TdText>
                </TdStyle>
              </tr>
            );
          })}
      </Table>
    </Container>
  );
}

const Container = styled.div``;

const Table = styled.table`
  margin-left: 22%;
`;

const TdText = styled.text`
  // align-text: center;
`;

const TdStyle = styled.td`
  text-align: center;
  padding-bottom: 100px;
`;

const ThStyle = styled.th`
  padding: 80px;
  padding-bottom: 70px;
`;

export default RemarksWorkload;
