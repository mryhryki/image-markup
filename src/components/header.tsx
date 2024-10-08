import type React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  border-bottom: 1px solid silver;
  box-sizing: border-box;
  line-height: 20px;
  padding: 0;
  position: absolute;
  top: 0;
  width: 100vw;
`;

const Logo = styled.img`
  border-radius: 2px;
  height: 36px;
  width: 36px;
  margin: 4px 8px 4px 4px;
`;

const Title = styled.h1`
  margin: 10px 8px;
  padding: 0;
  font-size: 20px;
`;

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Logo height="36" width="36" src="./logo_96x96.png" alt="Logo" />
      <Title>Image Markup</Title>
    </StyledHeader>
  );
};
