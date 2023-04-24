// Hooks
import { FormEvent, useState } from 'react';
import useInput from '@/hooks/useInput';
import { useRouter } from 'next/router';

// Components
import Link from 'next/link';

function validateEmailOrPhone(value: string): string | undefined {
  if (!value) {
    return 'Este campo é obrigatório!';
  }

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const phoneRegex =
    /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;

  if (!emailRegex.test(value)) {
    if (!phoneRegex.test(value)) {
      return 'Por favor, digite um e-mail ou celular válido.';
    }
  }

  return undefined;
}

function validatePassword(value: string): string | undefined {
  if (!value) {
    return 'Este campo é obrigatório!';
  }

  if (value.length < 8) {
    return 'A senha deve ter pelo menos 8 caracteres';
  }

  return undefined;
}

function LoginForm() {
  const emailOrPhoneProps = useInput({ validate: validateEmailOrPhone });
  const passwordProps = useInput({ validate: validatePassword });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const { push } = useRouter();

  const isButtonDisabled = !(
    !!emailOrPhoneProps.value &&
    !!passwordProps.value &&
    !emailOrPhoneProps.error &&
    !passwordProps.error
  );

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: emailOrPhoneProps.value,
        password: passwordProps.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);

        if (data.error) {
          setSubmissionError(data.error);
          return;
        }

        push('/profile');
      })
      .catch(() => {
        setLoading(false);
        setSubmissionError('Algo deu errado. Tente novamente, por favor.');
      });
  }

  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={(event) => handleFormSubmit(event)}
    >
      <label>
        <span className="mb-1 block">Login</span>
        <div>
          <div className="border border-neutral-300 py-1 px-2">
            <input
              type="text"
              {...emailOrPhoneProps}
              className="w-full outline-0"
            />
          </div>
          {emailOrPhoneProps.error && (
            <span className="text-red-600 text-xs">
              {emailOrPhoneProps.error}
            </span>
          )}
        </div>
      </label>
      <label>
        <span className="mb-1 block">Senha</span>
        <div>
          <div className="border border-neutral-300 flex py-1 px-2">
            <input
              type={showPassword ? 'text' : 'password'}
              {...passwordProps}
              className="w-full outline-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {passwordProps.error && (
            <span className="text-red-600 text-xs">{passwordProps.error}</span>
          )}
        </div>
      </label>
      <div className="flex justify-between gap-x-2">
        <label>
          <input
            className="mr-1"
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <span>Lembrar</span>
        </label>
        <Link className="underline" href="#">
          Esqueci minha senha
        </Link>
      </div>
      {submissionError && (
        <span className="text-center text-xs text-red-600">
          {submissionError}
        </span>
      )}
      <button
        className={`text-center py-2 px-4 bg-neutral-200 ${
          isButtonDisabled ? 'text-neutral-400' : 'text-neutral-900'
        }`}
        type="submit"
        disabled={isButtonDisabled}
      >
        {loading ? 'Enviando...' : 'Continuar'}
      </button>
    </form>
  );
}

export default LoginForm;
