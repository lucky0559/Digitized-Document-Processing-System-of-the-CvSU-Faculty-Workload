import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Colors from "../constants/Colors";

type MenuProps = {
  isFacultySubmenuOpen: boolean;
  facultySubMenuHandler: () => void;
};

const Menu = ({ isFacultySubmenuOpen, facultySubMenuHandler }: MenuProps) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const location = window.location.pathname;

  return (
    <Container>
      {userRole === "System Administrator" && (
        <NavButtonContainer>
          <NavButtonText
            onClick={() => navigate("/accounts", { replace: true })}
            isActive={location === "/accounts"}
          >
            Accounts
          </NavButtonText>
        </NavButtonContainer>
      )}
      {userRole !== "System Administrator" && (
        <>
          <NavButtonContainer onClick={facultySubMenuHandler}>
            <NavButtonText
              isActive={
                location === "/teaching-workload" ||
                location === "/research-workload" ||
                location === "/extension-workload" ||
                location === "/strategic-function-workload"
              }
            >
              Faculty Workload
            </NavButtonText>
          </NavButtonContainer>

          {isFacultySubmenuOpen && (
            <>
              <SubMenuContainer>
                <SubMenuText
                  isActive={location === "/teaching-workload"}
                  onClick={() =>
                    navigate("/teaching-workload", { replace: true })
                  }
                >
                  Teaching Workload
                </SubMenuText>
              </SubMenuContainer>
              <SubMenuContainer>
                <SubMenuText
                  isActive={location === "/research-workload"}
                  onClick={() =>
                    navigate("/research-workload", { replace: true })
                  }
                >
                  Research Workload
                </SubMenuText>
              </SubMenuContainer>
              <SubMenuContainer>
                <SubMenuText
                  isActive={location === "/extension-workload"}
                  onClick={() =>
                    navigate("/extension-workload", { replace: true })
                  }
                >
                  Extension Workload
                </SubMenuText>
              </SubMenuContainer>
              <SubMenuContainer>
                <SubMenuText
                  isActive={location === "/strategic-function-workload"}
                  onClick={() =>
                    navigate("/strategic-function-workload", { replace: true })
                  }
                >
                  Strategic Function Workload
                </SubMenuText>
              </SubMenuContainer>
            </>
          )}

          <NavButtonContainer>
            <NavButtonText
              onClick={() => navigate("/workload-review", { replace: true })}
              isActive={location === "/workload-review"}
            >
              Workload Review
            </NavButtonText>
          </NavButtonContainer>
        </>
      )}

      {userRole === "Dean" ||
        userRole === "Department Chairperson" ||
        (userRole === "OVPAA" && (
          <NavButtonContainer>
            <NavButtonText
              isActive={location === "/reports"}
              onClick={() => navigate("/reports", { replace: true })}
            >
              Reports
            </NavButtonText>
          </NavButtonContainer>
        ))}
    </Container>
  );
};

// const slideInAnimation = keyframes`
//  0% { top: -54px }
//  100% { top: 54px; }
//  `;

// const slideOutAnimation = keyframes`
//  0% { top: 54px }
//  100% { top: -54px; }
//  `;

const Container = styled.div`
  width: 248px;
  background-color: ${Colors.secondary};
  position: fixed;
  top: 54px;
  height: ${window.outerHeight}px;
`;

const NavButtonContainer = styled.div`
  border-bottom: 1px solid ${Colors.primary};
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.6;
  }
  padding: 0 20px;
`;

const NavButtonText = styled.text<{ isActive: boolean }>`
  font-family: HurmeGeometricSans3;
  font-weight: 600;
  font-size: 19px;
  line-height: 20px;
  color: ${p => (p.isActive ? Colors.active : Colors.white)};
`;

// const SubMenuParent = styled.div<{ isFacultySubmenuOpen: boolean }>`
//   top: ${p => (p.isFacultySubmenuOpen ? 54 : -248)}px;
//   animation-name: ${p =>
//     p.isFacultySubmenuOpen ? slideInAnimation : slideOutAnimation};
//   animation-duration: 0.5s;
//   align-self: flex-end;
// `;

const SubMenuContainer = styled.div`
  border-bottom: 1px solid ${Colors.primary};
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.6;
  }
  padding: 0 50px;
`;

const SubMenuText = styled.text<{ isActive: boolean }>`
  font-family: HurmeGeometricSans3;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${p => (p.isActive ? Colors.active : Colors.white)};
`;

export default Menu;
