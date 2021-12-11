import { signIn, useSession } from "next-auth/react";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function Login() {
  return (
    <div className="h-screen grid place-items-center">
      <button onClick={() => signIn("github")}>Login to github</button>
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession();

  if (!session) return <Login />;

  return (
    <div className="relative">
      <div>{children}</div>
    </div>
  );
}
