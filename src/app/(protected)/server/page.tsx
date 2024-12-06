import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

async function ServerPage() {
  const user = await currentUser();
  console.log(user);
  return <UserInfo label="Server component" user={user}></UserInfo>;
}
export default ServerPage;
