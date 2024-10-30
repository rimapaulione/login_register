import { logout } from "@/actions/logout";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

async function SettingsPage() {
  const session = await auth();

  return (
    <div>
      Settings Page {JSON.stringify(session)}
      <form action={logout}>
        <Button type="submit" variant="secondary">
          Sign out
        </Button>
      </form>
    </div>
  );
}

export default SettingsPage;
