import axios from 'axios'
import keycloak from '../auth/keycloak'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 15000,
})

client.interceptors.request.use(async (config) => {
  if (keycloak && keycloak.authenticated) {
    const token = keycloak.token
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default client
