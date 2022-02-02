import React from "react";
import styled from "styled-components";
// @ts-ignore
import ArrowIcon from "../icon/arrow.jpeg";
// @ts-ignore
import RectangleBorderIcon from "../icon/rectangle_border.jpeg";
// @ts-ignore
import DownloadIcon from "../icon/download.jpeg";
// @ts-ignore
import MaskIcon from "../icon/mask.jpeg";
// @ts-ignore
import TextIcon from "../icon/text.jpeg";
// @ts-ignore
import TrimIcon from "../icon/trim.jpeg";

export const Button = styled.button`
  border-radius: 2px;
  border: 1px solid silver;
  height: 24px;
  padding: 0;
  line-height: 24px;
  margin: 0 4px;
  min-width: 24px;
  position: relative;
  text-align: center;
  width: 24px;

  &.selected {
    border: 2px solid red;
  }
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
`;

const getImage = (iconName: string): string => {
  switch (iconName) {
    case "arrow":
      return ArrowIcon;
    case "rectangle_border":
      return RectangleBorderIcon;
    case "download":
      return DownloadIcon;
    case "mask":
      return MaskIcon;
    case "text":
      return TextIcon;
    case "trim":
      return TrimIcon;
  }
  return "";
};

interface Props {
  alt: string;
  iconName: string;
  onClick: () => void;
  selected: boolean;
}

export const ButtonWithIcon: React.FC<Props> = (props) => {
  const { onClick, alt, iconName, selected } = props;

  return (
    <Button onClick={onClick} className={selected ? "selected" : ""}>
      <Image alt={alt} src={getImage(iconName)}/>
    </Button>
  );
};

