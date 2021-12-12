import { gql, useQuery } from "@apollo/client";
import Error from "components/Error";
import Loader from "components/Loader";
import EditTodo from "components/todo/EditTodo";
import ViewTodo from "components/todo/ViewTodo";
import { useState } from "react";
import AddTodo from "../../components/todo/AddTodo";

export const GET_TODOS = gql`
  query Todos {
    todos {
      id
      description
      isComplete
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
        <h1 className="text-2xl text-center">Add Todo:</h1>
        <AddTodo />
        <h1 className="text-2xl text-center">Todos:</h1>
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
