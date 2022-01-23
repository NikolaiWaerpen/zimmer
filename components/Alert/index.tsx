import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";

type AlertProps = {
  state?: "default" | "success" | "warning" | "error";
  title: string;
  description?: string;
};

export default function Alert({
  state = "default",
  title,
  description,
}: AlertProps) {
  const isDefault = state == "default";
  const isSuccess = state == "success";
  const isWarning = state == "warning";
  const isError = state == "error";

  return (
    // TODO: FIX coloring on success state
    <div
      className={classNames("rounded-md p-4", {
        "bg-theme-4": isDefault,
        "bg-yellow-50": isWarning,
        "bg-red-50": isError,
      })}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {isDefault && (
            <InformationCircleIcon
              className="h-5 w-5 text-theme-6"
              aria-hidden="true"
            />
          )}
          {isSuccess && (
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          )}
          {isWarning && (
            <ExclamationIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          )}
          {isError && (
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          )}
        </div>
        <div className="ml-3">
          <h3
            className={classNames("text-sm font-medium", {
              "text-theme-7": isDefault,
              "text-yellow-800": isWarning,
              "text-red-800": isError,
            })}
          >
            {title}
          </h3>
          {description && (
            <div
              className={classNames("mt-2 text-sm", {
                "text-theme-6": isDefault,
                "text-yellow-700": isWarning,
                "text-red-700": isError,
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
