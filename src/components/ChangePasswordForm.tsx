import React, { useState } from 'react';

function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="max-w-lg">
      <div className="space-y-3">
        <div>
          <label htmlFor="password">Nova senha</label>
          <div className="border-2 flex justify-between p-1 px-2">
            <input
              type={showPassword ? 'text' : 'password'}
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
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirmar senha</label>
          <div className="border-2 flex justify-between p-1 px-2">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
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
        </div>
      </div>

      <div className="flex mt-5">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="leading-5 pl-2">
          É necessário que todos os dispositivos acessem sua conta com a nova
          senha?
        </label>
      </div>

      <button
        type="submit"
        className="bg-gray-300 py-2 mt-5 w-full rounded-full"
      >
        Redefinir senha
      </button>
    </form>
  );
}

export default ChangePasswordForm;
