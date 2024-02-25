"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "../form-error";

type RoleGateProps = {
  children: React.ReactNode;
  requiredRole: "ADMIN" | "USER";
};

export default function RoleGate({ children, requiredRole }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== requiredRole) {
    return <FormError message="You do not have permission to view this content!" />;
  }

  return <>{children}</>;
}
