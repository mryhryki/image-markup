import React, { useEffect } from "react";
import styled from "styled-components";
import { ButtonWithIcon } from "./button_with_icon";

export type Drawer = "arrow" | "rectangle_border"
const Drawers: Drawer[] = [
  "arrow",
  "rectangle_border",
];

const Emoji = {
  arrow: "↙️",
  rectangle_border: "🔳️",
};

interface Props {
  drawer: Drawer;
  setDrawer: (drawer: Drawer) => void;
}

export const Drawer: React.FC<Props> = (props) => {
  const { drawer, setDrawer } = props;

  useEffect(() => {
    if (!Drawers.includes(drawer)) {
      setDrawer(Drawers[0]);
    }
  }, [drawer]);

  return (
    <>
      {Drawers.map((d) => (
        <ButtonWithIcon alt={drawer} iconName={d} onClick={() => setDrawer(d)} selected={d === drawer}/>
      ))}
    </>
  );
};
