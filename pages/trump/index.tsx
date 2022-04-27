import { gql, useQuery } from "@apollo/client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import CustomError from "components/CustomError";
import Input from "components/Input";
import Loader from "components/Loader";
import Select, { SelectOptionType } from "components/Select";
import { Form, Formik } from "formik";
import { string } from "yup";

const GET_QUOTE_TAGS = gql`
  query GetQuouteTags {
    tags
  }
`;

type GetQuouteTagsType = {
  tags: string[];
};

type initialValuesType = {
  option: SelectOptionType;
  recipient: string;
};

const initialValues: initialValuesType = {
  option: { id: 0, value: "Select something..." },
  recipient: "",
};

export default function Trump() {
  const { loading, error, data } = useQuery<GetQuouteTagsType>(GET_QUOTE_TAGS);

  if (loading) return <Loader fullscreen />;
  if (error ?? !data) return <CustomError error={error} />;

  const { tags } = data;

  return (
    <div>
      <div>
        <h1>Trump</h1>
        <p>
          Get an SMS with some divine knowlegde, straight from The Donald
          himself!
        </p>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
        >
          {({
            values: { recipient, option },
            setFieldValue,
            isSubmitting,
            isValid,
            errors,
          }) => (
            <Form>
              <br />
              <Select
                label="What does Trump think about"
                options={tags}
                value={option}
                onChange={(value) => {
                  setFieldValue("option", value);
                }}
              />
              <br />

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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
