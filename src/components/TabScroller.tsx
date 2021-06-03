import { PropsWithChildren } from "react";
import styled from "styled-components";

export interface TabScrollerProps {
  x?: number;
  width?: number;
}

const ScrollContainer = styled.div`
  position: relative;
`;
const Scroller = styled.span<TabScrollerProps>`
    position: absolute;
    bottom: 0;
    height: 100%;
    width: ${({ width }) => width}px;
    left: ${({ x }) => x}px;
    background-color: ${({ theme }) => theme.colors.main};
    border-radius: 10rem;
`;

const TabScroller = function({x = 0, width = 10, children}: PropsWithChildren<TabScrollerProps>) {
  return(
    <ScrollContainer>
      { children }
      <Scroller width={width} x={x}/>
    </ScrollContainer>
  );
}

export default TabScroller;