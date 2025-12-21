import { type ReactNode } from "react";

export const Container = ({
  children,
  align = "center",
  style,
  ...rest
}: {
  children: ReactNode;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties | undefined;
  className?: string;
}) => {
  const alignItems =
    align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        width: "100%",
        alignItems,
        justifyContent: "center",
        gap: "2rem",
        padding: "clamp(1rem, 4vw, 3rem)",
        boxSizing: "border-box",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
