/**
 * useInView.ts
 * 要素が画面内に入ったかどうかを監視するカスタムhook
 * Intersection Observerをラップし、遅延読み込みに使う
 */
import { useState, useEffect, useRef } from 'react'

export const useInView = <T extends HTMLElement>(rootMargin = '200px') => {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // 一度入ったら監視終了
        }
      },
      { rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView }
}