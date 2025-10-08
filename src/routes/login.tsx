import LoginForm from '@/components/auth/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  return (
    <div className='flex items-center justify-center h-full'>
      <LoginForm />
    </div>  
  )
}
