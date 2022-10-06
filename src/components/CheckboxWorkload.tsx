import React, { useState } from "react";
import styled from "styled-components";

import Colors from "../constants/Colors";

type CheckboxWorkloadProps = {
  twlFilePath?: string;
  rwlFilePath?: string;
  rwlFilePath1?: string;
  rwlFilePath2?: string;
  workloadType?: string;
  extensionActivityFilePath?: string;
  certificateFilePath?: string;
  summaryOfHoursFilePath?: string;
};

function CheckboxWorkload({
  twlFilePath,
  rwlFilePath,
  rwlFilePath1,
  rwlFilePath2,
  workloadType,
  extensionActivityFilePath,
  certificateFilePath,
  summaryOfHoursFilePath
}: CheckboxWorkloadProps) {
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
        {workloadType === "Teaching Workload" ? (
          <ButtonView onClick={() => window.open(twlFilePath)}>
            View Attached Class Schedule
          </ButtonView>
        ) : workloadType === "Research Workload" ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {rwlFilePath ? (
              <ButtonView onClick={() => window.open(rwlFilePath)}>
                View Attached Proposal/Progress Report
              </ButtonView>
            ) : (
              <>
                <ButtonView onClick={() => window.open(rwlFilePath1)}>
                  View Attached Proposal/Progress Report
                </ButtonView>
                <ButtonView onClick={() => window.open(rwlFilePath2)}>
                  View Attached Certificate of Presentation
                </ButtonView>
              </>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ButtonView onClick={() => window.open(extensionActivityFilePath)}>
              View Attached Extension Activity
            </ButtonView>
            <ButtonView onClick={() => window.open(certificateFilePath)}>
              View Attached Certificate
            </ButtonView>
            <ButtonView onClick={() => window.open(summaryOfHoursFilePath)}>
              View Attached Summary of Hours
            </ButtonView>
          </div>
        )}

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
  font-size: 10px;
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
