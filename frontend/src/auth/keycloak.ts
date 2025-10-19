import Keycloak from 'keycloak-js'

const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080/',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'vinayaka',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'web-app',
}

const keycloak = new Keycloak(keycloakConfig)

keycloak.init({ onLoad: 'check-sso', silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html' })
  .catch(() => console.warn('Keycloak init failed'))

export default keycloak
