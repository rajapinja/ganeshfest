# Quick start

    cd vinayaka-frontend-jsx
    npm i
    npm run dev

## Notes:
    - Categories & sub-menus are wired in SideNav.jsx.
    - Product browsing with sample data in Home.jsx and CategoryPage.jsx.
    - Cart drawer + checkout flow is functional (front-end only).

    Auth buttons (Login/Logout) use Keycloak; set env vars:
        VITE_KEYCLOAK_URL, VITE_KEYCLOAK_REALM, VITE_KEYCLOAK_CLIENT_ID
        API base URL: VITE_API_BASE_URL (defaults to http://localhost:9993/api).
        If you want, I can also spin a matching Spring Boot skeleton (entities for Vendors/Products/Orders, REST endpoints, Kafka event stubs, OAuth2/Keycloak resource server, and Postgres schema) so this frontend can talk end-to-end
