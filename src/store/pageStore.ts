import { create } from 'zustand'

type PageStore = {
  value: string
  setValue: (v: string) => void
}

export const usePageStore = create<PageStore>((set) => ({
  value: '',
  setValue: (v) => set({ value: v }),
}))
