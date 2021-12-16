import { gql } from "@apollo/client";
import { faCheck, faStop, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import Input from "components/Input";
import { MAX_GREETING_COMMENT_LENGTH, MAX_GREETING_TITLE_LENGTH } from "consts";
import { Form, Formik } from "formik";
import { apolloClient } from "lib/apollo-client";
import { GET_GREETINGS } from "pages/greeting";
import * as yup from "yup";
import { ViewGreetingProps } from "../ViewGreeting";

const deleteGreetingMutation = async (id: number) => {
  const DELETE_GREETING = gql`
    mutation DeleteGreeting($input: DeleteGreetingInput!) {
      deleteGreeting(input: $input) {
        id
      }
    }
  `;

  await apolloClient.mutate({
    mutation: DELETE_GREETING,
    variables: {
      input: {
        id,
      },
    },
    refetchQueries: [
      {
        query: GET_GREETINGS,
      },
    ],
  });
};

const EditGreetingFormMutation = async (
  id: number,
  title: string,
  comment: string
) => {
  const EDIT_GREETING = gql`
    mutation EditGreetingForm($input: EditGreetingFormInput!) {
      EditGreetingForm(input: $input) {
        id
      }
    }
  `;

  await apolloClient.mutate({
    mutation: EDIT_GREETING,
    variables: {
      input: {
        id,
        title,
        comment,
      },
    },
    refetchQueries: [
      {
        query: GET_GREETINGS,
      },
    ],
  });
};

const validationSchema = yup.object({
  title: yup
    .string()
    .test(
      "len",
      `Title must be less than ${MAX_GREETING_TITLE_LENGTH} characters`,
      (value) => {
        if (!value) return true;
        return value.length <= MAX_GREETING_TITLE_LENGTH;
      }
    ),
  comment: yup
    .string()
    .test(
      "len",
      `Comment must be less than ${MAX_GREETING_COMMENT_LENGTH} characters`,
      (value) => {
        if (!value) return true;
        return value.length <= MAX_GREETING_COMMENT_LENGTH;
      }
    ),
});

type EditGreetingFormType = ViewGreetingProps & {};

export default function EditGreetingForm({
  greeting,
  setEditingGreeting,
}: EditGreetingFormType) {
  return (
    <Formik
      initialValues={greeting}
      onSubmit={async ({ id, title, comment }) => {
        if (title && comment) EditGreetingFormMutation(id, title, comment);
        else deleteGreetingMutation(id);
        setEditingGreeting(null);
      }}
      validationSchema={validationSchema}
    >
      {({ values: { id, title, comment }, setFieldValue, errors }) => (
        <Form className="flex">
          <Input
            placeholder="Some title..."
            error={errors.title}
            value={title}
            onChange={(event) => {
              setFieldValue("title", event.target.value);
            }}
          />
          <Input
            placeholder="Some comment..."
            error={errors.comment}
            value={comment}
            onChange={(event) => {
              setFieldValue("comment", event.target.value);
            }}
          />
          <div className="flex">
            {/* Delete */}
            <Button type="button" onClick={() => deleteGreetingMutation(id)}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
            {/* Save */}
            <Button type="submit">
              <FontAwesomeIcon icon={faCheck} />
            </Button>
            {/* Cancel */}
            <Button type="reset" onClick={() => setEditingGreeting(null)}>
              <FontAwesomeIcon icon={faStop} />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
