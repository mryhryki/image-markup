import React, { useEffect } from "react";
import { ButtonWithIcon } from "./button_with_icon";
import styled from "styled-components";

export type DrawerType = "arrow" | "rectangle_border" | "text"
const Drawers: DrawerType[] = [
  "arrow",
  "rectangle_border",
  "text",
];

const TextInput = styled.input`
  border-color: silver;
  border-style: solid;
  border-width: 0 0 1px 0;
  height: 20px;
  line-height: 20px;
  padding: 0 4px;
  width: 10rem;
`;

interface Props {
  drawer: DrawerType;
  setDrawer: (drawer: DrawerType) => void;
  setText: (text: string) => void;
  text: string;
}

export const DrawerSelector: React.FC<Props> = (props) => {
  const { drawer, setDrawer, setText, text } = props;

  useEffect(() => {
    if (!Drawers.includes(drawer)) {
      setDrawer(Drawers[0]);
    }
  }, [drawer]);

  return (
    <>
      {Drawers.map((d) => (
        <ButtonWithIcon
          alt={drawer}
          iconName={d}
          key={d}
          onClick={() => setDrawer(d)}
          selected={d === drawer}
        />
      ))}
      <TextInput
        onChange={(event) => {
          if (drawer !== "text") {
            setDrawer("text");
          }
          setText(event.target.value);
        }}
        placeholder="draw text"
        value={text}
      />
    </>
  );
};
