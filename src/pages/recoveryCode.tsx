import petJournalLogo from '../assets/svg/petJournalIcon.svg'
import Image from 'next/image';
import { useRef, useState } from 'react';
import clsx from 'clsx';

function recoveryCode() {
  const [inputValues, setInputValues] = useState(Array(6).fill(''));
  const inputRefs = useRef<HTMLInputElement[] | null[]>([]);

  function handleInputChange(index: number, value: string) {
    const newInputValues = [...inputValues]
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (value && index < inputRefs.current.length - 1) {
      (inputRefs.current[index + 1] as HTMLInputElement).focus();
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Image
          src={petJournalLogo}
          alt="petJournalLogo"
        />
        <div className="text-[22px] font-bold">
          <h2 className="text-center">
            Acabamos de enviar um código
          </h2>
          <h2 className="text-center">
            para seu e-mail
          </h2>
        </div>
        <p className="mt-8 text-[15px]">Insira no campo abaixo o código de verificação de 6</p>
        <p className="text-[15px]">dígitos enviado para o seu email.</p>
        <div className="flex space-x-2 mt-2">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={inputValues[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className={clsx(
                  'w-12 h-16 text-center border-2 rounded-md mt-8',
                  inputValues[index]
                    ? 'border-custom-purple focus:ring-4 focus:ring-custom-purple focus:border-transparent focus:outline-none'
                    : 'border-gray-300 focus:ring-4 focus:ring-custom-purple focus:border-transparent focus:outline-none'
                )}
              />
            ))}
        </div>
        <button className="mt-8 bg-custom-purple hover:bg-custom-purple-hover text-white font-bold py-4 px-24 rounded-full">Enviar</button>
      </div>


    </>
  )
}

export default recoveryCode;
