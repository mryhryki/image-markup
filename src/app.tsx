import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonWithIcon } from "./components/button_with_icon";
import { Canvas } from "./components/canvas";
import { ColorSelector } from "./components/color_selector";
import { DrawerSelector, DrawerType } from "./components/drawer_selector";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { History } from "./components/history";
import { Wrapper } from "./components/wrapper";
import { downloadCanvasImage } from "./util/download_canvas_image";
import { drawArrow } from "./drawer/arrow";
import { drawRectangleBorder } from "./drawer/rectangle_border";
import { fileToDataUrl } from "./util/file_to_data_url";
import { setMouseEventListener } from "./util/mouse_event";
import { useCanvas } from "./hooks/use_canvas";
import { useHistory } from "./hooks/use_history";
import { drawText } from "./drawer/text";

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
  const [color, setColor] = useState("default");
  const [text, setText] = useState("");

  const { canvasRef, context, rendered, render, reRender, update } = useCanvas();
  const { canUseHistory, histories, addHistory } = useHistory();

  useEffect(() => {
    setMouseEventListener(context, (event) => {
      reRender();
      switch (event.type) {
        case "moved":
          switch (drawerType) {
            case "arrow":
              drawArrow(context, event.start, event.current, color);
              break;
            case "rectangle_border":
              drawRectangleBorder(context, event.start, event.current, color);
              break;
            case "text":
              if (text.trim().length === 0) return;
              drawText(context, event.current, text, color);
              break;
            default:
              return;
          }
          update();
          addHistory(context.canvas.toDataURL("image/png"));
          break;
        case "moving":
          switch (drawerType) {
            case "arrow":
              drawArrow(context, event.start, event.current, color);
              break;
            case "rectangle_border":
              drawRectangleBorder(context, event.start, event.current, color);
              break;
            case "text":
              drawText(context, event.current, text, color);
              break;
          }
          break;
      }
    });
  }, [context, reRender, drawerType, text, color, addHistory]);

  const onImageFileSelected = (imageFile: File): void => {
    fileToDataUrl(imageFile)
      .then((imageDataUrl) => {
        render(imageDataUrl);
        addHistory(imageDataUrl);
      });
  };

  return (
    <Wrapper onImageFileDrop={onImageFileSelected}>
      <Header/>
      <Content>
        <Canvas
          canvasRef={canvasRef}
          showUploadMessage={!rendered}
          onImageFileSelected={onImageFileSelected}
        />
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
          <DrawerSelector drawer={drawerType} setDrawer={setDrawerType} setText={setText} text={text}/>
        </FooterGroup>
        <FooterGroup>
          <ColorSelector color={color} setColor={setColor}/>
        </FooterGroup>
      </Footer>
    </Wrapper>
  );
};
