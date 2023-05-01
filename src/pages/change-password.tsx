import ChangePasswordForm from '@/components/ChangePasswordForm';
import React from 'react';

function ChangePassword() {
  return (
    <div className="mx-4 h-screen flex flex-col justify-center">
      <h1 className="text-center text-xl">Criar uma nova senha?</h1>
      <div className="mt-6 mx-auto">
        <ChangePasswordForm />
      </div>
    </div>
  );
}

export default ChangePassword;
