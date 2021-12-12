import { gql } from "@apollo/client";
import { faCheck, faStop, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { apolloClient } from "lib/apollo-client";
import { GET_TODOS } from "pages";
import { ViewTodoProps } from "../ViewTodo";
import * as yup from "yup";
import { MAX_TODO_CHARACTER_INPUT } from "consts";

const DELETE_TODO = gql`
  mutation DeleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      id
      description
      isComplete
    }
  }
`;

const deleteTodoMutation = async (id: number) => {
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
};

const EDIT_TODO = gql`
  mutation EditTodo($input: EditTodoInput!) {
    editTodo(input: $input) {
      id
    }
  }
`;

const editTodoMutation = async (id: number, description: string) => {
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
};

const validationSchema = yup.object({
  description: yup
    .string()
    .test(
      "len",
      `Must be less than ${MAX_TODO_CHARACTER_INPUT} characters`,
      (value) => {
        if (!value) return true;
        return value.length <= MAX_TODO_CHARACTER_INPUT;
      }
    ),
});

type EditTodoType = ViewTodoProps & {};

export default function EditTodo({ todo, setEditingTodo }: EditTodoType) {
  return (
    <Formik
      initialValues={todo}
      onSubmit={async ({ description, id }) => {
        if (description) editTodoMutation(id, description);
        else deleteTodoMutation(id);
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
              <button type="button" onClick={() => deleteTodoMutation(id)}>
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
