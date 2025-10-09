import bcrypt from 'bcryptjs'
import { useAppSession } from '@/lib/session';
import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '@/db/db';
import { users } from '@/db/schema';

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email().max(255),
  password: z.string().min(8).max(100),
})

const loginSchema = z.object({
  email: z.email().max(255),
  password: z.string().min(8).max(100),
})

export const registerFn = createServerFn({ method: 'POST' })
  .inputValidator(registerSchema)
  .handler(async ({ data }) => {
    const existingUser = await db.query.users.findFirst({
      where: (t, { eq }) => eq(t.email, data.email),
    })  
    if (existingUser) {
      return { error: 'User already exists' }
    }

    const hashedPassword = await bcrypt.hash(data.password, 12)

    await db.insert(users).values({
      name: data.name,
      email: data.email,
      hashedPassword,
    })

    const session = await useAppSession()
    await session.update({ email: data.email })

    return { success: true }
  })

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator(loginSchema)
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
    const email = session.data?.email
    if (!email) {
      return null
    }

    const user = await db.query.users.findFirst({
      where: (t, { eq }) => eq(t.email, email),
    })
    if (!user) return null
    return user
  },
)

async function authenticateUser(email: string, password: string) {
    const user = await db.query.users.findFirst({
      where: (t, { eq }) => eq(t.email, email),
    })  
    if (!user) return null

  const isValid = await bcrypt.compare(password, user.hashedPassword)
  return isValid ? user : null
}