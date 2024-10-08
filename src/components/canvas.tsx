import type React from "react";
import { useState } from "react";
import styled from "styled-components";
import { PermitFileType } from "../util/config";

const CanvasWrapper = styled.button`
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

const LikeClickableText = styled.span`
  color: #0000ee;
  text-decoration: underline;
`;

const FitCanvas = styled.canvas`
  max-height: 100%;
  object-fit: contain;
  max-width: 100%;
`;

const DummyInputFile = styled.input`
  max-width: 1px;
  max-height: 1px;
  position: fixed;
  display: block;
  bottom: -1px;
  right: -1px;
`;

interface Props {
  setCanvasRef: (ref: HTMLCanvasElement) => void;
  showUploadMessage: boolean;
  onImageFileSelected: (file: File) => void;
}

export const Canvas: React.FC<Props> = (props) => {
  const { setCanvasRef, showUploadMessage, onImageFileSelected } = props;
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  return (
    <CanvasWrapper
      onClick={showUploadMessage ? () => inputRef?.click() : undefined}
    >
      {showUploadMessage && (
        <Message>
          <p>Drop or paste image file here!</p>
          <p>
            Or{" "}
            <LikeClickableText>
              click this area and select image file.
            </LikeClickableText>
          </p>
        </Message>
      )}
      <FitCanvas ref={setCanvasRef} height={1} width={1} />
      <DummyInputFile
        type="file"
        ref={setInputRef}
        accept={PermitFileType.join(",")}
        multiple={false}
        onChange={(event) => {
          event.preventDefault();
          if (inputRef?.files != null && inputRef.files.length > 0) {
            const file = inputRef.files.item(0);
            if (file != null) {
              onImageFileSelected(file);
            }
          }
        }}
      />
    </CanvasWrapper>
  );
};
