"use client";
import { BeatLoader } from "react-spinners";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { cn } from "@/lib/utils";
import { newPassword } from "@/actions/new-password";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface UserNewPasswordFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function UserNewPasswordForm({
  className,
  ...props
}: UserNewPasswordFormProps) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setSuccess("");
    setError("");
    // those shecks also happens in the server , i just wanted to do it
    if (!token) {
      setError("Missing token!");
      return;
    }
    if (values.password !== values.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    console.log(values);

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      });
    });
  };

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Reset password
          </Button>
        </form>
      </Form>
    </div>
  );
}
