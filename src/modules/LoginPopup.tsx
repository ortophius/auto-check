import { useState } from "react";
import styled from "styled-components";
import H from "../components/H";
import Image from '../components/Image';
import Popup from "../components/Popup";
import Tab from "../components/Tab";
import Tabs from "../components/Tabs";
import TextInput from "../components/TextInput";

const LoginWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 36.5rem;
  column-gap: 4.6rem;
`;

interface LoginPopupProps {
  image?: string;
}

const ContentDiv = styled.div`
  display: grid;
  row-gap: 4.5rem;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  align-items: start;
  min-width: 43.2rem;
  min-height: 0;
`;

const LoginForm = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  align-items: start;
`;

const LoginPopup = function( { image }: LoginPopupProps ) {

  const [tabIndex, setTabIndex] = useState('0');

  return (
    <Popup>
      <LoginWrapper>
        <ContentDiv>
          <Tabs onChange={setTabIndex} index={tabIndex} >
            <Tab index='0'>Авторизация</Tab>
            <Tab index='1'>Регистрация</Tab>
          </Tabs>
          <H>
            Добро пожаловать!
          </H>
          <LoginForm>
            <TextInput icon="phone.svg" placeholder="Введите номер телефона" />
          </LoginForm>
        </ContentDiv>
        <div>
          <Image width='100%' height='39.5rem' addStyles='border-radius'/>
        </div>
      </LoginWrapper>
    </Popup>
  )
}

export default LoginPopup;