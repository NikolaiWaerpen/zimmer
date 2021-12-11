type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  return (
    <div className="h-screen grid place-items-center">
      <h1>Error!</h1>
      <span>{JSON.stringify(error)}</span>
    </div>
  );
}
