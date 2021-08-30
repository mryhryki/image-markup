import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Canvas } from "./components/canvas";
import { drawArrow } from "./drawer/arrow";
import { setMouseEventListener } from "./util/mouse_event";
import { downloadCanvasImage } from "./util/download_canvas_image";
import { Wrapper } from "./components/wrapper";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Colors } from "./components/colors";
import { useHistory } from "./hooks/use_history";
import { History } from "./components/history";
import { drawRectangleBorder } from "./drawer/rectangle_border";
import { DrawerSelector, DrawerType } from "./components/drawerType";
import { ButtonWithIcon } from "./components/button_with_icon";
import { useCanvas } from "./hooks/use_canvas";

const Content = styled.div`
  position: absolute;
  left: 4px;
  bottom: 44px;
  right: 4px;
  top: 44px;
  align-items: stretch;
  flex-direction: row;
  display: flex;
`;

const FooterGroup = styled.div`
  margin: 0 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const App: React.FC = () => {
  const [drawerType, setDrawerType] = useState<DrawerType>("arrow");
  const [color, setColor] = useState<string>("default");

  const { canvasRef, context, rendered, render, reRender, update } = useCanvas();
  const { canUseHistory, histories, addHistory } = useHistory();

  useEffect(() => {
    setMouseEventListener(context, (event) => {
      switch (event.type) {
        case "moved":
          switch (drawerType) {
            case "arrow":
              drawArrow(context, event.start, event.current, color);
              update();
              addHistory(context);
              break;
            case "rectangle_border":
              drawRectangleBorder(context, event.start, event.current, color);
              update();
              addHistory(context);
              break;
          }
          break;
        case "moving":
          reRender();
          switch (drawerType) {
            case "arrow":
              drawArrow(context, event.start, event.current, color);
              break;
            case "rectangle_border":
              drawRectangleBorder(context, event.start, event.current, color);
              break;
          }
          break;
        case "interruption":
          reRender();
          break;
      }
    });
  }, [context, reRender, drawerType, color, addHistory]);

  return (
    <Wrapper onImageFileDrop={render}>
      <Header/>
      <Content>
        <Canvas canvasRef={canvasRef} showUploadMessage={!rendered} onImageFileSelected={render}/>
        {canUseHistory && (
          <History histories={histories} onSelect={({ dataUrl }) => render(dataUrl)}/>
        )}
      </Content>
      <Footer>
        <FooterGroup>
          <ButtonWithIcon
            alt="download"
            iconName="download"
            onClick={() => downloadCanvasImage(context)}
            selected={false}
          />
        </FooterGroup>
        <FooterGroup>
          <DrawerSelector drawer={drawerType} setDrawer={setDrawerType}/>
        </FooterGroup>
        <FooterGroup>
          <Colors color={color} setColor={setColor}/>
        </FooterGroup>
      </Footer>
    </Wrapper>
  );
};
