import * as z from 'zod';
import { passwordRegex } from '../utils';

export const registerSchema = z
  .object({
    email: z.string().email('有効なメールアドレスを入力してください'),
    emailConfirm: z
      .string()
      .email('有効な確認用メールアドレスを入力してください'),
    password: z
      .string()
      .regex(
        passwordRegex,
        'パスワードは12文字以上で、大文字1文字、数字1文字、記号1文字を含めてください',
      ),
    passwordConfirm: z
      .string()
      .regex(
        passwordRegex,
        '確認用パスワードは12文字以上で、大文字1文字、数字1文字、記号1文字を含めてください',
      ),
  })
  .refine((data) => data.email === data.emailConfirm, {
    path: ['emailConfirm'],
    message: '確認用メールアドレスが一致しません',
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '確認用パスワードが一致しません',
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
