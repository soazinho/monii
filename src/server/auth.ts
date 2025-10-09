import bcrypt from 'bcryptjs'
import { useAppSession } from '@/lib/session';
import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
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
    // const existingUser = await getUserByEmail(data.email)
    // if (existingUser) {
    //   return { error: 'User already exists' }
    // }

    // const hashedPassword = await bcrypt.hash(data.password, 12)

    // const user = await createUser({
    //   email: data.email,
    //   password: hashedPassword,
    // })

    const session = await useAppSession()
    await session.update({ email: "bob@example.com" })

    return { success: true, user: { id: "123", email: "bob@example.com" } }
  })

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator(data => loginSchema.parse(data))
  .handler(async ({ data }) => {
    const user = await authenticateUser(data.email, data.password)
    // if (!user) {
    //   return { error: 'Invalid credentials' }
    // }

    const session = await useAppSession()
    // await session.update({
    //   userId: user.id.toString(),
    //   email: user.email,
    // })

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
    const userId = session.data?.userId
    if (!userId) {
      return null
    }

    // const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } })
    // if (!user) return null
    // return user
  },
)

async function authenticateUser(email: string, password: string) {
  // const user = await prisma.user.findUnique({ where: { email } })
  // if (!user) return null

  // const isValid = await bcrypt.compare(password, user.hashedPassword)
  // return isValid ? user : null
}