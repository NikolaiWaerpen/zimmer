type StatisticsBoxProps = {
  name: string;
  stat: string;
};

export default function StatisticsBox({ name, stat }: StatisticsBoxProps) {
  return (
    <div
      key={name}
      className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
    >
      <dt className="text-sm font-medium text-gray-500 truncate">{name}</dt>
      <dd className="mt-1 text-3xl font-semibold text-theme-4">{stat}</dd>
    </div>
  );
}
