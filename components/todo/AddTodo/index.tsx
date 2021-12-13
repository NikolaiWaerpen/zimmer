import { gql } from "@apollo/client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { apolloClient } from "lib/apollo-client";
import { GET_TODOS } from "../../../pages/todo";
import * as yup from "yup";
import { MAX_TODO_CHARACTER_INPUT } from "consts";
import Input from "components/Input";
import Button from "components/Button";

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
    .test(
      "len",
      `Must be less than ${MAX_TODO_CHARACTER_INPUT} characters`,
      (value) => {
        if (!value) return true;
        return value.length <= MAX_TODO_CHARACTER_INPUT;
      }
    ),
});

export default function AddTodo() {
  return (
    <Formik
      initialValues={{ description: "" }}
      onSubmit={async ({ description }, { resetForm }) => {
        await createTodoMutation(description);
        resetForm();
      }}
      validationSchema={validationSchema}
    >
      {({ values: { description }, setFieldValue, errors, isSubmitting }) => (
        <Form>
          <div className="flex">
            <Input
              error={errors.description}
              placeholder="Add something todo..."
              type="text"
              value={description}
              onChange={(event) =>
                setFieldValue("description", event?.target.value)
              }
            />

            <Button type="submit" loading={isSubmitting}>
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
