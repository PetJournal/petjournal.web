// Hooks
import { FormEvent } from 'react';
import useInput from '@/hooks/useInput';

function ForgotPasswordForm() {
  const emailProps = useInput({ validate: validateEmail });

  const isButtonDisabled = !(!!emailProps.value && !emailProps.error);

  function validateEmail(value: string): string | undefined {
    if (!value) {
      return 'Este campo é obrigatório!';
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(value)) {
      return 'Por favor, digite um e-mail válido.';
    }

    return undefined;
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      className="flex flex-col gap-y-4 mt-6"
      onSubmit={(event) => handleFormSubmit(event)}
    >
      <label>
        <span className="mb-1 block">Qual o seu e-mail de cadastro?</span>
        <div>
          <div className="border border-neutral-300 py-1 px-2">
            <input
              type="text"
              className="w-full outline-0"
              placeholder="Digite seu e-mail"
              {...emailProps}
            />
          </div>
          {emailProps.error && (
            <span className="text-red-600 text-xs">{emailProps.error}</span>
          )}
        </div>
      </label>
      <button
        className={`text-center py-2 px-4 bg-neutral-200 ${
          isButtonDisabled ? 'text-neutral-400' : 'text-neutral-900'
        }`}
        disabled={isButtonDisabled}
      >
        Enviar
      </button>
      <button className="text-center py-2 px-4 bg-neutral-200">Cancelar</button>
    </form>
  );
}

export default ForgotPasswordForm;
