// Hooks
import { FormEvent, useState } from 'react';
import useInput from '@/hooks/useInput';

function ForgotPasswordForm() {
  const emailProps = useInput({ validate: validateEmail });
  const [loading, setLoading] = useState(false);
  const [submissionMsg, setSubmissionMsg] = useState('');

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

    fetch('/api/forgot-password', {
      method: 'POST',
      body: JSON.stringify({
        email: emailProps.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);

        if (data.error) {
          setSubmissionMsg(data.error);
          return;
        }

        setSubmissionMsg(data.message);
      })
      .catch((data) => {
        setLoading(false);
        setSubmissionMsg(data.error);
      });
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
      {submissionMsg && (
        <span className="text-center text-xs text-red-600">
          {submissionMsg}
        </span>
      )}
      <button
        className={`text-center py-2 px-4 bg-neutral-200 rounded-full ${
          isButtonDisabled ? 'text-neutral-400' : 'text-neutral-900'
        }`}
        disabled={isButtonDisabled}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
