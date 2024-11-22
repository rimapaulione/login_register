"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

function SettingsPage() {
  const session = useSession();

  return (
    <div>
      Settings Page {JSON.stringify(session.data?.user.name)}
      <form action={logout}>
        <Button type="submit" variant="secondary">
          Sign out
        </Button>
      </form>
    </div>
  );
}

export default SettingsPage;
