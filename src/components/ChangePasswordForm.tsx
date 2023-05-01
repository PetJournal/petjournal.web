import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import useInput from '@/hooks/useInput';

function ChangePasswordForm() {
  const passwordProps = useInput({ validate: validatePassword });
  const confirmPasswordProps = useInput({ validate: validateConfirmPassword });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountAccess, setAccountAccess] = useState(false);
  const { push } = useRouter();

  const isButtonDisabled = !(
    !!passwordProps.value &&
    !!confirmPasswordProps.value &&
    !passwordProps.error &&
    !confirmPasswordProps.error
  );

  function validatePassword(value: string) {
    if (!value) {
      return 'Este campo é obrigatório';
    }
    if (value.length < 8) {
      return 'A senha informada não atende os requisitos necessários de 8 caracteres';
    }
    return undefined;
  }

  function validateConfirmPassword(value: string) {
    if (!value) {
      return 'Este campo é obrigatório';
    }
    if (value !== passwordProps.value) {
      return 'As senhas devem ser idênticas';
    }
    return undefined;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!passwordProps.error && !confirmPasswordProps.error) {
      push('/login');
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)} className="max-w-lg">
      <div className="space-y-3">
        <div>
          <label htmlFor="password">Nova senha</label>
          <div className="border-2 flex justify-between p-1 px-2">
            <input
              type={showPassword ? 'text' : 'password'}
              {...passwordProps}
              id="password"
              className="flex-1 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {passwordProps.error && (
            <p className="text-sm text-red-500">{passwordProps.error}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirmar senha</label>
          <div className="border-2 flex justify-between p-1 px-2">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...confirmPasswordProps}
              id="confirmPassword"
              className="flex-1 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {confirmPasswordProps.error && (
            <p className="text-sm text-red-500">{confirmPasswordProps.error}</p>
          )}
        </div>
      </div>

      <div className="flex mt-5">
        <input
          type="checkbox"
          id="check"
          checked={accountAccess}
          onChange={(event) => setAccountAccess(event.target.checked)}
        />
        <label htmlFor="check" className="leading-5 pl-2">
          É necessário que todos os dispositivos acessem sua conta com a nova
          senha?
        </label>
      </div>

      <button
        type="submit"
        className={`bg-gray-300 py-2 mt-5 w-full rounded-full ${
          isButtonDisabled && 'text-gray-400 bg-gray-100'
        }`}
        disabled={isButtonDisabled}
      >
        Redefinir senha
      </button>
    </form>
  );
}

export default ChangePasswordForm;
