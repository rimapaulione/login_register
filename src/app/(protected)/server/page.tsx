import { logout } from "@/actions/logout";
import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

async function ServerPage() {
  const user = await currentUser();

  if (user.signOut === true) {
    logout();
    return;
  }
  return <UserInfo label="Server component" user={user}></UserInfo>;
}
export default ServerPage;
