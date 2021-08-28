import React, { RefObject } from "react";
import styled from "styled-components";
import { selectImage } from "../util/select_image_file";

const CanvasWrapper = styled.div`
  align-items: center;
  background-color: #f6f6f6;
  border-radius: 2px;
  border: 1px solid silver;
  display: flex;
  flex: 1;
  justify-content: center;
  margin: 4px;
  overflow: hidden;
`;

const Message = styled.div`
  font-size: 20px;
  line-height: 28px;
`;

const UploadImageFileButton = styled.button`
  background: none;
  border: none;
  color: #0000ee;
  display: inline;
  font-size: 20px;
  line-height: 28px;
  padding: 0;
  text-decoration: underline;
`;

const FitCanvas = styled.canvas`
  max-height: 100%;
  object-fit: contain;
  max-width: 100%;
`;

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
  showUploadMessage: boolean;
  onImageFileSelected: (file: File) => void;
}

export const Canvas: React.FC<Props> = (props) => {
  const { canvasRef, showUploadMessage, onImageFileSelected } = props;

  return (
    <CanvasWrapper>
      {showUploadMessage && (
        <Message>
          <p>Drop image file here!</p>
          <p>
            or{" "}
            <UploadImageFileButton onClick={() => selectImage(onImageFileSelected)}>
              select image file.
            </UploadImageFileButton>
          </p>
        </Message>
      )}
      <FitCanvas ref={canvasRef} height={1} width={1}/>
    </CanvasWrapper>
  );
};
