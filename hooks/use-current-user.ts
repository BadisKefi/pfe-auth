import { ExtendedUser } from "@/next-auth";
import { useSession } from "next-auth/react";

export const useCurrentUser = (): ExtendedUser => {
  const session = useSession();
  if (session && session.data && session.data.user)
    return session.data.user as ExtendedUser;

  return {} as ExtendedUser;
};
