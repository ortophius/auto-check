import { useCallback, useState } from "react";
import styled from "styled-components";
import H from "../components/H";
import Image from '../components/Image';
import Link from "../components/Link";
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
  grid-template-rows: min-content 1fr;
  align-items: start;
  min-width: 43.2rem;
  min-height: 0;
`;

const LoginForm = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  row-gap: 2.8rem;
  align-items: start;
`;

const LoginInputsWrapper = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  row-gap: 2.8rem;
  align-items: start;
`;

const FormButtons = styled.div`
  align-self: end;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const submitStyles = `
  color: #0f0f0f;
`;

const losePasswordStyles = `
  &:hover {
    text-decoration: underline;
  }
`

const LoginPopup = function( { image }: LoginPopupProps ) {

  const [tabIndex, setTabIndex] = useState('0');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handlePhoneChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    let filteredValue = value
      .replace(/^\+7/g, '');
      filteredValue = filteredValue.replace(/[^0-9]/g, '')
      .substr(0, 10);

    const match = filteredValue.match(/^(\d{3})[-]?(\d{0,3})[-]?(\d{0,2})[-]?(\d{0,2})$/);

    let newValue = '';

    if (match) {
      const formattedValue = match.slice(1).map((substr, i) => {
        return (i === 0 || substr === '') ? substr : `-${substr}`;
      }).join('');

      newValue = formattedValue;
    }
    else newValue = filteredValue;

    if (newValue.length > 0) newValue = `+7 ${newValue}`;
    setPhone(newValue);
  }, []);

  const handlePasswordChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setPassword(value);
  }, []);


  return (
    <Popup>
      <LoginWrapper>
        <ContentDiv>
          <Tabs onChange={setTabIndex} index={tabIndex} >
            <Tab index='0'>Авторизация</Tab>
            <Tab index='1'>Регистрация</Tab>
          </Tabs>
          <LoginForm>
            <H addStyles='margin: 0 auto;'>
              Добро пожаловать!
            </H>
            <LoginInputsWrapper>
              <TextInput icon="phone.svg" placeholder="Введите номер телефона" value={phone} onChange={handlePhoneChange} />
              <TextInput icon="key.svg" placeholder="Введите пароль" value={password} onChange={handlePasswordChange} password />
            </LoginInputsWrapper>
          </LoginForm>
          <FormButtons>
            <Link size="2rem" addStyles={submitStyles}>Войти</Link>
            <Link addStyles={losePasswordStyles}>Забыли пароль?</Link>
          </FormButtons>
        </ContentDiv>
        <div>
          <Image width='100%' height='39.5rem' addStyles='border-radius'/>
        </div>
      </LoginWrapper>
    </Popup>
  )
}

export default LoginPopup;