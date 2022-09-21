import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Menu from "../../components/Menu";
import ProfileTab from "../../components/ProfileTab";
import TopNav from "../../components/TopNav";
import Colors from "../../constants/Colors";
import { GetUser } from "../../lib/user.hooks";
import { User } from "../../types/User";

function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      if (userId) {
        const user = await GetUser(userId);
        setUser(user);
      }
      if (user === undefined) {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Container>
      <TopNav
        menuHandler={() => setIsMenuOpen(!isMenuOpen)}
        profileHandler={() => setIsProfileOpen(!isProfileOpen)}
      />
      <Menu isMenuOpen={isMenuOpen} />
      <ProfileTab isProfileOpen={isProfileOpen} />
      <BodyContainer>
        {isLoading ? (
          <LoadingSpinner color={Colors.primary} />
        ) : (
          <ProfileContainer>
            <ProfileText>Profile</ProfileText>
            <UserDetailContainer>
              <DetailContainer>
                <DetailLabel>
                  Username: <DetailData>{user?.username}</DetailData>
                </DetailLabel>
              </DetailContainer>
              <DetailContainer>
                <DetailLabel>
                  Cvsu Email:{" "}
                  <DetailDataNoTextTransform>
                    {user?.email}
                  </DetailDataNoTextTransform>
                </DetailLabel>
              </DetailContainer>
              <DetailContainer>
                <DetailLabel>
                  Surname: <DetailData>{user?.surname}</DetailData>
                </DetailLabel>
              </DetailContainer>
              <DetailContainer>
                <DetailLabel>
                  First Name: <DetailData>{user?.firstName}</DetailData>
                </DetailLabel>
              </DetailContainer>
              <DetailContainer>
                <DetailLabel>
                  Middle Initial: <DetailData>{user?.middleInitial}</DetailData>
                </DetailLabel>
              </DetailContainer>
              <DetailContainer>
                <DetailLabel>
                  Campus: <DetailData>{user?.campus}</DetailData>
                </DetailLabel>
              </DetailContainer>
              <DetailContainer>
                <DetailLabel>
                  Department: <DetailData>{user?.department}</DetailData>
                </DetailLabel>
              </DetailContainer>
              <DetailContainer>
                <DetailLabel>
                  Role: <DetailData>{user?.role}</DetailData>
                </DetailLabel>
              </DetailContainer>
              <DetailContainer>
                <DetailLabel>
                  Academic Rank: <DetailData>{user?.academicRank}</DetailData>
                </DetailLabel>
              </DetailContainer>
            </UserDetailContainer>
            <ButtonsContainer>
              <Button
                text="Upload E-signature"
                color="transparent"
                onClick={() => console.log("upload clicked")}
                type="button"
                borderColor={Colors.primary}
                textColor={Colors.primary}
              />
              <Button
                text="Change Password"
                color="transparent"
                onClick={() => console.log("change password clicked")}
                type="button"
                borderColor={Colors.primary}
                textColor={Colors.primary}
              />
            </ButtonsContainer>
          </ProfileContainer>
        )}
      </BodyContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

const ProfileContainer = styled.div`
  max-width: 599px;
  max-height: 434px;
  background-color: ${Colors.lightBlue};
  padding: 26px;
  border: 1px solid black;
  border-radius: 15px;
  width: 100%;
  height: 100%;
`;

const ProfileText = styled.text`
  text-transform: uppercase;
  font-size: 20px;
`;

const UserDetailContainer = styled.div`
  margin: 27px 0 0 38px;
`;

const DetailContainer = styled.div`
  margin-bottom: 13px;
`;

const DetailLabel = styled.text`
  text-transform: uppercase;
  font-family: HurmeGeometricSans3Bold;
  font-size: 12px;
  line-height: 15.26px;
`;

const DetailData = styled.text`
  text-transform: capitalize;
  font-family: HurmeGeometricSans3;
  font-size: 12px;
  line-height: 15.26px;
`;

const DetailDataNoTextTransform = styled.text`
  text-transform: none;
  font-family: HurmeGeometricSans3;
  font-size: 12px;
  line-height: 15.26px;
`;

const FooterContainer = styled.div`
  margin-top: auto;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

export default Profile;
