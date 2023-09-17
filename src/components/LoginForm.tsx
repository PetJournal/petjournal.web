import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from '../pages/api/axios';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const loginFormSchema = z.object({
  email: z
    .string()
    .email('Digite um email válido')
    .nonempty('Este campo é obrigatório!'),
  password: z
    .string()
    .nonempty('Este campo é obrigatório!')
    .min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

type LoginFormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erroEnvio, setErroEnvio] = useState('');
  const { push } = useRouter();

  const isButtonDisabled = !!errors.email || !!errors.password || loading;

  function handleFormSubmit(data: LoginFormValues) {
    setLoading(true);

    axios
      .post('/login', {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        setLoading(false);

        Cookies.set('accessToken', response.data.accessToken, {
          expires: 7,
          path: '/',
          secure: true,
        });

        push('/');
      })
      .catch((err) => {
        if (err.isAxiosError) {
          const axiosError = err as AxiosError;
          console.log(axiosError.response?.data);
        }
        setLoading(false);
        setErroEnvio('Algo deu errado. Tente novamente, por favor.');
      });
  }

  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <label>
        <span className="mb-1 block">Login</span>
        <div>
          <div className="border border-neutral-300 py-1 px-2">
            <input
              type="text"
              {...register('email')}
              className="w-full outline-0"
            />
          </div>
          {errors.email && (
            <span className="text-red-600 text-xs">{errors.email.message}</span>
          )}
        </div>
      </label>
      <label>
        <span className="mb-1 block">Senha</span>
        <div>
          <div className="border border-neutral-300 flex py-1 px-2">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="w-full outline-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-600 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
      </label>
      <div className="flex justify-between gap-x-2">
        <label>
          <input
            className="mr-1"
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          <span>Lembrar</span>
        </label>
        <Link className="underline" href="#">
          Esqueci minha senha
        </Link>
      </div>
      {erroEnvio && (
        <span className="text-center text-xs text-red-600">{erroEnvio}</span>
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
