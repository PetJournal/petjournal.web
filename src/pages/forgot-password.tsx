import Image from 'next/image';
import logo from 'public/images/logo.svg';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import { Fredoka } from '@next/font/google';

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
});

function ForgotPasswordPage() {
  return (
    <div className={`min-h-screen flex items-center flex-col p-4 font-fredoka gap-5 ${fredoka.variable}`}>
      <Image src={logo} alt="Pet Journal Logo" />
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="font-medium text-2xl">Esqueceu a senha?</h1>
        <p className="text-center">Redefina a senha em duas etapas</p>
      </div>

      <div className="w-full max-w-sm mt-5">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
