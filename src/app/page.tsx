"use client";
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string,
  lastName: string,
  email: string,
  telPhone: string,
  password: string,
  confirmPassword: string,
};

const nameRegex = /^[a-zA-Z]{3,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

export default function screenRegister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors } } = useForm<Inputs>();

  const watchedPassword = watch('password');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telPhone, setTelPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');


  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handleTelPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTelPhone(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(event.target.value);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  }

  return (
    <>

      <form className="flex flex-col items-center justify-center h-screen" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-5xl font-bold mr-96 mb-20">Pet Journal</h1>
        <h1 className="text-5xl font-bold pl-24 mr-60 mb-10">Inscreva-se</h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <input className="rounded-2xl appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            id="name"
            {...register('name', { required: true, pattern: nameRegex })}
            value={name}
            onChange={handleName}
            placeholder="Nome" />
            {errors.name && errors.name.type === 'required' && (
            <p className="text-red-500">Campo obrigatório</p>
          )}
          {errors.name && errors.name.type === 'pattern' && (
            <p className="text-red-500">Nome inválido</p>
          )}
          </div>


          <div className="w-full md:w-1/2 px-3">
            <input className="rounded-2xl appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            id="lastName"
            {...register('lastName', { required: true, pattern: nameRegex })}
            value={lastName}
            onChange={handleLastName}
            placeholder="Sobrenome"
            />
            {errors.lastName && errors.lastName.type === 'required' && (
            <p className="text-red-500">Campo obrigatório</p>
          )}
          {errors.lastName && errors.lastName.type === 'pattern' && (
            <p className="text-red-500">Sobrenome inválido</p>
          )}
          </div>
        </div>


        <div className="flex flex-wrap -mx-3 mb-6 w-96">
          <div className="w-full px-3">
            <input
            className="rounded-2xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="email"
            id="email"
            {...register('email', { required: true, pattern: emailRegex })}
            value={email}
            onChange={handleEmail}
            placeholder="E-mail"
            />
            {errors.email && errors.email.type === 'required' && (
            <p className="text-red-500">Campo obrigatório</p>
            )}
            {errors.email && errors.email.type === 'pattern' && (
            <p className="text-red-500">Email inválido</p>
            )}
          </div>
        </div>


        <div className="flex flex-wrap -mx-3 mb-6 w-96">
          <div className="w-full px-3">
            <input
            className="rounded-2xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="tel"
            id="telphone"
            value={telPhone}
            onChange={handleTelPhone}
            placeholder="Telefone"
            />
          </div>
        </div>


        <div className="flex flex-wrap -mx-3 mb-6 w-96">
          <div className="w-full px-3">
          <input
            className="rounded-2xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="password"
            id="password"
            {...register('password', {
              required: true,
              pattern: passwordRegex,
            })}
            placeholder="Senha"
          />
            {errors.password && errors.password.type === 'required' && (
            <p className="text-red-500">Campo obrigatório</p>
            )}
            {errors.password && errors.password.type === 'pattern' && (
            <p className="text-red-500">Senha inválida (mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial)</p>
            )}
          </div>
        </div>


        <div className="flex flex-wrap -mx-3 mb-6 w-96">
          <div className="w-full px-3">
            <input
            className="rounded-2xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="password"
            id="confirm-password"
            {...register("confirmPassword", {
              required: true,
              pattern: passwordRegex,
              validate: (value) => value === watchedPassword || 'As senhas devem ser idênticas',
            })}
            value={passwordConfirmation}
            onChange={handlePasswordConfirmation}
            placeholder="Confirmar Senha"
            />
            {errors.confirmPassword && errors.confirmPassword.type === 'required' && (
            <p className="text-red-500">Campo obrigatório</p>
            )}
            {errors.confirmPassword && errors.confirmPassword.type === 'pattern' && (
            <p className="text-red-500">Senha inválida (mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial)</p>
            )}
            {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                className=" mb-8 relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary"
                type="checkbox"
              />
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer">Eu concordo com a política de privacidade</label>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <button className="rounded-2xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              Continuar
            </button>
          </div>
        </div>
      </form>

    </>
  )
}
