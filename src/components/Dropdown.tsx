import { useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";

type DropdownProps = {
  option: string[];
  label?: string;
  onSelect: (option: string) => void;
  val?: string;
  selected?: string[];
};

export default function Dropdown({
  option,
  label,
  selected,
  onSelect,
  val
}: DropdownProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    onSelect(value);
  }, [value]);

  return (
    <Container>
      <Label>{label}</Label>
      <Select
        onChange={e => {
          setValue(e.target.value);
        }}
        style={{ width: "100%" }}
      >
        {option.map((item, index) => {
          return (
            <option
              key={index}
              value={item}
              hidden={
                item === "-----" ||
                item === selected?.[0] ||
                item === selected?.[1] ||
                item === selected?.[2]
              }
              selected={val === item}
            >
              {item}
            </option>
          );
        })}
      </Select>
    </Container>
  );
}

const Container = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
`;

const Select = styled.select`
  width: 186px;
  background-color: ${Colors.textFieldBackground};
`;

const Label = styled.label`
  font-size: 15px;
  font-family: HurmeGeometricSans3;
  font-weight: 400;
`;
