import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { loginFn } from '../server/auth'
import { RouterHistory, createBrowserHistory } from '@tanstack/react-router'
import { cleanup } from '@testing-library/react'

let history: RouterHistory

beforeEach(() => {
  history = createBrowserHistory()
  expect(window.location.pathname).toBe('/')
})

afterEach(() => {
  history.destroy()
  vi.resetAllMocks()
  window.history.replaceState(null, 'root', '/')
  cleanup()
})

describe('Authentication', () => {
  beforeEach(async () => {
    // await setupTestDatabase()
  })

  it('should login with valid credentials', async () => {
    const result = await loginFn({
      data: { email: 'test@example.com', password: 'password1232222' },
    })

    expect(result.error).toBeUndefined()
    // expect(result.user).toBeDefined()
  })

  it('should reject invalid credentials', async () => {
    const result = await loginFn({
      data: { email: 'test@example.com', password: 'wrongpassword22' },
    })

    expect(result.error).toBe('Invalid credentials')
  })
})
