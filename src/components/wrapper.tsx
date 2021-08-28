import React from "react";
import styled from "styled-components";
import { PermitFileType } from "../util/select_image_file";

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

interface Props {
  onImageFileDrop: (file: File) => void;
  children: React.ReactNode;
}

export const Wrapper: React.FC<Props> = (props) => {
  const { onImageFileDrop, children } = props;

  return (
    <StyledWrapper
      onDragOver={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();
        const file = event.dataTransfer.files.item(0);
        if (file == null) {
          return;
        } else if (!PermitFileType.includes(file.type)) {
          return;
        }
        onImageFileDrop(file);
      }}
    >
      {children}
    </StyledWrapper>
  );
};
