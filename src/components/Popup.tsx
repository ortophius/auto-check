import { PropsWithChildren } from "react";
import styled from "styled-components";

const Shadow = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.73);
  z-index: 1;
`;

const Card = styled.div`
  background-color: ${({theme}) => theme.colors.secondary};
  border-radius: 3em;
  padding: 4em 4.5em;
`;

const Popup = function({ children }: PropsWithChildren<{}>) {
  return (
    <Shadow>
      <Card>
        { children }
      </Card>
    </Shadow>
  )
}

export default Popup;