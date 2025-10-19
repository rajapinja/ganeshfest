import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8383",  // 👈 add /auth
  realm: "ganesh-fest",
  clientId: "ganesh-fest-ui",
});

export default keycloak;

export function Navbar() {
  const handleLogout = () => {
    keycloak.logout({
      redirectUri: window.location.origin, // 👈 redirect after logout
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-xl bg-red-600 text-white"
    >
      Logout
    </button>
  );
}

// ✅ Helper to get profile
export function getUserInfo() {
  if (keycloak?.tokenParsed) {
    return {
      username: keycloak.tokenParsed.preferred_username,
      email: keycloak.tokenParsed.email,
      name: keycloak.tokenParsed.name,
    };
  }
  return null;
}



