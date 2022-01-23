import { gql } from "@apollo/client";
import { faCheck, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import Input from "components/Input";
import TextArea from "components/TextArea";
import { Form, Formik } from "formik";
import { apolloClient } from "lib/apollo-client";
import { GET_GREETINGS } from "pages/greeting";
import { validationSchema } from "../AddGreetingForm";
import { ViewGreetingProps } from "../ViewGreeting";

// TODO: Merge edit and add form into one

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
    mutation EditGreeting($input: EditGreetingInput!) {
      editGreeting(input: $input) {
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
      {({
        values: { id, title, comment },
        setFieldValue,
        errors,
        isValid,
        isSubmitting,
      }) => (
        <Form>
          <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg h-full w-72 transition duration-300 ">
            <div className="px-4 py-5 sm:p-6 space-y-4 h-full flex flex-col justify-between">
              <Input
                label="Title"
                placeholder="Some title..."
                error={errors.title}
                value={title}
                onChange={(event) => {
                  setFieldValue("title", event.target.value);
                }}
              />

              <TextArea
                label="Comment"
                placeholder={`Some comment...`}
                className="resize-none"
                value={comment}
                rows={5}
                onChange={(event) =>
                  setFieldValue("comment", event?.target.value)
                }
              />

              <div className="flex gap-1 items-center h-10">
                {/* Save */}
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!isValid ?? isSubmitting}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
                {/* Delete */}
                <Button
                  type="button"
                  onClick={() => deleteGreetingMutation(id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                {/* Cancel */}
                <Button type="reset" onClick={() => setEditingGreeting(null)}>
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
