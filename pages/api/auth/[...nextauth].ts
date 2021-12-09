import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

console.log(process.env.NODE_ENV);

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // GOOGLE
  ],
  secret: process.env.SECRET,
});
