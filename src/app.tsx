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
import { setUserActionEventListener } from "./util/user_action_event";
import { useCanvas } from "./hooks/use_canvas";
import { useHistory } from "./hooks/use_history";
import { drawText } from "./drawer/text";
import { drawMask } from "./drawer/mask";
import { useStateWithStorage } from "./hooks/use_state_with_storage";
import { trim } from "./drawer/trim";

const Content = styled.div`
  align-items: stretch;
  bottom: 44px;
  display: flex;
  flex-direction: row;
  left: 4px;
  position: absolute;
  right: 8px;
  top: 48px;
`;

const FooterGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 0 8px;
`;

export const App: React.FC = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [drawerType, setDrawerType] = useStateWithStorage<DrawerType>("drawer_type", "arrow");
  const [color, setColor] = useStateWithStorage<string>("color", "default");
  const [text, setText] = useStateWithStorage<string>("text", "");

  const { setCanvasRef, context, render } = useCanvas();
  const { canUseHistory, histories, addHistory } = useHistory();

  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (currentImageUrl == null) return;
    render(currentImageUrl);
  }, [currentImageUrl]);

  useEffect(() => {
    if (ref == null || context == null || currentImageUrl == null) return;
    setUserActionEventListener(ref, context, async (event): Promise<void> => {
      await render(currentImageUrl);
      switch (event.type) {
        case "start":
          // Do nothing
          break;
        case "moving":
          switch (drawerType) {
            case "arrow":
              drawArrow(context, event.start, event.current, color);
              break;
            case "rectangle_border":
              drawRectangleBorder(context, event.start, event.current, { color });
              break;
            case "mask":
              drawMask(context, event.start, event.current);
              break;
            case "text":
              drawText(context, event.current, text, color);
              break;
            case "trim":
              drawRectangleBorder(context, event.start, event.current, {
                color: "#999999",
                lineWidth: 2,
                lineDashSegments: [5, 5],
              });
              break;
          }
          break;
        case "moved":
          switch (drawerType) {
            case "arrow":
              drawArrow(context, event.start, event.current, color);
              break;
            case "rectangle_border":
              drawRectangleBorder(context, event.start, event.current, { color });
              break;
            case "mask":
              drawMask(context, event.start, event.current);
              break;
            case "text":
              if (text.trim().length === 0) return;
              drawText(context, event.current, text, color);
              break;
            case "trim":
              await trim(context, event.start, event.current);
              break;
            default:
              return;
          }
          const newImageUrl = context.canvas.toDataURL("image/png");
          setCurrentImageUrl(newImageUrl);
          await addHistory(newImageUrl);
          break;
        case "canceled":
          // Do nothing
          break;
      }
    });
  }, [ref, context, currentImageUrl, drawerType, text, color, addHistory]);

  const onImageFileSelected = (imageFile: File): void => {
    (async () => {
      const imageDataUrl = await fileToDataUrl(imageFile);
      setCurrentImageUrl(imageDataUrl);
      await addHistory(imageDataUrl);
    })();
  };

  return (
    <Wrapper onImageFileDrop={onImageFileSelected}>
      <Header />
      <Content ref={setRef}>
        <Canvas
          setCanvasRef={setCanvasRef}
          showUploadMessage={currentImageUrl == null}
          onImageFileSelected={onImageFileSelected}
        />
        {canUseHistory && <History histories={histories} onSelect={({ dataUrl }) => setCurrentImageUrl(dataUrl)} />}
      </Content>
      <Footer>
        <FooterGroup>
          <ButtonWithIcon
            alt="download"
            iconName="download"
            onClick={() => context != null && downloadCanvasImage(context)}
            selected={false}
            disabled={currentImageUrl == null}
          />
        </FooterGroup>
        <FooterGroup>
          <DrawerSelector drawer={drawerType} setDrawer={setDrawerType} setText={setText} text={text} />
        </FooterGroup>
        <FooterGroup>
          <ColorSelector color={color} setColor={setColor} />
        </FooterGroup>
        <FooterGroup>
          <a href="https://github.com/mryhryki/image-markup" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </FooterGroup>
      </Footer>
    </Wrapper>
  );
};
