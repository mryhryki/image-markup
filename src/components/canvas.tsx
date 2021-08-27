import React, { RefObject } from "react";

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
}

export const Canvas: React.FC<Props> = (props) => {
  const { canvasRef } = props;

  return <canvas ref={canvasRef} width={1000} height={1000}/>;
};
