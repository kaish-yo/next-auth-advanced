import { useSession } from "next-auth/react";

// a hook to get the current user without a long dot access
export const useCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
};
