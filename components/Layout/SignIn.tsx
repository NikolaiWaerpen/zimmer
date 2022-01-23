import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "components/Button";
import Link from "next/link";

type NotSignedInProps = {
  status: "loading" | "unauthenticated";
};

export default function NotSignedIn({ status }: NotSignedInProps) {
  const isLoading = status === "loading";

  return (
    <Link href="/login">
      <a>
        <Button icon={faUser} loading={isLoading} disabled={isLoading}>
          Sign in
        </Button>
      </a>
    </Link>
  );
}
