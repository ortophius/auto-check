import { forwardRef, useCallback, useRef } from "react";
import styled from "styled-components";
import { mergeRefs } from "../utils";

export interface TextInputProps {
  icon?: string,
  placeholder?: string,
  disabled?: boolean;
  value?: string,
  password?: boolean;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | (() => void)
  addStyles?: string,
  ref?: React.ForwardedRef<HTMLInputElement>,
  children?: React.ReactNode,
  maxLength?: number,
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

const InputContainer = styled.div<Pick<TextInputProps, 'addStyles'>>`
  position: relative;
  width: 100%;
  cursor: text;
  ${({ addStyles }) =>  (addStyles) ? addStyles : ''}
`;

const InputIcon = styled.img`
  position: absolute;
  top: 1.4rem;
  left: 1.3rem;
  width: 2.4rem;
  height: 2.4rem;
`;

const TextInput = function({ icon, placeholder = '', disabled = false,  value = '', password = false, addStyles, maxLength, onChange}: TextInputProps, ref: React.ForwardedRef<HTMLInputElement>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);

  const type = (password) ? 'password' : 'text';

  const containerClickHandler = useCallback((e: React.MouseEvent) => {
    if (!inputRef || !inputRef.current) return;
    if (!iconRef || !iconRef.current) return;

    if (e.target === iconRef.current) e.preventDefault();

    inputRef.current.focus();
  }, []);

  return(
    <InputContainer onMouseDown={containerClickHandler} {...{ addStyles }}>
      { icon &&
      <InputIcon src={`${process.env.PUBLIC_URL}/${icon}`} ref={iconRef}/> }
      <InputField 
        {...{ value, placeholder, disabled, type, maxLength, onChange}}
        ref={(node) => {
          mergeRefs(node, inputRef, ref)
        }} />
    </InputContainer>
  )
}

export default forwardRef<HTMLInputElement, TextInputProps>(TextInput);