import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from '../pages/api/axios';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import toggleShowPassword from '/public/images/show-password.svg';

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
        <div className="text-custom-purple text-sm font-medium">Login</div>
        <div className="border border-[#1b1b1b] rounded-[5px] py-2 px-1">
          <input
            type="text"
            {...register('email')}
            className="w-full outline-0 text-[#292929] font-medium placeholder:text-[#BFBFBF]"
            placeholder="E-mail"
          />
        </div>
        {errors.email && (
          <span className="text-red-600 text-xs">{errors.email.message}</span>
        )}
      </label>
      <label>
        <div className="text-custom-purple text-sm font-medium">Senha</div>
        <div className="border border-[#1b1b1b] rounded-[5px] flex py-2 px-1">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className="w-full outline-0 text-[#292929] font-medium placeholder:text-[#BFBFBF]"
            placeholder="Senha"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="px-1"
          >
            <Image
              src={toggleShowPassword}
              alt="Ícone de olho para mostrar e esconder a senha"
            />
          </button>
        </div>
        {errors.password && (
          <span className="text-red-600 text-xs">
            {errors.password.message}
          </span>
        )}
      </label>
      <div className="flex justify-between px-1">
        <label className="flex items-center justify-center relative">
          <input
            className="appearance-none w-5 h-5 rounded-full border-2 border-custom-purple mr-1"
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          <span>Lembrar</span>
          {remember && (
            <div className="absolute w-2 h-2 bg-custom-purple rounded-full left-[0.375rem]"></div>
          )}
        </label>
        <Link className="underline" href="#">
          Esqueci minha senha
        </Link>
      </div>
      {erroEnvio && (
        <span className="text-center text-xs text-red-600">{erroEnvio}</span>
      )}
      <button
        className={`flex self-center font-medium items-center justify-center  rounded-[45px] px-11 py-3 mt-16 ${
          isButtonDisabled
            ? 'bg-transparent border-2 border-[#B2B2B2] text-[#B2B2B2]'
            : 'bg-custom-purple text-white'
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
