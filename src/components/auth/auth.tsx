import { createContext, ReactNode, useContext } from 'react'

type User = {
  id: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  refetch: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // const { data: user, isLoading, refetch } = useServerFn(getCurrentUserFn)

  const aUser = { id: "123", email: "bob@email.com" }

  return (
    <AuthContext.Provider value={{ user: aUser, isLoading: true, refetch: () => {} }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}