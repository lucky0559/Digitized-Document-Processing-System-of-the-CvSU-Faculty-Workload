import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Colors from "../../constants/Colors";
import { User } from "../../types/User";
import { GetUser } from "../../lib/user.hooks";
import { useNavigate } from "react-router-dom";
import ReviewFacultyScreen from "./ReviewFacultyScreen";
import WorkloadReviewScreen from "./WorkloadReviewScreen";
import _ from "lodash";
import { GetAllUserPendingWorkloads } from "../../lib/faculty-workload.hooks";
import RemarksWorkload from "./RemarksWorkload";
import FormButton from "../../components/FormButton";

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
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState<User>();

  const [users, setUsers] = useState<User[]>();

  const [isReviewing, setIsReviewing] = useState(false);

  const [accountReviewing, setAccountReviewing] = useState<User>();

  useEffect(() => {
    (async () => {
      setUser(await GetUser(userId!));
      const data1 = Array.prototype.concat(teachingWorkload, researchWorkload);
      const data2 = Array.prototype.concat(
        extensionWorkload,
        allStrategicWorkload
      );
      const mergeData = Array.prototype.concat(data1, data2);
      const reduceData = _.uniqBy(mergeData, "email");
      setUsers(reduceData);
    })();
  }, [
    teachingWorkload,
    researchWorkload,
    extensionWorkload,
    allStrategicWorkload,
    userId
  ]);

  const onCloseReviewScreen = () => {
    setIsReviewing(false);
  };

  return (
    <Container>
      {isReviewing && (
        <>
          <RemarksWorkload user={accountReviewing!} />
          <div style={{ margin: 15 }}>
            <FormButton text="Back" onClicked={onCloseReviewScreen} />
          </div>
        </>
      )}
      {isDataLoading && !isReviewing && (
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

      {(teachingWorkload?.length! > 0 ||
        researchWorkload?.length! > 0 ||
        extensionWorkload?.length! > 0 ||
        allStrategicWorkload?.length! > 0) &&
        !isDataLoading &&
        !isReviewing &&
        users && (
          <Table>
            <TableCaption>
              {user?.role === "Department Chairperson"
                ? user.department
                : user?.role === "OVPAA"
                ? ""
                : user?.campus}
            </TableCaption>
            <tbody>
              <tr>
                <ThStyle>List of Faculty</ThStyle>
                <ThStyle>Academic Rank</ThStyle>
                {/* <ThStyle>Workload Type</ThStyle>
            <ThStyle>Approved/Disapproved with Remarks</ThStyle> */}
              </tr>

              {!isDataLoading &&
                users &&
                users?.map((item, index) => {
                  // if (!item) {
                  //   return null;
                  // } else {
                  return (
                    item && (
                      <tr key={index}>
                        <TdStyle>
                          <TdText>{item.firstName}</TdText>
                        </TdStyle>
                        <TdStyle>
                          <TdText>{item.academicRank}</TdText>
                        </TdStyle>
                        <TdStyle>
                          <Button
                            onClick={() => {
                              setAccountReviewing(item);
                              setIsReviewing(true);
                            }}
                          >
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
                    )
                  );
                  // }
                })}
            </tbody>
          </Table>
        )}
      {!isDataLoading &&
        teachingWorkload?.length! <= 0 &&
        researchWorkload?.length! <= 0 &&
        extensionWorkload?.length! <= 0 &&
        allStrategicWorkload?.length! <= 0 && (
          <div>
            <ButtonText>No data.</ButtonText>
          </div>
        )}
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
`;

const Table = styled.table`
  width: 100%;
  border: 2px solid black;
  height: auto;
  border-radius: 15px;
  padding: 15px;
  margin: 20px 0;
`;

const TdText = styled.text`
  font-family: HurmeGeometricSans3;
`;

const TdStyle = styled.td`
  text-align: center;
  padding-bottom: 100px;
`;

const ThStyle = styled.th`
  padding: 15px;
  font-family: HurmeGeometricSans3;
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

const TableCaption = styled.caption`
  font-size: 20px;
  font-weight: bold;
  font-family: HurmeGeometricSans3;
`;

export default Workload;
