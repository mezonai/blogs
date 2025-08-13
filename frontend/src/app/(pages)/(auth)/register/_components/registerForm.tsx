'use client';
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
import { useRegister } from '@/hooks/useAuth';
import { ROUTES } from '@/shared/constants';
import {
  RegisterFormValues,
  registerSchema,
} from '@/shared/schemas/registerSchema';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const { mutate: mutateRegister, isPending: isRegisting } = useRegister();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      emailConfirm: '',
      password: '',
      passwordConfirm: '',
    },
  });
  async function onSubmit(data: { email: string; password: string }) {
    setError('');
    const payload = {
      username: data.email.split('@')[0],
      email: data.email,
      password: data.password,
    };
    console.log('hrhr');

    mutateRegister(payload, {
      onSuccess: () => {
        router.push(ROUTES.LOGIN);
      },
      onError: (error) => {
        setError(error.response.data.error?.message ?? 'Failed to register');
      },
    });
  }
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex gap-1 items-center justify-center">
          すでにアカウントをお持ちの方は
          <Link href={ROUTES.LOGIN} className="underline">
            こちら
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-10 border rounded-3xl bg-white my-5"
        >
          {error && <p className="text-red-600 ">{error}</p>}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eメール</FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="Eメール" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emailConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eメール (確認)</FormLabel>
                <FormControl>
                  <Input placeholder="Eメール (確認)" {...field} />
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
                    autoComplete="new-password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード (確認)</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-[10px] text-red-600 space-y-1">
            <p>パスワードの条件:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>12文字以上（全て半角）</li>
              <li>英大文字と英小文字を含む</li>
              <li>数字を含む</li>
              <li>以下の記号いずれかを含む</li>
              <li>
                <span className="break-all inline-block">
                  ？！@ # $ % & * ( ) - _ = + [ ] {'{'} {'}'} : ; , . ^ ~ \ | /
                  ` ¥
                </span>
              </li>
            </ul>
          </div>

          <Button
            disabled={isRegisting}
            type="submit"
            className="w-full rounded-2xl"
          >
            無料で口座を開設する
          </Button>
        </form>
      </Form>
    </div>
  );
}
