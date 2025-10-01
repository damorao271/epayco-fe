// src/api/paymentApi.ts
import axios from 'axios'

const URL = import.meta.env.VITE_API_URL

export interface PaymentData {
  document: string
  phone: string
  amount: number
}

const paymentApi = axios.create({
  baseURL: URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const startPayment = (data: PaymentData) => paymentApi.post('/pay', data)

export const confirmPayment = (data: { sessionId: string; token: string }) =>
  paymentApi.post('/pay/confirm', data)

export default paymentApi
