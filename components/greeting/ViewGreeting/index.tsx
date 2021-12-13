import { gql } from "@apollo/client";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import { useSession } from "next-auth/react";
import { GreetingType } from "pages/greeting";
import { Dispatch, SetStateAction, useMemo } from "react";

export type ViewGreetingProps = {
  greeting: GreetingType;
  setEditingGreeting: Dispatch<SetStateAction<number | null>>;
};

export default function ViewGreeting({
  greeting,
  setEditingGreeting,
}: ViewGreetingProps) {
  const { data } = useSession();

  const {
    id,
    title,
    comment,
    createdAt,
    author: { image, name, email },
  } = greeting;

  const imageSrc = useMemo(() => {
    if (image.startsWith("https://")) return image;
    return `data:image/png;base64,${image}`;
  }, [image]);

  const userCanEdit = useMemo(() => email === data?.user?.email, [data, email]);

  return (
    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex">
          <h3>{title}</h3>
          {comment && <p>{comment}</p>}
          {userCanEdit && (
            <Button type="button" onClick={() => setEditingGreeting(id)}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
          )}
          {/* TODO: Add functioning tooltip */}
          <img
            className="inline-block h-10 w-10 rounded-full"
            src={imageSrc}
            alt={name}
          />
        </div>
        <span>{createdAt}</span>
      </div>
    </div>
  );
}
