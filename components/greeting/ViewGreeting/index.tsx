import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import Tooltip from "components/Tooltip";
import UserImage from "components/UserImage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import { GreetingType } from "pages/greeting";
import { Dispatch, SetStateAction, useMemo } from "react";

dayjs.extend(relativeTime);

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
    <div className="bg-white overflow-hidden shadow hover:shadow-lg sm:rounded-lg h-full w-72 transition duration-300 group">
      <div className="px-4 py-5 sm:p-6 space-y-8 h-full flex flex-col justify-between">
        <h3 className="font-semibold">{title}</h3>

        {comment && <p className="text-gray-500">{comment}</p>}

        <div
          className={`flex  ${userCanEdit ? "justify-between" : "justify-end"}`}
        >
          {userCanEdit && (
            <Button
              type="button"
              onClick={() => setEditingGreeting(id)}
              className="invisible group-hover:visible transition duration-300"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
          )}
          <div className="flex justify-end gap-2 items-center h-10">
            <p className="text-gray-500 font-thin text-right">
              {dayjs(createdAt).fromNow()}
            </p>
            {/* TODO: Add functioning tooltip */}
            <div className="h-full flex">
              <Tooltip content={<div>{name}</div>}>
                <UserImage src={imageSrc} />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
