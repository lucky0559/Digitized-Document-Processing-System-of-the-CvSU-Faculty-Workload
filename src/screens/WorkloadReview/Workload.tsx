import React from "react";
import styled from "styled-components";
import CheckboxWorkload from "../../components/CheckboxWorkload";
import { User } from "../../types/User";

type WorkloadProps = {
  workload?: User[];
  workloadType: string;
};
function Workload({ workload, workloadType }: WorkloadProps) {
  return (
    <Container>
      <Table>
        <tr>
          <ThStyle>Name</ThStyle>
          <ThStyle>Academic Rank</ThStyle>
          <ThStyle>Workload Type</ThStyle>
          <ThStyle>Approved/Disapproved with Remarks</ThStyle>
        </tr>
        {workload?.map((item, index) => {
          return (
            <tr>
              <TdStyle>
                <TdText key={index}>{item.firstName}</TdText>
              </TdStyle>
              <TdStyle>
                <TdText key={index}>{item.academicRank}</TdText>
              </TdStyle>
              <TdStyle>
                <TdText key={index}>{workloadType}</TdText>
              </TdStyle>
              <TdStyle>
                <CheckboxWorkload />
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
  padding-bottom: 30px;
`;

const ThStyle = styled.th`
  padding: 15px;
`;

export default Workload;
