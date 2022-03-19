import React, { useEffect } from "react";
import { IconButton } from "./icon_button";
import styled from "styled-components";

export type DrawerType = "arrow" | "rectangle_border" | "mask" | "text" | "trim";
const Drawers: DrawerType[] = ["arrow", "rectangle_border", "mask", "trim", "text"];

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
      {Drawers.map((drawer) => (
        <IconButton
          iconName={drawer}
          key={drawer}
          onClick={() => setDrawer(drawer)}
          selected={drawer === drawer}
          disabled={false}
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
        disabled={drawer !== "text"}
        value={text}
      />
    </>
  );
};
