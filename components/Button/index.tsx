import { faSpinner, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  icon?: IconDefinition;
  rightIcon?: boolean;
  loading?: boolean;
};

function ButtonSpinner() {
  return (
    <div className="animate-spin">
      <FontAwesomeIcon icon={faSpinner} />
    </div>
  );
}

export default function Button({
  children,
  onClick,
  type,
  disabled,
  loading = false,
  icon,
  rightIcon = false,
  className,
}: ButtonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        className={`${className} inline-flex items-center px-[0.925rem] py-[0.995rem] sm:py-[0.87rem] border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          disabled
            ? "focus:ring-gray-500 text-white bg-gray-600 hover:bg-gray-700 hover:cursor-not-allowed"
            : "focus:ring-theme-3 text-white bg-theme-4 hover:bg-theme-5"
        } `}
      >
        <div className="flex justify-center items-center gap-2 w-full whitespace-nowrap">
          {/* Default icon */}
          {icon && !rightIcon && <FontAwesomeIcon icon={icon} />}
          {loading ? <ButtonSpinner /> : <>{children}</>}
          {/* Right icon */}
          {icon && rightIcon && <FontAwesomeIcon icon={icon} />}
        </div>
      </button>
    </div>
  );
}
