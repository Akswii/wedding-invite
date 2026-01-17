import { useState, type JSX } from "react";
import hjerte from "@assets/hjerte_1.svg";
import hjerte2 from "@assets/hjerte_2.svg";
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
    <div className={styles.container}>
      <div className={styles.mainContainer} onClick={handleClick} {...rest}>
        {clickPositions?.map((clickPosition) => {
          return (
            <img
              key={clickPosition.id}
              src={hearts[clickPosition.heartIndex].src}
              className={`${styles.fadeInOut} ${styles.heart}`}
              style={{
                top: clickPosition.y,
                left: clickPosition.x,
              }}
            />
          );
        })}
        <div className={styles.gridContainer}>
          <div className={styles.hero}>
            {children}
            <div className={`titleFont ${styles.titleBlock}`}>
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
