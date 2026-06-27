/**
 * heritage.ts
 * 世界遺産データのTypeScript型定義
 */

export interface HeritageItem {
  id: number
  name: string
  name_ja: string
  wiki_title?: string
  description: string
  short_description: string
  appeal: string
  justification: string
  latitude: number
  longitude: number
  category: 'Cultural' | 'Natural' | 'Mixed'
  region: string
  country: string
  date_inscribed: number
  image_url: string
}

export type Region =
  | 'Africa'
  | 'Arab States'
  | 'Asia and the Pacific'
  | 'Europe and North America'
  | 'Latin America and the Caribbean'

export type Category = 'Cultural' | 'Natural' | 'Mixed'

export interface FilterState {
  region: Region | 'All'
  category: Category | 'All'
  decade: number | 'All'
  search: string
}