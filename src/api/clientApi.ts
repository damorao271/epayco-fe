// src/api/clientApi.ts
import axios from 'axios'

const clientApi = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const registerClient = (data: {
  name: string
  document: string
  email: string
  phone: string
}) => clientApi.post('/register', data)

export default clientApi
