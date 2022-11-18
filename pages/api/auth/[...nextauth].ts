import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, newUser, userExists, loginRegister } from "@firebase";

export default NextAuth({
  providers: [
    Credentials({
      name: "Custom Login/Register",
      credentials: {
        name: {
          label: "Name:",
          type: "text",
          placeholder: "placeholderName",
        },
        email: {
          label: "Email:",
          type: "email",
          placeholder: "placeholder@email.com",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "placeholderPassword",
        },
      },
      async authorize(credentials) {
        return await loginRegister(
          credentials.email,
          credentials.password,
          credentials.name
        );
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  session: {
    strategy: "jwt",
    updateAge: 86400, // every day
    maxAge: 2592000, // 30 days
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        const userData = await getUserByEmail(user.email);

        if (userData) {
          token.user = userData;
          token.sub = userData.uid;
          token.picture = userData.image;
        } else {
          token.user = user;
          if (account.type === "credentials") {
            token.sub = user.uid;
          }
        }
      }
      return token;
    },
    async session({ token, session }) {
      const user = session.user;

      user.tag = session.user.name.split(" ").join("").toLocaleLowerCase();
      user.uid = token.sub;
      session.user = user;

      const exist = await userExists(user.uid);

      if (!exist) {
        newUser(user);
      }
      return session;
    },
  },
});
