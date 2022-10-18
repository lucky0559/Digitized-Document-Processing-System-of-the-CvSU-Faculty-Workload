import React from "react";
import styled from "styled-components";
import { User } from "../../types/User";

type ReportListsProps = {
  usersReports?: User[];
};

const ReportsLists = ({ usersReports }: ReportListsProps) => {
  console.log(usersReports);
  return (
    <Container>
      <Table>
        <TrStyled>
          <ThStyled rowSpan={2}>Name of Faculty</ThStyled>
          <ThStyled rowSpan={2}>Rank</ThStyled>
          <ThStyled colSpan={5}>Evaluated Workload</ThStyled>
        </TrStyled>
        <TrStyled>
          <ThStyled>TWL</ThStyled>
          <ThStyled>RWL</ThStyled>
          <ThStyled>EWL</ThStyled>
          <ThStyled>SF</ThStyled>
          <ThStyled>TECU</ThStyled>
        </TrStyled>
        {usersReports?.map(item => {
          return (
            <TrStyled>
              <TdStyled>{item.firstName}</TdStyled>
              <TdStyled>{item.academicRank}</TdStyled>
              <TdStyled>{item.twlPoints}</TdStyled>
              <TdStyled>{item.rwlPoints}</TdStyled>
              <TdStyled>{item.ewlPoints}</TdStyled>
              <TdStyled>{item.sfwlPoints}</TdStyled>
              <TdStyled>
                {+item.twlPoints! +
                  +item.rwlPoints! +
                  +item.ewlPoints! +
                  +item.sfwlPoints!}
              </TdStyled>
            </TrStyled>
          );
        })}
      </Table>
    </Container>
  );
};

const Container = styled.div``;

const ThStyled = styled.th`
  border: 1px solid black;
  border-collapse: collapse;
  padding: 20px;
`;

const Table = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;
`;

const TrStyled = styled.tr``;

const TdStyled = styled.td`
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
`;

export default ReportsLists;
