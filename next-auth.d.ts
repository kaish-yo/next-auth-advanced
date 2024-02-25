import { DefaultSession } from "next-auth";

export type ExtendetUser = {
  id: string;
  role: "ADMIN" | "USER";
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
} & DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: ExtendetUser;
  }
}
