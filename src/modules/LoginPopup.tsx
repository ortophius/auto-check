import { PropsWithChildren, useState } from "react";
import styled from "styled-components";
import Image from '../components/Image';
import Popup from "../components/Popup";
import Tab from "../components/Tab";
import Tabs from "../components/Tabs";

const LoginWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 36.5rem;
  column-gap: 4.6rem;
`;

interface LoginPopupProps {
  image?: string;
}

const LoginPopup = function( { image }: LoginPopupProps ) {

  const [tabIndex, setTabIndex] = useState('0');

  return (
    <Popup>
      <LoginWrapper>
        <div>
          <Tabs onChange={setTabIndex} index={tabIndex} >
            <Tab index='0'>Авторизация</Tab>
            <Tab index='1'>Регистрация</Tab>
          </Tabs>
        </div>
        <div>
          <Image width='100%' height='39.5rem' addStyles='border-radius'/>
        </div>
      </LoginWrapper>
    </Popup>
  )
}

export default LoginPopup;