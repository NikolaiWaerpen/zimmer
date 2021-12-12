import { gql } from "@apollo/client";
import { faCircle, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apolloClient } from "lib/apollo-client";
import { GET_TODOS } from "pages";
import { TodoType } from "pages/todo";
import { Dispatch, SetStateAction } from "react";

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
  const { description, id, isComplete } = todo;
  return (
    <div className="flex gap-2">
      <button type="button" onClick={() => completeTodoMutation(id)}>
        <FontAwesomeIcon icon={faCircle} />
      </button>
      <p className={isComplete ? "text-red-600" : ""}>{description}</p>
      <button type="button" onClick={() => setEditingTodo(id)}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>
    </div>
  );
}