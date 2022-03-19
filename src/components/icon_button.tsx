import React from "react";
import styled from "styled-components";

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

const Image = styled.img<{ disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  width: 20px;
  height: 20px;
`;

interface Props {
  iconName: string;
  onClick: () => void;
  selected: boolean;
  disabled: boolean;
}

export const IconButton: React.FC<Props> = (props) => {
  const { onClick, iconName, selected, disabled } = props;

  return (
    <Button onClick={onClick} className={selected ? "selected" : ""} disabled={disabled}>
      <Image disabled={disabled} alt={iconName} src={`/icon/${iconName}.jpeg`} />
    </Button>
  );
};
