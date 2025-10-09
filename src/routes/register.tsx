import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group';
import { loginFn, registerFn } from '@/server/auth'
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { MailIcon, LockIcon, UserIcon } from 'lucide-react';
import { z } from 'zod';

export const Route = createFileRoute('/register')({
  component: Register,
})

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

function Register() {
  const register = useServerFn(registerFn)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: schema,
    },
    onSubmit: async ({ value }) => {
      await register({ 
        data: {
          name: value.name,
          email: value.email,
          password: value.password
        }
      });
    },
  })

  return (
    <div className='flex items-center justify-center h-full'>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <h1 className='text-2xl font-bold'>Register</h1>
        <div className='flex flex-col gap-4'>
            <form.Field
                name="name"
                children={(field) => {
                return (
                    <InputGroup>
                    <InputGroupInput 
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type='text'
                    />
                    <InputGroupAddon>
                        <UserIcon />
                    </InputGroupAddon>
                    </InputGroup>
                )
                }}
            />
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
    </div>  
  )
}
