import styled from "styled-components";
import { User } from "../../types/User";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Colors from "../../constants/Colors";
import { useEffect, useState } from "react";
import { getConfig } from "../../lib/config.hooks";
import { Config } from "../../types/Config";

type ReportListsProps = {
  usersReports?: User[];
};

const ReportsLists = ({ usersReports }: ReportListsProps) => {
  const [config, setConfig] = useState<Config>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await getConfig();
      setConfig(data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <Container>
      {!config && isLoading ? (
        <div className="mt-12">
          <LoadingSpinner color={Colors.primary} />
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold">Summary of Faculty Workload</span>
            <span className="font-bold">
              {config?.semester} Sem. SY {config?.schoolYearStart}-
              {config?.schoolYearEnd}
            </span>
          </div>
          <div className="mb-5">
            <span>
              College/Campus:{" "}
              <span className="font-bold">{usersReports?.[0].campus}</span>
            </span>
          </div>
          <Table>
            <TrStyled>
              <ThStyled rowSpan={2}>Name of Faculty</ThStyled>
              <ThStyled rowSpan={2}>Rank</ThStyled>
              <ThStyled colSpan={5}>
                Submitted Workload from Colleges/Campuses
              </ThStyled>
              <ThStyled colSpan={5}>Evaluated Workload (OVPAA)</ThStyled>
            </TrStyled>
            <TrStyled>
              <ThStyled>TWL</ThStyled>
              <ThStyled>RWL</ThStyled>
              <ThStyled>EWL</ThStyled>
              <ThStyled>SF</ThStyled>
              <ThStyled>TECU</ThStyled>
              <ThStyled>TWL</ThStyled>
              <ThStyled>RWL</ThStyled>
              <ThStyled>EWL</ThStyled>
              <ThStyled>SF</ThStyled>
              <ThStyled>TECU</ThStyled>
            </TrStyled>
            {usersReports?.map(item => {
              return (
                <TrStyled key={item.id}>
                  <TdStyled>
                    {item.surname}, {item.firstName} {item.middleInitial}.
                  </TdStyled>
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
        </>
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
