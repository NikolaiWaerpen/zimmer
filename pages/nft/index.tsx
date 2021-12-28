import { gql, useQuery } from "@apollo/client";
import Button from "components/Button";
import CustomError from "components/CustomError";
import Loader from "components/Loader";
import { apolloClient } from "lib/apollo-client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const noNFT = [
  {
    name: "CLONE X - X TAKASHI MURAKAMI",
    collection: "clonex",
    url: "",
  },
  {
    name: "Rude Boys",
    collection: "rude-boys",
  },
  {
    name: "CryptoPunks",
    collection: "cryptopunks",
    url: "",
  },
  {
    name: "Bored Ape Yacht Club",
    collection: "boredapeyachtclub",
    url: "",
  },
];

async function updatePublicAddress(email: string, publicAddress: string) {
  const UPDATE_PUBLIC_ADDRESS = gql`
    mutation UpdatePublicAddress($input: UpdatePublicAddressInput!) {
      updatePublicAddress(input: $input) {
        email
        publicAddress
      }
    }
  `;

  await apolloClient.mutate({
    mutation: UPDATE_PUBLIC_ADDRESS,
    variables: {
      input: {
        email,
        publicAddress,
      },
    },
    refetchQueries: [
      {
        query: GET_USER,
        variables: {
          input: {
            email,
          },
        },
      },
    ],
  });
}

export const GET_USER = gql`
  query User($input: GetUserInput!) {
    user(input: $input) {
      id
      name
      email
      image
      publicAddress
    }
  }
`;

type UserType = {
  id: string;
  name: string;
  email: string;
  image: string;
  publicAddress: string | null;
};

export type UserDataType = {
  user: UserType;
};

export default function NFT() {
  const { data: session } = useSession();
  const { loading, error, data } = useQuery<UserDataType>(GET_USER, {
    variables: {
      input: {
        email: session!.user!.email,
      },
    },
  });

  if (error) return <CustomError error={error} />;
  if (loading ?? !data) return <Loader />;

  // @ts-ignore
  if (!ethereum as any)
    return <CustomError error={new Error("No ethereum in browser")} />;

  const {
    user: { publicAddress },
  } = data;

  return (
    <div>
      {!publicAddress ? (
        <Button
          onClick={async () => {
            // @ts-ignore
            const publicAddresses = await ethereum.request({
              method: "eth_requestAccounts",
            });
            const publicAddress = publicAddresses[0] as string;

            await updatePublicAddress(session!.user!.email!, publicAddress);
          }}
        >
          Connect ethereum
        </Button>
      ) : (
        <div>
          <h1 className="block text-center">
            Your public address: {publicAddress}
          </h1>
          <br />
          <br />
          <br />
          <ul className="grid place-items-center gap-16 text-6xl">
            {noNFT.map(({ name, collection, url }, key) => (
              <li key={key}>
                <Link href={`nft/${collection}`}>
                  <a>{name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
