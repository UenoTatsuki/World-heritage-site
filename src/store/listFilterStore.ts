/**
 * listFilterStore.ts
 * 一覧ページ専用の複数選択フィルターstore
 * 地域・分類・登録年代をそれぞれ配列で持ち、複数選択できる
 * 既存のfilterStore（地図ページ用）とは独立している
 */
import { create } from 'zustand'
import type { Region, Category } from '../types/heritage'

interface ListFilterStore {
  regions: Region[]
  categories: Category[]
  decades: number[]
  toggleRegion: (region: Region) => void
  toggleCategory: (category: Category) => void
  toggleDecade: (decade: number) => void
  reset: () => void
}

// 配列に入っていれば削除、なければ追加するヘルパー
const toggleInArray = <T,>(arr: T[], value: T): T[] =>
  arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]

export const useListFilterStore = create<ListFilterStore>((set) => ({
  regions: [],
  categories: [],
  decades: [],
  toggleRegion: (region) =>
    set((state) => ({ regions: toggleInArray(state.regions, region) })),
  toggleCategory: (category) =>
    set((state) => ({ categories: toggleInArray(state.categories, category) })),
  toggleDecade: (decade) =>
    set((state) => ({ decades: toggleInArray(state.decades, decade) })),
  reset: () => set({ regions: [], categories: [], decades: [] }),
}))