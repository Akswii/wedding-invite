import { type ReactNode } from "react";
import styles from "./styles.module.css";

type Align = "left" | "center" | "right";

export const Container = ({
  children,
  align = "center",
  className,
  ...rest
}: {
  children: ReactNode;
  align?: Align;
  className?: string;
}) => {
  return (
    <div
      className={[styles.container, styles[`align-${align}`], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
};
