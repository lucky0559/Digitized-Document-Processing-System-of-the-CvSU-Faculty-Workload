import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import styled from "styled-components";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Footer from "../../components/Footer";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Menu from "../../components/Menu";
import ProfileTab from "../../components/ProfileTab";
import TopNav from "../../components/TopNav";
import Colors from "../../constants/Colors";
import { DROPDOWN_LISTS } from "../../constants/Strings";
import { GetUser } from "../../lib/user.hooks";
import { User } from "../../types/User";

function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  let editedUser = user;
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
  }, [isEditing]);

  const campusHandler = (campusValue: string) => {
    editedUser!.campus = campusValue;
    setUser(editedUser);
  };

  const departmentHandler = (departmentValue: string) => {
    editedUser!.department = departmentValue;
    setUser(editedUser);
  };

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
        ) : isEditing ? (
          <ProfileContainer>
            <ProfileText>Profile</ProfileText>
            <InputsContainer>
              <TextFieldContainer>
                <Label>Surname</Label>
                <TextField type="text" value={user?.surname} />
              </TextFieldContainer>
              <TextFieldContainer>
                <Label>First Name</Label>
                <TextField type="text" value={user?.firstName} />
              </TextFieldContainer>
              <TextFieldContainer>
                <Label>Middle Initial</Label>
                <TextField type="text" value={user?.middleInitial} />
              </TextFieldContainer>
              <DropDownContainer>
                <Dropdown
                  option={DROPDOWN_LISTS.CAMPUS}
                  label="Campus"
                  onSelect={campusHandler}
                  val={user?.campus}
                />
              </DropDownContainer>
              <DropDownContainer>
                <Dropdown
                  option={DROPDOWN_LISTS.DEPARTMENT}
                  label="Department"
                  onSelect={departmentHandler}
                  val={user?.department}
                />
              </DropDownContainer>
            </InputsContainer>
            <ButtonsContainer>
              <Button
                text="Cancel"
                color="transparent"
                onClick={() => setIsEditing(!isEditing)}
                type="button"
                borderColor={Colors.primary}
                textColor={Colors.primary}
                hoverOpacity="0.5"
              />
              <Button
                text="Save"
                color="transparent"
                onClick={() => console.log(user)}
                type="button"
                borderColor={Colors.primary}
                textColor={Colors.primary}
                hoverOpacity="0.5"
              />
            </ButtonsContainer>
          </ProfileContainer>
        ) : (
          <ProfileContainer>
            <ProfileText>Profile</ProfileText>
            <EditButton onClick={() => setIsEditing(!isEditing)}>
              <FaEdit size={26} color="black" />
            </EditButton>
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
                hoverOpacity="0.5"
              />
              <Button
                text="Change Password"
                color="transparent"
                onClick={() => console.log("change password clicked")}
                type="button"
                borderColor={Colors.primary}
                textColor={Colors.primary}
                hoverOpacity="0.5"
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
  position: relative;
`;

const ProfileText = styled.text`
  text-transform: uppercase;
  font-size: 20px;
  font-family: HurmeGeometricSans3Bold;
  line-height: 25.44px;
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
  justify-content: center;
  align-items: center;
  margin-top: 17.6px;
`;

const EditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 27px;
  top: 27px;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.4;
  }
`;

const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 210px;
  width: 100%;
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 218px;
  width: 100%;
  margin-left: 5px;
`;

const TextField = styled.input`
  font-family: HurmeGeometricSans3;
  width: 100%;
  height: 24.03px;
  background-color: #ececec;
`;

const Label = styled.label`
  font-size: 12px;
  line-height: 15.26px;
  font-family: HurmeGeometricSans3;
`;

const InputsContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Profile;
