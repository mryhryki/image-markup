import React from "react";
import styled from "styled-components";

const DnD = styled.div`
  align-items: center;
  background-color: #ccf;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`

const Message = styled.div`
  font-size: 16px;
  font-weight: bold;
`

interface Props {
  onImageFileDrop: (file: File) => void;
}

export const ImageFileDragAndDropArea: React.FC<Props> = (props) => {
  const { onImageFileDrop } = props;

  return (
    <DnD
      onDragOver={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();
        const file = event.dataTransfer.files.item(0);
        if (file == null) {
          return;
        } else if (!file.type.startsWith("image/")) {
          return;
        }
        onImageFileDrop(file);
      }}
    >
      <Message>
        Drop image file here!
      </Message>
    </DnD>
  );
};
