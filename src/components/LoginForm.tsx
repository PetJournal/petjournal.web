import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import Link from 'next/link';

const loginFormSchema = z.object({
  emailOuTelefone: z
    .string()
    .nonempty('Este campo é obrigatório!')
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$|^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
      'Por favor, digite um e-mail ou celular válido.'
    ),
  senha: z.string().nonempty('Este campo é obrigatório!').min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

type LoginFormValues = {
  emailOuTelefone: string;
  senha: string;
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

  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState('');
  const { push } = useRouter();

  const isButtonDisabled = !!errors.emailOuTelefone || !!errors.senha || carregando;

  function handleFormSubmit(data: LoginFormValues) {
    setCarregando(true);

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: data.emailOuTelefone,
        senha: data.senha,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCarregando(false);

        if (data.error) {
          setErroEnvio(data.error);
          return;
        }

        push('/perfil');
      })
      .catch(() => {
        setCarregando(false);
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
              {...register('emailOuTelefone')}
              className="w-full outline-0"
            />
          </div>
          {errors.emailOuTelefone && (
            <span className="text-red-600 text-xs">
              {errors.emailOuTelefone.message}
            </span>
          )}
        </div>
      </label>
      <label>
        <span className="mb-1 block">Senha</span>
        <div>
          <div className="border border-neutral-300 flex py-1 px-2">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              {...register('senha')}
              className="w-full outline-0"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha((prev) => !prev)}
            >
              {mostrarSenha ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {errors.senha && (
            <span className="text-red-600 text-xs">{errors.senha.message}</span>
          )}
        </div>
      </label>
      <div className="flex justify-between gap-x-2">
        <label>
          <input
            className="mr-1"
            type="checkbox"
            checked={lembrar}
            onChange={(event) => setLembrar(event.target.checked)}
          />
          <span>Lembrar</span>
        </label>
        <Link className="underline" href="#">
          Esqueci minha senha
        </Link>
      </div>
      {erroEnvio && (
        <span className="text-center text-xs text-red-600">
          {erroEnvio}
        </span>
      )}
      <button
        className={`text-center py-2 px-4 bg-neutral-200 ${
          isButtonDisabled ? 'text-neutral-400' : 'text-neutral-900'
        }`}
        type="submit"
        disabled={isButtonDisabled}
      >
        {carregando ? 'Enviando...' : 'Continuar'}
      </button>
    </form>
  );
}

export default LoginForm;
