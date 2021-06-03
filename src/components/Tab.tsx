import { forwardRef, PropsWithChildren, useCallback, useEffect } from "react";
import styled from "styled-components";
import { isTaggedTemplateExpression } from "typescript";
import Link from "./Link";

export interface TabPropsWithoutChildren {
  index?: string,
  active?: boolean,
  size?: 'sm' | 'md' | 'lg',
  onClick?: (index: string) => any,
}

type TabProps = PropsWithChildren<TabPropsWithoutChildren>;

const StyledTab = styled.li<TabProps>`
  display: block;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.4rem;
  ${({active, size, theme}) => (`
  color: ${ (active) ? theme.colors.secondary : theme.colors.main };
  ${ (size === 'lg') ? 'text-transform: uppercase;' : '' }
  `)};
  padding: 0.55rem 1.3rem;
  transition: color 0.4s;
`;

const Tab = forwardRef<HTMLLIElement, TabProps>(({ index = '0', active = false, children, onClick = () => {} }: TabProps, ref) => {
  const clickHandler = useCallback(() => {
    onClick(index);
  }, [index, onClick]);

  return (
    <StyledTab ref={ref} onClick={clickHandler}>
      <Link color={(active) ? 'secondary' : 'main'}>
        { children }
      </Link>
    </StyledTab>
  )
});

export default Tab;