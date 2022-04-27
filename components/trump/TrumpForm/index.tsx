import { gql, useQuery } from "@apollo/client";
import Button from "components/Button";
import CustomError from "components/CustomError";
import Input from "components/Input";
import Loader from "components/Loader";
import Select from "components/Select";
import { QUOTE_COOLDOWN_MINUTES } from "consts";
import { Form, Formik } from "formik";
import { apolloClient } from "lib/apollo-client";
import * as yup from "yup";

const SEND_TRUMP_QUOTE = gql`
  mutation SendTrumpQuote($input: SendTrumpQuoteInput!) {
    sendTrumpQuote(input: $input)
  }
`;

type SendTrumpQuoteParams = {
  recipient: string;
  tag: string;
};

async function sendTrumpQuote({ recipient, tag }: SendTrumpQuoteParams) {
  await apolloClient.mutate({
    mutation: SEND_TRUMP_QUOTE,
    variables: {
      input: {
        tag,
        recipient: `47${recipient}`,
      },
    },
  });
}

type initialValuesType = {
  tag: string;
  recipient: string;
};

const initialValues: initialValuesType = {
  tag: "Women",
  recipient: "",
};

export const validationSchema = yup.object({
  tag: yup.string().required("Tag required"),
  // TODO: Improve this validation
  recipient: yup
    .string()
    .test(
      "length",
      "Phone number has to be 8 digits",
      (value) => value !== undefined && value.length === 8
    )
    .required("Phone number required"),
});

type TrumpFromPropTypes = {
  tags: string[];
};

export default function TrumpForm({ tags }: TrumpFromPropTypes) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async ({ tag, recipient }, { resetForm }) => {
        const lastQuote = localStorage.getItem("last-quote");

        if (lastQuote) {
          const submittedRecently =
            parseInt(lastQuote) + QUOTE_COOLDOWN_MINUTES * 60000 > Date.now();

          if (submittedRecently) {
            console.log(`Trump is on a cooldown`);
            return;
            // TODO: some user show logic here
          }
        }

        console.log(tag, recipient);

        await sendTrumpQuote({ tag, recipient });

        localStorage.setItem("last-quote", `${Date.now()}`);
        resetForm();
      }}
    >
      {({
        values: { tag, recipient },
        setFieldValue,
        isSubmitting,
        isValid,
        errors,
      }) => (
        <Form>
          <div className="flex flex-col gap-4">
            <Select
              label="I want to know what Trump thinks about"
              options={tags}
              value={tag}
              onChange={(value) => {
                setFieldValue("tag", value);
              }}
              error={errors.tag}
            />

            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  autoComplete="none"
                  label="Phone number"
                  placeholder="92209473"
                  type="tel"
                  value={recipient}
                  onChange={(event) =>
                    setFieldValue("recipient", event?.target.value)
                  }
                  error={errors.recipient}
                />
              </div>

              <Button
                type="submit"
                disabled={!isValid ?? isSubmitting}
                loading={isSubmitting}
              >
                Send message
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
