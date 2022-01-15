import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
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
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled
          ? "focus:ring-gray-500 text-white bg-gray-600 hover:bg-gray-700 hover:cursor-not-allowed"
          : "focus:ring-themecolor3 text-white bg-themecolor4 hover:bg-themecolor5"
      } `}
    >
      <div className="grid place-items-center w-full">
        {loading ? <ButtonSpinner /> : <>{children}</>}
      </div>
    </button>
  );
}
