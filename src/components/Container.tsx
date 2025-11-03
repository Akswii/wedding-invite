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
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        alignItems: align,
        justifyContent: "center",
        gap: "4rem",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
