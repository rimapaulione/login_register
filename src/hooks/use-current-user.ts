import { useSession } from "next-auth/react";

export function UseCurrentUser() {
  const session = useSession();
  return session.data?.user;
}
