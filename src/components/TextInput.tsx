import { useCallback, useRef } from "react";
import styled from "styled-components";

interface TextInputProps {
  icon?: string,
  placeholder?: string,
  disabled?: boolean;
  value?: string,
}

const InputField = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 1.5rem 1.5rem 1.5rem 5.2rem;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.text.main};
  border: none;
  box-shadow: 0px 8px 18px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: 1px solid #c1c1c1;
  }
`

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  cursor: text;
`;

const InputIcon = styled.img`
  position: absolute;
  top: 1.4rem;
  left: 1.3rem;
  width: 2.4rem;
  height: 2.4rem;
`;

const TextInput = function({ icon, placeholder = '', disabled = false,  value = ''}: TextInputProps) {
  const input = useRef<HTMLInputElement>(null);

  const containerClickHandler = useCallback((e: React.MouseEvent) => {
    if (!input || !input.current) return;

    e.preventDefault();
    
    input.current.focus();
  }, [input]);

  return(
    <InputContainer onMouseDown={containerClickHandler}>
      { icon &&
      <InputIcon src={`${process.env.PUBLIC_URL}/${icon}`}/> }
      <InputField {...{ placeholder }} ref={input} />
    </InputContainer>
  )
}

export default TextInput;