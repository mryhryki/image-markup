import styled from "styled-components";

export const Button = styled.button`
  border-radius: 2px;
  border: 1px solid silver;
  font-size: 20px;
  height: 24px;
  padding: 0;
  line-height: 24px;
  margin: 0 4px;
  min-width: 24px;
  position: relative;
  text-align: center;
  width: 24px;

  &.selected:after {
    border-color: white;
    border-style: solid;
    border-width: 0 0 4px 4px;
    content: " ";
    height: 6px;
    left: 4px;
    position: absolute;
    top: 5px;
    transform: rotate(-45deg);
    width: 12px;
  }
`;

