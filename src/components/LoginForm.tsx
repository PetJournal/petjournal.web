// Hooks
import { FormEvent, useState } from 'react';
import useInput from '@/hooks/useInput';

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
        }
      })
      .catch(() => {
        setLoading(false);
        setSubmissionError('Algo deu errado. Tente novamente, por favor.');
      });
  }

  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
      <label>
        <span>Login</span>
        <div>
          <input type="text" {...emailOrPhoneProps} />
          {emailOrPhoneProps.error && <span>{emailOrPhoneProps.error}</span>}
        </div>
      </label>
      <label>
        <span>Senha</span>
        <div>
          <div>
            <input
              type={showPassword ? 'text' : 'password'}
              {...passwordProps}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {passwordProps.error && <span>{passwordProps.error}</span>}
        </div>
      </label>
      <div>
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <span>Lembrar</span>
        </label>
        <Link href="#">Esqueci minha senha</Link>
      </div>
      {submissionError && <span>{submissionError}</span>}
      <button type="submit" disabled={isButtonDisabled}>
        {loading ? 'Enviando...' : 'Continuar'}
      </button>
    </form>
  );
}

export default LoginForm;
