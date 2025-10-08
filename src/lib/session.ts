import { useSession } from '@tanstack/react-start/server'

type SessionData = {
  email?: string
}

export function useAppSession() {
  return useSession<SessionData>({
    name: 'monii-session',
    password: process.env.SESSION_SECRET!,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
    },
  })
}
