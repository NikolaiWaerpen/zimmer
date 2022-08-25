import classNames from "classnames";
import { ReactNode } from "react";

type BadgeProps = {
  children?: string | ReactNode;
  theme?: "default" | "green" | "blue" | "yellow" | "orange" | "red";
};

export default function Badge({ children, theme = "default" }: BadgeProps) {
  return (
    <>
      <span
        className={classNames(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-800 whitespace-nowrap",
          {
            "bg-gray-100 text-gray-800": theme === "default",
            "bg-blue-100 text-blue-800": theme === "blue",
            "bg-green-100 text-green-800": theme === "green",
            "bg-yellow-100 text-yellow-800": theme === "yellow",
            "bg-orange-100 text-orange-800": theme === "orange",
            "bg-red-100 text-red-800": theme === "red",
          }
        )}
      >
        {children}
      </span>
    </>
  );
}
