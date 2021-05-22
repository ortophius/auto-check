import { PropsWithChildren } from "react"
import styled from "styled-components"

const Styledeader = styled.header`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 6rem 0;
  background-image: url('${process.env.PUBLIC_URL}/rect.svg');
  background-repeat: no-repeat;
  background-size: 50% 100%;
`

const Header = function({children}: PropsWithChildren<{}>) {
  
  return(
    <Styledeader>
      {children}
    </Styledeader>
  )
}

export default Header;