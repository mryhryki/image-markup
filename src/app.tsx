import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "./components/canvas";
import { drawArrow } from "./drawer/arrow";
import { setMouseEventListener } from "./util/mouse_event";
import { drawImageToCanvas } from "./util/draw_image_to_canvas";
import { fileToDataUrl } from "./util/file_to_data_url";
import { downloadCanvasImage } from "./util/download_canvas_image";
import { Wrapper } from "./components/wrapper";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Colors } from "./components/colors";
import { useHistory } from "./hooks/use_history";
import { History } from "./components/history";
import { drawRectangleBorder } from "./drawer/rectangle_border";
import { Drawer } from "./components/drawer";
import { ButtonWithIcon } from "./components/button_with_icon";

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
  const [rendered, setRendered] = useState(false);
  const [drawer, setDrawer] = useState<Drawer>("arrow");
  const [color, setColor] = useState<string>("default");
  const { canUseHistory, histories, addHistory } = useHistory();

  const canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"));
  const canvas = canvasRef.current;
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(canvas.getContext("2d", { alpha: false }));

  useEffect(() => {
    if (rendered) {
      addHistory(canvas);
    }
  }, [rendered, canvas]);

  useEffect(() => {
    if (context == null) return;
    setMouseEventListener(canvas, (event) => {
      switch (event.type) {
        case "moved":
          switch (drawer) {
            case "arrow":
              drawArrow(context, event.start, event.current, color);
              break;
            case "rectangle_border":
              drawRectangleBorder(context, event.start, event.current, color);
              break;
          }
          addHistory(canvas);
          break;
        case "moving":
          console.debug(event);
      }
    });
  }, [canvas, context, drawer, color]);

  const onImageFileSelected = (imageFile: File): void => {
    if (context == null) return;
    setRendered(true);
    setContext(context);
    fileToDataUrl(imageFile)
      .then((dataUrl) => drawImageToCanvas(dataUrl, canvas, context))
      .then(() => addHistory(canvas));
  };

  return (
    <Wrapper onImageFileDrop={onImageFileSelected}>
      <Header/>
      <Content>
        <Canvas canvasRef={canvasRef} showUploadMessage={!rendered} onImageFileSelected={onImageFileSelected}/>
        {canUseHistory && context != null && (
          <History
            histories={histories}
            onSelect={({ dataUrl }) => {
              drawImageToCanvas(dataUrl, canvas, context)
                .then(() => setRendered(true));
            }}
          />
        )}
      </Content>
      <Footer>
        <FooterGroup>
          <ButtonWithIcon
            alt="download"
            iconName="download"
            onClick={() => downloadCanvasImage(canvas)}
            selected={false}
          />
        </FooterGroup>
        <FooterGroup>
          <Drawer drawer={drawer} setDrawer={setDrawer}/>
        </FooterGroup>
        <FooterGroup>
          <Colors color={color} setColor={setColor}/>
        </FooterGroup>
      </Footer>
    </Wrapper>
  );
};
