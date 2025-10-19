import React, { createContext, useContext, useEffect, useState } from "react";
import keycloak from "../keycloak/Keycloak";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    authenticated: false,
    token: null,
    roles: [],
  });

  useEffect(() => {
    if (keycloak?.authenticated) {
      const realmRoles = keycloak.realmAccess?.roles || [];
      const clientRoles =
        keycloak.resourceAccess?.["ganesh-fest-ui"]?.roles || [];

      setUser({
        authenticated: true,
        token: keycloak.token,
        roles: [...realmRoles, ...clientRoles],
      });
    }
  }, []);

  const hasRole = role => user.roles.includes(role);
  const hasAnyRole = roles => roles.some(r => hasRole(r));

  return (
    <AuthContext.Provider value={{ ...user, hasRole, hasAnyRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
