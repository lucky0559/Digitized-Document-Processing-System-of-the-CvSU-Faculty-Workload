import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Colors from "../constants/Colors";

const Menu = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const location = window.location.pathname;
  return (
    <Container>
      <NavButtonContainer>
        <NavButtonText
          isActive={location === "/teaching-workload"}
          onClick={() => navigate("/teaching-workload", { replace: true })}
        >
          Teaching Workload
        </NavButtonText>
      </NavButtonContainer>
      <NavButtonContainer>
        <NavButtonText
          isActive={location === "/research-workload"}
          onClick={() => navigate("/research-workload", { replace: true })}
        >
          Research Workload
        </NavButtonText>
      </NavButtonContainer>
      <NavButtonContainer>
        <NavButtonText
          isActive={location === "/extension-workload"}
          onClick={() => navigate("/extension-workload", { replace: true })}
        >
          Extension Workload
        </NavButtonText>
      </NavButtonContainer>
      <NavButtonContainer>
        <NavButtonText
          isActive={location === "/strategic-function-workload"}
          onClick={() =>
            navigate("/strategic-function-workload", { replace: true })
          }
        >
          Strategic Function Workload
        </NavButtonText>
      </NavButtonContainer>
      {userRole !== "System Administrator" && (
        <NavButtonContainer>
          <NavButtonText
            onClick={() => navigate("/workload-review", { replace: true })}
            isActive={location === "/workload-review"}
          >
            Workload Review
          </NavButtonText>
        </NavButtonContainer>
      )}

      <NavButtonContainer>
        <NavButtonText
          isActive={location === "/reports"}
          onClick={() => navigate("/reports", { replace: true })}
        >
          Reports
        </NavButtonText>
      </NavButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 248px;
  height: calc(100% - 54px);
  background-color: ${Colors.secondary};
  position: absolute;
  top: 54px;
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
  font-size: 19px;
  line-height: 20px;
  color: ${p => (p.isActive ? Colors.active : Colors.white)};
`;

export default Menu;
