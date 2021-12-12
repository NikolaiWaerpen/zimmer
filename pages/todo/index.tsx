import { gql, useQuery } from "@apollo/client";
import Error from "components/Error";
import Loader from "components/Loader";
import { Form, Formik } from "formik";
import { apolloClient } from "lib/apollo-client";
import * as cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircle,
  faPencilAlt,
  faStop,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ViewTodo from "./ViewTodo";
import EditTodo from "./EditTodo";

export const GET_TODOS = gql`
  query Todos {
    todos {
      id
      description
      isComplete
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      id
      description
      isComplete
    }
  }
`;

export const EDIT_TODO = gql`
  mutation EditTodo($input: EditTodoInput!) {
    editTodo(input: $input) {
      id
    }
  }
`;

export const COMPLETE_TODO = gql`
  mutation CompleteTodo($input: CompleteTodoInput!) {
    completeTodo(input: $input) {
      id
    }
  }
`;

// temp manual typing, until I get apollo codegen to work
export type TodoType = {
  id: number;
  description: string;
  isComplete: boolean;
};

export default function Todo() {
  const { loading, error, data } = useQuery<{ todos: TodoType[] }>(GET_TODOS);
  const [editingTodo, setEditingTodo] = useState<null | number>(null);

  if (loading) return <Loader />;
  if (error ?? !data) return <Error error={error} />;

  const { todos } = data;

  return (
    <div className="grid place-items-center h-screen">
      <div className="space-y-2">
        <h1 className="text-2xl text-center">Todo</h1>
        {todos.map((todo) => {
          const { id } = todo;
          return (
            <div key={id}>
              {editingTodo !== id ? (
                <ViewTodo todo={todo} setEditingTodo={setEditingTodo} />
              ) : (
                <EditTodo todo={todo} setEditingTodo={setEditingTodo} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
