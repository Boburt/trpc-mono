import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type CurrencyStore = {
  currency: 'usd' | 'rub'
  setCurrency: (currency: 'usd' | 'rub') => void
}

export const useCurrencyStore = create<CurrencyStore>()(
  persistNSync(
    (set) => ({
      currency: 'rub',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'currency-storage'
    }
  )
)
