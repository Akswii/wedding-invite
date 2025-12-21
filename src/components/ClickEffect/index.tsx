import { useState, type JSX } from "react";
import hjerte from "@assets/hjerte_1.svg";
import hjerte2 from "@assets/hjerte_2.svg";
import comingSoon from "@assets/coming_soon.svg";
import { Container } from "../Container";
import styles from "./styles.module.css";

export const ImageAtClick = ({
  children,
  ...rest
}: {
  children: JSX.Element;
}) => {
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
      style={
        {
          "--icon-url": `url(${comingSoon})`,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          fontSize: "22px",
        } as any
      }
    >
      <div id={styles.mainContainer} onClick={handleClick} {...rest}>
        {clickPositions?.map((clickPosition) => {
          return (
            <img
              key={clickPosition.id}
              src={hearts[clickPosition.heartIndex].src}
              className={styles.fadeInOut}
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
        <div
          className={styles.gridContainer}
          style={
            {
              "--icon-url": `url("${comingSoon.src}")`,
            } as any
          }
        >
          <div className={styles.hero}>
            {children}
            <div
              className="titleFont"
              style={{
                gap: "0.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              <span>13. Juni 2026</span>
              <span>Ålesund</span>
            </div>
          </div>
          <div className={`${styles.linkContainer} titleFont`}>
            <a href="/program">Program</a>
            <a href="/praktisk-info">Praktisk info</a>
            <a href="/svar">Svar på innbydelsen</a>
          </div>
        </div>
      </div>
    </div>
  );
};
