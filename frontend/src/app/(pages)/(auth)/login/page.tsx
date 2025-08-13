import LoginForm from './_components/loginForm';

export default function SignInPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 mt-10 mb-16 px-4 sm:px-8">
      <h1 className="text-2xl md:text-[32px] font-bold text-center">
        ログイン
      </h1>
      <LoginForm />
    </div>
  );
}
