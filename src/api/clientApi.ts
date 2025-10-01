// src/api/clientApi.ts
import axios from 'axios'

const clientApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for API calls before requsest is made
clientApi.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    // loadingStore.setLoading(false);
    Promise.reject(error)
  }
)

// Response interceptor for API calls in case the API changes
clientApi.interceptors.response.use((response) => {
  return response
})

export const registerClient = (data: {
  name: string
  document: string
  email: string
  phone: string
}) => clientApi.post('register', data)

export default clientApi
