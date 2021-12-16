import { gql } from "@apollo/client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import Input from "components/Input";
import TextArea from "components/TextArea";
import { MAX_GREETING_COMMENT_LENGTH, MAX_GREETING_TITLE_LENGTH } from "consts";
import { Form, Formik } from "formik";
import { apolloClient } from "lib/apollo-client";
import * as yup from "yup";
import { GET_GREETINGS } from "../../../pages/greeting";

const CREATE_GREETING = gql`
  mutation CreateGreeting($input: CreateGreetingInput!) {
    createGreeting(input: $input) {
      id
      title
      comment
      createdAt
      author {
        id
        email
        image
        name
      }
    }
  }
`;

const createGreetingMutation = async (title: string, comment: string) => {
  await apolloClient.mutate({
    mutation: CREATE_GREETING,
    variables: {
      input: {
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
    .required("Title required")
    .test(
      "len",
      `Must be less than ${MAX_GREETING_TITLE_LENGTH} characters`,
      (value) => {
        if (!value) return true;
        return value.length <= MAX_GREETING_TITLE_LENGTH;
      }
    ),
  comment: yup
    .string()
    .test(
      "len",
      `Must be less than ${MAX_GREETING_COMMENT_LENGTH} characters`,
      (value) => {
        if (!value) return true;
        return value.length <= MAX_GREETING_COMMENT_LENGTH;
      }
    ),
});

export default function AddGreetingForm() {
  return (
    <>
      <Formik
        initialValues={{ title: "", comment: "" }}
        onSubmit={async ({ title, comment }, { resetForm }) => {
          await createGreetingMutation(title, comment);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({
          values: { title, comment },
          setFieldValue,
          errors,
          isSubmitting,
        }) => (
          <Form>
            <div className="flex flex-col gap-4">
              {/* TODO: Consider turning this into a title and pill actions (w/ emotions) https://tailwindui.com/components/application-ui/forms/textareas */}
              <Input
                label="Title"
                required
                error={errors.title}
                placeholder="Hey Nikolai!"
                type="text"
                value={title}
                onChange={(event) =>
                  setFieldValue("title", event?.target.value)
                }
              />
              <TextArea
                label="Comment"
                error={errors.comment}
                placeholder="Awesome website! Good job"
                value={comment}
                rows={5}
                onChange={(event) =>
                  setFieldValue("comment", event?.target.value)
                }
              />
              <Button type="submit" loading={isSubmitting}>
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}