import React, { useEffect } from "react";
import styled from "styled-components";

const ColorSelector = styled.button`
  height: 24px;
  width: 24px;
  margin: 0 4px;
  border: none;
`;

const colors: string[] = [
  "#ff0033",
  "#00ff33",
  "#3300ff",
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
    <>
      {colors.map((color) => (
        <ColorSelector key={color} style={{ backgroundColor: color }} onClick={() => setColor(color)}>
          {" "}
        </ColorSelector>
      ))}
    </>
  );
};
