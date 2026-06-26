/**
 * useHeritage.ts
 * UNESCO APIから世界遺産データを取得するカスタムhook
 */

import { useState, useEffect } from 'react'
import type { HeritageItem } from '../types/heritage'

const API_URL = '/sites.json'

export const useHeritage = () => {
  const [sites, setSites] = useState<HeritageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSites = async () => {
      try {
        setLoading(true)
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error('APIの取得に失敗しました')
        const data = await response.json()

        const mapped: HeritageItem[] = data.rows.map((item: any) => ({
          id: item.id_no,
          name: item.site,
          name_ja: item.site_ja ?? item.site,
          wiki_title: item.wiki_title,
          justification: item.justification ?? '',
          description: item.justification ?? '',
          short_description: item.short_description ?? '',
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
          category: item.category === 'C' ? 'Cultural'
                  : item.category === 'N' ? 'Natural'
                  : 'Mixed',
          region: item.region ?? '',
          country: item.states ?? '',
          date_inscribed: item.date_inscribed,
          image_url: item.image_url ?? '',
        }))

        // 各遺産の画像をWikipediaから並行取得する
        setSites(mapped)
      } catch (err) {
        setError(err instanceof Error ? err.message : '不明なエラー')
      } finally {
        setLoading(false)
      }
    }

    fetchSites()
  }, [])

  return { sites, loading, error }
}