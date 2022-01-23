import { ExclamationIcon } from "@heroicons/react/solid";
import classNames from "classnames";

type AlertProps = {
  state?: "default" | "warning" | "error";
  title: string;
  description?: string;
};

export default function Alert({
  state = "default",
  title,
  description,
}: AlertProps) {
  return (
    // TODO: FIX coloring on success state
    <div
      className={classNames("rounded-md p-4", {
        "bg-theme-4": state === "default",
        "bg-yellow-50": state === "warning",
        "bg-red-50": state === "error",
      })}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className={classNames("h-5 w-5", {
              "text-theme-6": state === "default",
              "text-yellow-400": state === "warning",
              "text-red-400": state === "error",
            })}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3
            className={classNames("text-sm font-medium", {
              "text-theme-7": state === "default",
              "text-yellow-800": state === "warning",
              "text-red-800": state === "error",
            })}
          >
            {title}
          </h3>
          {description && (
            <div
              className={classNames("mt-2 text-sm", {
                "text-theme-6": state === "default",
                "text-yellow-700": state === "warning",
                "text-red-700": state === "error",
              })}
            >
              <p>{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
