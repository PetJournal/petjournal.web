import React, { useState } from 'react';
import Link from 'next/link';
import CardAnimal from './CardAnimal';

// Defina a interface para o tipo de item que você está usando
interface Item {
  id: number;
  nome: string;
  // Adicione outros campos conforme necessário
}

function PetSelect() {

  return (
    <div className="flex h-screen flex-col p-4 font-fredoka text-primary/400">
      <header className="flex w-full relative justify-center mb-9 border-b p-3">
        {/* <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2">
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
        </Link> */}
        <h1 className="">Cadastro Pet</h1>
      </header>
      <div className="flex flex-col justify-between text-center items-center h-full">
        <div>
          <h2 className="font-medium w-[343px] text-center text-2xl leading-extra-loose">
            Olá <span className="text-primary/300  ">Clevinho</span>, gostaríamos de saber
            qual a espécie do seu Pet:
          </h2>
        </div>

        <div className='w-[340px] h-[283px]'>
          <CardAnimal />
          <button type='button'>
            Outros...
          </button>
        </div>
        

        <div className="flex justify-center gap-3">
          <Link
            href="/pet-register"
            className="block p-3 border rounded-full border-primary/400"
          >
            Voltar
          </Link>
          <Link
            href="/pet-register/species"
            className="block mx-auto p-3 rounded-full text-[#F2F2F2] bg-primary/400"
          >
            Continuar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PetSelect;
