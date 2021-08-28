import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "./button";

const ColorsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const colors: string[] = [
  "#ff0000",
  "#EDAD0B",
  "#00993D",
  "#0066FF",
];

interface Props {
  color: string;
  setColor: (color: string) => void;
}

export const Colors: React.FC<Props> = (props) => {
  const { color, setColor } = props;

  useEffect(() => {
    if (!colors.includes(color)) {
      setColor(colors[0]);
    }
  }, [color]);

  return (
    <ColorsWrapper>
      {colors.map((c) => (
        <Button
          key={c}
          style={{ backgroundColor: c }}
          onClick={() => setColor(c)}
          className={c === color ? "selected" : ""}
        >
          {" "}
        </Button>
      ))}
    </ColorsWrapper>
  );
};
