import SpeciesCard from '@/components/SpeciesCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Species() {
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsContinueDisabled(selectedSpecies === '');
  }, [selectedSpecies]);

  const SpeciesList = [
    'Cachorro',
    'Pássaro',
    'Gato',
    'Peixe',
    'Réptil',
    'Roedor',
  ];

  return (
    <>
      <header className="flex items-center justify-center h-14 font-normal text-base shadow-[0_2px_4px_0_rgba(0,0,0,0.06)] mb-9">
        <h1 className="text-[#9A0963]">Cadastro Pet</h1>
      </header>
      <main className="max-w-sm mx-auto flex flex-col items-center">
        <h2 className="text-[#9A0963] text-center text-[22px] leading-6 px-2">
          Olá <span className="text-[#E06197]">Fulano</span>, gostaríamos de
          saber qual a espécie do seu Pet:
        </h2>

        <div className="grid grid-cols-3 gap-4 mt-20">
          {SpeciesList.map((species) => (
            <SpeciesCard
              key={species}
              species={species}
              setSelectedSpecies={setSelectedSpecies}
              setIsInputActive={setIsInputActive}
            />
          ))}
        </div>

        <button
          className="bg-[#54C1E9] w-[200px] py-2 rounded-3xl mt-5 text-white hover:bg-[#77DAF4] focus:bg-[#77DAF4] transition-colors"
          onClick={() => {
            setIsInputActive(!isInputActive);
            setSelectedSpecies('');
          }}
        >
          Outros...
        </button>

        {isInputActive && (
          <div className="mt-10">
            <label htmlFor="species" className="self-start ml-3 text-[#9A0963]">
              Insira a espécie:
            </label>
            <input
              type="text"
              name="species"
              placeholder="Digite aqui..."
              className="border-2 border-[#B2B2B2] rounded-lg px-3 py-2 w-full outline-none"
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
            />
          </div>
        )}

        <div className="absolute bottom-8 flex gap-4">
          <Link
            href="/pet-register"
            className="text-[#9A0963] border-2 border-[#9A0963] rounded-3xl w-40 py-2 text-center"
          >
            Voltar
          </Link>
          <button
            disabled={isContinueDisabled}
            className="bg-[#9A0963] text-white rounded-3xl w-40 py-2 disabled:text-[#B2B2B2] disabled:border-2 disabled:border-[#B2B2B2] disabled:bg-transparent"
          >
            Continuar
          </button>
        </div>
      </main>
    </>
  );
}

export default Species;
