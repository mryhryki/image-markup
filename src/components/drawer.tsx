import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "./button";

const DrawersWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export type Drawer = "allow" | "rectangle_border"
const Drawers: Drawer[] = [
  "allow",
  "rectangle_border",
];

const Emoji = {
  allow: "↙️",
  rectangle_border: "🔳️"
}

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
    <DrawersWrapper>
      {Drawers.map((d) => (
        <Button
          key={d}
          onClick={() => setDrawer(d)}
          className={d === drawer ? "selected" : ""}
        >
          {Emoji[d]}
        </Button>
      ))}
    </DrawersWrapper>
  );
};
