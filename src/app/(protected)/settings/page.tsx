"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

function SettingsPage() {
  const session = useSession();

  const onClick = () => {
    logout();
  };

  return (
    <div>
      Settings Page {JSON.stringify(session?.data?.user.email)}
      <Button onClick={onClick} type="submit" variant="secondary">
        Sign out
      </Button>
    </div>
  );
}

export default SettingsPage;
