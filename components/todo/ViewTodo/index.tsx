import { gql } from "@apollo/client";
import { faCircle, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import { apolloClient } from "lib/apollo-client";
import { useSession } from "next-auth/react";
import { GET_TODOS } from "pages";
import { TodoType } from "pages/todo";
import { Dispatch, SetStateAction, useMemo } from "react";

const COMPLETE_TODO = gql`
  mutation CompleteTodo($input: CompleteTodoInput!) {
    completeTodo(input: $input) {
      id
    }
  }
`;

const completeTodoMutation = async (id: number) => {
  await apolloClient.mutate({
    mutation: COMPLETE_TODO,
    variables: {
      input: {
        id,
      },
    },
    refetchQueries: [
      {
        query: GET_TODOS,
      },
    ],
  });
};

export type ViewTodoProps = {
  todo: TodoType;
  setEditingTodo: Dispatch<SetStateAction<number | null>>;
};

export default function ViewTodo({ todo, setEditingTodo }: ViewTodoProps) {
  const { data } = useSession();

  const {
    description,
    id,
    isComplete,
    author: { image, name, email },
  } = todo;

  const imageSrc = useMemo(() => {
    if (image.startsWith("https://")) return image;
    return `data:image/png;base64,${image}`;
  }, [image]);

  const userCanEdit = useMemo(() => email === data?.user?.email, [data, email]);

  return (
    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex">
          {userCanEdit && (
            <Button type="button" onClick={() => completeTodoMutation(id)}>
              <FontAwesomeIcon icon={faCircle} />
            </Button>
          )}
          <p className={isComplete ? "text-red-600" : ""}>{description}</p>
          {userCanEdit && (
            <Button type="button" onClick={() => setEditingTodo(id)}>
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
      </div>
    </div>
  );
}
