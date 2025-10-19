import { useKeycloakAuth } from "../keycloak/KeycloakProvider";

export default function Dashboard() {
  const { keycloak } = useKeycloakAuth();

  return (
    <div>
      <h1>Welcome {keycloak.tokenParsed?.preferred_username}</h1>
      {keycloak.hasRealmRole("vendor") && <p>You are a vendor 🛒</p>}
      {keycloak.hasRealmRole("customer") && <p>You are a customer 👤</p>}
    </div>
  );
}
