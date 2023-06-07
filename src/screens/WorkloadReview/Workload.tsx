import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Colors from "../../constants/Colors";
import { User } from "../../types/User";
import { GetUser } from "../../lib/user.hooks";
import _ from "lodash";
import {
  ApproveExtensionWorkload,
  ApproveResearchWorkload,
  ApproveStrategicFunctionWorkload,
  ApproveTeachingWorkload,
  SendRemarks,
  getAllPendingWorkloadByIdAndCurrentProcessRole
} from "../../lib/faculty-workload.hooks";
import RemarksWorkload from "./RemarksWorkload";
import FormButton from "../../components/FormButton";

type WorkloadProps = {
  teachingWorkload?: User[];
  researchWorkload?: User[];
  extensionWorkload?: User[];
  allStrategicWorkload?: User[];
  isDataLoading: boolean;
  setIsDataLoading: (value: boolean) => void;
};
function Workload({
  teachingWorkload,
  researchWorkload,
  extensionWorkload,
  allStrategicWorkload,
  isDataLoading,
  setIsDataLoading
}: WorkloadProps) {
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState<User>();

  const [users, setUsers] = useState<User[]>();

  const [isReviewing, setIsReviewing] = useState(false);

  const [accountReviewing, setAccountReviewing] = useState<User>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [reviewingId, setReviewingId] = useState("");

  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (!isReviewing) {
      (async () => {
        setUser(await GetUser(userId!));
        const data1 = Array.prototype.concat(
          teachingWorkload,
          researchWorkload
        );
        const data2 = Array.prototype.concat(
          extensionWorkload,
          allStrategicWorkload
        );
        const mergeData = Array.prototype.concat(data1, data2);
        const reduceData = _.uniqBy(mergeData, "email");
        setUsers(reduceData);
      })();
    }
  }, [
    teachingWorkload,
    researchWorkload,
    extensionWorkload,
    allStrategicWorkload,
    userId,
    isReviewing
  ]);

  const onCloseReviewScreen = () => {
    setIsReviewing(false);
  };

  const onApprove = async () => {
    if (user?.role !== null && reviewingId) {
      setIsSubmitting(true);
      let isEmailSent = false;
      const {
        teachingWorkloads,
        researchWorkloads,
        extensionWorkloads,
        strategicFunctionWorkloads
      } = await getAllPendingWorkloadByIdAndCurrentProcessRole(
        reviewingId,
        user?.role!
      );
      if (teachingWorkloads) {
        if (
          !isEmailSent &&
          remarks &&
          (user?.role === "Department Chairperson" || user?.role === "Dean")
        ) {
          await SendRemarks(user?.role, reviewingId, remarks);
          isEmailSent = true;
          setRemarks("");
        } else if (user?.role === "OVPAA") {
          console.log("ovpaa remarks");
        }
        for (let i = 0; teachingWorkloads.length > i; i++) {
          await ApproveTeachingWorkload(teachingWorkloads[i].id);
        }
      }
      if (researchWorkloads) {
        if (
          !isEmailSent &&
          remarks &&
          (user?.role === "Department Chairperson" || user?.role === "Dean")
        ) {
          await SendRemarks(user?.role, reviewingId, remarks);
          isEmailSent = true;
          setRemarks("");
        }
        for (let i = 0; researchWorkloads.length > i; i++) {
          await ApproveResearchWorkload(researchWorkloads[i].id);
        }
      }
      if (extensionWorkloads) {
        if (
          !isEmailSent &&
          remarks &&
          (user?.role === "Department Chairperson" || user?.role === "Dean")
        ) {
          await SendRemarks(user?.role, reviewingId, remarks);
          isEmailSent = true;
          setRemarks("");
        }
        for (let i = 0; extensionWorkloads.length > i; i++) {
          await ApproveExtensionWorkload(extensionWorkloads[i].id);
        }
      }
      if (strategicFunctionWorkloads) {
        if (
          !isEmailSent &&
          remarks &&
          (user?.role === "Department Chairperson" || user?.role === "Dean")
        ) {
          await SendRemarks(user?.role, reviewingId, remarks);
          isEmailSent = true;
          setRemarks("");
        }
        for (let i = 0; strategicFunctionWorkloads.length > i; i++) {
          await ApproveStrategicFunctionWorkload(
            strategicFunctionWorkloads[i].id
          );
        }
      }
      setReviewingId("");
      setIsDataLoading(true);
      setIsSubmitting(false);
      setIsReviewing(false);
    }
  };

  const onDisapprove = async () => {};

  return (
    <Container>
      {isReviewing && (
        <>
          <RemarksWorkload user={accountReviewing!} setRemarks={setRemarks} />
          <div
            style={{
              margin: 15,
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <FormButton text="Back" onClicked={onCloseReviewScreen} />
            <div style={{ marginRight: 100 }}>
              {/* <FormButton
                text="Disapprove"
                onClicked={onDisapprove}
                isSubmitting={isSubmitting}
              /> */}
              <FormButton
                text="Approve"
                onClicked={onApprove}
                isSubmitting={isSubmitting}
              />
            </div>
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
                <ThStyle>Name of Faculty</ThStyle>
                <ThStyle>Academic Rank</ThStyle>
                <ThStyle>Status</ThStyle>
                <ThStyle></ThStyle>
              </tr>

              {!isDataLoading &&
                users &&
                users?.map((item, index) => {
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
                          <TdText>In-Progress</TdText>
                        </TdStyle>
                        <TdStyle>
                          <Button
                            onClick={() => {
                              setAccountReviewing(item);
                              setReviewingId(item.id!);
                              setIsReviewing(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </TdStyle>
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
  padding-bottom: 20px;
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
