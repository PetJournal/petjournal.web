import petJournalLogo from '../assets/svg/petJournalIcon.svg'
import Image from 'next/image';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

function recoveryCode() {
  const [inputValues, setInputValues] = useState(Array(6).fill(''));
  const [verificationStatus, setVerificationStatus] = useState<'valid' | 'invalid' | 'none'>('none');
  const inputRefs = useRef<HTMLInputElement[] | null[]>([]);
  const { push } = useRouter();

  function handleInputChange(index: number, value: string) {
    const newInputValues = [...inputValues]
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (value && index < inputRefs.current.length - 1) {
      (inputRefs.current[index + 1] as HTMLInputElement).focus();
    }
  }

  function isButtonDisabled() {
    return inputValues.some((value) => value === '');
  }

  function validateCode(code: string[]): boolean {
    // temp code
    const validCode = ['1', '2', '3', '4', '5', '6'];
    return code.every((value, index) => value === validCode[index]);
  }


  function handleSubmit() {
    if (validateCode(inputValues)) {
      setVerificationStatus('valid');
      push('/change-password')
      //redirect to 'change password'
    } else {
      setVerificationStatus('invalid');
    }
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
        {verificationStatus === 'invalid' && (
          <p className='text-red-600 mt-5 text-sm font-medium'>O código de verificação que você inseriu não é válido. Verifique o código e tente novamente</p>
        )}
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
          disabled={isButtonDisabled()}
          onClick={handleSubmit}
          className={clsx(
            'mt-8 font-bold w-36 h-12 rounded-[16px]',
            isButtonDisabled()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-custom-purple hover:bg-custom-purple-hover text-white'
          )}
        >Enviar
        </button>
        <p className='mt-8 text-[15px]'>Dica: Caso não encontre o e-mail na sua caixa de</p>
        <p className='text-[15px]'>entrada. Verifique a pasta de Spam!</p>
      </div>


    </>
  )
}

export default recoveryCode;
