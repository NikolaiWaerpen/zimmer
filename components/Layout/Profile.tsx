import UserImage from "components/UserImage";
import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  const { image, name } = session!.user!;

  return (
    <button onClick={() => signOut()} className="flex-shrink-0 group block">
      <div className="flex items-center">
        <UserImage src={image!} />
        <div className="ml-3 text-left">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {name!}
          </p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-theme-4">
            Log out
          </p>
        </div>
      </div>
    </button>
  );
}
