import { useEffect, useState } from "react";
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
  OVPAAApproveExtensionWorkload,
  OVPAAApproveResearchWorkload,
  OVPAAApproveStrategicFunctionWorkload,
  OVPAAApproveTeachingWorkload,
  SendRemarks,
  getAllPendingWorkloadByIdAndCurrentProcessRole
} from "../../lib/faculty-workload.hooks";
import RemarksWorkload, { PointsAndRemarks } from "./RemarksWorkload";
import FormButton from "../../components/FormButton";
import { Confirm } from "semantic-ui-react";

type WorkloadProps = {
  teachingWorkload?: User[];
  researchWorkload?: User[];
  extensionWorkload?: User[];
  allStrategicWorkload?: User[];
  isDataLoading: boolean;
  setIsDataLoading: (value: boolean) => void;
  isWorkloadListReviewing?: boolean;
  setIsWorkloadBackButtonShow?: (value: boolean) => void;
};
function Workload({
  teachingWorkload,
  researchWorkload,
  extensionWorkload,
  allStrategicWorkload,
  isDataLoading,
  setIsDataLoading,
  isWorkloadListReviewing,
  setIsWorkloadBackButtonShow
}: WorkloadProps) {
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState<User>();

  const [users, setUsers] = useState<User[]>();

  const [isReviewing, setIsReviewing] = useState(false);

  const [accountReviewing, setAccountReviewing] = useState<User>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [reviewingId, setReviewingId] = useState("");

  const [remarks, setRemarks] = useState("");

  const [isConfirming, setIsConfirming] = useState(false);

  const [twlPointsRemarks, setTwlPointsRemarks] =
    useState<PointsAndRemarks[]>();
  const [rwlPointsRemarks, setRwlPointsRemarks] =
    useState<PointsAndRemarks[]>();
  const [ewlPointsRemarks, setEwlPointsRemarks] =
    useState<PointsAndRemarks[]>();
  const [sfPointsRemarks, setSfPointsRemarks] = useState<PointsAndRemarks[]>();

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
    setIsWorkloadBackButtonShow && setIsWorkloadBackButtonShow(true);
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
      if (teachingWorkloads.length > 0) {
        if (!isEmailSent && remarks) {
          await SendRemarks(user?.role, reviewingId, remarks);
          isEmailSent = true;
          setRemarks("");
        }
        if (user?.role === "Department Chairperson") {
          for (let i = 0; teachingWorkloads.length > i; i++) {
            isEmailSent = true;
            await ApproveTeachingWorkload(teachingWorkloads[i].id);
          }
        } else if (user?.role === "OVPAA" || user?.role === "Dean") {
          let modified = twlPointsRemarks;
          const deanPoints = modified?.slice(1);
          let points = 0;
          for (let i = 0; teachingWorkloads.length > i; i++) {
            if (modified != undefined) {
              modified![i].key = teachingWorkloads[i].id;
              modified![i].remarks = remarks;
              for (let a = 0; modified?.length! > a; a++) {
                points = points + Number(modified![a].points);
              }
              modified![i].points = points.toString();
              setTwlPointsRemarks(modified);
            }

            await OVPAAApproveTeachingWorkload(
              twlPointsRemarks?.[i]!,
              user.role,
              deanPoints!
            );
          }
        }
      }
      if (researchWorkloads.length > 0) {
        if (!isEmailSent && remarks) {
          await SendRemarks(user?.role, reviewingId, remarks);
          isEmailSent = true;
          setRemarks("");
        }

        if (user?.role === "Department Chairperson") {
          for (let i = 0; researchWorkloads.length > i; i++) {
            await ApproveResearchWorkload(researchWorkloads[i].id);
          }
        } else if (user?.role === "OVPAA" || user?.role === "Dean") {
          let modified = rwlPointsRemarks;
          const deanPoints = modified?.slice(1);
          let points = 0;
          for (let i = 0; researchWorkloads.length > i; i++) {
            modified![i].key = researchWorkloads[i].id;
            modified![i].remarks = remarks;
            for (let a = 0; modified?.length! > a; a++) {
              points = points + Number(modified![a].points);
            }
            modified![i].points = points.toString();
            setRwlPointsRemarks(modified);
            await OVPAAApproveResearchWorkload(
              modified?.[i]!,
              user.role,
              deanPoints!
            );
          }
        }
      }
      if (extensionWorkloads.length > 0) {
        if (!isEmailSent && remarks) {
          await SendRemarks(user?.role, reviewingId, remarks);
          isEmailSent = true;
          setRemarks("");
        }
        if (user?.role === "Department Chairperson") {
          for (let i = 0; extensionWorkloads.length > i; i++) {
            await ApproveExtensionWorkload(extensionWorkloads[i].id);
          }
        } else if (user?.role === "OVPAA" || user?.role === "Dean") {
          let modified = ewlPointsRemarks;
          const deanPoints = modified?.slice(1);
          let points = 0;
          for (let i = 0; extensionWorkloads.length > i; i++) {
            if (modified != undefined) {
              modified![i].key = extensionWorkloads[i].id;
              modified[i].remarks = remarks;
              for (let a = 0; modified?.length! > a; a++) {
                points = points + Number(modified![a].points);
              }
              modified![i].points = points.toString();
              setEwlPointsRemarks(modified);
            }

            await OVPAAApproveExtensionWorkload(
              ewlPointsRemarks?.[i]!,
              user.role,
              deanPoints!
            );
          }
        }
      }
      if (strategicFunctionWorkloads.length > 0) {
        if (!isEmailSent && remarks) {
          await SendRemarks(user?.role, reviewingId, remarks);
          isEmailSent = true;
          setRemarks("");
        }
        if (user?.role === "Department Chairperson") {
          for (let i = 0; strategicFunctionWorkloads.length > i; i++) {
            await ApproveStrategicFunctionWorkload(
              strategicFunctionWorkloads[i].id
            );
          }
        } else if (user?.role === "OVPAA" || user?.role === "Dean") {
          let modified = sfPointsRemarks;
          modified = modified?.filter(item => {
            return item.key !== null;
          });

          const deanPoints = modified?.slice(1);
          let points = 0;
          for (let i = 0; strategicFunctionWorkloads.length > i; i++) {
            if (modified != undefined) {
              modified![i].key = strategicFunctionWorkloads[i].id;
              modified[i].remarks = remarks;
              for (let a = 0; modified?.length! > a; a++) {
                points = points + Number(modified![a].points);
              }
              modified![i].points = points.toString();
              setSfPointsRemarks(modified);
            }
            await OVPAAApproveStrategicFunctionWorkload(
              sfPointsRemarks?.[i]!,
              user.role,
              deanPoints!
            );
          }
        }
      }
      alert("Workload approved and endorsed");
      setReviewingId("");
      setIsDataLoading(true);
      setIsSubmitting(false);
      setIsReviewing(false);
    }
  };

  return (
    <Container>
      {isReviewing && (
        <>
          <Confirm
            open={isConfirming}
            onCancel={() => setIsConfirming(false)}
            onConfirm={() => {
              setIsConfirming(false);
              onApprove();
            }}
            content="Approve?"
            size="large"
          />
          <RemarksWorkload
            user={accountReviewing!}
            setRemarks={setRemarks}
            setTwlPointsRemarks={setTwlPointsRemarks}
            setRwlPointsRemarks={setRwlPointsRemarks}
            setEwlPointsRemarks={setEwlPointsRemarks}
            setSfPointsRemarks={setSfPointsRemarks}
            rwlPointsRemarks={rwlPointsRemarks}
          />
          <div
            style={{
              margin: 15,
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <FormButton text="Back" onClicked={onCloseReviewScreen} />
            <div style={{ marginRight: 100 }}>
              <FormButton
                text="Approve"
                onClicked={() => setIsConfirming(true)}
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </>
      )}
      {isDataLoading && (!isReviewing || !isWorkloadListReviewing) && (
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
      users ? (
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
                            if (isWorkloadListReviewing) {
                              setIsWorkloadBackButtonShow &&
                                setIsWorkloadBackButtonShow(false);
                            }
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
      ) : !isDataLoading && !isReviewing ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
          }}
        >
          {/* <LoadingSpinner color={Colors.primary} /> */}
        </div>
      ) : null}

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

const TdText = styled.span`
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
