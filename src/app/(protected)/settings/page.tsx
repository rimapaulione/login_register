"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

function SettingsPage() {
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };

  return (
    <div className="bg-white p-10 rounded-xl flex flex-col space-y-4">
      <p className="text-2xl text-center font-semibold">Settings Page</p>
      <p>Hello {JSON.stringify(user?.email)}</p>
      <Button onClick={onClick} type="submit" variant="secondary">
        Sign out
      </Button>
    </div>
  );
}

export default SettingsPage;
