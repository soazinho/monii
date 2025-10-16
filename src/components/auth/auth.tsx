import { createContext, ReactNode, useContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  hashedPassword: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // const getCurrentUser = useServerFn(getCurrentUserFn)

  return (
    <AuthContext.Provider
      value={{
        user: { id: "", name: "", email: "", hashedPassword: "" },
        isLoading: false,
        refetch: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
