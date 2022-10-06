import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Colors from "../constants/Colors";

type MenuProps = {
  isMenuOpen: boolean;
};

const Menu = ({ isMenuOpen }: MenuProps) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  return (
    <Container isMenuOpen={isMenuOpen}>
      <NavButtonContainer>
        <NavButtonText
          isActive={true}
          onClick={() => navigate("/faculty-workload", { replace: true })}
        >
          Faculty Workload
        </NavButtonText>
      </NavButtonContainer>
      {userRole !== "System Administrator" && (
        <NavButtonContainer>
          <NavButtonText
            onClick={() => navigate("/workload-review", { replace: true })}
            isActive={false}
          >
            Workload Review
          </NavButtonText>
        </NavButtonContainer>
      )}

      <NavButtonContainer>
        <NavButtonText isActive={false}>Reports</NavButtonText>
      </NavButtonContainer>
    </Container>
  );
};

const slideInAnimation = keyframes`
 0% { left: -248px }
 100% { left: 0; }
 `;

const slideOutAnimation = keyframes`
 0% { left: 0 }
 100% { left: -248px; }
 `;

const Container = styled.div<{ isMenuOpen: boolean }>`
  width: 248px;
  height: calc(100% - 54px);
  background-color: ${Colors.secondary};
  position: absolute;
  top: 54px;
  left: ${p => (p.isMenuOpen ? 0 : -248)}px;
  animation-name: ${p => (p.isMenuOpen ? slideInAnimation : slideOutAnimation)};
  animation-duration: 0.5s;
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
  color: ${p => (p.isActive ? Colors.active : Colors.white)};
`;

export default Menu;
