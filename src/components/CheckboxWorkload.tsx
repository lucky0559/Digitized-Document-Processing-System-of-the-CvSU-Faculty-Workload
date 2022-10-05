import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";

function CheckboxWorkload() {
  const [isApproved, setIsApproved] = useState(false);
  const [remarks, setRemarks] = useState("");
  return (
    <Container>
      <CheckboxContainer
        isSelected={isApproved}
        onClick={() => setIsApproved(!isApproved)}
      />
      <TdStyle>
        <RemarksInput
          disabled={isApproved}
          placeholder="Remarks"
          onChange={e => setRemarks(e.target.value)}
          value={remarks}
        />
      </TdStyle>
      <ViewAndSubmitContainer>
        <ButtonView>View Attached File</ButtonView>
        <ButtonSubmit
          disabled={!isApproved && remarks.length === 0}
          onClick={() => console.log(remarks)}
        >
          Submit
        </ButtonSubmit>
      </ViewAndSubmitContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CheckboxContainer = styled.div<{ isSelected: boolean }>`
  border: 1px solid black;
  min-width: 12px;
  min-height: 12px;
  max-width: 20px;
  max-height: 12px;
  margin-right: 5px;
  cursor: pointer;
  background-color: ${p => (p.isSelected ? Colors.active : "none")};
  transition: opacity 0.1s ease-in-out;
  &:hover {
    opacity: 0.3;
  }
`;

const TdStyle = styled.td`
  text-align: center;
  padding-left: 15px;
`;

const ViewAndSubmitContainer = styled.div`
  display: flex;
  position: absolute;
  top: -10;
  margin-left: 600px;
`;

const RemarksInput = styled.input``;

const ButtonView = styled.button`
  width: 150px;
  height: 30px;
  background-color: ${Colors.active};
  margin-left: 20px;
  color: white;
  font-family: HurmeGeometricSans3;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
`;

const ButtonSubmit = styled.button<{ disabled: boolean }>`
  width: 150px;
  height: 30px;
  background-color: ${Colors.active};
  margin-left: 20px;
  color: white;
  font-family: HurmeGeometricSans3;
  cursor: ${p => (p.disabled ? "auto" : "pointer")};
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
  opacity: ${p => (p.disabled ? 0.7 : 1)};
`;

export default CheckboxWorkload;
