import { gql, useQuery } from "@apollo/client";
import Error from "components/Error";
import Loader from "components/Loader";
import { apolloClient } from "lib/apollo-client";

export const DELETE_TODO = gql`
  mutation DeleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      id
      description
      isComplete
    }
  }
`;

export const GET_TODOS = gql`
  query Todos {
    todos {
      id
      description
      isComplete
    }
  }
`;

export default function Todo() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <Loader />;
  if (error) return <Error error={error} />;

  return (
    <div className="h-screen grid place-items-center">
      <h1 className="text-2xl">Todo</h1>
      <button
        onClick={async () => {
          await apolloClient.mutate({
            mutation: DELETE_TODO,
            variables: {
              input: {
                id: 1,
              },
            },
            refetchQueries: [
              {
                query: GET_TODOS,
              },
            ],
          });
        }}
      >
        Delete todo
      </button>
    </div>
  );
}
