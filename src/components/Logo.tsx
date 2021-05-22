import styled from 'styled-components';;

interface SpanProps {
  variant?: 'main' | 'secondary'
}

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 4rem`;

const Span = styled.span<SpanProps>`
  display: inline-block;
  color: ${props => (props.variant) ? props.theme.colors[props.variant] : props.theme.colors.main };
  position: relative;
  width: 16rem;
  font-family: 'Righteous', cursive;
  font-size: 6.4rem;
  ${ ({ variant }) => (variant === 'secondary') &&
    'text-align: right;'
  }
`;

Span.defaultProps = {
  variant: 'main',
}

function Logo() {
  return(
    <StyledDiv>
      <Span variant="secondary">Auto</Span>
      <Span>Check</Span>
    </StyledDiv>
  )
}

export default Logo;