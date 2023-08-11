import React from "react";
import styled from "styled-components";

type DesignationExtensionActivityProps = {
  onChangeValueCheckbox: (checked: boolean, value: string) => void;
};

const DesignationExtensionActivity = ({
  onChangeValueCheckbox
}: DesignationExtensionActivityProps) => {
  return (
    <Container>
      <Table>
        <tr>
          <Th>Designation</Th>
          <Th>Success Indicator</Th>
          <Th>Equivalent Point</Th>
          {/* <Th>Earned Point</Th> */}
        </tr>
        <tr>
          <Td>
            <Checkbox
              type="checkbox"
              value={"Project Leader"}
              onChange={e =>
                onChangeValueCheckbox(e.target.checked, "Project Leader")
              }
            />
            Project Leader
          </Td>
          <Td>
            <ul>
              <Li>Prepared proposal, course design and MOA</Li>
              <Li>
                Managed the over-all implementation of the extension program
              </Li>
            </ul>
          </Td>
          <Td>3</Td>
        </tr>
        <tr>
          <Td>
            <Checkbox
              type="checkbox"
              value={"Project Coordinator"}
              onChange={e =>
                onChangeValueCheckbox(e.target.checked, "Project Coordinator")
              }
            />
            Project Coordinator
          </Td>
          <Td>
            <ul>
              <Li>Performed resource mobilization</Li>
              <Li>Prepared program and invitation</Li>
              <Li>
                Communicates and established agreement with resource person and
                participants
              </Li>
              <Li>
                Screens/evaluates/recommends
                participants/beneficiaries/clienteles
              </Li>
            </ul>
          </Td>
          <Td>2.5</Td>
        </tr>
        <tr>
          <Td>
            <Checkbox
              type="checkbox"
              value={"Project Facilitator"}
              onChange={e =>
                onChangeValueCheckbox(e.target.checked, "Project Facilitator")
              }
            />
            Project Facilitator
          </Td>
          <Td>
            <ul>
              <Li>Handled session proper</Li>
              <Li>
                Conducted cliniquing/consultative session after each activity
              </Li>
              <Li>Conducted monitoring and evaluation</Li>
            </ul>
          </Td>
          <Td>2</Td>
        </tr>
        <tr>
          <Td>
            <Checkbox
              type="checkbox"
              value={"Project Assistants"}
              onChange={e =>
                onChangeValueCheckbox(e.target.checked, "Project Assistants")
              }
            />
            Project Assistants
          </Td>
          <Td>
            Performed the following:
            <ul>
              <Li>
                Administrative arrangements(correspondence, venue, logistics)
              </Li>
              <Li>Participants/resource person profile preparation</Li>
              <Li>Documentation/terminal report preparation</Li>
            </ul>
          </Td>
          <Td>1</Td>
        </tr>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: auto;
`;

const Td = styled.td`
  border: 1px solid black;
  padding: 8px;
  line-height: 20px;
  font-family: HurmeGeometricSans3;
`;

const Th = styled.th`
  border: 1px solid black;
  padding: 8px;
  line-height: 20px;
  font-family: HurmeGeometricSans3;
`;

const Li = styled.li`
  line-height: 20px;
  font-family: HurmeGeometricSans3;
`;

const Checkbox = styled.input``;

export default DesignationExtensionActivity;
