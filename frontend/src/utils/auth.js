// src/utils/auth.js
import keycloak from "../keycloak/Keycloak";

/**
 * Check if the current user has a specific role
 */
export function hasRole(role) {
  if (!keycloak.authenticated) return false;

  // Roles assigned at realm level
  const realmRoles = keycloak.realmAccess?.roles || [];

  // Roles assigned at client level (replace with your clientId)
  const clientRoles =
    keycloak.resourceAccess?.["ganesh-fest-ui"]?.roles || [];

  return realmRoles.includes(role) || clientRoles.includes(role);
}
