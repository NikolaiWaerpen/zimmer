import Loader from "components/Loader";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import Authenticated from "./Authenticated";
import Unauthenticated from "./Unauthenticated";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { status, data: session } = useSession();

  if (status === "loading") return <Loader />;
  if (
    status === "authenticated" &&
    session &&
    session.user &&
    session.user.email &&
    session.user.image &&
    session.user.name
  )
    return <Authenticated children={children} />; // TODO: make this quick & dirty solution cleaner
  return <Unauthenticated />;
}
