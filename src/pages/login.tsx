// Components
import LoginForm from '@/components/LoginForm';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/images/logo.svg';
import { Fredoka } from '@next/font/google';

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
});

function LoginPage() {
  return (
    <div
      className={`min-h-screen flex items-center flex-col p-4 font-fredoka ${fredoka.variable}`}
    >
      <Image src={logo} alt="Pet Journal Logo" />
      <h1 className="font-medium text-2xl">Acessar conta</h1>
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
