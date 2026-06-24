/**
 * useWishlist.ts
 * 行きたいリスト（お気に入り）を管理するカスタムhook
 * ログインユーザーごとにFirestoreへ保存し、どの端末でも同じリストを見られる
 */
import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../contexts/AuthContext'

export const useWishlist = () => {
  const { user } = useAuth()
  const [wishlist, setWishlist] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  // ログインユーザーが変わったら、そのユーザーのリストを読み込む
  useEffect(() => {
    const load = async () => {
      if (!user) {
        setWishlist([])
        setLoading(false)
        return
      }
      try {
        const ref = doc(db, 'wishlists', user.uid)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setWishlist(snap.data().siteIds ?? [])
        } else {
          setWishlist([])
        }
      } catch (err) {
        console.error('読み込み失敗:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user])

  // Firestoreに保存するヘルパー
  const save = async (ids: number[]) => {
    if (!user) return
    try {
      const ref = doc(db, 'wishlists', user.uid)
      await setDoc(ref, { siteIds: ids })
    } catch (err) {
      console.error('保存失敗:', err)
    }
  }

  // 登録／解除を切り替える
  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
      save(next)   // 変更後のリストをFirestoreに保存
      return next
    })
  }

  const isWishlisted = (id: number) => wishlist.includes(id)

  return { wishlist, toggleWishlist, isWishlisted, loading }
}