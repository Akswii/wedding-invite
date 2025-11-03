import { useState, type JSX } from "react";
import hjerte from "../assets/hjerte_1.svg";
import hjerte2 from "../assets/hjerte_2.svg";
import { Container } from "./Container";

const ImageAtClick = ({ children, ...rest }: { children: JSX.Element }) => {
  const [clickPositions, setClickPositions] = useState<
    {
      id: number;
      heartIndex: number;
      x: number;
      y: number;
      fadeIn: boolean;
    }[]
  >([]);

  const hearts = [hjerte, hjerte2];

  const getNextHeart = () => {
    return clickPositions?.[clickPositions.length - 1]?.heartIndex === 0
      ? 1
      : 0;
  };

  const handleClick = (e: React.MouseEvent) => {
    const id = Date.now() + Math.random();
    setClickPositions((previousPositions) => [
      ...previousPositions,
      {
        id,
        heartIndex: getNextHeart(),
        x: e.clientX,
        y: e.clientY,
        fadeIn: false,
      },
    ]);

    requestAnimationFrame(() => {
      setClickPositions((prev) =>
        prev.map((p) => (p.id === id ? { ...p, fadeIn: true } : p)),
      );
    });

    setTimeout(() => {
      setClickPositions((prev) => prev.filter((p) => p.id !== id));
    }, 5000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        fontSize: "32px",
      }}
    >
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
          height: 100%;
          padding: 0 0.5rem;
        }
      `}
      </style>
      <div id="main-container" onClick={handleClick} {...rest}>
        {clickPositions?.map((clickPosition) => {
          return (
            <img
              key={clickPosition.id}
              src={hearts[clickPosition.heartIndex].src}
              className="fade-in-out"
              style={{
                height: "4rem",
                width: "4rem",
                position: "absolute",
                top: clickPosition.y,
                left: clickPosition.x,
                transform: "translate(-50%, -60%)",
              }}
            />
          );
        })}
        <Container>
          {children}
          <div
            style={{
              border: "1px solid blue",
              padding: "1rem",
              display: "flex",
              gap: "3rem",
            }}
          >
            <span>Program</span>
            <span>Praktisk info</span>
            <a href="/svar">Svar på innbydelsen</a>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ImageAtClick;
