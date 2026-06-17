/**
 * filterStore.ts
 * Zustandを使ったフィルター状態管理store
 * 地域・カテゴリ・検索ワードの状態を管理する
 */

import { create } from 'zustand'
import type { FilterState } from '../types/heritage'

interface FilterStore extends FilterState {
  setRegion: (region: FilterState['region']) => void
  setCategory: (category: FilterState['category']) => void
  setSearch: (search: string) => void
  reset: () => void
}

const initialState: FilterState = {
  region: 'All',
  category: 'All',
  search: '',
}

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  setRegion: (region) => set({ region }),
  setCategory: (category) => set({ category }),
  setSearch: (search) => set({ search }),
  reset: () => set(initialState),
}))