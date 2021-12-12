import { gql } from "@apollo/client";
import { faCheck, faStop, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { apolloClient } from "lib/apollo-client";
import { GET_TODOS } from "pages";
import { validationSchema } from "../AddTodo";
import { ViewTodoProps } from "../ViewTodo";

const DELETE_TODO = gql`
  mutation DeleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      id
      description
      isComplete
    }
  }
`;

const EDIT_TODO = gql`
  mutation EditTodo($input: EditTodoInput!) {
    editTodo(input: $input) {
      id
    }
  }
`;

type EditTodoType = ViewTodoProps & {};

export default function EditTodo({ todo, setEditingTodo }: EditTodoType) {
  return (
    <Formik
      initialValues={todo}
      onSubmit={async ({ description, id }, {}) => {
        await apolloClient.mutate({
          mutation: EDIT_TODO,
          variables: {
            input: {
              description,
              id,
            },
          },
          refetchQueries: [
            {
              query: GET_TODOS,
            },
          ],
        });
        setEditingTodo(null);
      }}
      validationSchema={validationSchema}
    >
      {({ values: { description, id }, setFieldValue, errors }) => (
        <Form>
          <div className="flex">
            <input
              value={description}
              onChange={(event) => {
                setFieldValue("description", event.target.value);
              }}
            />
            <div className="flex">
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
              <button type="submit">
                <FontAwesomeIcon icon={faCheck} />
              </button>
              {/* Cancel */}
              <button type="reset" onClick={() => setEditingTodo(null)}>
                <FontAwesomeIcon icon={faStop} />
              </button>
            </div>
          </div>
          {errors && <span>{errors.description}</span>}
        </Form>
      )}
    </Formik>
  );
}
