import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import ProfileTab from "../../components/ProfileTab";
import ScreenTitle from "../../components/ScreenTitle";
import TopNav from "../../components/TopNav";
import {
  GetTotalWorkloadDeptDeanPoints,
  GetTotalWorkloadPoints
} from "../../lib/faculty-workload.hooks";
import { User } from "../../types/User";
import ReportsLists from "./ReportsLists";
import Colors from "../../constants/Colors";
import FormButton from "../../components/FormButton";
import { OvpaaWorkloads } from "../WorkloadReview/OvpaaWorkloadReview";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { UserContext } from "../../App";

type ReportsScreenProps = {
  UseLogout: () => void;
};

const ReportsScreen = ({ UseLogout }: ReportsScreenProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [usersReports, setUsersReports] = useState<OvpaaWorkloads>();
  const [userReportsList, setUserReportsList] = useState<User[]>();

  const [isWorkloadListReviewing, setIsWorkloadListReviewing] = useState(false);
  const [isWorkloadBackButtonShow, setIsWorkloadBackButtonShow] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (user.role !== "OVPAA") {
        const { data } = await GetTotalWorkloadDeptDeanPoints(user);
        setUserReportsList(data);
      } else {
        const { data } = await GetTotalWorkloadPoints();
        setUsersReports(data);
      }
      setIsLoading(false);
    })();
  }, [user]);

  const onPrint = () => {
    window.print();
  };

  return (
    <ParentContainer>
      <TopNav profileHandler={() => setIsProfileOpen(!isProfileOpen)} />
      <Menu />
      <ProfileTab isProfileOpen={isProfileOpen} UseLogout={UseLogout} />
      <BodyContainer>
        <TitleContainer>
          <ScreenTitle title="Reports" />
        </TitleContainer>
        {/* <ReportsLists usersReports={usersReports} /> */}
        <Container isWorkloadListReviewing={isWorkloadListReviewing}>
          {(isWorkloadListReviewing || user.role !== "OVPAA") &&
          !!userReportsList?.length ? (
            <SubContainer>
              <ReportsLists usersReports={userReportsList} />
              {isWorkloadBackButtonShow && (
                <ButtonContainer className="mt-9">
                  <FormButton
                    text="Back"
                    onClicked={() => setIsWorkloadListReviewing(false)}
                  />
                  {user.role === "OVPAA" && (
                    <FormButton text="Print" onClicked={onPrint} />
                  )}
                </ButtonContainer>
              )}
            </SubContainer>
          ) : !usersReports && isLoading ? (
            <div className="flex self-center m-auto">
              <LoadingSpinner color={Colors.primary} />
            </div>
          ) : !usersReports && !isLoading ? (
            <>
              <ButtonText>No data.</ButtonText>
            </>
          ) : (
            <>
              <SubContainer>
                <ListHeaderText>List of Colleges</ListHeaderText>
                <CollegesCampusesContainer>
                  {!!usersReports?.CAFENR?.length ||
                  !!usersReports?.CAS?.length ||
                  !!usersReports?.CCJ?.length ||
                  !!usersReports?.CED?.length ||
                  !!usersReports?.CEIT?.length ||
                  !!usersReports?.CEMDS?.length ||
                  !!usersReports?.CON?.length ||
                  !!usersReports?.CSPEAR?.length ||
                  !!usersReports?.CVMBS?.length ? (
                    <div className="flex flex-col">
                      {usersReports?.CAFENR?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>CAFENR</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(usersReports?.CAFENR);
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.CAS?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>CAS</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(usersReports?.CAS);
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.CCJ?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>CCJ</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(usersReports?.CCJ);
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.CED?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>CED</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(usersReports?.CED);
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.CEIT?.length! && (
                        <div className="flex mt-6">
                          <Label>CEIT</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(usersReports?.CEIT);
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.CEMDS?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>CEMDS</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(usersReports?.CEMDS);
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.CON?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>CON</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(usersReports?.CON);
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.CSPEAR?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>CSPEAR</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(usersReports?.CSPEAR);
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.CVMBS?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>CVMBS</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(usersReports?.CVMBS);
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <ButtonText>No data.</ButtonText>
                    </div>
                  )}
                </CollegesCampusesContainer>
              </SubContainer>
              <SubContainer>
                <ListHeaderText>List of Campuses</ListHeaderText>
                <CollegesCampusesContainer>
                  {!!usersReports?.["Bacoor Campus"]?.length ||
                  !!usersReports?.["Carmona Campus"]?.length ||
                  !!usersReports?.["Cavite City Campus"]?.length ||
                  !!usersReports?.["Gen. Trias Campus"]?.length ||
                  !!usersReports?.["Imus Campus"]?.length ||
                  !!usersReports?.["Silang Campus"]?.length ||
                  !!usersReports?.["Tanza Campus"]?.length ||
                  !!usersReports?.["Trece Campus"]?.length ? (
                    <div className="flex flex-col">
                      {usersReports?.["Bacoor Campus"]?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>Bacoor Campus</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(
                                usersReports?.["Bacoor Campus"]
                              );
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.["Carmona Campus"]?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>Carmona Campus</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(
                                usersReports?.["Carmona Campus"]
                              );
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.["Cavite City Campus"]?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>Cavite City Campus</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(
                                usersReports?.["Cavite City Campus"]
                              );
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.["Gen. Trias Campus"]?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>Gen. Trias Campus</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(
                                usersReports?.["Gen. Trias Campus"]
                              );
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.["Imus Campus"]?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>Imus Campus</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(usersReports?.["Imus Campus"]);
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.["Silang Campus"]?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>Silang Campus</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(
                                usersReports?.["Silang Campus"]
                              );
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.["Tanza Campus"]?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>Tanza Campus</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(
                                usersReports?.["Tanza Campus"]
                              );
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                      {usersReports?.["Trece Campus"]?.length! > 0 && (
                        <div className="flex mt-6">
                          <Label>Trece Campus</Label>
                          <Button
                            onClick={() => {
                              setUserReportsList(
                                usersReports?.["Trece Campus"]
                              );
                              setIsWorkloadListReviewing(true);
                              setIsWorkloadBackButtonShow(true);
                            }}
                          >
                            <ButtonText>Review</ButtonText>
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <ButtonText>No data.</ButtonText>
                    </div>
                  )}
                </CollegesCampusesContainer>
              </SubContainer>
            </>
          )}
        </Container>
      </BodyContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </ParentContainer>
  );
};

const ParentContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
`;

const FooterContainer = styled.div`
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  z-index: 1;
`;

const Container = styled.div<{ isWorkloadListReviewing: boolean }>`
  display: flex;
  width: 75%;
  border: ${p => (p.isWorkloadListReviewing ? null : "2px solid black")};
  height: auto;
  border-radius: 15px;
  padding: 15px;
  margin: 20px 0;
  margin-left: 300px;
  margin-right: 50px;
  @media print {
    margin: 0px;
    width: auto;
  }
`;

const SubContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ListHeaderText = styled.span`
  margin-bottom: 10px;
  font-family: HurmeGeometricSans3;
  font-weight: 400;
  font-size: 17px;
  line-height: 15px;
  font-weight: bold;
`;

const CollegesCampusesContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  font-family: HurmeGeometricSans3;
  font-weight: 400;
  font-size: 15px;
  line-height: 15px;
`;

const Button = styled.div`
  margin-left: 25px;
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

const ButtonContainer = styled.div`
  @media print {
    display: none;
  }
  display: flex;
  justify-content: space-between;
  max-width: 280px;
`;

const TitleContainer = styled.div`
  margin-left: 18rem;
  @media print {
    margin: 0px;
  }
  @page {
    size: landscape;
  }
`;

export default ReportsScreen;
