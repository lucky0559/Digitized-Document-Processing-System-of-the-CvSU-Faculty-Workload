import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Colors from "../constants/Colors";

type ProfileTabProps = {
  isProfileOpen: boolean;
};

const ProfileTab = ({ isProfileOpen }: ProfileTabProps) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <Container isProfileOpen={isProfileOpen}>
      <NavButtonContainer
        onClick={() => navigate("/profile", { replace: true })}
      >
        <NavButtonText isActive={true}>Profile</NavButtonText>
      </NavButtonContainer>
      <NavButtonContainer onClick={logoutHandler}>
        <NavButtonText isActive={true}>Logout</NavButtonText>
      </NavButtonContainer>
    </Container>
  );
};

const slideInAnimation = keyframes`
 0% { top: -54px }
 100% { top: 54px; }
 `;

const slideOutAnimation = keyframes`
 0% { top: 54px }
 100% { top: -54px; }
 `;

const Container = styled.div<{ isProfileOpen: boolean }>`
  width: 248px;
  height: auto;
  background-color: ${Colors.secondary};
  position: absolute;
  right: 0;
  top: ${p => (p.isProfileOpen ? 54 : -248)}px;
  animation-name: ${p =>
    p.isProfileOpen ? slideInAnimation : slideOutAnimation};
  animation-duration: 0.5s;
  align-self: flex-end;
`;

const NavButtonContainer = styled.div`
  border-bottom: 1px solid ${Colors.primary};
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.6;
  }
`;

const NavButtonText = styled.text<{ isActive: boolean }>`
  font-family: HurmeGeometricSans3;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${Colors.white};
`;

export default ProfileTab;
