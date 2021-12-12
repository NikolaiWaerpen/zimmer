import { gql } from "@apollo/client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { apolloClient } from "lib/apollo-client";
import { GET_TODOS } from ".";

type AddTodoProps = {};

const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      description
      isComplete
    }
  }
`;

export default function AddTodo({}: AddTodoProps) {
  return (
    <Formik
      initialValues={{ description: "" }}
      onSubmit={async ({ description }, { resetForm }) => {
        await apolloClient.mutate({
          mutation: CREATE_TODO,
          variables: {
            input: {
              description,
            },
          },
          refetchQueries: [
            {
              query: GET_TODOS,
            },
          ],
        });
        resetForm();
      }}
    >
      {({ values: { description }, setFieldValue }) => (
        <Form className="flex">
          <input
            value={description}
            onChange={(event) => {
              setFieldValue("description", event.target.value);
            }}
          />
          <div className="flex">
            {/* Save */}
            <button type="submit">
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
