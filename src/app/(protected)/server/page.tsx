import { auth } from "@/auth";
import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

async function ServerPage() {
  const session = await auth();
  //const user = await currentUser();

  const user = session?.user;
  console.log(user);
  return <UserInfo label="Server component" user={user}></UserInfo>;
}
export default ServerPage;
