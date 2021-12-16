type DividerProps = {
  label: string;
};

export default function Divider({ label }: DividerProps) {
  return (
    <div className="relative w-full max-w-3xl">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 bg-white text-sm text-gray-500">{label}</span>
      </div>
    </div>
  );
}
