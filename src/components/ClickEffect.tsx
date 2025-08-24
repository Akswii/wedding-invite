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

    setTimeout(() => {
      setClickPositions(prev => prev.filter(p => p.id !== id));
    }, 5000);
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

        #main-container {
          display: flex;
          justify-content: center;
          height: 100%;
          overflow: hidden;
        }
      `}
      </style>
      <div id="main-container" onClick={handleClick} {...rest}>
        {clickPositions?.map((clickPosition) => {
          return (
            <img
              key={clickPosition.id}
              src={hearts[clickPosition.heartIndex].src}
              className='fade-in-out'
              style={{
                height: "4rem",
                width: "4rem",
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
