import * as z from 'zod';

export const loginSchema = z.object({
  identifier: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(12, 'パスワードは12文字以上で入力してください'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
