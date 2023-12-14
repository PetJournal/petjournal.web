import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from './api/axios';
import Link from 'next/link';
import clsx from 'clsx';

import 'react-toastify/dist/ReactToastify.css';
import ToastNotification, {
  showErrorToast,
  showSuccessToast,
} from '@/utils/toast-notification';

import petJournalLogo from '../assets/svg/petJournalIcon.svg'

function recoveryCode() {
  const [inputValues, setInputValues] = useState(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const inputRefs = useRef<HTMLInputElement[] | null[]>([]);
  const { push, query } = useRouter();
  const { email } = query;

  useEffect(() => {
    isButtonDisabled();
  }, [inputValues]);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues]
    newInputValues[index] = value
    setInputValues(newInputValues)

    if (value && index < inputRefs.current.length - 1) {
      (inputRefs.current[index + 1] as HTMLInputElement).focus()
    }
  }

  const isButtonDisabled = () => {
    const anyEmpty = inputValues.some((value) => value === '')
    setButtonDisabled(anyEmpty)
  }

  function validateCode(code: string[]) {
    const validCode = code.map(item => item).join('')
    console.log(email, validCode)
    return axios.post('/waiting-code', {
      email,
      verificationToken: validCode
    })
  }

  async function handleSubmit() {
    try {
      setButtonDisabled(true)
      setLoading(true)

      const response = await validateCode(inputValues)

      if (response.status == 200) {
        showSuccessToast("Sucesso. Redirecionando...")

        setTimeout(() => {
          push({
            pathname: '/change-password',
            query: {accessToken: response.data.accessToken}
          })
        }, 3000)

      } else {
        showErrorToast("Erro ao processar a solicitação.")
      }
    } catch (err: any) {
      console.error(err)
      if (err.response.data.error == "Verification token mismatch or expired") {
        showErrorToast("Código expirado ou inválido.")
      } else {
        showErrorToast("Erro ao processar a solicitação.")
      }
    }
    setLoading(false)
  }

  return (
    <>
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <Image
          src={petJournalLogo}
          alt='petJournalLogo'
        />
        <div className='text-[22px] font-bold'>
          <h2 className='text-center'>
            Acabamos de enviar um código
          </h2>
          <h2 className='text-center'>
            para seu e-mail
          </h2>
        </div>
        <p className='mt-8 text-[15px]'>Insira no campo abaixo o código de verificação de 6</p>
        <p className='text-[15px]'>dígitos enviado para o seu email.</p>
        <div className='flex flex-col'>
          <div className='flex space-x-2'>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type='text'
                  maxLength={1}
                  pattern='\d*'
                  value={inputValues[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyPress={(e) => {
                    if (!/\d/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className={clsx(
                    'w-12 h-16 text-center text-2xl font-bold border-2 rounded-md mt-8',
                    inputValues[index]
                      ? 'border-custom-purple focus:ring-4 focus:ring-custom-purple focus:border-transparent focus:outline-none'
                      : 'border-[#AFD9DB] bg-gray-100 focus:ring-4 focus:ring-custom-purple focus:border-transparent focus:outline-none'
                  )}
                />
              ))}
          </div>
          <Link href="/forgot-password" className="underline mt-2 text-sm flex justify-start">
            Reenviar código?
          </Link>
        </div>

        <button
          disabled={buttonDisabled}
          onClick={handleSubmit}
          className={clsx(
            'mt-8 font-bold w-36 h-12 rounded-[16px]',
            buttonDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-custom-purple hover:bg-custom-purple-hover text-white'
          )}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
        <p className='mt-8 text-[15px]'>Dica: Caso não encontre o e-mail na sua caixa de</p>
        <p className='text-[15px]'>entrada. Verifique a pasta de Spam!</p>
      </div>
      <ToastNotification/>
    </>
  )
}

export default recoveryCode;
