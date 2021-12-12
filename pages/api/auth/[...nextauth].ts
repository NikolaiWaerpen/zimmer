import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { request, gql } from "graphql-request";
import { BACKEND_CLIENT } from "consts";

type CreateUserInDBArgs = {
  email: string;
  name: string;
  image: string;
};

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

async function createUserInDB(user: CreateUserInDBArgs) {
  const { name, email, image } = user;

  return new Promise(async (resolve, reject) => {
    const createdUser = await BACKEND_CLIENT.request(createUser, {
      input: {
        name,
        email,
        image,
      },
    });

    if (!createdUser) reject("User failed to create");
    if (createdUser) resolve("User created");
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

      try {
        // @ts-ignore TEMPORARY
        await createUserInDB(user);
      } catch (error) {
        console.log(error);
      }

      return true;
    },
  },
});
