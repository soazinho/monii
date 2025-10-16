import { AppSidebar } from "@/components/app-sidebar";
import { User } from "@/components/auth/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FieldGroup, FieldLabel, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { logoutFn } from "@/server/auth";
import { Separator } from "@radix-ui/react-separator";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import z from "zod";

export const Route = createFileRoute("/_authed/account")({
  component: AccountPage,
});

const schema = z.object({
  avatar: z
    .string()
    .min(2, { message: "Avatar must be at least 2 characters long" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

function AccountPage() {
  const logout = useServerFn(logoutFn);

  const { user } = Route.useRouteContext();

  // TODO: Data to domain user
  const userCopy: User = {
    ...user,
    id: user.id.toString(),
  };

  const form = useForm({
    defaultValues: {
      avatar: "https://github.com/shadcn.png",
      name: user.name,
      email: user.email,
      password: "",
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: schema,
    },
    onSubmit: async ({ value }) => {
      await updateUser({
        data: {
          avatar: value.avatar,
          name: value.email,
          email: value.email,
          password: value.password,
        },
      });
    },
  });

  return (
    <SidebarProvider>
      <AppSidebar user={userCopy} logout={logout} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <div className="m-32">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Account</CardTitle>
              <CardDescription>Here is your information.</CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
              >
                <FieldGroup>
                  <form.Field
                    name="avatar"
                    children={(field) => {
                      return (
                        <Field>
                          <FieldLabel htmlFor="avatar">Avatar</FieldLabel>
                          <Input
                            id="avatar"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type=""
                            placeholder="https://avatar.com"
                          />
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="name"
                    children={(field) => {
                      return (
                        <Field>
                          <FieldLabel htmlFor="name">Name</FieldLabel>
                          <Input
                            id="name"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="text"
                            placeholder="Jane Doe"
                          />
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="email"
                    children={(field) => {
                      return (
                        <Field>
                          <FieldLabel htmlFor="email">Email</FieldLabel>
                          <Input
                            id="email"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="email"
                            placeholder="jane.doe@example.com"
                          />
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="password"
                    children={(field) => {
                      return (
                        <Field>
                          <FieldLabel htmlFor="password">Password</FieldLabel>
                          <Input
                            id="password"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="password"
                            placeholder="••••••••••••••"
                          />
                        </Field>
                      );
                    }}
                  />

                  <Field>
                    <Button type="submit">Save changes</Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
