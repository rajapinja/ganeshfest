// components/RoleGuard.jsx
import { hasRole } from "../utils/auth";

export default function RoleGuard({ role, children }) {
  if (!hasRole(role)) {
    return <p className="text-red-600">Access Denied</p>;
  }
  return <>{children}</>;
}
