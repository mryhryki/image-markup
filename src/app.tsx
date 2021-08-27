import React from "react";
import styled from 'styled-components'
import { ImageFileDragAndDropArea } from "./components/dnd";

const Header = styled.header`
  border-bottom: 1px solid silver;
  line-height: 20px;
  padding: 10px;
  width: 100vw;
  position: absolute;
  top: 0;
`

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 20px;
`

const ImageArea = styled.div`
  bottom: 41px;
  position: absolute;
  top: 41px;
  width: 100vw;
`

const Footer = styled.footer`
  border-top: 1px solid silver;
  bottom: 0;
  line-height: 24px;
  padding: 8px;
  width: 100vw;
  position: absolute;
`

export const App = React.FC = () => {
  return (
    <div>
      <Header>
        <Title>Image Editor</Title>
      </Header>
      <ImageArea>
        <ImageFileDragAndDropArea onImageFileDrop={console.debug} />
      </ImageArea>
      <Footer>
        Footer
      </Footer>
    </div>
  );
};
