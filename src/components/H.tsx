import { PropsWithChildren } from "react";
import styled, { CSSProperties } from "styled-components";

interface HProps {
  size?: 1 | 2 | 3 | 4| 5 | 6,
  addStyles?: string,
}

const StyledH = styled.span<HProps>`
  display: block;
  font-size: 3.6rem;
  font-weight: 300;
  letter-spacing: 0.07em;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.main}
  ${({addStyles}) => addStyles && addStyles};
`;

const H = function({ size = 2, addStyles = '', children }: PropsWithChildren<HProps>) {

  const TagName = `h${size}` as keyof JSX.IntrinsicElements;

  return (
    <TagName style={{ margin: '0' }}>
      <StyledH  {...{size, addStyles}}>
        { children }
      </StyledH>
    </TagName>
  )
}

export default H;