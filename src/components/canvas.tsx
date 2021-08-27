import React, { RefObject } from "react";
import styled from "styled-components";

const FitCanvas = styled.canvas`
  height: 100%;
  object-fit: contain;
  width: 100%;
`

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
}

export const Canvas: React.FC<Props> = (props) => {
  const { canvasRef } = props;

  return <FitCanvas ref={canvasRef} />;
};
