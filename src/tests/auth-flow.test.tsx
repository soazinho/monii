import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { RouterHistory, RouterProvider, createBrowserHistory, createMemoryHistory } from '@tanstack/react-router'
import { getRouter } from '@/router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'


let history: RouterHistory

beforeEach(() => {
  history = createBrowserHistory()
  expect(window.location.pathname).toBe('/login')
})

afterEach(() => {
  history.destroy()
  vi.resetAllMocks()
  window.history.replaceState(null, 'root', '/login')
  cleanup()
})

describe('Authentication Flow', () => {
  it('should redirect to login when accessing protected route', async () => {
    const router = getRouter();
    const history = createMemoryHistory()
    window.history.replaceState(null, 'dashboard', '/dashboard')
    // history.push('/dashboard') // Protected route

    render(<RouterProvider router={router} history={history} />)

    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument()
    })
  })
})