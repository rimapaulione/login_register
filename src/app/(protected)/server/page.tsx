import { auth } from "@/auth";
import { UserInfo } from "@/components/user-info";

async function Server() {
  const session = await auth();
  return <UserInfo label="Server component" user={session?.user}></UserInfo>;
}
export default Server;
