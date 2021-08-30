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
      {Drawers.map((d) => {
        const selected = d === drawer;
        if (d === "text" && selected) {
          return (
            <>
              <ButtonWithIcon alt={d} iconName={drawer} onClick={() => setDrawer(d)} selected={selected}/>
              <TextInput value={text} onChange={(event) => setText(event.target.value)} placeholder="Annotation Text"/>
            </>
          );
        }
        return (
          <ButtonWithIcon
            key={d}
            alt={drawer}
            iconName={d}
            onClick={() => setDrawer(d)}
            selected={selected}
          />
        );
      })}
    </>
  );
};
