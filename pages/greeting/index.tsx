import { gql, useQuery } from "@apollo/client";
import CustomError from "components/CustomError";
import Divider from "components/Divider";
import AddGreetingForm from "components/greeting/AddGreetingForm";
import EditGreetingForm from "components/greeting/EditGreetingForm";
import ViewGreeting from "components/greeting/ViewGreeting";
import Loader from "components/Loader";
import { useState } from "react";
import dateToUnix from "utils/date-to-unix";

// TODO:
// make comment required
//

export const GET_GREETINGS = gql`
  query Greetings {
    greetings {
      id
      title
      comment
      createdAt
      author {
        id
        name
        email
        image
      }
    }
  }
`;

// TODO: fix this temp manual typing, until I get apollo codegen to work
export type GreetingType = {
  id: number;
  title: string;
  comment: string;
  createdAt: Date;
  author: {
    id: number;
    name: string;
    image: string;
    email: string;
  };
};

export default function Greeting() {
  const { loading, error, data } =
    useQuery<{ greetings: GreetingType[] }>(GET_GREETINGS);
  const [editingGreeting, setEditingGreeting] = useState<null | number>(null);

  if (loading) return <Loader fullscreen />;
  if (error ?? !data) return <CustomError error={error} />;

  const { greetings } = data;

  return (
    <div className="grid place-items-center">
      <div className="flex flex-col gap-8 my-16 lg:gap-0 lg:flex-row lg:justify-evenly lg:items-center lg:my-32">
        <div className="lg:w-1/2 xl:pr-16">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">Leave me a</span>{" "}
            <span className="block text-theme-4 xl:inline">greeting!</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Feel free to leave a greeting to tell me that you've visited and
            enjoyed the site!
          </p>
          <p className="mt-3 max-w-md mx-auto text-sm text-gray-500 sm:medium md:mt-5 md:max-w-3xl">
            There are no filters or banned words. This is trust-based. Please be
            polite :)
          </p>
        </div>

        <AddGreetingForm />
      </div>

      <div className="space-y-16 w-full grid place-items-center">
        <Divider label="Greetings" />
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[...greetings]
            .sort((a, b) => dateToUnix(a.createdAt) + dateToUnix(b.createdAt))
            .map((greeting) => {
              const { id } = greeting;
              return (
                <div key={id}>
                  {editingGreeting !== id ? (
                    <ViewGreeting
                      greeting={greeting}
                      setEditingGreeting={setEditingGreeting}
                    />
                  ) : (
                    <EditGreetingForm
                      greeting={greeting}
                      setEditingGreeting={setEditingGreeting}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
