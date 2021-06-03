import { PropsWithChildren, useCallback } from "react";
import styled from "styled-components";

interface LinkProps {
  size?: string,
  href?: string,
  color?: 'main' | 'secondary',
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
}

const StyledLink = styled.a<LinkProps>`
  &, &:active, &:visited {
    font-size: ${({size}) => (size) ? size : '1.4rem'};
    color: ${({color, theme}) => (color) ? theme.colors.link[color] : theme.colors.link.main};
    letter-spacing: 0.11em;
    text-decoration: none;
  }
`;

const Link = function({ size, href = '#', onClick, children, color }: PropsWithChildren<LinkProps>) {

  const clickHandler = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (href === '#') e.preventDefault();
    if (onClick) onClick(e);
  }, [onClick, href])

  return (
    <StyledLink {...{href, size, color}} onClick={clickHandler}>
      { children }
    </StyledLink>
  )
}

export default Link;