import React, { useEffect } from "react";
import { ButtonWithIcon } from "./button_with_icon";

export type DrawerType = "arrow" | "rectangle_border" | "text"
const Drawers: DrawerType[] = [
  "arrow",
  "rectangle_border",
  "text"
];

interface Props {
  drawer: DrawerType;
  setDrawer: (drawer: DrawerType) => void;
}

export const DrawerSelector: React.FC<Props> = (props) => {
  const { drawer, setDrawer } = props;

  useEffect(() => {
    if (!Drawers.includes(drawer)) {
      setDrawer(Drawers[0]);
    }
  }, [drawer]);

  return (
    <>
      {Drawers.map((d) => (
        <ButtonWithIcon key={d} alt={drawer} iconName={d} onClick={() => setDrawer(d)} selected={d === drawer}/>
      ))}
    </>
  );
};
