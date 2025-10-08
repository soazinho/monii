import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { LockIcon, MailIcon } from 'lucide-react'

const { fieldContext, formContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    EmailInput,
    PasswordInput,
  },
  formComponents: {
    SubmitButton: LoginButton,
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
    onSubmit: ({ value }) => {
      console.log(value)
      alert(JSON.stringify(value, null, 2))
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

export function LoginButton() {
  return <Button className="cursor-pointer" type="submit">Login</Button>;
}