import { ExclamationCircleIcon } from "@heroicons/react/solid";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: string;
  error: string | undefined;
};

export default function Input({
  placeholder = "",
  type,
  value,
  label,
  error,
  onChange,
}: InputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={type}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type}
          name={type}
          id={type}
          className={`block w-full pr-10 sm:text-sm rounded-md ${
            error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
              : "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
          }`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          aria-invalid="true"
          aria-describedby={`${type}-error`}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${type}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
