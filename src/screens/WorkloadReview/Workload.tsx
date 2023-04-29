import React from "react";
import styled from "styled-components";
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
function Workload({
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
          <ThStyle>List of Faculty</ThStyle>
          <ThStyle>Academic Rank</ThStyle>
          {/* <ThStyle>Workload Type</ThStyle>
          <ThStyle>Approved/Disapproved with Remarks</ThStyle> */}
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
                  <Button>
                    <ButtonText>Review</ButtonText>
                  </Button>
                </TdStyle>
                <TdStyle>
                  <TdText style={{ marginLeft: 30 }}>Reviewed</TdText>
                </TdStyle>
                {/* <TdStyle>
                  <TdText key={index}>Teaching Workload</TdText>
                </TdStyle>
                <TdStyle>
                  <CheckboxWorkload
                    twlFilePath={item.twlFilePath}
                    workloadId={item.workloadId}
                    workloadType="Teaching Workload"
                  />
                </TdStyle> */}
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
                  <Button>
                    <ButtonText>Review</ButtonText>
                  </Button>
                </TdStyle>
                <TdStyle>
                  <TdText style={{ marginLeft: 30 }}>Reviewed</TdText>
                </TdStyle>
                {/* <TdStyle>
                  <TdText key={index}>Research Workload</TdText>
                </TdStyle>
                <TdStyle>
                  <CheckboxWorkload
                    rwlFilePath={item.rwlFilePath}
                    rwlFilePath1={item.rwlFilePath1}
                    rwlFilePath2={item.rwlFilePath2}
                    workloadType="Research Workload"
                    workloadId={item.workloadId}
                  />
                </TdStyle> */}
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
                  <Button>
                    <ButtonText>Review</ButtonText>
                  </Button>
                </TdStyle>
                <TdStyle>
                  <TdText style={{ marginLeft: 30 }}>Reviewed</TdText>
                </TdStyle>
                {/* <TdStyle>
                  <TdText key={index}>Extension Workload</TdText>
                </TdStyle>
                <TdStyle>
                  <CheckboxWorkload
                    extensionActivityFilePath={item.extensionActivityFilePath}
                    certificateFilePath={item.certificateFilePath}
                    summaryOfHoursFilePath={item.summaryOfHoursFilePath}
                    workloadType="Extension Workload"
                    workloadId={item.workloadId}
                  />
                </TdStyle> */}
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
                  <Button>
                    <ButtonText>Review</ButtonText>
                  </Button>
                </TdStyle>
                <TdStyle>
                  <TdText style={{ marginLeft: 30 }}>Reviewed</TdText>
                </TdStyle>
                {/* <TdStyle>
                  <TdText key={index}>Strategic Function Workload</TdText>
                </TdStyle>
                <TdStyle>
                  <CheckboxWorkload
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
                  />
                </TdStyle> */}
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
  width: 100%;
`;

const TdText = styled.text`
  // align-text: center;
`;

const TdStyle = styled.td`
  text-align: center;
  padding-bottom: 100px;
`;

const ThStyle = styled.th`
  padding: 15px;
`;

const Button = styled.div`
  margin-left: 10px;
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

export default Workload;
