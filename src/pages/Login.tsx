/**
 * Login.tsx
 * ログイン・新規登録ページ
 * メールとパスワードで認証する。1画面で登録とログインを切り替えられる
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../lib/firebase'

const Login = () => {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false) // 登録モードかログインモードか
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      if (isRegister) {
        // 新規登録
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        // ログイン
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate(-1) // 認証成功したら元の画面に戻る
    } catch (err) {
      // Firebaseのエラーを日本語で分かりやすく表示
      setError(translateError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-14 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold text-gray-800 text-center mb-1">
          {isRegister ? '新規登録' : 'ログイン'}
        </h1>
        <p className="text-xs text-gray-400 text-center mb-6">
          行きたいリストを保存できます
        </p>

        {/* メール */}
        <label className="block text-xs text-gray-500 mb-1">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="you@example.com"
        />

        {/* パスワード */}
        <label className="block text-xs text-gray-500 mb-1">パスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="6文字以上"
        />

        {/* エラー表示 */}
        {error && (
          <p className="text-xs text-red-500 mb-4">{error}</p>
        )}

        {/* 送信ボタン */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gray-800 text-white text-sm py-2.5 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
        >
          {loading ? '処理中...' : isRegister ? '登録する' : 'ログイン'}
        </button>

        {/* モード切り替え */}
        <button
          onClick={() => { setIsRegister(!isRegister); setError('') }}
          className="w-full text-xs text-gray-400 hover:text-gray-600 mt-4"
        >
          {isRegister ? 'すでにアカウントをお持ちの方はこちら' : '新規登録はこちら'}
        </button>
      </div>
    </div>
  )
}

// Firebaseのエラーコードを日本語メッセージに変換
const translateError = (err: unknown): string => {
  const code = (err as { code?: string })?.code ?? ''
  switch (code) {
    case 'auth/email-already-in-use': return 'このメールアドレスは既に登録されています'
    case 'auth/invalid-email':        return 'メールアドレスの形式が正しくありません'
    case 'auth/weak-password':        return 'パスワードは6文字以上にしてください'
    case 'auth/invalid-credential':   return 'メールアドレスまたはパスワードが違います'
    case 'auth/user-not-found':       return 'アカウントが見つかりません'
    case 'auth/wrong-password':       return 'パスワードが違います'
    default:                          return 'エラーが発生しました。もう一度お試しください'
  }
}

export default Login