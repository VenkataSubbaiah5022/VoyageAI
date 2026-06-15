import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

const USER_KEY = 'voyageai_user'
const TOKEN_KEY = 'voyageai_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY)
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(true)

  const persistSession = useCallback((userData, token) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
    localStorage.setItem(TOKEN_KEY, token)
    setUser(userData)
  }, [])

  const clearSession = useCallback(() => {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }, [])

  const register = useCallback(
    async (payload) => {
      const { data } = await authApi.register(payload)
      persistSession(data.user, data.token)
      return data.user
    },
    [persistSession],
  )

  const login = useCallback(
    async (payload) => {
      const { data } = await authApi.login(payload)
      persistSession(data.user, data.token)
      return data.user
    },
    [persistSession],
  )

  const logout = useCallback(() => {
    clearSession()
  }, [clearSession])

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)

    if (!token) {
      setLoading(false)
      return
    }

    authApi
      .getMe()
      .then(({ data }) => {
        setUser(data.user)
        localStorage.setItem(USER_KEY, JSON.stringify(data.user))
      })
      .catch(() => {
        clearSession()
      })
      .finally(() => {
        setLoading(false)
      })
  }, [clearSession])

  const refreshUser = useCallback(async () => {
    const { data } = await authApi.getMe()
    setUser(data.user)
    localStorage.setItem(USER_KEY, JSON.stringify(data.user))
    return data.user
  }, [])

  const updateUser = useCallback((userData) => {
    setUser(userData)
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      register,
      login,
      logout,
      refreshUser,
      updateUser,
    }),
    [user, loading, register, login, logout, refreshUser, updateUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
