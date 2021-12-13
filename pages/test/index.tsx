import { gql, useQuery } from "@apollo/client";
import Error from "components/Error";
import Loader from "components/Loader";

const GET_USER = gql`
  query GetUser($input: GetUserInput!) {
    user(input: $input) {
      id
      name
      email
      image
    }
  }
`;

export default function Test() {
  const { error, loading, data } = useQuery(GET_USER, {
    variables: {
      input: {
        email: "nikolaiwaerpen@gmail.com",
      },
    },
  });

  if (error) return <Error error={error} />;
  if (loading ?? !data) return <Loader />;

  return (
    <div className="h-screen">
      <div>{JSON.stringify(data.user, null, 2)}</div>
    </div>
  );
}
