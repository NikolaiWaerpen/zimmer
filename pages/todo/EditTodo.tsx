import { faCheck, faStop, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { apolloClient } from "lib/apollo-client";
import { GET_TODOS } from "pages";
import { Dispatch, SetStateAction } from "react";
import { COMPLETE_TODO, DELETE_TODO, EDIT_TODO, TodoType } from ".";
import { ViewTodoProps } from "./ViewTodo";

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
    >
      {({ values: { description, id }, setFieldValue }) => {
        return (
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
          </Form>
        );
      }}
    </Formik>
  );
}
