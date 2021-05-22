import styled from "styled-components";

const StyledImage = styled.img``;

interface ImageProps {
  src: string,
}

const Image = function(props: ImageProps) {
  return(
    <>
      <StyledImage src={`${process.env.PUBLIC_URL}${props.src}`} />
    </>
  )
}

export default Image;