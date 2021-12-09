import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  return (
    <div>
      <div className="h-screen grid place-items-center">
        <button onClick={() => signOut()}></button>
        <span>{status}</span>
      </div>
    </div>
  );
}
