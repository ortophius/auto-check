import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  width: 100%;
`;

function StartButtons() {
  return (
    <Container>
      <Button variant="secondary">Проверить машину</Button>
      <Button>Стать партнером</Button>
    </Container>
  )
}

export default StartButtons;