import { gql } from "@apollo/client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "components/Alert";
import Button from "components/Button";
import CustomError from "components/CustomError";
import Input from "components/Input";
import TextArea from "components/TextArea";
import UserImage from "components/UserImage";
import { MAX_GREETING_COMMENT_LENGTH, MAX_GREETING_TITLE_LENGTH } from "consts";
import { Form, Formik } from "formik";
import { apolloClient } from "lib/apollo-client";
import { useSession } from "next-auth/react";
import * as yup from "yup";
import { GET_GREETINGS } from "../../../pages/greeting";

const createGreetingMutation = async (title: string, comment: string) => {
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

export const validationSchema = yup.object({
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
    .required("Comment required")
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
  const { data: session } = useSession();

  if (session === null)
    return (
      <Alert
        state="warning"
        title="Sign in to leave a greeting"
        // description="Sign in to leave me a greeting :)"
      />
    );

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
          isSubmitting,
          isValid,
        }) => (
          <Form>
            <div className="flex flex-col gap-4">
              {/* TODO: Consider turning this into a title and pill actions (w/ emotions) https://tailwindui.com/components/application-ui/forms/textareas */}
              <Input
                label="Title"
                placeholder="Hey Nikolai!"
                type="text"
                value={title}
                onChange={(event) =>
                  setFieldValue("title", event?.target.value)
                }
              />
              <TextArea
                label="Comment"
                placeholder={`Awesome site! Good job. \nLove, ${
                  session.user?.name?.split(" ")[0]
                }`}
                className="resize-none"
                value={comment}
                rows={5}
                onChange={(event) =>
                  setFieldValue("comment", event?.target.value)
                }
              />
              <div className="flex gap-2 items-center ">
                <Button
                  className="w-full h-full"
                  type="submit"
                  disabled={!isValid ?? isSubmitting}
                  loading={isSubmitting}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
                <UserImage
                  src={session.user!.image!}
                  alt={`${session.user!.name!}`}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
