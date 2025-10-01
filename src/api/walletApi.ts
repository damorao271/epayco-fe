import axios from 'axios'

export interface RechargeWalletData {
  document: string
  phone: string
  amount: number
}

const walletApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const rechargeWallet = (data: RechargeWalletData) =>
  walletApi.post('/recharge', data)

export const getBalance = (params: { document: string; phone: string }) =>
  walletApi.get('/balance', { params })

export default walletApi
