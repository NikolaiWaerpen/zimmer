type CheckboxProps = {
  isChecked?: boolean;
  onClick?: VoidFunction;
  title?: string;
  description?: string;
};

export default function Checkbox({
  isChecked,
  onClick,
  title,
  description,
}: CheckboxProps) {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          checked={isChecked}
          onClick={onClick}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        {title && <label className="font-medium text-gray-700">{title}</label>}
        {description && <span className="text-gray-500">{description}</span>}
      </div>
    </div>
  );
}
