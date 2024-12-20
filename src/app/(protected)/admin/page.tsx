"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

function Adminpage() {
  async function onClickServerAction() {
    const result = await admin();

    if (result.error) toast.error("Forbidden Server Action");
    if (result.success) toast.success("Allowed Server Action");
  }

  async function onClickApiRoute() {
    const response = await fetch("/api/admin");
    if (!response.ok) {
      toast.error("Forbidden API Route");
    }
    if (response.ok) {
      toast.success("Allowed API Route");
    }
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin Page</p>
      </CardHeader>
      <CardContent className=" flex flex-col gap-y-5">
        <RoleGate allowedRole="ADMIN">
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onClickApiRoute}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onClickServerAction}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Adminpage;
