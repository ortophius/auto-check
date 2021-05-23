import React from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import Image from './components/Image';
import 'normalize.css';
import Logo from './components/Logo';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { MainTheme } from './theme';
import './fonts.css';
import Button from './components/Button';
import StartButtons from './components/StartButtons';
import More from './components/More';
import Parallax from './components/Parallax';

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: ${MainTheme.rootSize}px;
  }
`

function App() {
  return (
    <>
    <GlobalStyles />
    <ThemeProvider theme={MainTheme}>
      <Header>
        <Logo />
        <Parallax lockY={true} intensity={2}>
          <Image src="car.png"/>
        </Parallax>
        <StartButtons />
       <More />
      </Header>
    </ThemeProvider>
    </>
  );
}

export default App;
