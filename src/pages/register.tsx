"use client";
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs } from '@/@types/Inputs';
import { emailRegex, nameRegex, passwordRegex, phoneRegex } from '@/utils/Regex';


export default function screenRegister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const handleAgreeToTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasAgreedToTerms(event.target.checked);
  };

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
              {...register('telPhone', {
                required: true,
                pattern: phoneRegex
              })}
              value={telPhone}
              onChange={handleTelPhone}
              placeholder="Telefone"
            />
            {errors.telPhone && errors.telPhone.type === 'required' && (
              <p className="text-red-500">Campo obrigatório</p>
            )}
            {errors.telPhone && errors.telPhone.type === 'pattern' && (
              <p className="text-red-500">Telefone Inválido (Segue o Padrão (DDD) 9XXXX-XXXX)</p>
            )}
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
            <div className="flex justify-between gap-x-2">
              <label>
                <input
                  className="mr-1"
                  type="checkbox"
                  checked={hasAgreedToTerms}
                  onChange={handleAgreeToTerms}

                />
                <span>Eu concordo com a política de privacidade</span>
              </label>

            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <button className="rounded-2xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              disabled={!hasAgreedToTerms}
            >
              Continuar

            </button>
          </div>
        </div>
      </form>

    </>
  )
}