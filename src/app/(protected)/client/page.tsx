"use client";

import { logout } from "@/actions/logout";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

function ClientPage() {
  const user = useCurrentUser();

  return <UserInfo label="Client component" user={user}></UserInfo>;
}
export default ClientPage;
