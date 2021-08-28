import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "./components/canvas";
import { drawAllow } from "./drawer/allow";
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
import { Button } from "./components/button";

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
`;

export const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [drawer, setDrawer] = useState<Drawer>("allow");
  const [color, setColor] = useState<string>("default");
  const { canUseHistory, histories, addHistory } = useHistory();

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"));
  const canvas = canvasRef.current;
  if (canvas == null) return null;

  useEffect(() => addHistory(canvas), [canvas]);
  useEffect(() => {
    const context = canvas?.getContext("2d", { alpha: false });
    if (context == null || imageFile == null) return;
    setContext(context);
    fileToDataUrl(imageFile)
      .then((dataUrl) => drawImageToCanvas(dataUrl, canvas, context))
      .then(() => addHistory(canvas));
  }, [canvas, imageFile]);

  useEffect(() => {
    if (context == null) return;
    setMouseEventListener(canvas, (event) => {
      switch (event.type) {
        case "moved":
          switch (drawer) {
            case "allow":
              drawAllow(context, event.start, event.current, color);
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

  return (
    <Wrapper onImageFileDrop={setImageFile}>
      <Header/>
      <Content>
        <Canvas canvasRef={canvasRef} showUploadMessage={imageFile == null} onImageFileSelected={setImageFile}/>
        {canUseHistory && context != null && (
          <History
            histories={histories}
            onSelect={({ dataUrl }) => drawImageToCanvas(dataUrl, canvas, context)}
          />
        )}
      </Content>
      <Footer>
        <FooterGroup>
          <Button onClick={() => downloadCanvasImage(canvas)}>⬇️</Button>
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
