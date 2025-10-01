// src/api/paymentApi.ts
import axios from 'axios'

const URL = import.meta.env.VITE_PAYMENT_API_URL
console.log('URL:', URL)

const paymentApi = axios.create({
  baseURL: URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const startPayment = (data: {
  document: string
  phone: string
  amount: number
}) => paymentApi.post('/payment/start', data)

export const confirmPayment = (data: { sessionId: string; token: string }) =>
  paymentApi.post('/payment/confirm', data)

export default paymentApi
