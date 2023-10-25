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

  return (
    <ParentContainer>
      <TopNav profileHandler={() => setIsProfileOpen(!isProfileOpen)} />
      <Menu />
      <ProfileTab isProfileOpen={isProfileOpen} UseLogout={UseLogout} />
      <BodyContainer>
        <div className="ml-72">
          <ScreenTitle title="Reports" />
        </div>
        {/* <ReportsLists usersReports={usersReports} /> */}
        <Container isWorkloadListReviewing={isWorkloadListReviewing}>
          {isWorkloadListReviewing || user.role !== "OVPAA" ? (
            <SubContainer>
              <ReportsLists usersReports={userReportsList} />
              {isWorkloadBackButtonShow && (
                <div className="mt-9">
                  <FormButton
                    text="Back"
                    onClicked={() => setIsWorkloadListReviewing(false)}
                  />
                </div>
              )}
            </SubContainer>
          ) : !usersReports && isLoading ? (
            <div className="flex self-center m-auto">
              <LoadingSpinner color={Colors.primary} />
            </div>
          ) : !usersReports && !isLoading ? (
            <div>
              <ButtonText>No data.</ButtonText>
            </div>
          ) : (
            <>
              <SubContainer>
                <ListHeaderText>List of Colleges</ListHeaderText>
                <CollegesCampusesContainer>
                  {usersReports?.CAFENR?.length! > 0 && (
                    <>
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
                    </>
                  )}
                  {usersReports?.CAS?.length! > 0 && (
                    <>
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
                    </>
                  )}
                  {usersReports?.CCJ?.length! > 0 && (
                    <>
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
                    </>
                  )}
                  {usersReports?.CED?.length! > 0 && (
                    <>
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
                    </>
                  )}
                  {usersReports?.CEIT?.length! && (
                    <>
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
                    </>
                  )}
                  {usersReports?.CEMDS?.length! > 0 && (
                    <>
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
                    </>
                  )}
                  {usersReports?.CON?.length! > 0 && (
                    <>
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
                    </>
                  )}
                  {usersReports?.CSPEAR?.length! > 0 && (
                    <>
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
                    </>
                  )}
                  {usersReports?.CVMBS?.length! > 0 && (
                    <>
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
                    </>
                  )}
                </CollegesCampusesContainer>
              </SubContainer>
              <SubContainer>
                <ListHeaderText>List of Campuses</ListHeaderText>
                <CollegesCampusesContainer>
                  {usersReports?.["Bacoor Campus"]?.length! > 0 && (
                    <>
                      <Label>Bacoor Campus</Label>
                      <Button
                        onClick={() => {
                          setUserReportsList(usersReports?.["Bacoor Campus"]);
                          setIsWorkloadListReviewing(true);
                          setIsWorkloadBackButtonShow(true);
                        }}
                      >
                        <ButtonText>Review</ButtonText>
                      </Button>
                    </>
                  )}
                  {usersReports?.["Carmona Campus"]?.length! > 0 && (
                    <>
                      <Label>Carmona Campus</Label>
                      <Button
                        onClick={() => {
                          setUserReportsList(usersReports?.["Carmona Campus"]);
                          setIsWorkloadListReviewing(true);
                          setIsWorkloadBackButtonShow(true);
                        }}
                      >
                        <ButtonText>Review</ButtonText>
                      </Button>
                    </>
                  )}
                  {usersReports?.["Cavite City Campus"]?.length! > 0 && (
                    <>
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
                    </>
                  )}
                  {usersReports?.["Gen. Trias Campus"]?.length! > 0 && (
                    <>
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
                    </>
                  )}
                  {usersReports?.["Imus Campus"]?.length! > 0 && (
                    <>
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
                    </>
                  )}
                  {usersReports?.["Silang Campus"]?.length! > 0 && (
                    <>
                      <Label>Silang Campus</Label>
                      <Button
                        onClick={() => {
                          setUserReportsList(usersReports?.["Silang Campus"]);
                          setIsWorkloadListReviewing(true);
                          setIsWorkloadBackButtonShow(true);
                        }}
                      >
                        <ButtonText>Review</ButtonText>
                      </Button>
                    </>
                  )}
                  {usersReports?.["Tanza Campus"]?.length! > 0 && (
                    <>
                      <Label>Tanza Campus</Label>
                      <Button
                        onClick={() => {
                          setUserReportsList(usersReports?.["Tanza Campus"]);
                          setIsWorkloadListReviewing(true);
                          setIsWorkloadBackButtonShow(true);
                        }}
                      >
                        <ButtonText>Review</ButtonText>
                      </Button>
                    </>
                  )}
                  {usersReports?.["Trece Campus"]?.length! > 0 && (
                    <>
                      <Label>Trece Campus</Label>
                      <Button
                        onClick={() => {
                          setUserReportsList(usersReports?.["Trece Campus"]);
                          setIsWorkloadListReviewing(true);
                          setIsWorkloadBackButtonShow(true);
                        }}
                      >
                        <ButtonText>Review</ButtonText>
                      </Button>
                    </>
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
`;

const SubContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ListHeaderText = styled.span`
  margin-bottom: 30px;
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

export default ReportsScreen;
