import { type ReactNode } from "react";

export const Container = ({
  children,
  className,
  ...rest
}: {
  children: ReactNode;
  className: string;
}) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: "4rem",
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
