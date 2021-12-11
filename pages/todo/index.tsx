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

type ViewTodoProps = TodosType & {
  setStatus: (status?: any) => void;
};

function ViewTodo({ id, description, isComplete, setStatus }: ViewTodoProps) {
  return (
    <div>
      <p className={``}>{description}</p>
      <div>{isComplete ? "Complete" : "Not complete"}</div>
      <button type="button" onClick={() => setStatus({ editingTodo: id })}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>
    </div>
  );
}

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

// TODO: Change form logic

// temp manual typing, until I get apollo codegen to work
type TodosType = {
  id: number;
  description: string;
  isComplete: boolean;
};

const initialStatus = { editingTodo: null, todoUserInput: "" };

export default function Todo() {
  const { loading, error, data } = useQuery<{ todos: TodosType[] }>(GET_TODOS);

  if (loading) return <Loader />;
  if (error ?? !data) return <Error error={error} />;

  const { todos } = data;

  return (
    <div className="grid place-items-center h-screen">
      <Formik
        initialValues={todos}
        onSubmit={(todos, {}) => {
          console.log();
        }}
        initialStatus={initialStatus}
      >
        {({ values, status, setStatus }) => {
          const { editingTodo, editInput } = status;
          return (
            <Form className="space-y-2">
              <h1 className="text-2xl text-center">Todo</h1>
              <div>
                {values.map(({ id, description, isComplete }) => {
                  return (
                    <div key={id}>
                      {editingTodo !== id ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={async () => {
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
                            }}
                          >
                            <FontAwesomeIcon icon={faCircle} />
                          </button>
                          <p className={isComplete ? "text-gray-600" : ""}>
                            {description}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              setStatus({
                                editingTodo: id,
                                editInput: description,
                              })
                            }
                          >
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex">
                          <input
                            value={editInput}
                            onChange={(event) => {
                              setStatus({
                                ...status,
                                editInput: event.target.value,
                              });
                            }}
                          />
                          <div className="flex">
                            {/* Cancel */}
                            <button
                              type="button"
                              onClick={() => setStatus(initialStatus)}
                            >
                              <FontAwesomeIcon icon={faStop} />
                            </button>
                            {/* Delete */}
                            <button
                              type="button"
                              onClick={async () => {
                                await apolloClient.mutate({
                                  mutation: DELETE_TODO,
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
                              }}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                            {/* Save */}
                            <button
                              type="button"
                              onClick={async () => {
                                await apolloClient.mutate({
                                  mutation: EDIT_TODO,
                                  variables: {
                                    input: {
                                      description: editInput,
                                      id,
                                    },
                                  },
                                  refetchQueries: [
                                    {
                                      query: GET_TODOS,
                                    },
                                  ],
                                });
                                setStatus(initialStatus);
                              }}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
