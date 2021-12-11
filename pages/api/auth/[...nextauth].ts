import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // GOOGLE
  ],
  callbacks: {
    redirect({ url, baseUrl }) {
      console.log("url", url);
      console.log("baseUrl", baseUrl);
      return baseUrl;
    },
  },
  secret: process.env.SECRET,
});
