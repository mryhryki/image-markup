import styled from "styled-components";
import { ImageFileDragAndDropArea } from "./components/dnd";
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "./components/canvas";
import { drawAllow } from "./components/draw/allow";
import { setMouseEventListener } from "./util/mouse_event";

const Header = styled.header`
  border-bottom: 1px solid silver;
  box-sizing: border-box;
  line-height: 20px;
  padding: 10px;
  position: absolute;
  top: 0;
  width: 100vw;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 20px;
`;

const ImageArea = styled.div`
  bottom: 40px;
  overflow: hidden;
  position: absolute;
  top: 40px;
  width: 100vw;
`;

const Footer = styled.footer`
  border-top: 1px solid silver;
  bottom: 0;
  box-sizing: border-box;
  line-height: 24px;
  max-height: 40px;
  padding: 8px;
  width: 100vw;
  position: absolute;
`;

const Button = styled.button`
  border-radius: 2px;
  border: 1px solid silver;
  font-size: 22px;
  height: 24px;
  line-height: 24px;
  min-width: 24px;
  text-align: center;
  margin: 0 8px;
`;

export const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null || imageFile == null) return;
    const fileReader = new FileReader();
    const context = canvas.getContext("2d");
    if (context == null) return;
    setContext(context);

    fileReader.addEventListener("load", (event) => {
      const image = new Image();
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
      };
      image.addEventListener("load", () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(image, 0, 0);
      });
      const src = event.target?.result ?? "";
      if (typeof src === "string") {
        image.src = src;
      }
    });
    fileReader.readAsDataURL(imageFile);
    setMouseEventListener(canvas, (event) => {
      switch (event.type) {
        case "moved":
          drawAllow(context, event.start, event.current);
          break;
        case "moving":
          console.debug(event);
      }
    });
  }, [context, imageFile]);

  return (
    <div>
      <Header>
        <Title>Image Editor</Title>
      </Header>
      <ImageArea>
        {imageFile == null ? (
          <ImageFileDragAndDropArea onImageFileDrop={setImageFile}/>
        ) : null}
        <Canvas canvasRef={canvasRef}/>
      </ImageArea>
      <Footer>
        <Button /* TODO */>🔙</Button>
        <Button
          onClick={() => {
            const canvas = canvasRef.current;
            if (canvas == null) return;
            const dataUrl = canvas.toDataURL("image/jpeg");
            const anchor = document.createElement("a");
            anchor.href = dataUrl;
            anchor.download = "image.jpg";
            anchor.click();
          }}
        >
          ⬇
          ️</Button>
      </Footer>
    </div>
  );
};
