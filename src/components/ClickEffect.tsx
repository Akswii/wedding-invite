import { useState, type JSX } from "react";
import hjerte from "../assets/hjerte_1.svg";

const ImageAtClick = ({ children, ...rest }: { children: JSX.Element }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  console.log("clickPosition", clickPosition);

  const handleClick = (e: React.MouseEvent) => {
    setClickPosition({ x: e.clientX, y: e.clientY });
    setFadeIn(true);

    setTimeout(() => setFadeIn(false), 250);
  };

  return (
    <div onClick={handleClick} {...rest}>
      {clickPosition && (
        <img
          src={hjerte.src}
          width={hjerte.width}
          height={hjerte.height}
          alt="Astro logo"
          style={{
            position: "absolute",
            top: clickPosition.y,
            left: clickPosition.x,
            transform: "translate(-50%, -100%)",
            transition: "opacity 300ms linear",
            opacity: fadeIn ? 1 : 0,
            pointerEvents: "none",
          }}
        />
      )}

      {children}
    </div>
  );
};

export default ImageAtClick;
