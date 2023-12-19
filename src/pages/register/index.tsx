"use client";
import { useState } from 'react';
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs } from '@/@types/Inputs';
import { emailRegex, nameRegex, passwordRegex, phoneRegex } from '@/utils/Regex';
import logo from '@/../public/Logo.svg';
import axios from '../api/axios';
import { useRouter } from 'next/router';

export default function screenRegister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  
  const router = useRouter();

  const watchedPassword = watch('password');
  const formsValues = {
    name: '',
    lastName: '',
    email: '',
    telPhone: '',
    password: '',
    confirmPassword: '',
  }

  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [ dataForm, setDataForm ] = useState<Inputs>(formsValues);
  const [ isloading, setIsLoading ] = useState(false);
  
  const handleChange = (fieldName: keyof Inputs, value: string) => {
    setDataForm((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .post('/signup',{
        firstName: dataForm.name,
        lastName: dataForm.lastName,
        email: dataForm.email,
        phone: dataForm.telPhone,
        password: dataForm.password,
        passwordConfirmation: dataForm.confirmPassword,
        isPrivacyPolicyAccepted: hasAgreedToTerms
      })
      .then(({ data }) => {
        setDataForm(formsValues)
        setHasAgreedToTerms(false)
        alert('Cadastro realizado com sucesso')
        router.push('/login')
      })
      .catch((error) => {
        alert('Ops alguma coisa deu errado, email ou telefone já cadastrado!')
      })
    

  }

  return (
    <>
      <div className='flex items-center justify-center'>
        <Image  src={logo} alt='Logo Pet Journal'/>
      </div  >
      <div className='flex items-center justify-center mt-4'>
        <h1 className="font-fredoka font-medium  text-2xl ">Inscreva-se</h1>
      </div>
      
      <form className="flex flex-col items-center justify-center mt-12" onSubmit=
      {handleSubmit(onSubmit)}>
        <div  className="flex flex-wrap -mx-3 w-96">
          <div className="w-full px-3">
              <label htmlFor='name' className='font-fredoka text-sm font-medium text-wine'>
                Nome
                <input
                  className="rounded appearance-none block w-full bg-white text-gray-700 border  border-gray-border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="name"
                  {...register('name', { required: true, pattern: nameRegex })}
                  value={dataForm.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Digite seu primeiro nome"
                />
              </label>
          </div>
            
            {errors.name && errors.name.type === 'required' && (
              <p className="text-red-500">Campo obrigatório</p>
            )}
            {errors.name && errors.name.type === 'pattern' && (
              <p className="text-red-500">Nome inválido</p>
            )}
        </div>
        
          <div className="flex flex-wrap -mx-3 w-96">
            <div className="w-full px-3">
                
              <label htmlFor='lastName' className='font-fredoka text-sm text-wine'>
                Sobrenome
              <input className="rounded appearance-none block w-full bg-white border-gray-border text-gray-700 border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="lastName"
                {...register('lastName', { required: true, pattern: nameRegex })}
                value={dataForm.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Digite seu sobrenome"
              />
              </label>
              {errors.lastName && errors.lastName.type === 'required' && (
                <p className="text-red-500">Campo obrigatório</p>
              )}
              {errors.lastName && errors.lastName.type === 'pattern' && (
                <p className="text-red-500">Sobrenome inválido</p>
              )}
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 w-96">
          <div className="w-full px-3" >
            <label htmlFor='email' className='font-fredoka text-sm text-wine'>
              E-mail
              <input
                className="rounded appearance-none block w-full bg-white text-gray-700 border border-gray-border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                type="email"
                id="email"
                {...register('email', { required: true, pattern: emailRegex })}
                value={dataForm.email}
                onChange={(e) => handleChange('email', e.target.value)}

                placeholder="E-mail"
              />
            </label>
            {errors.email && errors.email.type === 'required' && (
              <p className="text-red-500">Campo obrigatório</p>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <p className="text-red-500">Email inválido</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 w-96">
          <div className="w-full px-3">
          
            <label htmlFor='telphone' className='font-fredoka text-sm  text-wine'>
              Telefone
                <input
                  className="rounded appearance-none block w-full bg-white text-gray-700 border border-gray-border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="tel"
                  id="telphone"
                  {...register('telPhone', {
                    required: true,
                    pattern: phoneRegex
                  })}
                  value={dataForm.telPhone}
                  onChange={(e) => handleChange('telPhone', e.target.value)}

                  placeholder="Telefone"
                />
              </label>
          </div>
            
            {errors.telPhone && errors.telPhone.type === 'required' && (
              <p className="text-red-500">Campo obrigatório</p>
            )}
            {errors.telPhone && errors.telPhone.type === 'pattern' && (
              <p className="text-red-500">Telefone Inválido (Segue o Padrão (DDD) 9XXXX-XXXX)</p>
            )}
          
        </div>


        <div className="flex flex-wrap -mx-3 w-96">
          <div className="w-full px-3">
            <label htmlFor='password' className='font-fredoka text-sm  text-wine'>
              Senha
              <input
                className="rounded appearance-none block w-full bg-white text-gray-700 border border-gray-border py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                id="password"
                {...register('password', {
                  required: true,
                  pattern: passwordRegex,
                })}
                value={dataForm.password}
                placeholder="Senha"
                onChange={(e) => handleChange('password', e.target.value)}

              />
            </label>
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
            <label htmlFor='confirm-password' className='font-fredoka text-sm  text-wine'>
              Confirmar Senha
              <input
                className="rounded appearance-none block w-full bg-white text-gray-700 border border-gray-border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                id="confirm-password"
                {...register("confirmPassword", {
                  required: true,
                  pattern: passwordRegex,
                  validate: (value) => value === watchedPassword || 'As senhas devem ser idênticas',
                })}
                value={dataForm.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="Confirmar Senha"
              />
            </label>
            
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
        <div className="flex justify-center ">
            <div className="flex justify-between gap-x-2">
                <input
                  className="w-4 color-wine"
                  checked={hasAgreedToTerms}
                  onChange={(e) => setHasAgreedToTerms(e.target.checked)} 
                  type="radio"
                  id='check'
                />
              
              <label htmlFor='check' className='font-fredoka text-sm'>
                Eu concordo com a política de privacidade
              </label>
            </div>
        </div>
        
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <button
              className="rounded-2xl appearance-none block w-full bg-wine text-white border border-gray-200 py-3 px-11 mb-3 leading-tight focus:outline-none focus:bg-wine focus:border-gray-500 mt-10 "
              disabled={!hasAgreedToTerms}
              type="submit"
            >
              {
                isloading ? 'Cadastrando': 'Cadastrar'
              }
            </button>
          </div>
        </div>
      </form>
    </>
  )
}