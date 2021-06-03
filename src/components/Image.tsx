import styled from "styled-components";

interface ImageProps {
  src?: string,
  width?: string,
  height?: string,
  addStyles?: string,
  rounded?: boolean
}

const StyledImage = styled.img<ImageProps>`
  ${({src}) => (!src) ? 'background: linear-gradient(159.62deg, #1F88D4 8.39%, #4CA7E9 91.8%);' : ''}
  ${({ width, height }) => {
    return(
      `${(width) ? `min-width: ${width};` : ''}
       ${(height) ? `min-height: ${height};` : ''}`
    )
  }}
  ${({rounded}) => (rounded) ? 'border-radius: 3rem 3rem' : ''}
`;

const Image = function({ src, width, height, rounded = true }: ImageProps) {
  return(
    <>
      <StyledImage {...(src) ? {src}  : {}} {...{width, height, rounded}} />
    </>
  )
}

export default Image;