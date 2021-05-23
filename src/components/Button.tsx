import { PropsWithChildren } from "react";
import styled from "styled-components";

interface ButtonProps {
  variant?: 'main' | 'secondary';
  onClick?: () => void,
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${ ({ variant, theme }) =>
    (variant) 
      ? theme.colors[variant] 
      : theme.colors.main
    };
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 1.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${ ({ variant, theme }) => 
    (variant && variant === 'secondary')
      ? theme.colors.main
      : theme.colors.secondary
  };

  border: none;
  border-radius: 5rem 5rem;
  padding: 2.05rem 6.2rem;
  transition: box-shadow 0.2s;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.12);
  }
`;

const Button = function(props:PropsWithChildren<ButtonProps>) {
  return(
    <StyledButton {...props}>
      { props.children }
    </StyledButton>
  )
}

export default Button;