import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  border-bottom: 1px solid silver;
  box-sizing: border-box;
  line-height: 20px;
  padding: 10px;
  position: absolute;
  top: 0;
  width: 100vw;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 20px;
`;

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Title>Image Markup</Title>
    </StyledHeader>
  );
};
