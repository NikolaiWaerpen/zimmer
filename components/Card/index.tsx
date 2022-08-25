import classNames from "classnames";
import { ReactNode } from "react";

type CardProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
  trailing?: ReactNode;
  size?: "stretch" | "sm" | "md" | "lg";
};

export default function Card({
  title,
  children,
  className,
  trailing,
  size = "md",
  ...props
}: CardProps) {
  return (
    <div
      className={classNames(
        className,
        "bg-white overflow-hidden shadow rounded-lg min-h-[28rem] px-4 py-5 sm:p-6",
        {
          "w-[22rem]": size === "sm",
          "w-[28rem]": size === "md",
          "w-[48rem]": size === "lg",
        }
      )}
      {...props}
    >
      <div className="flex justify-between">
        <div className="w-4/5">
          {title && (
            <h2 className="text-xl font-semibold text-gray-900 truncate mb-4">
              {title}
            </h2>
          )}
        </div>
        {trailing && <>{trailing}</>}
      </div>
      {/* TODO: Fix this css hack */}
      <div className="h-full pb-10">{children}</div>
    </div>
  );
}
