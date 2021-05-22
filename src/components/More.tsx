import { PropsWithChildren, useEffect, useRef } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components"
import { MainTheme } from '../theme';

interface SvgTextProps {
  size?: number,
}

const SvgText = function({children, size}: PropsWithChildren<SvgTextProps>) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);
  const SvgTextStyles = createGlobalStyle<SvgTextProps>`
  .svg-text {
    font-size: ${(size) ? size : 2.1}rem;
    font-family: Roboto;
    line-height: 2.5rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    fill: url(#gr-simple);
  }
`;

  useEffect(() => {
    const svg = svgRef.current;
    const text = textRef.current
    if (!svg || !text) return;

    const rect = text.getBBox();
    console.log(rect);
    svg.setAttribute("width", rect.width.toString());
    svg.setAttribute("height", rect.height.toString());

  }, [])

  return (
  <>
    <SvgTextStyles />
    <svg ref={svgRef}>

    <linearGradient id="gr-simple" x1="0" y1="0" x2="100%" y2="0">
      <stop stopColor={MainTheme.colors.secondary} offset="50%"/>
      <stop stopColor={MainTheme.colors.main} offset="50%"/>
    </linearGradient>

    <text ref={textRef} textAnchor="start"
          alignmentBaseline="text-before-edge"
          className="svg-text"
          >
      {children}
    </text>
    </svg>
  </>
  )
}

interface MoreProps {
  link?: string,
}

const Pointing = keyframes`
  0% {
    bottom: 0rem;
  }

  100% {
    bottom: -1rem;
  }
`

const Arrow = styled.img`
  position: relative;
  bottom: 0rem;
  animation: ${Pointing} 0.7s ease-in-out infinite alternate;
`;

const SvgContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 1rem;
  justify-items: center;
`;

const StyledLink = styled.a`
  &:hover ${Arrow} {
    bottom: -1rem;
  }
`;

const More = function({ link }: MoreProps) {

  return(
    <StyledLink href={(link)? link : '#'}>
    <SvgContainer>
    <SvgText>&nbsp;Подробнее</SvgText>
    <Arrow src={`${process.env.PUBLIC_URL}/arrow.svg`} alt="Подробнее"/>
    </SvgContainer>
    </StyledLink>
  );
}

export default More;