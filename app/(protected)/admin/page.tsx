"use client";
import { admin } from "@/actions/admin";
import RoleGate from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
// import { currentRole } from "@/lib/auth"; // server component
// import { useCurrentRole } from "@/hooks/use-current-role"; // client component

export default function AdminPage() {
  // const role = await currentRole(); // server component
  // const role = useCurrentRole(); // client component
  const onApiRouteClick = () => {
    fetch("/api/admin/").then((res) => {
      if (res.ok) {
        // console.log("Admin API Route Success!");
        toast.success("Admin API Route Success!");
      } else {
        toast.error("Admin API Route Failed!");
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.success);
      } else {
        toast.error(data.error);
      }
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔒Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate requiredRole="ADMIN">
          <FormSuccess message="You are allowed to view this content!" />
        </RoleGate>
        <div
          className="flex flex-row items-center 
          justify-between rounded-lg border p-3 shadow-md"
        >
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div
          className="flex flex-row items-center 
          justify-between rounded-lg border p-3 shadow-md"
        >
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
