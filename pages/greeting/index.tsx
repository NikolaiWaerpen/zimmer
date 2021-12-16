import { gql, useQuery } from "@apollo/client";
import Divider from "components/Divider";
import Error from "components/Error";
import AddGreeting from "components/greeting/AddGreeting";
import EditGreeting from "components/greeting/EditGreeting";
import ViewGreeting from "components/greeting/ViewGreeting";
import Loader from "components/Loader";
import { useState } from "react";

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

// temp manual typing, until I get apollo codegen to work
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
  const [editGreeting, setEditingGreeting] = useState<null | number>(null);

  if (loading) return <Loader />;
  if (error ?? !data) return <Error error={error} />;

  const { greetings } = data;

  return (
    <div className="grid place-items-center space-y-16">
      <AddGreeting />

      <Divider label="Greetings" />
      <div className="grid gap-4 grid-cols-3">
        {greetings.map((greeting) => {
          const { id } = greeting;
          return (
            <div key={id}>
              {editGreeting !== id ? (
                <ViewGreeting
                  greeting={greeting}
                  setEditingGreeting={setEditingGreeting}
                />
              ) : (
                <EditGreeting
                  greeting={greeting}
                  setEditingGreeting={setEditingGreeting}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
