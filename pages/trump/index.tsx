import { gql, useQuery } from "@apollo/client";
import Alert from "components/Alert";
import Button from "components/Button";
import CustomError from "components/CustomError";
import Loader from "components/Loader";
import TrumpAnimation from "components/trump/TrumpAnimation";
import TrumpForm from "components/trump/TrumpForm";
import { SMS_COOLDOWN_MINUTES } from "consts";
import { useEffect, useState } from "react";
import { Element, Link } from "react-scroll";

const GET_QUOTE_TAGS = gql`
  query GetQuouteTags {
    tags
  }
`;

type GetQuouteTagsType = {
  tags: string[];
};

export default function Trump() {
  const { loading, error, data } = useQuery<GetQuouteTagsType>(GET_QUOTE_TAGS);
  const [beamedRecently, setBeamedRecently] = useState(false);

  useEffect(() => {
    const lastSMS = localStorage.getItem("last-quote");

    if (lastSMS)
      setBeamedRecently(
        parseInt(lastSMS) + SMS_COOLDOWN_MINUTES * 60000 > Date.now()
      );
  }, []);

  if (loading) return <Loader fullscreen />;
  if (error ?? !data) return <CustomError error={error} />;

  const { tags } = data;

  return (
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
                <div className="mt-6 flex">
                  <Link to="TrumpForm" spy={true} smooth={true} duration={500}>
                    <Button>Try it out!</Button>
                  </Link>
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
      <div className="mt-48">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
            <Element name="TrumpForm">
              {beamedRecently ? (
                <Alert
                  title="Check your phone"
                  description={`You just got beamed a Trump thought. That took a lot of brainpower, and he's an old man, so now you gotta wait ${SMS_COOLDOWN_MINUTES} minutes \n(and also because it's a pricy API and I don't want to drain my wallet)`}
                  state="default"
                />
              ) : (
                <TrumpForm tags={tags} setBeamedRecently={setBeamedRecently} />
              )}
            </Element>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
            <img
              className="w-full rounded-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto object-cover"
              src="https://i.imgflip.com/1a2ccv.jpg"
              alt="'Merica"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
