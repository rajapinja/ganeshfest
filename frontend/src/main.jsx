import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./styles/index.css";
import "virtual:uno.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import keycloak from "./keycloak/Keycloak";
import { AuthProvider } from "./context/AuthContext.jsx";

// Create the router with future flag enabled
const router = createBrowserRouter(
  [
    {
      path: "/*", // let App handle all routes inside
      element: <App />,
    },
  ],
  {
    future: {
      v7_startTransition: true, // ✅ opt-in early
    },
  }
);

const root = createRoot(document.getElementById("root"));

keycloak
  .init({
    onLoad: "login-required",
    checkLoginIframe: false,
  })
  .then(authenticated => {
    if (!authenticated) {
      keycloak.login();
      return;
    }

    console.log("✅ Main - Keycloak initialized, authenticated:", authenticated);

    // Store initial tokens
    localStorage.setItem("access_token", keycloak.token);
    localStorage.setItem("refresh_token", keycloak.refreshToken);

    // Token refresh loop
    setInterval(() => {
      keycloak
        .updateToken(60) // refresh if expiring in next 60s
        .then(refreshed => {
          if (refreshed) {
            console.log("🔄 Main - Token refreshed ✅");
            localStorage.setItem("access_token", keycloak.token);
            localStorage.setItem("refresh_token", keycloak.refreshToken);

          }
        })
        .catch(() => {
          console.error("❌ Main - Token refresh failed, logging out");      
          keycloak.logout();
        });
    }, 60000); // ⏱️ check every 1 min (not 10!)

    // Render React app
    root.render(
      <React.StrictMode>
        <ThemeProvider>
          <AuthProvider>
            <RouterProvider router={router} keycloak={keycloak} token={keycloak.token} />
          </AuthProvider>
        </ThemeProvider>
      </React.StrictMode>
    );
  })
  .catch(err => {
    console.error("❌ Main - Keycloak init failed:", err);
    keycloak.login();
  });


