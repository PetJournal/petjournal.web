import ChangePasswordForm from '@/components/ChangePasswordForm';
import logo from 'public/images/logo.svg';
import Image from 'next/image';
import React from 'react';
import { Fredoka } from '@next/font/google';

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
});

function ChangePassword() {
  return (
    <div className={`min-h-screen flex items-center flex-col p-4 font-fredoka gap-5 ${fredoka.variable}`}>
      <Image src={logo} alt="Pet Journal Logo" />
      <h1 className="text-center font-medium text-2xl">Criar uma nova senha?</h1>
      <div className="mt-6 mx-auto">
        <ChangePasswordForm />
      </div>
    </div>
  );
}

export default ChangePassword;
