// src/api/walletApi.ts
import axios from 'axios';

const walletApi = axios.create({
  baseURL: import.meta.env.VITE_WALLET_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const rechargeWallet = (data: { document: string; phone: string; amount: number }) =>
  walletApi.post('/recharge', data);

export const getBalance = (params: { document: string; phone: string }) =>
  walletApi.get('/balance', { params });

export default walletApi;
