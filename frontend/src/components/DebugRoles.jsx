import { useAuth } from "../context/AuthContext";

export default function DebugRoles() {
  const { roles, hasRole, hasAnyRole, authenticated } = useAuth();

  console.log("✅ Authenticated:", authenticated);
  console.log("✅ Roles:", roles);
  console.log("✅ Has vendor:", hasRole("vendor"));
  console.log("✅ Has customer:", hasRole("customer"));
  console.log("✅ Has any [vendor, admin]:", hasAnyRole(["vendor", "admin"]));

  return (
    <div className="p-4">
      <h2 className="font-bold">Auth Debug</h2>
      <pre>{JSON.stringify({ authenticated, roles }, null, 2)}</pre>
    </div>
  );
}
