import React from "react";
import styled from "styled-components";
const ReportsLists = () => {
  return (
    <Container>
      <Table>
        <TrStyled>
          <ThStyled rowSpan={2}>Name of Faculty</ThStyled>
          <ThStyled rowSpan={2}>Rank</ThStyled>
          <ThStyled>
            <TrStyled>
              <ThStyled colSpan={5}>Evaluated Workload</ThStyled>
            </TrStyled>
          </ThStyled>
        </TrStyled>
        <TrStyled>
          <ThStyled>TWL</ThStyled>
          <ThStyled>RWL</ThStyled>
          <ThStyled>EWL</ThStyled>
          <ThStyled>SF</ThStyled>
          <ThStyled>TECU</ThStyled>
        </TrStyled>
        {/* <TrStyled>
          <ThStyled>1</ThStyled>
          <ThStyled>2</ThStyled>
          <ThStyled>3</ThStyled>
          <ThStyled>4</ThStyled>
          <ThStyled>5</ThStyled>
          <ThStyled>6</ThStyled>
          <ThStyled>7</ThStyled>
        </TrStyled> */}
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
`;

const TrStyled = styled.tr`
  border-collapse: collapse;
`;

export default ReportsLists;
