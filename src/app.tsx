import styled from "styled-components";
import { ImageFileDragAndDropArea } from "./components/dnd";
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "./components/canvas";

const Header = styled.header`
  border-bottom: 1px solid silver;
  line-height: 20px;
  padding: 10px;
  width: 100vw;
  position: absolute;
  top: 0;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 20px;
`;

const ImageArea = styled.div`
  bottom: 41px;
  overflow: scroll;
  position: absolute;
  top: 41px;
  width: 100vw;
`;

const Footer = styled.footer`
  border-top: 1px solid silver;
  bottom: 0;
  line-height: 24px;
  padding: 8px;
  width: 100vw;
  position: absolute;
`;

export const App = React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return;
    setContext(canvas.getContext("2d"));
  }, [canvasRef.current]);

  useEffect(() => {
    if (context == null || imageFile == null) return;
    const fileReader = new FileReader();
    console.debug(context, imageFile);
    fileReader.addEventListener("load", (event) => {
      console.debug(event);
      const image = new Image();
      image.addEventListener("load", () => {
        console.debug(image)
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(image, 0, 0);
      });
      // @ts-ignore
      image.src = event.target.result;
    });
    fileReader.readAsDataURL(imageFile);
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
        Footer
      </Footer>
    </div>
  );
};
