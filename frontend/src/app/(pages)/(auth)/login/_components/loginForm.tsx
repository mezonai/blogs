'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/atoms/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/form';
import { Input } from '@/components/atoms/input';

import { PasswordInput } from '@/components/atoms/password-input';
import { ROUTES } from '@/shared/constants';
import { LoginFormValues, loginSchema } from '@/shared/schemas/loginSchema';
import { LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' },
  });

  async function onSubmit(data: LoginFormValues) {
    setError('');
    setLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (res?.error) {
      setError('メールアドレスまたはパスワードが間違っています');
      setLoading(false);
    } else {
      router.push(ROUTES.HOME);
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-10 space-y-6 border rounded-3xl bg-white"
      >
        {error && <p className="text-red-600">{error}</p>}

        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eメール</FormLabel>
              <FormControl>
                <Input placeholder="Eメール" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="******"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary rounded-2xl"
        >
          <LogIn />
          ログイン
        </Button>
      </form>
    </Form>
  );
}
