import React, { useEffect } from "react";
import styled from "styled-components";

export const ButtonColor = styled.button`
  border: none;
  border-radius: 2px;
  font-size: 20px;
  height: 24px;
  padding: 0;
  line-height: 24px;
  margin: 0 4px;
  min-width: 24px;
  position: relative;
  text-align: center;
  width: 24px;

  &.selected:after {
    border-color: white;
    border-style: solid;
    border-width: 0 0 4px 4px;
    content: " ";
    height: 6px;
    left: 4px;
    position: absolute;
    top: 5px;
    transform: rotate(-45deg);
    width: 12px;
  }
`;

const color_selector: string[] = ["#ff0000", "#EDAD0B", "#00993D", "#0066FF"];

interface Props {
  color: string;
  setColor: (color: string) => void;
}

export const ColorSelector: React.FC<Props> = (props) => {
  const { color, setColor } = props;

  useEffect(() => {
    if (!color_selector.includes(color)) {
      setColor(color_selector[0]);
    }
  }, [color]);

  return (
    <>
      {color_selector.map((c) => (
        <ButtonColor
          key={c}
          style={{ backgroundColor: c }}
          onClick={() => setColor(c)}
          className={c === color ? "selected" : ""}
        >
          {" "}
        </ButtonColor>
      ))}
    </>
  );
};
