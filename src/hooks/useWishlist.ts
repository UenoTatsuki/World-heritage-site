/**
 * useWishlist.ts
 * 行きたいリスト（お気に入り）を管理するカスタムhook
 * localStorageに保存して、ページを閉じても登録が消えないようにする
 */
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'wishlist'

export const useWishlist = () => {
  // 初期値はlocalStorageから読み込む
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  // wishlistが変わるたびlocalStorageに保存
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  // 登録／解除を切り替える
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  // 登録済みかどうか判定
  const isWishlisted = (id: number) => wishlist.includes(id)

  return { wishlist, toggleWishlist, isWishlisted }
}