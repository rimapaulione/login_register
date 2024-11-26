"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { UseCurrentUser } from "@/hooks/use-current-user";

function SettingsPage() {
  const user = UseCurrentUser();

  const onClick = () => {
    logout();
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      {/* Settings Page {JSON.stringify(user?.email)} */}
      <Button onClick={onClick} type="submit" variant="secondary">
        Sign out
      </Button>
    </div>
  );
}

export default SettingsPage;
