import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { LockIcon, MailIcon } from 'lucide-react'
import { loginFn } from '@/server/auth'

const { fieldContext, formContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    EmailInput,
    PasswordInput,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})

export default function LoginForm() {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: z.object({
        email: z.email({ message: 'Invalid email address' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
      }),
    },
    onSubmit: async (data) => {
      alert(JSON.stringify(data, null, 2))
      console.log('Submitting', data.value);
      try {
        await loginFn({
          data: {
            email: data.value.email,
            password: data.value.password,
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
        form.handleSubmit()
      }}
    >
      <h1 className='text-2xl font-bold'>Login</h1>
      <div className='flex flex-col gap-4'>
        <form.AppField
          name="email"
          children={(field) => <field.EmailInput />}
        />
        <form.AppField
          name="password"
          children={(field) => <field.PasswordInput />}
        />

        <form.AppForm>
          <form.SubmitButton />
        </form.AppForm>
      </div>
    </form>
  )
}

export function EmailInput() {
  return (
    <div className="grid w-sm gap-6">
      <InputGroup>
        <InputGroupInput type="email" placeholder="Enter your email" />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function PasswordInput() {
  return (
    <div className="grid w-sm gap-6">
      <InputGroup>
        <InputGroupInput type="password" placeholder="Enter your password" />
        <InputGroupAddon>
          <LockIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function SubmitButton() {
  return <Button className="cursor-pointer" type="submit">Login</Button>;
}