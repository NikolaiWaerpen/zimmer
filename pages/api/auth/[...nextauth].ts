import { gql } from "graphql-request";
import { BACKEND_CLIENT } from "lib/graphql-client";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

type CreateUserInDBArgs = {
  email: string;
  name: string;
  image: string;
};

async function createOrUpdateUserInDB(user: CreateUserInDBArgs) {
  const createUser = gql`
    mutation CreateUser($input: CreateOrUpdateUserInput!) {
      createOrUpdateUser(input: $input) {
        id
        name
        email
        image
      }
    }
  `;

  const { name, email, image } = user;

  return await BACKEND_CLIENT.request(createUser, {
    input: {
      name,
      email,
      image,
    },
  });
}

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // GOOGLE
  ],
  secret: process.env.SECRET,
  callbacks: {
    signIn: async ({ user }) => {
      if (!user ?? !user.name ?? !user.email ?? !user.image) return false;

      return true;
    },
  },
});
