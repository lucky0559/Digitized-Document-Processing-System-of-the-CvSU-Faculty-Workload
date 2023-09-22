import styled from "styled-components";
import { User } from "../../types/User";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Colors from "../../constants/Colors";

type ReportListsProps = {
  usersReports?: User[];
};

const ReportsLists = ({ usersReports }: ReportListsProps) => {
  console.log(usersReports);
  return (
    <Container>
      {!usersReports?.length ? (
        <div style={{ marginTop: 50 }}>
          <LoadingSpinner color={Colors.primary} />
        </div>
      ) : (
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
                <TdStyled>{item.twlPoints ? item.twlPoints : 0}</TdStyled>
                <TdStyled>{item.rwlPoints ? item.rwlPoints : 0}</TdStyled>
                <TdStyled>{item.ewlPoints ? item.ewlPoints : 0}</TdStyled>
                <TdStyled>{item.sfwPoints ? item.sfwPoints : 0}</TdStyled>
                <TdStyled>
                  {item.twlPoints!
                    ? +item.twlPoints!
                    : 0 + item.rwlPoints!
                    ? +item.rwlPoints!
                    : 0 + item.ewlPoints!
                    ? +item.ewlPoints!
                    : 0 + item.sfwPoints!
                    ? +item.sfwPoints!
                    : 0}
                </TdStyled>
              </TrStyled>
            );
          })}
        </Table>
      )}
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
