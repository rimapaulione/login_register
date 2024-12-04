"use client";

import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

function SettingsPage() {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const onClick = () => {
    startTransition(() => {
      settings({
        name: "Rimaaaaa",
      }).then(() => update());
    });
  };
  return (
    <Card className="W-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>
          Update name
        </Button>
      </CardContent>
    </Card>
  );
}

export default SettingsPage;
