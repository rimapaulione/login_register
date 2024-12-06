"use client";

import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";

function SettingsPage() {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const [name, setName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onClick = () => {
    startTransition(() => {
      settings({
        name,
      }).then(() => update());
    });
  };
  return (
    <Card className="W-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent>
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
        <Button disabled={isPending} onClick={onClick}>
          Update name
        </Button>
      </CardContent>
    </Card>
  );
}

export default SettingsPage;
