import type React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { IconButton } from "./icon_button";

export type DrawerType =
  | "arrow"
  | "rectangle_border"
  | "mask"
  | "text"
  | "trim";
const Drawers: DrawerType[] = [
  "arrow",
  "rectangle_border",
  "mask",
  "trim",
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
  selectedDrawer: DrawerType;
  setDrawer: (drawer: DrawerType) => void;
  setText: (text: string) => void;
  text: string;
}

export const DrawerSelector: React.FC<Props> = (props) => {
  const { selectedDrawer, setDrawer, setText, text } = props;

  useEffect(() => {
    if (!Drawers.includes(selectedDrawer)) {
      setDrawer(Drawers[0]);
    }
  }, [setDrawer, selectedDrawer]);

  return (
    <>
      {Drawers.map((drawer) => (
        <IconButton
          iconName={drawer}
          key={drawer}
          onClick={() => setDrawer(drawer)}
          selected={drawer === selectedDrawer}
          disabled={false}
        />
      ))}
      <TextInput
        onChange={(event) => {
          if (selectedDrawer !== "text") {
            setDrawer("text");
          }
          setText(event.target.value);
        }}
        placeholder="draw text"
        disabled={selectedDrawer !== "text"}
        value={text}
      />
    </>
  );
};
