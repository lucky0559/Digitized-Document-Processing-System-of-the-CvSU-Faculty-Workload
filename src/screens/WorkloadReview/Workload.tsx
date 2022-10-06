import React from "react";
import styled from "styled-components";
import CheckboxWorkload from "../../components/CheckboxWorkload";
import { User } from "../../types/User";

type WorkloadProps = {
  teachingWorkload?: User[];
  researchWorkload?: User[];
  extensionWorkload?: User[];
};
function Workload({
  teachingWorkload,
  researchWorkload,
  extensionWorkload
}: WorkloadProps) {
  return (
    <Container>
      <Table>
        <tr>
          <ThStyle>Name</ThStyle>
          <ThStyle>Academic Rank</ThStyle>
          <ThStyle>Workload Type</ThStyle>
          <ThStyle>Approved/Disapproved with Remarks</ThStyle>
        </tr>
        {teachingWorkload?.map((item, index) => {
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
                <CheckboxWorkload
                  twlFilePath={item.twlFilePath}
                  workloadType="Teaching Workload"
                />
              </TdStyle>
            </tr>
          );
        })}
        {researchWorkload?.map((item, index) => {
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
                <CheckboxWorkload
                  rwlFilePath={item.rwlFilePath}
                  rwlFilePath1={item.rwlFilePath1}
                  rwlFilePath2={item.rwlFilePath2}
                  workloadType="Research Workload"
                />
              </TdStyle>
            </tr>
          );
        })}
        {extensionWorkload?.map((item, index) => {
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
                <CheckboxWorkload
                  extensionActivityFilePath={item.extensionActivityFilePath}
                  certificateFilePath={item.certificateFilePath}
                  summaryOfHoursFilePath={item.summaryOfHoursFilePath}
                  workloadType="Extension Workload"
                />
              </TdStyle>
            </tr>
          );
        })}
      </Table>
    </Container>
  );
}

const Container = styled.div``;

const Table = styled.table``;

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

export default Workload;
