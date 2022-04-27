import { gql, useQuery } from "@apollo/client";
import Button from "components/Button";
import CustomError from "components/CustomError";
import Input from "components/Input";
import Loader from "components/Loader";
import Select from "components/Select";
import TrumpAnimation from "components/trump/TrumpAnimation";
import TrumpForm from "components/trump/TrumpForm";
import { QUOTE_COOLDOWN_MINUTES } from "consts";
import { Form, Formik } from "formik";
import { apolloClient } from "lib/apollo-client";
import * as yup from "yup";
import { InboxIcon, SparklesIcon } from "@heroicons/react/outline";

const GET_QUOTE_TAGS = gql`
  query GetQuouteTags {
    tags
  }
`;

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
  try {
    await apolloClient.mutate({
      mutation: SEND_TRUMP_QUOTE,
      variables: {
        input: {
          tag,
          recipient: `47${recipient}`,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

type GetQuouteTagsType = {
  tags: string[];
};

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

export default function Trump() {
  const { loading, error, data } = useQuery<GetQuouteTagsType>(GET_QUOTE_TAGS);

  if (loading) return <Loader fullscreen />;
  if (error ?? !data) return <CustomError error={error} />;

  const { tags } = data;

  return (
    // <div>
    //   <div>
    //     <h1>Trump</h1>
    //     <p>
    //       Get an SMS with some divine knowlegde, straight from The Donald
    //       himself!
    //     </p>
    //   </div>

    //   <TrumpAnimation />
    //   <TrumpForm tags={tags} />
    // </div>
    <div className="relative bg-white pt-16 pb-32 overflow-hidden">
      <div className="relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div className="mt-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-800">
                  Ever wondered what{" "}
                  <span className="text-theme-4">Donald Trump</span> thinks?
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  <span className="font-bold">Me neither.</span> But I wanted to
                  try sending SMS through code, and this was the best project
                  idea I came up with during a 2-minute brainstorm to implement
                  that.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  You can beam <span className="italic">The Donald's</span>{" "}
                  unfiltered thoughts straight to your cellular device. Just
                  fill in what you want his thoughts on, your phone number and
                  press send! It's as easy as that.
                </p>
                <div className="mt-6">
                  {/* TODO: SCROLL DOWN */}
                  <Button>Try it out!</Button>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-base font-semibold text-theme-5 tracking-wide uppercase">
                A little taste of what to expect:
              </h2>
              <blockquote>
                <div>
                  <p className="text-base text-gray-500">
                    &ldquo;The concept of global warming was created by and for
                    the Chinese in order to make U.S. manufacturing
                    non-competitive.&rdquo;
                  </p>
                </div>
                <footer className="mt-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-6 w-6 rounded-full"
                        src="https://www.deburghgroup.com/wp-content/uploads/2016/10/DONALD-TRUMP.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-base font-medium text-gray-700">
                      Donald Trump, 2012
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full flex w-full items-end justify-center">
              <TrumpAnimation />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
            <div>
              <TrumpForm tags={tags} />
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
            <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <img
                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                src="https://tailwindui.com/img/component-images/inbox-app-screenshot-2.jpg"
                alt="Customer profile user interface"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
