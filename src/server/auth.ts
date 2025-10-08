import { useAppSession } from '@/lib/session';
import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import bcrypt from 'bcryptjs'
import { z } from 'zod';

const loginSchema = z.object({
  email: z.email().max(255),
  password: z.string().min(8).max(100),
})

export const registerFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { email: string; password: string; name: string }) => data,
  )
  .handler(async ({ data }) => {
    const existingUser = await getUserByEmail(data.email)
    if (existingUser) {
      return { error: 'User already exists' }
    }

    const hashedPassword = await bcrypt.hash(data.password, 12)

    const user = await createUser({
      email: data.email,
      password: hashedPassword,
    })

    const session = await useAppSession()
    await session.update({ email: user.email })

    return { success: true, user: { id: user.id, email: user.email } }
  })

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator(data => loginSchema.parse(data))
  .handler(async ({ data }) => {
    const user = await authenticateUser(data.email, data.password)

    if (!user) {
      return { error: 'Invalid credentials' }
    }

    const session = await useAppSession()
    await session.update({
      email: user.email,
    })

    throw redirect({ to: '/dashboard' })
  })

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()
  throw redirect({ to: '/' })
})

export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()
    const email = session.get('email')

    if (!email) {
      return null
    }

    return await getUserByEmail(email)
  },
)

async function authenticateUser(email: string, password: string) {
  const user = await getUserByEmail(email)
  if (!user) return null

  const isValid = await bcrypt.compare(password, user.password)
  return isValid ? user : null
}