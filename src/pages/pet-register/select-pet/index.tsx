import React, { useState } from 'react';
import Link from 'next/link';
import { Dog } from './svgs/Dog';
import { Bird } from './svgs/Bird';
import { Cat } from './svgs/Cat';
import { Fish } from './svgs/Fish';
import { Reptile } from './svgs/Reptile';
import { Rodent } from './svgs/Rodent';
import classnames from 'classnames';

interface PetType {
  value: string;
  imageUrl: React.ReactElement;
  label: string;
}

function PetSelect() {
  const [selectedPet, setSelectedPet] = useState<string>('');

  const mockPetTypes: PetType[] = [
    { value: 'Cachorro', imageUrl: <Dog />, label: 'Cachorro' },
    { value: 'Pássaro', imageUrl: <Bird />, label: 'Pássaro' },
    { value: 'Gato', imageUrl: <Cat />, label: 'Gato' },
    { value: 'Peixe', imageUrl: <Fish />, label: 'Peixe' },
    { value: 'Réptil', imageUrl: <Reptile />, label: 'Réptil' },
    { value: 'Roedor', imageUrl: <Rodent />, label: 'Roedor' },
  ];

  const handleCheckboxChange = (value: string) => {
    console.log(value);
    setSelectedPet(value);
  };

  return (
    <div className="flex h-screen flex-col p-4 font-fredoka text-custom-purple">
      <header className="flex w-full relative justify-center mb-9 border-b p-3">
        <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={12}
            viewBox="0 0 16 12"
            fill="none"
          >
            <path
              d="M1 6H15"
              stroke="black"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 1L1 6"
              stroke="black"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 11L1 6"
              stroke="black"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h1 className="">Cadastro Pet</h1>
      </header>
      <div className="flex flex-col justify-between text-center h-full">
        <div>
          <h2 className="font-medium">
            Olá <span className="">Clevinho</span> , gostaríamos de saber qual a
            espécie do seu Pet:
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {mockPetTypes.map((pet) => (
            <label
              key={pet.value}
              className={classnames(
                'w-[100px] flex flex-col items-center p-2 border-[#B4C2FA] border-2 rounded-lg font-semibold text-[#B2B2B2]',
                { 'border-purple-500 text-[#9A0963]': selectedPet === pet.value },
              )}
            >
              {pet.imageUrl}
              {pet.value}
              <input
                type="checkbox"
                name="size"
                value={pet.value}
                checked={selectedPet === pet.value}
                onChange={() => handleCheckboxChange(pet.value)}
                required
                className="hidden"
              />
            </label>
          ))}

          <Link
            href="/pet-register/species"
            className="block mx-auto p-3 w-1/2 rounded-full text-[#F2F2F2] bg-[#54C1E9] mt-5"
          >
            Outras...
          </Link>
        </div>

        <div className="flex justify-center gap-3">
          <Link
            href="/pet-register"
            className="block p-3 w-1/2 border rounded-full border-[#9A0963] "
          >
            Voltar
          </Link>
          <Link
            href="/pet-register/species"
            className="block mx-auto p-3 w-1/2 rounded-full text-[#F2F2F2] bg-[#9A0963]"
          >
            Continuar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PetSelect;
