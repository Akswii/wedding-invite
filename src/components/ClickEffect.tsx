import { useState, type JSX } from "react";
import hjerte from "../assets/hjerte_1.svg";
import hjerte2 from "../assets/hjerte_2.svg"

const ImageAtClick = ({ children, ...rest }: { children: JSX.Element }) => {
  const [clickPositions, setClickPositions] = useState<{
    id: number;
    heartIndex: number;
    x: number;
    y: number;
    fadeIn: boolean;
  }[]>([]);
  const hearts = [hjerte, hjerte2]


  const handleClick = (e: React.MouseEvent) => {
    const id = Date.now() + Math.random();
    setClickPositions((previousPositions) => [...previousPositions, { id, heartIndex: getRandomHeart(), x: e.clientX, y: e.clientY, fadeIn: false }]);

    requestAnimationFrame(() => {
      setClickPositions(prev =>
        prev.map(p => (p.id === id ? { ...p, fadeIn: true } : p))
      );
    });
  };

  const getRandomHeart = () => {
    return Math.floor(Math.random() * 2)
  }

  return (
    <>
      <style>
        {`
        @keyframes fadeinout {
          0% { opacity: 0; }
          14% { opacity: 1; }
          86% { opacity: 1; }
          100% { opacity: 0; }
        }

        .fade-in-out {
          animation: fadeinout 5s linear forwards;
          opacity: 0;
          position: absolute;
          width: 100px;
          height: 100px;
          pointer-events: none;
        }
      `}
      </style>
      <div onClick={handleClick} {...rest}>
        {clickPositions?.map((clickPosition) => {
          return (
            <img
              src={hearts[clickPosition.heartIndex].src}
              width={hearts[clickPosition.heartIndex].width}
              height={hearts[clickPosition.heartIndex].height}
              className='fade-in-out'
              alt="Astro logo"
              style={{
                position: "absolute",
                top: clickPosition.y,
                left: clickPosition.x,
                transform: "translate(-50%, -60%)",
              }}
            />)
        })
        }

        {children}
      </div>
    </>
  );
};

export default ImageAtClick;
