import "next-auth";

declare module "next-auth" {
  interface User {
    uid: string;
    name: string;
    email: string;
    tag: string;
    image?: string;
  }

  export interface Session {
    user: User;
  }
}
