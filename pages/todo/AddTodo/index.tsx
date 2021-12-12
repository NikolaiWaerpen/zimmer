import { gql } from "@apollo/client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { apolloClient } from "lib/apollo-client";
import { GET_TODOS } from "..";
import * as yup from "yup";

const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      description
      isComplete
    }
  }
`;

const createTodoMutation = async (description: string) => {
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
};

const validationSchema = yup.object({
  description: yup
    .string()
    .required("Description required")
    .test("len", "Must be less than 25 characters", (value) => {
      if (!value) return true;
      return value.length < 26;
    }),
});

export default function AddTodo() {
  return (
    <Formik
      initialValues={{ description: "" }}
      onSubmit={async ({ description }, { resetForm }) => {
        createTodoMutation(description);
        resetForm();
      }}
      validationSchema={validationSchema}
    >
      {({ values: { description }, setFieldValue, errors }) => (
        <Form>
          <div className="flex">
            <input
              value={description}
              onChange={(event) => {
                setFieldValue("description", event.target.value);
              }}
            />

            {/* Save */}
            <button type="submit">
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
          {errors && <span>{errors.description}</span>}
        </Form>
      )}
    </Formik>
  );
}
