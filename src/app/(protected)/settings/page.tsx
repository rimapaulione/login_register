"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { UseCurrentUser } from "@/hooks/use-current-user";
import { Session } from "inspector/promises";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

function SettingsPage() {
  //const user = UseCurrentUser();

  const session = useSession();

  console.log(`PAGE ${session.data?.user}`);

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
