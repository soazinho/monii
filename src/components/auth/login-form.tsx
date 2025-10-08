import { revalidateLogic, useForm } from '@tanstack/react-form'

import { z } from 'zod'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { LockIcon, MailIcon } from 'lucide-react'
import { loginFn } from '@/server/auth'
import { Button } from '@/components/ui/button'

const schema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export default function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: schema,
    },
    onSubmit: async ({ value }) => {
      console.log('Submitting', value);
      try {
        await loginFn({
          data: {
            email: value.email,
            password: value.password,
          },
        })
      } catch (err) {
        console.error('Login failed', err)
      }
    },
  })

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <h1 className='text-2xl font-bold'>Login</h1>
      <div className='flex flex-col gap-4'>
        <form.Field
          name="email"
          children={(field) => {
            return (
              <InputGroup>
                <InputGroupInput 
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type='email'
                />
                <InputGroupAddon>
                  <MailIcon />
                </InputGroupAddon>
              </InputGroup>
            )
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            return (
              <InputGroup>
                <InputGroupInput 
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type='password'
                />
                <InputGroupAddon>
                  <LockIcon />
                </InputGroupAddon>
              </InputGroup>
            )
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Login'}
            </Button>
          )}
        />
      </div>
    </form>
  )
}
