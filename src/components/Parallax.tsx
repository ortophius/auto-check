import { PropsWithChildren, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface PlxProps {
  intensity?: number,
  reverse?: boolean,
  lockX?: boolean,
  lockY?: boolean,
  interval?: number,
}

interface Position {
  top: number,
  left: number,
}

interface Origin {
  x: number,
  y: number,
}

const PlxContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  transition: top 0.05s, left 0.05s;
`;

const Parallax = function({ 
  children,
  intensity = 1,
  reverse = true,
  lockX = false,
  lockY = false,
  interval = 100 }: PropsWithChildren<PlxProps>) {
  const container = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState<Boolean>(true);
  const [pos, changePos] = useState<Position>({ top: 0, left: 0 });
  const [origin, setOrigin] = useState<Origin>({ x: 0, y: 0 });

  useEffect(() => {
    if (!container.current) return;
    const div = container.current;
    div.style.top = `${pos.top}rem`;
    div.style.left = `${pos.left}rem`;
  }, [pos]);

  useEffect(
    () => {
      function calculatePosition({ clientX, clientY }: MouseEvent) {
        if (!ready) return;

        const k = (reverse) ? -1 : 1;        
        const newX = (lockX) 
          ? pos.left
          : ((clientX - origin.x) / origin.x) * intensity * k;
        
          const newY = (lockY)
        ? pos.top
        : ((clientY - origin.y) / origin.y) * intensity * k;
        
        changePos({left: newX, top: newY});

        setReady(false);
        setTimeout(() => { setReady(true) }, interval)
      }

      window.addEventListener('mousemove', calculatePosition);
    }, [intensity, origin]
  )

  useEffect(() => {
    function calculateOrigin() {
      setOrigin({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      })
    }

    calculateOrigin();
    window.addEventListener('resize', calculateOrigin);

  }, []);

  return (
    <PlxContainer ref={container}>
      { children }
    </PlxContainer>
  )
}

export default Parallax