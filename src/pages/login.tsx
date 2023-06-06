// Components
import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center p=4">
      <div className="w-full max-w-sm m-auto">
        <LoginForm />
        <p className="text-center mt-6">
          Não tem uma conta?{' '}
          <Link href="/register" className="underline">
            Inscreva-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
