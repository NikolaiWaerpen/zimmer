import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import Input from "components/Input";
import { Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import * as yup from "yup";

export const validationSchema = yup.object({
  address: yup
    .string()
    .required("Address required")
    .test("len", "Invalid address", (value) => {
      if (!value) return true;
      return value.length === 42;
    }),
});

type AddressFormProps = {
  setAddresses: Dispatch<SetStateAction<string[]>>;
};

// STORE ADDRESSES IN SEARCH PARAMS

export default function AddressForm({ setAddresses }: AddressFormProps) {
  return (
    <>
      <Formik
        initialValues={{ address: "" }}
        onSubmit={async ({ address }, { resetForm }) => {
          resetForm();
          setAddresses((previous) => [...previous, address]);
        }}
        validationSchema={validationSchema}
      >
        {({
          values: { address },
          setFieldValue,
          isSubmitting,
          isValid,
          errors,
        }) => (
          <Form autoComplete="none">
            <div className="flex gap-2">
              <div className="w-96">
                <Input
                  autoComplete="none"
                  label="Address"
                  placeholder="0xCeeeB66C5..."
                  type="text"
                  value={address}
                  onChange={(event) =>
                    setFieldValue("address", event?.target.value)
                  }
                  error={errors.address}
                />
              </div>

              <Button
                type="submit"
                disabled={!isValid ?? isSubmitting}
                loading={isSubmitting}
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
