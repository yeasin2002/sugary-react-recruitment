import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/layout/logo';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="flex flex-col items-center space-y-2">
          <Logo className="h-12 w-12 text-primary" />
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Welcome to Sugary</h1>
          <p className="text-muted-foreground text-center">Sign in to access your dashboard</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}