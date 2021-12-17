import { gql } from "@apollo/client";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import { useSession } from "next-auth/react";
import { GreetingType } from "pages/greeting";
import { Dispatch, SetStateAction, useMemo } from "react";
import formatDate from "utils/formatDate";

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
    <div className="bg-white overflow-hidden shadow sm:rounded-lg h-full">
      <div className="px-4 py-5 sm:p-6 space-y-8 h-full flex flex-col justify-between">
        <h3 className="font-semibold">{title}</h3>

        {comment && <p className="text-gray-500">{comment}</p>}

        <div></div>
        <div className="flex justify-between h-10">
          <div className="h-full flex">
            <img
              className="inline-block h-full w-10 rounded-full"
              src={imageSrc}
              alt={name}
            />
            <div className="grid place-items-center ml-2">
              <p className="text-gray-500 font-thin text-right">
                {formatDate({ date: createdAt, format: "DD.MM.YY HH:mm" })}
              </p>
            </div>
            {/* TODO: Add functioning tooltip */}
          </div>
          {userCanEdit && (
            <Button type="button" onClick={() => setEditingGreeting(id)}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
