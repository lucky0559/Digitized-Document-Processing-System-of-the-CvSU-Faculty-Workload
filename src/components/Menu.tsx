import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Colors from "../constants/Colors";
import { UserContext } from "../App";
import { User } from "../types/User";
import { GetAllUserPendingWorkloads } from "../lib/faculty-workload.hooks";

type MenuProps = {
  isFacultySubmenuOpen: boolean;
  facultySubMenuHandler: () => void;
  position?: string;
};

const Menu = ({
  isFacultySubmenuOpen,
  facultySubMenuHandler,
  position
}: MenuProps) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const location = window.location.pathname;
  const {
    user,
    hasPendingTeachingWorkload,
    hasPendingExtensionWorkload,
    hasPendingResearchWorkload,
    hasPendingStrategicWorkload
  } = useContext(UserContext);

  return (
    <Container position={position}>
      {user.role === "System Administrator" && (
        <NavButtonContainer>
          <NavButtonText
            onClick={() => navigate("/accounts", { replace: true })}
            isActive={location === "/accounts"}
          >
            Accounts
          </NavButtonText>
        </NavButtonContainer>
      )}
      {user.role !== "System Administrator" &&
        user.role !== "OVPAA" &&
        user.role !== "Dean" && (
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

            <SubMenuContainer disabled={hasPendingTeachingWorkload}>
              <SubMenuText
                isActive={location === "/teaching-workload"}
                onClick={
                  hasPendingTeachingWorkload
                    ? () => {}
                    : () => navigate("/teaching-workload", { replace: true })
                }
                disabled={hasPendingTeachingWorkload}
              >
                Teaching Workload
              </SubMenuText>
            </SubMenuContainer>
            <SubMenuContainer disabled={hasPendingResearchWorkload}>
              <SubMenuText
                isActive={location === "/research-workload"}
                onClick={
                  hasPendingResearchWorkload
                    ? () => {}
                    : () => navigate("/research-workload", { replace: true })
                }
                disabled={hasPendingResearchWorkload}
              >
                Research Workload
              </SubMenuText>
            </SubMenuContainer>
            <SubMenuContainer disabled={hasPendingExtensionWorkload}>
              <SubMenuText
                isActive={location === "/extension-workload"}
                onClick={
                  hasPendingExtensionWorkload
                    ? () => {}
                    : () => navigate("/extension-workload", { replace: true })
                }
                disabled={hasPendingExtensionWorkload}
              >
                Extension Workload
              </SubMenuText>
            </SubMenuContainer>
            <SubMenuContainer disabled={hasPendingStrategicWorkload}>
              <SubMenuText
                isActive={location === "/strategic-function-workload"}
                onClick={
                  hasPendingStrategicWorkload
                    ? () => {}
                    : () =>
                        navigate("/strategic-function-workload", {
                          replace: true
                        })
                }
                disabled={hasPendingStrategicWorkload}
              >
                Strategic Function
              </SubMenuText>
            </SubMenuContainer>
          </>
        )}

      {user.role === "Department Chairperson" || user.role === "Faculty" ? (
        <NavButtonContainer>
          <NavButtonText
            onClick={() => navigate("/workload-summary", { replace: true })}
            isActive={location === "/workload-summary"}
          >
            Workload Summary
          </NavButtonText>
        </NavButtonContainer>
      ) : null}

      {user.role === "Dean" ||
      user.role === "Department Chairperson" ||
      user.role === "OVPAA" ? (
        <NavButtonContainer>
          <NavButtonText
            onClick={() => navigate("/workload-review", { replace: true })}
            isActive={location === "/workload-review"}
          >
            Workload Review
          </NavButtonText>
        </NavButtonContainer>
      ) : null}

      {user.role === "Dean" ||
      user.role === "Department Chairperson" ||
      user.role === "OVPAA" ||
      user.role === "OVPAA" ? (
        <NavButtonContainer>
          <NavButtonText
            isActive={location === "/reports"}
            onClick={() => navigate("/reports", { replace: true })}
          >
            Reports
          </NavButtonText>
        </NavButtonContainer>
      ) : null}
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

const Container = styled.div<{ position: string | undefined }>`
  width: 248px;
  background-color: ${Colors.secondary};
  position: ${p => (p.position ? "relative" : "fixed")};
  top: 54px;
  height: 100%;
  @media print {
    display: none;
  }
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

const SubMenuContainer = styled.div<{ disabled?: boolean }>`
  border-bottom: 1px solid ${Colors.primary};
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: ${p => (p.disabled ? "auto" : "pointer")};
  opacity: ${p => (p.disabled ? 1 : 0.5)}
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: ${p => (p.disabled ? 1 : 0.5)}
  }
  padding: 0 50px;
`;

const SubMenuText = styled.text<{ isActive: boolean; disabled?: boolean }>`
  font-family: HurmeGeometricSans3;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${p => (p.isActive ? Colors.active : Colors.white)};
  opacity: ${p => (p.disabled ? 0.5 : 1)};
`;

export default Menu;
